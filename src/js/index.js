
import page from 'page';

import pagejax from './pagejax';
import { qs, qsa, addClass, removeClass, off, on, ready } from './utils';

function init() {
  ready(onPageReady);

  pagejax('.js-pjaxBody');
  pagejax.el.addEventListener('pagejax:send', onPjaxSend);
  pagejax.el.addEventListener('pagejax:end', onPjaxEnd);

  page('*', pagejax.load, pagejax.render, onPjaxReady);
  page('/:section?', section);
  page('/:section/*', section);
  page('/', home);
  page('*', notfound);
  page();
}

function onPjaxSend() {

}

function onPjaxEnd() {
  if (typeof ga === 'function') {
    ga('set', 'location', window.location.href);
    ga('send', 'pageview');
  }
}

function notfound(ctx) {

}

function onPageReady() {
  // Set external links to open in new windows
  var externalLinkRegex = new RegExp('^https?://(?!'+document.location.hostname.replace('.', '\\.')+')'),
    links = document.getElementsByTagName('a');

  for (var i = 0; i < links.length; i++) {
    if (links[i].href.match(externalLinkRegex) && !links[i].target) {
      links[i].target = '_blank';
    }
  }
}

function onPjaxReady(ctx, next) {
  window.scrollTo(0, 0);

  if (typeof vimeowrap !== 'undefined') {
    var players = vimeowrap.getPlayers();
    for (var player in players) {
      delete players[player];
    }
  }

  pagejax.execute();

  onPageReady();

  if (window.pageTitle) {
    document.title = window.pageTitle;
  }

  var body = qs('body');
  body.className = '';

  var classes = window.bodyClass || '';
  if (classes) {
    body.classList.add(classes.split(' '));
  }

  next();
}

function section(ctx, next) {
  var section = ctx.params.section || 'about';

  var menuItems = Array.from(qsa('.siteMenu > li'));
  removeClass(menuItems, 'siteMenu-item-isActive');
  menuItems = menuItems.filter(function(element) {
    return element.getAttribute('data-section') === section;
  });
  addClass(menuItems, 'siteMenu-item-isActive');

  next();
}

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed;
}

function home(ctx, next) {
  var container = qs('.portrait');
  var items = qsa('.portrait-item', container);
  var oldIndex = 0;
  var enableMouseMove = true;

  off(window, 'mousemove')
  on(window, 'mousemove', changeImageOnMouseMove);

  off(container, 'mouseenter');
  off(container, 'mouseleave');
  on(container, 'mouseenter', function(e) {
    enableMouseMove = false;
    changeImage(e.currentTarget.className == 'about-title' ? 0 : 6);
  });
  on(container, 'mouseleave', function() {
    enableMouseMove = true;
  });

  function changeImageOnMouseMove(e) {
    var offset = container.getBoundingClientRect();
    var x = e.pageX - offset.left - container.clientWidth / 2;
    var y = e.pageY - offset.top - container.clientHeight / 2;
    var angle = Math.atan2(y, x) * 180 / Math.PI + 180;
    var index = Math.floor(scaleBetween(angle, 1, 6, 0, 360));
    if (enableMouseMove) {
      changeImage(index);
    }
  }

  function changeImage(index) {
    if (index !== oldIndex) {
      removeClass(items, 'portrait-item-wasActive', 'portrait-item-isActive');
      addClass(items[oldIndex], 'portrait-item-wasActive');
      items[0].offsetHeight; //force repaint
      addClass(items[index], 'portrait-item-isActive');

      oldIndex = index;
    }
  }

  next();
}

init();
