(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

let fetchImage = (() => {
     var _ref = _asyncToGenerator(function* (url) {
          const resp = yield fetch(url); //wait for request to a url
          const blob = yield resp.blob(); //wait for promise that creates a data blob from the requested file
          return createImageBitmap(blob); // return a final promise that creates an image bitmap from that data blob
     });

     return function fetchImage(_x) {
          return _ref.apply(this, arguments);
     };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function getRandomImage() {
     return fetchImage('https://source.unsplash.com/random');
}

function draw(img, alpha = 1) {
     const gal = document.getElementById('image-gallery');
     const ctx = gal.getContext('2d');
     ctx.globalAlpha = alpha;
     ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, gal.width, gal.height);
}

function fade(image) {
     return new Promise(resolve => {
          function fadeIn(alpha) {
               draw(image, alpha);
               if (alpha >= .99) {
                    resolve();
               } else {
                    alpha += (1 - alpha) / 24;
                    window.requestAnimationFrame(() => fadeIn(alpha));
               }
          }
          fadeIn(0.1);
     });
}

function wait(ms) {
     return new Promise(resolve => {
          setTimeout(resolve, ms);
     });
}

const pause = () => wait(2000);

function repeat(fn) {
     return new Promise((resolve, reject) => {
          const go = () => fn().then(() => {
               setTimeout(go, 0);
          }, reject);
          go();
     });
}

function nextImage() {
     return getRandomImage().then(fade).then(pause);
}

function start() {
     return repeat(nextImage).catch(start);
}

start();

},{}]},{},[1]);
