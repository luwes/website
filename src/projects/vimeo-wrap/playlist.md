---
layout: projects/entry.njk
title: Vimeo Playlist
version: 1.2
---

Vimeo Playlist is a plugin for [Vimeo Wrap](/projects/vimeo-wrap/) that shows the playlist items in a neat list below, above or next to the Vimeo player. The list uses a scrollbar that is uniform across all browsers and is optimized for mobile use, touch enabled.

<div id="vimeowrap_playlist"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.playlist.js"></script>
<script>
  vimeowrap('vimeowrap_playlist').setup({
    urls: [
      'https://vimeo.com/user3709818'
    ],
    repeat: 'list',
    plugins: {
      'playlist':{}
    }
  });
</script>

### Usage

``` html
<div id="player"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.playlist.js"></script>
<script>
  vimeowrap('player').setup({
    urls: [
      'https://vimeo.com/user3709818'
    ],
    plugins: {
      'playlist':{}
    }
  });
</script>
```

### Configuration

| | |
|-|-|
| `position (bottom)` | Position of playlist (bottom \| top \| left \| right) |
| `size (200)` | Size of the playlist in pixels |
| `offsetx (50)` | Horizontal offset of the playlist |
| `offsety (10)` | Vertical offset of the playlist |
| `autoplay (false)` | Auto-play video on thumbnail click |
| `thumb.quality (small)` | Quality of thumbnails (small \| medium \| large) |
| `thumb.width (100)` | Width of thumbnails in pixels |
| `thumb.height (75)` | Height of thumbnails in pixels |
