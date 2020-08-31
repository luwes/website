---
layout: projects/entry.njk
title: Vimeo Info Box
version: 1.2
---

Info Box is a plugin for [Vimeo Wrap](/projects/vimeo-wrap/) that allows you to add video information like the title, description, author, author image, number of plays, number of likes... below or above the Vimeo Player.

The information gets updated automatically when a new playlist item is selected.


<div id="vimeowrap_infobox"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.infobox.js"></script>
<script>
  vimeowrap('vimeowrap_infobox').setup({
    urls: [
      'https://vimeo.com/user3709818'
    ],
    repeat: 'list',
    portrait: false,
    title: false,
    byline: false,
    plugins: {
      'infobox':{
        style: '#{{id}} {}'
      }
    }
  });
</script>


<div class="apibar">
  <a class="apibar-button" onclick="vimeowrap('vimeowrap_infobox').playlistPrev()">Prev</a>
  <a class="apibar-button" onclick="vimeowrap('vimeowrap_infobox').playlistNext()">Next</a>
</div>

### Usage

``` html
<div id="player"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.infobox.js"></script>
<script>
  vimeowrap('player').setup({
    urls: [
      'https://vimeo.com/user3709818'
    ],
    plugins: {
      'infobox':{}
    }
  });
</script>
```

### Configuration

| | |
|-|-|
| `position (bottom)` | Position of info box (bottom \| top \| left \| right) |
| `size (130)` | Size of info box in pixels |
| `template` | HTML template of the info box, the default template can be seen below. |

### Default Template

{% raw %}
``` html
<a href="{{user_url}}">
  <img class="portrait" src="{{user_portrait_medium}}"/>
</a>
<div class="title">
  <a href="{{url}}" title="{{title}}">{{title|truncate:20}}</a>
</div>
<div class="byline">
  from <a href="{{user_url}}">{{user_name}}</a>
  <time datetime="{{upload_date}}">
    {{upload_date|timesince}} ago
  </time>
</div>
<p class="desc">{{description|truncate:100}}</p>
```
{% endraw %}
