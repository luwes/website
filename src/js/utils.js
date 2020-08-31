
if (!Array.from) {
	Array.from = function(object) {
		return [].slice.call(object);
	};
}

function flatten(arr) {
	return [].slice.call(arr).reduce(function(a, b) {
		return a.concat(b.length ? flatten(b) : b);
  }, []);
}

export function qs(selector, element) {
	element = element || document;
	return element.querySelector(selector);
}

export function qsa(selector, element) {
	element = element || document;
	return element.querySelectorAll(selector);
}

export function addClass() {
	var elements = flatten(Array.from(arguments).slice(0, 1));
	var classNames = Array.from(arguments).slice(1);
	elements.forEach(function(element) {
		element.classList.add.apply(element.classList, classNames);
	});
}

export function removeClass() {
	var elements = flatten(Array.from(arguments).slice(0, 1));
	var classNames = Array.from(arguments).slice(1);
	elements.forEach(function(element) {
		element.classList.remove.apply(element.classList, classNames);
	});
}

export function off(element, eventName, eventHandler) {
	return element.removeEventListener(eventName, eventHandler);
}

export function on(element, eventName, eventHandler) {
	return element.addEventListener(eventName, eventHandler);
}

export function ready(fn) {
	if (document.readyState != 'loading') {
		fn();
	} else {
		document.addEventListener('DOMContentLoaded', fn);
	}
}
