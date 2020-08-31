---
layout: writing/entry.njk
title: JS Cover Flow Refinements
date: 2014-01-12
excerpt: On desktop (webkit) there were always issues in HTML5 mode when clicking fast through the covers. These problems have been resolved recently by introducing a refined mouse click capturing structure which can be seen in the image below.
tags: writing
---

On desktop (webkit) there were always issues in HTML5 mode when clicking fast through the covers.

These problems have been resolved recently by introducing a refined mouse click capturing structure which can be seen in the image below.

![js cover flow](/images/coverflow.jpg)

The initial method of capturing mouse clicks was very straightforward and will probably work in 90% of the cases when you are building an image carousel or the sorts. The mouse event listeners were added to the covers, the same covers that do the fancy flow animation. At first sight this seemed to work but after some in-dept testing the mouse events were not firing correctly when rapidly clicking cover after cover.

My best guess is that when using a CSS transition on a translate3d transformed element the mouse events are disabled while the animation is in effect. Actually the whole DOM element loses its interactivity in that time because the browser is using hardware acceleration to render the element. The element is then just a graphic.

Is this a bug? I'm not sure. Firefox does not lose its mouse interactivity on a 3D animated element. Anyway, I went and filed a bug report here.

[code.google.com/p/chromium/issues/detail?id=168495](https://code.google.com/p/chromium/issues/detail?id=168495)

On Stack Overflow there is someone with an issue that is caused by the same underlying problem.

[stackoverflow.com/questions/translate-3d-causing-jquery-hover-click...](http://stackoverflow.com/questions/18496551/translate3d-causing-jquery-hover-click-events-to-not-fire-correctly)
