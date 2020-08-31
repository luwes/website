---
layout: projects/entry.njk
extraCssFile: "https://luwes.github.io/js-cover-flow/coverflow.css"
title: JS Cover Flow
version: 1.2.0
icon: coverflow-icon.svg
color: "#00f0c6"
excerpt: A Cover Flow component made for the web. The component has two modes, HTML5 and flash, supporting the most popular browsers and devices today.
sidebar:
  github:
    text: View on Github
    url: https://github.com/luwes/js-cover-flow
tags:
  - projects
  - javascript
  - css
---

A Cover Flow component made for the web. The component has two modes, HTML5 and flash, supporting the most popular browsers and devices today. On mobile devices like the iPad and iPhone the animations are hardware accelerated by using CSS3 transforms resulting in a very smooth user experience.

<div id="player"></div>
<script src="{{ site.githubPageUrl }}/js-cover-flow/coverflow.js"></script>
<script>
  coverflow('player').setup({
    //mode: "flash",
    flash: "{{ site.githubPageUrl }}/js-cover-flow/coverflow.swf",
    playlist: "/images/playlist.json",
    width: '100%',
    height: 250,
    y: -20,
    backgroundcolor: "ffffff",
    coverwidth: 180,
    coverheight: 150,
    fixedsize: true,
    textoffset: 50,
    textstyle: ".coverflow-text{color:#000000;text-align:center;font-family:Arial Rounded MT Bold,Arial;} .coverflow-text h1{font-size:14px;font-family:inherit;font-weight:normal;line-height:21px;} .coverflow-text h2{font-size:12px;font-family:inherit;font-weight:normal;} .coverflow-text a{color:#0000EE;}"
  }).on('ready', function() {
    this.on('focus', function(index, link) {
      document.getElementById('cf-focus').value = index;
    });
    this.on('click', function(index, link) {
      document.getElementById('cf-click').value = index;
    });
  });
</script>

### JavaScript API

<div class="apibar">
  <a class="apibar-button" onclick="coverflow().prev();">Previous</a>
  <a class="apibar-button" onclick="coverflow().next();">Next</a>
  <a class="apibar-button" onclick="coverflow().to(document.getElementById('cf-val').value);">
    To <input id="cf-val" type="text" value="3" size="1" maxlength="3" />
  </a>
  <a class="apibar-button">
    Focused <input id="cf-focus" type="text" value="N/A" size="1" maxlength="3" disabled="disabled" />
  </a>
  <a class="apibar-button">
    Clicked <input id="cf-click" type="text" value="N/A" size="1" maxlength="3" disabled="disabled" />
  </a>
</div>

### Basic Setup

``` html
<!-- <head> -->
<link rel="stylesheet" href="coverflow.css"/>
```

``` html
<!-- <body> -->
<div id="player"></div>
<script src="coverflow.js"></script>
<script>
coverflow('player').setup({
    flash: 'coverflow.swf',
    playlist: 'playlist.json',
    width: 460,
    height: 240
});
</script>
```

### Configuration

|   |   |
| - | - |
| `playlist` |  The URL of the JSON playlist or an inline JSON playlist |
| `width (480)` |  Width of the Cover Flow component |
| `height (270)` |  Height of the Cover Flow component |
| `item (0)` |  First item that is focused on setup |
| `backgroundcolor (000000)` |  Color of the background (RRGGBB) |
| `backgroundopacity (1)` |  Opacity of the background (min:0, max:1) |
| `gradientcolor (undefined)` |  If you set this the background will be a gradient, top color is gradientcolor and the bottom color is backgroundcolor. Note: this will not work well with the cover reflections (RRGGBB) |
| `mode (html5)` |  Force flash mode by setting this to flash |
| `flash (coverflow.swf)` |  File path of the fallback SWF |
| `wmode (window)` |  Flash object window mode (window \| opaque \| transparent) |
| `coverwidth (150)` |  Maximum width of the cover |
| `coverheight (auto)` |  Default this flashvar is set to auto which equals the display height, this is overridable by a numeric value which restricts the maximum height of the cover. |
| `covergap (40)` |  Horizontal width between covers |
| `coverangle (70)` |  Angle of not selected covers in degrees |
| `coverdepth (170)` |  Depth of not selected covers |
| `coveroffset (130)` |  Horizontal width between selected cover and not selected covers |
| `opacitydecrease (0.1)` |  Decrease of opacity of the covers going back. This is disabled in html5 mode for better performance (min:0, max:1) |
| `fixedsize (false)` |  Scale and crop the images to fixed sizes set by coverwidth and coverheight instead of resizing them proportionally (true \| false) |
| `reflectionopacity (0.3)` |  Opacity of the cover reflection |
| `reflectionratio (155)` |  The color distribution ratios of the reflection; valid values are from 0 to 255 |
| `reflectionoffset (0)` |  Vertical offset of reflection |
| `showtext (true)` |  Show title and description (true \| false) |
| `textstyle` |  CSS style for title and description. Default: .coverflow-text{color:#f1f1f1;text-align:center;font-family:Arial Rounded MT Bold,Arial;} .coverflow-text h1{font-size:14px;font-weight:normal;line-height:21px;} .coverflow-text h1{font-size:11px;font-weight:normal;} .coverflow-text a{color:#0000EE;} |
| `textoffset (75)` |  Vertical offset of the text below the covers counted from bottom |
| `rotatedelay (0)` |  Delay in milliseconds when auto rotated, if 0 no rotation is started |
| `x (0)` |  Horizontal offset of the Cover Flow in the container |
| `y (0)` |  Vertical offset of the Cover Flow in the container |
| `tweentime (0.8)` |  Elapsed time of one tween animation |
| `focallength (250)` |  Focal length to 3D covers. Make smaller to get fisheye lens effect |
| `mousewheel (true)` |  Scroll through the covers with the mouse wheel. (true \| false) |

### Methods (Javascript API)

|   |   |
| - | - |
| `left():void` |  Navigate one cover left |
| `right():void` |  Navigate one cover right |
| `prev():void` |  Navigate to the previous cover |
| `next():void` |  Navigate to the next cover |
| `to(index:int):void` |  Navigate to the cover defined by index |
| `on(event:String, listener:Function):void` |  Add an event listener (see events below) |
| `remove():void` |  Removes the coverflow component |

### Events

|   |   |
| - | - |
| `ready` |  Called when the component is ready to accept commands |
| `click` |  Called when the focused cover is clicked |
| `focus` |  Called when a cover is focused |
