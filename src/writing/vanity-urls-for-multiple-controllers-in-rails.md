---
layout: writing/entry.njk
title: Vanity URLs for Multiple Controllers in Rails
date: 2014-05-20
excerpt: There is no denying that good URL design is crucial for a successful web application. It's the first thing visitors see of your site and if you did an alright job it's one of the things that they'll be able to recollect.
tags: writing
---

There is no denying that good URL design is crucial for a successful web application. It's the first thing visitors see of your site and if you did an alright job it's one of the things that they'll be able to recollect.

In my current project I wanted to route top level sections to different controllers, similar to Quora's URL structure.

``` ruby
'http://www.site.com/Nikola-Tesla' => UsersController
'http://www.site.com/Alternating-Current' => TopicsController
```

The Ruby on Rails router doesn't provide this functionality out the box but with some small changes we can make this work.

### Requirements

* Clean URL's without numeric id
* Top level slugs should be able to point to several controllers
* Slug name can be changed, old slug redirects (301) to new one
* Letter case in slugs should be insensitive, redirect to original

The first thing you need to do is decide what model attribute will be used to generate the slug. I used `full_name` and `title` for the `User` and `Topic` models respectively.

### Stringex

Normally you would need to have a function that converts the string property to a pretty looking slug. Replace spaces with dashes, normalize special characters, etc. Fortunately there is an excellent gem made for this called [stringex](https://github.com/luwes/stringex). Once you have that installed add something along these lines to your model.

``` ruby
acts_as_url :title, sync_url: true, force_downcase: false
```

If the `sync_url` option is set to true it will save the generated slug automatically to the `url` attribute of your model. So make sure you add that to your database model and add an index as well since we'll be fetching the model based on that slug.

Override `to_param` so the URL's are constructed with the new slug.

``` ruby
def to_param
  url
end
```

### Slug DB Table

We're gonna add a dedicated slug table which will hold the slug, the associated model name and id, and the date it was created. This enables 2 functions. To find the controller based on the slug and to keep a history of used slugs.

``` ruby
class CreateSlugs < ActiveRecord::Migration
  def change
    create_table :slugs do |t|
      t.string :url, null: false
      t.belongs_to :sluggable, polymorphic: true, index: true
      t.datetime :created_at
    end
    add_index :slugs, :url, unique: true
  end
end
```

Once that migration is added we have to make sure the slugs are copied into the table when a model instance is saved. This goes into the model.

``` ruby
has_many :slugs, as: :sluggable, dependent: :destroy
after_save :create_slug

def create_slug
    return if !url_changed? || url == slugs.last.try(:url)
    #re-use old slugs 
    previous = slugs.where('lower(url) = ?', url.downcase)
    previous.delete_all
    slugs.create!(url: url)
end
```

The last thing that is needed in the model is a method to retrieve an instance.

``` ruby
def self.find_by_slug(url)
    #the second query is sometimes required when an old slug is used, history find
    where('lower(url) = ?', url.downcase).first || Slug.where('lower(url) = ?', url.downcase).first.try(:sluggable)
end
```

### Rack Router

This little Rack application will route the URL to the right controller.

``` ruby
class SlugRouter
  def self.to(action)
    new(action)
  end
  def initialize(action)
    @action = action
  end
  def call(env)
    params = env['action_dispatch.request.path_parameters']
    params[:action] = @action

    sluggable = Slug.where('lower(url) = ?', params[:slug].downcase).first
    model = sluggable.try(:sluggable_type)
    raise ActionController::RoutingError.new('Not Found') if !model

    controller = [model.pluralize.camelize,'Controller'].join
    params[:controller] = model.pluralize.downcase
    controller.constantize.action(params[:action]).call(env)
  end
end
```

Add this somewhere in a separate file under `lib/slug_router.rb` and use require to make it available in your `routes.rb` file. Now it's as easy as adding routes like these.

``` ruby
get '/:slug/edit', to: SlugRouter.to(:edit), as: :edit_slug
get '/:slug', to: SlugRouter.to(:show), as: :slug
match '/:slug', to: SlugRouter.to(:update), via: [:put, :patch]
delete '/:slug', to: SlugRouter.to(:destroy)
```

### Redirects

The last thing to add is a function that redirects old slugs and letter case differences. This gets added to the controller as a `before_action`.

``` ruby
def redirect_old_slug
  @topic = Topic.find_by_slug(params[:slug])
  id, rest = request.path.match(/(\/[^\/]+)(.*)/).captures
  slug = slug_path(@topic)
  if slug != id
    return redirect_to(slug + rest), :status => :moved_permanently
  end
end
```
