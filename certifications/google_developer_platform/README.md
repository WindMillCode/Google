# Google Developer Platform

## Visualize data on Google Maps Platform

### Improve map readability with marker clustering for Maps JavaScript API

* 
Marker Clustering

### [Lab](vids\Visualize_data_with_Google_Maps_Platform_and_deck.gl\README.md)


### Resources
[google maps api](https://developers.google.com/codelabs/maps-platform/maps-platform-101-js?continue=https%3A%2F%2Fdevelopers.google.com%2Flearn%2Fpathways%2Fget-started-maps%3Fhl%3Den%23codelab-https%3A%2F%2Fdevelopers.google.com%2Fcodelabs%2Fmaps-platform%2Fmaps-platform-101-js&hl=en#5)

The foundation of using Google Maps Platform for the web is the Maps JavaScript API. This API provides a JavaScript interface for using all of the features of Google Maps Platform, including the map, markers, drawing tools, and other Google Maps Platform services, such as Places.

## Enable real-time communication with WebRTC

#### User Media
* to use a persons webcam
```html
<video autoplay></video>
<script>
const constraints = {
  video: true,
};

const video = document.querySelector("video");

navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
  video.srcObject = stream;
});
</script>
```
[Resuolution Constraints API](https://w3c.github.io/mediacapture-main/getusermedia.html#dom-mediatrackconstraints)
__navigator.mediaDevices.enumerateDevices()__ PROMISE provides information about available input and output devices, 
* only  HTTPS and localhost

* to capture while the webcam is on
```html
<video autoplay></video>
<img src="">
<canvas style="display:none;"></canvas>

<script>
const captureVideoButton = document.querySelector(
  "#screenshot .capture-button"
);
const screenshotButton = document.querySelector("#screenshot-button");
const img = document.querySelector("#screenshot img");
const video = document.querySelector("#screenshot video");

const canvas = document.createElement("canvas");

captureVideoButton.onclick = function () {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(handleSuccess)
    .catch(handleError);
};

screenshotButton.onclick = video.onclick = function () {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
  // Other browsers will fall back to image/png
  img.src = canvas.toDataURL("image/webp");
};

function handleSuccess(stream) {
  screenshotButton.disabled = false;
  video.srcObject = stream;
}
</script>
```

* values for the filter method
```js
  "grayscale",
  "sepia",
  "blur",
  "brightness",
  "contrast",
  "hue-rotate",
  "hue-rotate2",
  "hue-rotate3",
  "saturate",
  "invert",
  "",
```
[Web GL](http://learningthreejs.com/blog/2012/02/07/live-video-in-webgl/)
[Live-Input Visualizer](https://webaudiodemos.appspot.com/input/index.html)
[Audio Recorder](https://webaudiodemos.appspot.com/input/index.html)
__MediaStream__ gets access to data streams, such as from the user's camera and microphone.
__RTCPeerConnection__ enables audio or video calling with facilities for encryption and bandwidth management.
__RTCDataChannel__ enables peer-to-peer communication of generic data.
[ascii camera](https://idevelop.ro/ascii-camera/)
* if one tab openend the webcam at a resolution the second has to do the smae
Signaling is used to exchange three types of information:

__Session control messages__: to initialize or close communication and report errors.
__Network configuration__: to the outside world, what's your computer's IP address and port?
__Media capabilities__: what codecs and resolutions can be handled by your browser and the browser it wants to communicate with?]

WebRTC needs four types of server-side functionality:

User discovery and communication
Signaling
NAT/firewall traversal
Relay servers in case peer-to-peer communication fails

most devices are behind NAT and firewalls so we need ICE to tell them (were the good guys) and make the best path for peer connection
if STUN UDP fails RTCPeer turn to TCP then Relay Server by TURN
In other words, a STUN server is used to get an external network address and TURN servers are used to relay traffic if direct (peer-to-peer) connection fails.
STUN make sure we get correct IP info, TURN sends all the data

signaling is not in WebRTC

Call addIceCandidate() as soon as candidates arrive.
RTCPeerConnection won't start gathering candidates until setLocalDescription() is called.

in Signaling USE HTTPS TLS and watch out with broadcasting

RTCDataChannel is a serverless websocket framework
its safe


### Web Vitals
__Largest Contentful Paint__ - measure the time it takes for content to visually render (paint) on a page
__First Input Display__ -first interacts with a page to the time when the browser is actually able to respond to that interaction
    * Break up Long Tasks
    * Optimize your page for interaction readiness
    * Use a web worker
        Comlink: A helper library that abstracts postMessage and makes it easier to use
        Workway: A general purpose web worker exporter
        Workerize: Move a module into a web worker
    * Reduce JavaScript execution time
        Defer unused JavaScript
        Minimize unused polyfills    
__Cumulative Layout Shift__ - how unstable a website is when the user is using it by constant shifting
    * Images without dimensions
        * judima deals with it by specifying the height and width anyway
        * if issues do this in css
```css
img {
    aspect-ratio: attr(width) / attr(height);
}

```
* we get this
```css
<img width="1000" height="1000"
       src="puppy-1000.jpg"
    srcset="puppy-1000.jpg 1000w,
            puppy-2000.jpg 2000w,
            puppy-3000.jpg 3000w"
           alt="Puppy with balloons"/>
```

* we get this
```css
<picture>
  <source media="(max-width: 799px)" srcset="puppy-480w-cropped.jpg">
  <source media="(min-width: 800px)" srcset="puppy-800w.jpg">
  <img src="puppy-800w.jpg" alt="Puppy with balloons">
</picture>
```
    * Ads, embeds, and iframes without dimensions
* Avoid placing ads near the top of the viewport #
    * Dynamically injected content
        make static space
    * Web Fonts causing FOIT/FOUT
        <link rel=preload> w/ font-display: optional
        Font Loading API 
    * animationes
        https://csstriggers.com/
        https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/
        transform animations to animations of properties that trigger layout changes.
    * Actions waiting for a network response before updating DOM    
75% of all website meets good, site is good
Always include width and height size attributes on your images and video elements.

#### Optimize Largest Contentful Paint


##### Slow server response times
    * __Time to First Byte (TTFB)__
    * route users to nearby CDN
    * carefu; when u cache
    * service worker
```html
<link rel="preconnect" href="https://example.com">
<link rel="dns-prefetch" href="https://example.com">
```
##### Render-blocking JavaScript and CSS
* HTML parser will pause if it encounters any external stylesheets (<link rel="stylesheet">) or synchronous JavaScript tags (<script src="main.js">).

Minify CSS
Defer non-critical CSS
Inline critical CSS
* libraries Critical, CriticalCSS, and Penthouse a
```html
<link rel="preload" href="stylesheet.css" as="style" onload="this.rel='stylesheet'">
```

MinifyJS
Optimize and compress images [Imagemin](https://web.dev/use-imagemin-to-compress-images)
Preload important resources
```js
<link rel="preload" as="script" href="script.js">
<link rel="preload" as="style" href="style.css">
<link rel="preload" as="image" href="img.png">
<link rel="preload" as="video" href="vid.webm" type="video/webm">
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
// chrome 73
<link
  rel="preload"
  as="image"
  href="wolf.jpg"
  imagesrcset="wolf_400px.jpg 400w, wolf_800px.jpg 800w, wolf_1600px.jpg 1600w"
  imagesizes="50vw"
>
```
Compress text files
    [Brotil](https://opensource.googleblog.com/2015/09/introducing-brotli-new-compression.html)
    all browsers work with gzip. brotil is mega-gzip
Deliver different assets based on network connection (adaptive serving)
    * Network Information, Device Memory, and HardwareConcurrency APIs.
    * navigator.connection.effectiveType: Effective connection type
    * navigator.connection.saveData: Data-saver enabled/disabled
    * navigator.hardwareConcurrency: CPU core count
    * navigator.deviceMemory: Device Memory    
```js

if (navigator.connection && navigator.connection.effectiveType) {
  if (navigator.connection.effectiveType === '4g') {
    // Load video
  } else {
    // Load image
  }
}

```
Cache assets using a service worker


##### Slow resource load times
##### Client-side rendering
The Timings section of the Performance panel  also preload by using a headless browser\

* defer analytics, 
* inline the code that needs to run early
* dont crete long tasks
* use sendBeacon() and requestIdleCallback()

