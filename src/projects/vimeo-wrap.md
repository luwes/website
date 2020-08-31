---
layout: projects/entry.njk
title: Vimeo Wrap
version: 1.2
icon: vimeo-logo.svg
color: "#00acf2"
excerpt: Vimeo wrap is an easy to use Vimeo player embedder that can be extended with plugins. Playlist support enables you to play videos one after another.
sidebar:
  github:
    text: View on Github
    url: https://github.com/luwes/vimeowrap.js
  button:
    text: Donate
    url: https://paypal.me/wesleyluyten
tags:
  - projects
  - javascript
  - vimeo
  - player
---

Vimeo wrap is an easy to use Vimeo player embedder that can be extended with plugins. Playlist support enables you to play videos one after another. The embed code that is used to embed the player in the webpage is retrieved via the oEmbed protocol.

<div id="mediaplayer"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script>
  vimeowrap('mediaplayer').setup({
    urls: [
      'https://vimeo.com/39050404',
      'https://vimeo.com/22592785'
    ]
  });
</script>

### Usage

``` html
<div id="player"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script>
vimeowrap('player').setup({
  urls: [
    'https://vimeo.com/39050404',
    'https://vimeo.com/22592785'
  ]
});
</script>
```

Check out this jsFiddle for a customizable example,
[http://jsfiddle.net/luwes/uPgMv/](http://jsfiddle.net/luwes/uPgMv/)

### Plugins

- [Vimeo Carousel](/projects/vimeo-wrap/carousel)
- [Vimeo Lights Out](/projects/vimeo-wrap/lights-out)
- [Vimeo Info Box](/projects/vimeo-wrap/info-box)
- [Vimeo Playlist](/projects/vimeo-wrap/playlist)
