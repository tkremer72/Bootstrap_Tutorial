async function fetchImage(url) {
     const resp = await fetch(url);//wait for request to a url
     const blob = await resp.blob();//wait for promise that creates a data blob from the requested file
     return createImageBitmap(blob);// return a final promise that creates an image bitmap from that data blob
}

function getRandomImage() {
     return fetchImage('https://source.unsplash.com/random');
}

function draw(img, alpha=1) {
     const gal = document.getElementById('image-gallery');
     const ctx = gal.getContext('2d');
     ctx.globalAlpha = alpha;
     ctx.drawImage(img, 
          0, 0, img.width, img.height,
          0, 0, gal.width, gal.height
          );
}

function fade(image) {
     return new Promise(resolve => {
          function fadeIn(alpha) {
               draw(image, alpha);
               if(alpha >= .99) {
                    resolve();
               } else {
                    alpha += (1-alpha)/24;
                    window.requestAnimationFrame(() => fadeIn(alpha));
               }
          }
          fadeIn(0.1);
     });
}

function wait(ms) {
     return new Promise(resolve => {
          setTimeout(resolve, ms);
     })
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
/* Peferred method with JS Event Listener */
const toggleButton = document.getElementById('toggle-menu');
const naviList = document.getElementById('navi-list');
toggleButton.addEventListener('click', () => {
     naviList.classList.toggle('active');
})

/* HTML Event Method */

/* function toggleMenu() {
     const naviList = document.getElementById('navi-list');
     naviList.classList.toggle('active');
} */