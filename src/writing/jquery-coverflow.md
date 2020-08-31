---
layout: writing/entry.njk
title: jQuery Cover Flow
date: 2012-12-12
excerpt: I noticed that a lot of people are looking for a jQuery implementation of cover-flow.
tags: writing
---

I noticed that a lot of people are looking for a jQuery implementation of cover-flow. The newest version of [JS Cover Flow](/projects/js-cover-flow/) adds a new `$.coverflow()` method to the jQuery object for a super easy setup. Note that the script doesn't rely on any external dependencies, it's an option to use jQuery to initialize the coverflow script.

<div id="player"></div>
<link rel="stylesheet" href="{{ site.githubPageUrl }}/js-cover-flow/coverflow.css"/>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=" crossorigin="anonymous"></script>
<script src="{{ site.githubPageUrl }}/js-cover-flow/coverflow.js"></script>
<script>
  $('#player').coverflow({
    //mode: "flash",
    flash: "{{ site.githubPageUrl }}/js-cover-flow/coverflow.swf",
    playlist: "https://vimeo.com/api/v2/channel/lapses/videos.json?callback=?",
    route: {
      image: "thumbnail_medium",
      link: "url"
    },
    width: '100%',
    height: 240,
    backgroundcolor: "ffffff",
    coverwidth: 200,
    coverheight: 150,
    fixedsize: true,
    y: -20,
    textoffset: 50,
    textstyle: ".coverflow-text{color:#000000;text-align:center;font-family:Arial Rounded MT Bold,Arial;} .coverflow-text h1{font-size:14px;font-family:inherit;line-height:21px;} .coverflow-text h2{display:none;} .coverflow-text a{color:#0000EE;}"
  }).on('ready', function() {
    this.on('click', function(index, link) {
      window.open(link, '_blank');
    });
  });
</script>

One of the most asked questions is whether a click on the focused cover can open a link. This is very much possible! A mouse click or a tap on mobile devices can call any javascript function as you see fit. The `link` property of the json playlist is passed as a function parameter in the callback function.
