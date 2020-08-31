---
layout: projects/entry.njk
title: Vimeo Carousel
version: 1.2
---

The Vimeo carousel shows your video play-list in a neat carousel below or above the Vimeo player. It's very easy to setup and has several customization parameters to fit your needs. Below you can find the embed code for the example shown on this page.

The script is lightweight, it only requires 2 javascript files of about 9kB.

<div id="vimeowrap_carousel"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.carousel.js"></script>
<script>
  vimeowrap('vimeowrap_carousel').setup({
    urls: [
      'https://vimeo.com/user3709818'
    ],
    plugins: {
      'carousel': {}
    }
  });
</script>
<br/>

<div class="projectNote">
  The Vimeo Carousel depends on a small embed library called
  <a href="/projects/vimeo-wrap/">Vimeo Wrap</a>.
</div>

### Usage

``` html
<div id="player"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.carousel.js"></script>
<script>
  vimeowrap('player').setup({
    urls: [
      'https://vimeo.com/user3709818'
    ],
    plugins: {
      'carousel': {}
    }
  });
</script>
```

Check out this jsFiddle for an example with extensive customization, [http://jsfiddle.net/luwes/3hPAL/](http://jsfiddle.net/luwes/3hPAL/)
