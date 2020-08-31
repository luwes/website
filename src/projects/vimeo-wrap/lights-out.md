---
layout: projects/entry.njk
title: Vimeo Lights Out
version: 1.2
---

Lights Out is a plugin for [Vimeo Wrap](/projects/vimeo-wrap/) that basically turns off the lights in the background and lets the users focus on the media in the Vimeo player.

The lights out functionality causes the browser window (with the exception of the Vimeo player) to be overlayed with a background shade with customizable color and opacity.

<div id="vimeowrap_lightsout"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.lightsout.js"></script>
<script>
  vimeowrap('vimeowrap_lightsout').setup({
    urls: [
      'https://vimeo.com/39050404'
    ],
    plugins: {
      'lightsout':{}
    }
  });
</script>

### Usage

``` html
<div id="player"></div>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.js"></script>
<script src="{{ site.githubPageUrl }}/vimeowrap.js/vimeowrap.lightsout.js"></script>
<script>
  vimeowrap('player').setup({
    urls: [
      'https://vimeo.com/39050404'
    ],
    plugins: {
      'lightsout':{}
    }
  });
</script>
```

### Configuration

|   |   |
| - | - |
| `backgroundcolor (000000)` | Color of the background shade (RRGGBB) |
| `opacity (0.8)` | Opacity of background shade (min:0, max:1) |
| `time (800)` | The time in milliseconds to fade in/out the lights |
| `onplay (off)` | Lights on/off if player is playing (on \| off) |
| `onpause (on)` | Lights on/off if player is paused (on \| off) |
| `onfinish (on)` | Lights on/off if player is completed (on \| off) |
