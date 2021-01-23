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