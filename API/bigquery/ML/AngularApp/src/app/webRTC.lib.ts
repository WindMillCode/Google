
export let webRTCVideoInit = (devObj) => {


    let {
        mediaStreamConstraints,
        offerOptions,
        startTime,
        localVideo,
        remoteVideo,
        startButton,
        callButton,
        hangupButton,
        localStream,
        remoteStream,
        localPeerConnection,
        remotePeerConnection,
    } = devObj

    function gotLocalMediaStream(mediaStream) {
        localVideo.srcObject = mediaStream;
        localStream = mediaStream;
        trace('Received local stream.');
        callButton.disabled = false;  // Enable call button.
    }

    // Handles error by logging a message to the console.
    function handleLocalMediaStreamError(error) {
        trace(`navigator.getUserMedia error: ${error.toString()}.`);
    }

    // Handles remote MediaStream success by adding it as the remoteVideo src.
    function gotRemoteMediaStream(event) {
        const mediaStream = event.stream;
        remoteVideo.srcObject = mediaStream;
        remoteStream = mediaStream;
        trace('Remote peer connection received remote stream.');
    }


    // Add behavior for video streams.

    // Logs a message with the id and size of a video element.
    function logVideoLoaded(event) {
        const video = event.target;
        trace(`${video.id} videoWidth: ${video.videoWidth}px, ` +
            `videoHeight: ${video.videoHeight}px.`);
    }

    // Logs a message with the id and size of a video element.
    // This event is fired when video begins streaming.
    function logResizedVideo(event) {
        logVideoLoaded(event);

        if (startTime) {
            const elapsedTime = window.performance.now() - startTime;
            startTime = null;
            trace(`Setup time: ${elapsedTime.toFixed(3)}ms.`);
        }
    }

    // Define RTC peer connection behavior.

    // Connects with new peer candidate.
    function handleConnection(event) {
        const peerConnection = event.target;
        const iceCandidate = event.candidate;

        if (iceCandidate) {
            const newIceCandidate = new RTCIceCandidate(iceCandidate);
            const otherPeer = getOtherPeer(peerConnection);

            otherPeer.addIceCandidate(newIceCandidate)
                .then(() => {
                    handleConnectionSuccess(peerConnection);
                }).catch((error) => {
                    handleConnectionFailure(peerConnection, error);
                });

            trace(`${getPeerName(peerConnection)} ICE candidate:\n` +
                `${event.candidate.candidate}.`);
        }
    }

    // Logs that the connection succeeded.
    function handleConnectionSuccess(peerConnection) {
        trace(`${getPeerName(peerConnection)} addIceCandidate success.`);
    };

    // Logs that the connection failed.
    function handleConnectionFailure(peerConnection, error) {
        trace(`${getPeerName(peerConnection)} failed to add ICE Candidate:\n` +
            `${error.toString()}.`);
    }

    // Logs changes to the connection state.
    function handleConnectionChange(event) {
        const peerConnection = event.target;
        console.log('ICE state change event: ', event);
        trace(`${getPeerName(peerConnection)} ICE state: ` +
            `${peerConnection.iceConnectionState}.`);
    }

    // Logs error when setting session description fails.
    function setSessionDescriptionError(error) {
        trace(`Failed to create session description: ${error.toString()}.`);
    }

    // Logs success when setting session description.
    function setDescriptionSuccess(peerConnection, functionName) {
        const peerName = getPeerName(peerConnection);
        trace(`${peerName} ${functionName} complete.`);
    }

    // Logs success when localDescription is set.
    function setLocalDescriptionSuccess(peerConnection) {
        setDescriptionSuccess(peerConnection, 'setLocalDescription');
    }

    // Logs success when remoteDescription is set.
    function setRemoteDescriptionSuccess(peerConnection) {
        setDescriptionSuccess(peerConnection, 'setRemoteDescription');
    }

    // Logs offer creation and sets peer connection session descriptions.
    function createdOffer(description) {
        trace(`Offer from localPeerConnection:\n${description.sdp}`);

        trace('localPeerConnection setLocalDescription start.');
        localPeerConnection.setLocalDescription(description)
            .then(() => {
                setLocalDescriptionSuccess(localPeerConnection);
            }).catch(setSessionDescriptionError);

        trace('remotePeerConnection setRemoteDescription start.');
        remotePeerConnection.setRemoteDescription(description)
            .then(() => {
                setRemoteDescriptionSuccess(remotePeerConnection);
            }).catch(setSessionDescriptionError);

        trace('remotePeerConnection createAnswer start.');
        remotePeerConnection.createAnswer()
            .then(createdAnswer)
            .catch(setSessionDescriptionError);
    }

    // Logs answer to offer creation and sets peer connection session descriptions.
    function createdAnswer(description) {
        trace(`Answer from remotePeerConnection:\n${description.sdp}.`);

        trace('remotePeerConnection setLocalDescription start.');
        remotePeerConnection.setLocalDescription(description)
            .then(() => {
                setLocalDescriptionSuccess(remotePeerConnection);
            }).catch(setSessionDescriptionError);

        trace('localPeerConnection setRemoteDescription start.');
        localPeerConnection.setRemoteDescription(description)
            .then(() => {
                setRemoteDescriptionSuccess(localPeerConnection);
            }).catch(setSessionDescriptionError);
    }


    // Handles start button action: creates local MediaStream.
    function startAction() {
        startButton.disabled = true;
        navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);
        trace('Requesting local stream.');
    }

    // Handles call button action: creates peer connection.
    function callAction() {
        callButton.disabled = true;
        hangupButton.disabled = false;

        trace('Starting call.');
        startTime = window.performance.now();

        // Get local media stream tracks.
        const videoTracks = localStream.getVideoTracks();
        const audioTracks = localStream.getAudioTracks();
        if (videoTracks.length > 0) {
            trace(`Using video device: ${videoTracks[0].label}.`);
        }
        if (audioTracks.length > 0) {
            trace(`Using audio device: ${audioTracks[0].label}.`);
        }

        const servers = null;  // Allows for RTC server configuration.

        // Create peer connections and add behavior.
        localPeerConnection = new RTCPeerConnection(servers);
        trace('Created local peer connection object localPeerConnection.');

        localPeerConnection.addEventListener('icecandidate', handleConnection);
        localPeerConnection.addEventListener(
            'iceconnectionstatechange', handleConnectionChange);

        remotePeerConnection = new RTCPeerConnection(servers);
        trace('Created remote peer connection object remotePeerConnection.');

        remotePeerConnection.addEventListener('icecandidate', handleConnection);
        remotePeerConnection.addEventListener(
            'iceconnectionstatechange', handleConnectionChange);
        remotePeerConnection.addEventListener('addstream', gotRemoteMediaStream);

        // Add local stream to connection and create offer to connect.
        localPeerConnection.addStream(localStream);
        trace('Added local stream to localPeerConnection.');

        trace('localPeerConnection createOffer start.');
        localPeerConnection.createOffer(offerOptions)
            .then(createdOffer).catch(setSessionDescriptionError);
    }

    // Handles hangup action: ends up call, closes connections and resets peers.
    function hangupAction() {
        localPeerConnection.close();
        remotePeerConnection.close();
        localPeerConnection = null;
        remotePeerConnection = null;
        hangupButton.disabled = true;
        callButton.disabled = false;
        trace('Ending call.');
    }


    // Define helper functions.

    // Gets the "other" peer connection.
    function getOtherPeer(peerConnection) {
        return (peerConnection === localPeerConnection) ?
            remotePeerConnection : localPeerConnection;
    }

    // Gets the name of a certain peer connection.
    function getPeerName(peerConnection) {
        return (peerConnection === localPeerConnection) ?
            'localPeerConnection' : 'remotePeerConnection';
    }

    // Logs an action (text) and the time when it happened on the console.
    function trace(text) {
        text = text.trim();
        const now = (window.performance.now() / 1000).toFixed(3);

        console.log(now, text);
    }

    return {
        gotLocalMediaStream,
        handleLocalMediaStreamError,
        gotRemoteMediaStream,
        logVideoLoaded,
        logResizedVideo,
        handleConnection,
        handleConnectionSuccess,
        handleConnectionFailure,
        handleConnectionChange,
        setSessionDescriptionError,
        setDescriptionSuccess,
        setLocalDescriptionSuccess,
        setRemoteDescriptionSuccess,
        createdOffer,
        createdAnswer,
        startAction,
        callAction,
        hangupAction,
        getOtherPeer,
        getPeerName,
        trace
    }

}

export let webRTCTextBoxInit = (devObj) => {


    let {
        localConnection,
        remoteConnection,
        sendChannel,
        receiveChannel,
        pcConstraint,
        dataConstraint,
        dataChannelSend,
        dataChannelReceive,
        startButton,
        sendButton,
        closeButton,
    } = devObj

    function enableStartButton() {
        startButton.disabled = false;
    }

    function disableSendButton() {
        sendButton.disabled = true;
    }

    function createConnection() {
        dataChannelSend.placeholder = '';
        var servers = null;
        pcConstraint = null;
        dataConstraint = null;
        trace('Using SCTP based data channels');
        // For SCTP, reliable and ordered delivery is true by default.
        // Add localConnection to global scope to make it visible
        // from the browser console.
        window.localConnection = localConnection =
            // new RTCPeerConnection(servers, pcConstraint);
            new RTCPeerConnection(servers);
        trace('Created local peer connection object localConnection');

        sendChannel = localConnection.createDataChannel('sendDataChannel',
            dataConstraint);
        trace('Created send data channel');

        localConnection.onicecandidate = iceCallback1;
        sendChannel.onopen = onSendChannelStateChange;
        sendChannel.onclose = onSendChannelStateChange;

        // Add remoteConnection to global scope to make it visible
        // from the browser console.
        window.remoteConnection = remoteConnection =
            // new RTCPeerConnection(servers, pcConstraint);
            new RTCPeerConnection(servers);
        trace('Created remote peer connection object remoteConnection');

        remoteConnection.onicecandidate = iceCallback2;
        remoteConnection.ondatachannel = receiveChannelCallback;

        localConnection.createOffer().then(
            gotDescription1,
            onCreateSessionDescriptionError
        );
        startButton.disabled = true;
        closeButton.disabled = false;
    }

    function onCreateSessionDescriptionError(error) {
        trace('Failed to create session description: ' + error.toString());
    }

    function sendData() {
        var data = dataChannelSend.value;
        sendChannel.send(data);
        trace('Sent Data: ' + data);
    }

    function closeDataChannels() {
        trace('Closing data channels');
        sendChannel.close();
        trace('Closed data channel with label: ' + sendChannel.label);
        receiveChannel.close();
        trace('Closed data channel with label: ' + receiveChannel.label);
        localConnection.close();
        remoteConnection.close();
        localConnection = null;
        remoteConnection = null;
        trace('Closed peer connections');
        startButton.disabled = false;
        sendButton.disabled = true;
        closeButton.disabled = true;
        dataChannelSend.value = '';
        dataChannelReceive.value = '';
        dataChannelSend.disabled = true;
        disableSendButton();
        enableStartButton();
    }

    function gotDescription1(desc) {
        localConnection.setLocalDescription(desc);
        trace('Offer from localConnection \n' + desc.sdp);
        remoteConnection.setRemoteDescription(desc);
        remoteConnection.createAnswer().then(
            gotDescription2,
            onCreateSessionDescriptionError
        );
    }

    function gotDescription2(desc) {
        remoteConnection.setLocalDescription(desc);
        trace('Answer from remoteConnection \n' + desc.sdp);
        localConnection.setRemoteDescription(desc);
    }

    function iceCallback1(event) {
        trace('local ice callback');
        if (event.candidate) {
            remoteConnection.addIceCandidate(
                event.candidate
            ).then(
                onAddIceCandidateSuccess,
                onAddIceCandidateError
            );
            trace('Local ICE candidate: \n' + event.candidate.candidate);
        }
    }

    function iceCallback2(event) {
        trace('remote ice callback');
        if (event.candidate) {
            localConnection.addIceCandidate(
                event.candidate
            ).then(
                onAddIceCandidateSuccess,
                onAddIceCandidateError
            );
            trace('Remote ICE candidate: \n ' + event.candidate.candidate);
        }
    }

    function onAddIceCandidateSuccess() {
        trace('AddIceCandidate success.');
    }

    function onAddIceCandidateError(error) {
        trace('Failed to add Ice Candidate: ' + error.toString());
    }

    function receiveChannelCallback(event) {
        trace('Receive Channel Callback');
        receiveChannel = event.channel;
        receiveChannel.onmessage = onReceiveMessageCallback;
        receiveChannel.onopen = onReceiveChannelStateChange;
        receiveChannel.onclose = onReceiveChannelStateChange;
    }

    function onReceiveMessageCallback(event) {
        trace('Received Message');
        dataChannelReceive.value = event.data;
    }

    function onSendChannelStateChange() {
        var readyState = sendChannel.readyState;
        trace('Send channel state is: ' + readyState);
        if (readyState === 'open') {
            dataChannelSend.disabled = false;
            dataChannelSend.focus();
            sendButton.disabled = false;
            closeButton.disabled = false;
        } else {
            dataChannelSend.disabled = true;
            sendButton.disabled = true;
            closeButton.disabled = true;
        }
    }

    function onReceiveChannelStateChange() {
        var readyState = receiveChannel.readyState;
        trace('Receive channel state is: ' + readyState);
    }

    function trace(text) {
        if (text[text.length - 1] === '\n') {
            text = text.substring(0, text.length - 1);
        }
        if (window.performance) {
            var now = (window.performance.now() / 1000).toFixed(3);
            console.log(now + ': ' + text);
        } else {
            console.log(text);
        }
    }


    return {
        enableStartButton,
        disableSendButton,
        createConnection,
        onCreateSessionDescriptionError,
        sendData,
        closeDataChannels,
        gotDescription1,
        gotDescription2,
        iceCallback1,
        iceCallback2,
        onAddIceCandidateSuccess,
        onAddIceCandidateError,
        receiveChannelCallback,
        onReceiveMessageCallback,
        onSendChannelStateChange,
        onReceiveChannelStateChange,
        trace
    }

}

export let webRTCPeerAndSignaling = (devObj) => {

    let {
        isChannelReady,
        isInitiator,
        isStarted,
        localStream,
        pc,
        remoteStream,
        turnReady,
        localVideo,
        remoteVideo,
        socket,
        pcConfig,
        sdpConstraints,
        room
    } = devObj

    function sendMessage(message) {
        console.log('Client sending message: ', message);
        socket.emit('message', message);
    }

    function gotStream(stream) {
        console.log('Adding local stream.');
        localStream = stream;
        localVideo.srcObject = stream;
        sendMessage('got user media');
        if (isInitiator) {
            maybeStart();
        }
    }

    function maybeStart() {
        console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
        if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
            console.log('>>>>>> creating peer connection');
            createPeerConnection();
            pc.addStream(localStream);
            isStarted = true;
            console.log('isInitiator', isInitiator);
            if (isInitiator) {
                doCall();
            }
        }
    }

    function createPeerConnection() {
        try {
            pc = new RTCPeerConnection(null);
            pc.onicecandidate = handleIceCandidate;
            pc.onaddstream = handleRemoteStreamAdded;
            pc.onremovestream = handleRemoteStreamRemoved;
            console.log('Created RTCPeerConnnection');
        } catch (e) {
            console.log('Failed to create PeerConnection, exception: ' + e.message);
            alert('Cannot create RTCPeerConnection object.');
            return;
        }
    }

    function handleIceCandidate(event) {
        console.log('icecandidate event: ', event);
        if (event.candidate) {
            sendMessage({
                type: 'candidate',
                label: event.candidate.sdpMLineIndex,
                id: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
        } else {
            console.log('End of candidates.');
        }
    }

    function handleCreateOfferError(event) {
        console.log('createOffer() error: ', event);
    }

    function doCall() {
        console.log('Sending offer to peer');
        pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
    }

    function doAnswer() {
        console.log('Sending answer to peer.');
        pc.createAnswer().then(
            setLocalAndSendMessage,
            onCreateSessionDescriptionError
        );
    }

    function setLocalAndSendMessage(sessionDescription) {
        pc.setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription);
    }

    function onCreateSessionDescriptionError(error) {
        trace('Failed to create session description: ' + error.toString());
    }

    function requestTurn(turnURL) {
        var turnExists = false;
        for (var i in pcConfig.iceServers) {
            if (pcConfig.iceServers[i].urls.substr(0, 5) === 'turn:') {
                turnExists = true;
                turnReady = true;
                break;
            }
        }
        if (!turnExists) {
            console.log('Getting TURN server from ', turnURL);
            // No TURN server. Get one from computeengineondemand.appspot.com:
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var turnServer = JSON.parse(xhr.responseText);
                    console.log('Got TURN server: ', turnServer);
                    pcConfig.iceServers.push({
                        'urls': 'turn:' + turnServer.username + '@' + turnServer.turn,
                        'credential': turnServer.password
                    });
                    turnReady = true;
                }
            };
            xhr.open('GET', turnURL, true);
            xhr.send();
        }
    }

    function handleRemoteStreamAdded(event) {
        console.log('Remote stream added.');
        remoteStream = event.stream;
        remoteVideo.srcObject = remoteStream;
    }

    function handleRemoteStreamRemoved(event) {
        console.log('Remote stream removed. Event: ', event);
    }

    function hangup() {
        console.log('Hanging up.');
        stop();
        sendMessage('bye');
    }

    function handleRemoteHangup() {
        console.log('Session terminated.');
        stop();
        isInitiator = false;
    }

    function stop() {
        isStarted = false;
        pc.close();
        pc = null;
    }

    function trace(text) {
        text = text.trim();
        const now = (window.performance.now() / 1000).toFixed(3);

        console.log(now, text);
    }

    return {
        sendMessage,
        gotStream,
        maybeStart,
        createPeerConnection,
        handleIceCandidate,
        handleCreateOfferError,
        doCall,
        doAnswer,
        setLocalAndSendMessage,
        onCreateSessionDescriptionError,
        requestTurn,
        handleRemoteStreamAdded,
        handleRemoteStreamRemoved,
        hangup,
        handleRemoteHangup,
        stop
    }
}

export let webRTCCamera = (devObj) => {
    let {
        roomURL,
        video,
        photo,
        photoContext,
        trail,
        snapBtn,
        sendBtn,
        snapAndSendBtn,
        photoContextW,
        photoContextH,
        isInitiator,
        room,
        peerConn,
        dataChannel,
        socket,
        adapter
    } = devObj

    /**
    * Send message to signaling server
    */
    function sendMessage(message) {
        console.log('Client sending message: ', message);
        socket.emit('message', message);
    }

    /**
    * Updates URL on the page so that users can copy&paste it to their peers.
    */
    function updateRoomURL(ipaddr) {
        var url;
        if (!ipaddr) {
            url = location.href;
        } else {
            url = location.protocol + '//' + ipaddr + ':2013/#' + room;
        }
        roomURL.innerHTML = url;
    }

    /****************************************************************************
    * User media (webcam)
    ****************************************************************************/

    function grabWebCamVideo() {
        console.log('Getting user media (video) ...');
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })
        .then(gotStream)
        .catch(function (e) {
            alert('getUserMedia() error: ' + e.name);
        });
    }

    function gotStream(stream) {
        console.log('getUserMedia video stream URL:', stream);
        window.stream = stream; // stream available to console
        video.srcObject = stream;
        video.onloadedmetadata = function () {
            photo.width = photoContextW = video.videoWidth;
            photo.height = photoContextH = video.videoHeight;
            console.log('gotStream with width and height:', photoContextW, photoContextH);
        };
        show(snapBtn);
    }

    function signalingMessageCallback(message) {
        if (message.type === 'offer') {
            console.log('Got offer. Sending answer to peer.');
            peerConn.setRemoteDescription(new RTCSessionDescription(message), function () { },
                logError);
            peerConn.createAnswer(onLocalSessionCreated, logError);

        } else if (message.type === 'answer') {
            console.log('Got answer.');
            peerConn.setRemoteDescription(new RTCSessionDescription(message), function () { },
                logError);

        } else if (message.type === 'candidate') {
            peerConn.addIceCandidate(new RTCIceCandidate({
                candidate: message.candidate,
                sdpMLineIndex: message.label,
                sdpMid: message.id
            }));

        }
    }

    function createPeerConnection(isInitiator, config) {
        console.log('Creating Peer connection as initiator?', isInitiator, 'config:',
            config);
        peerConn = new RTCPeerConnection(config);

        // send any ice candidates to the other peer
        peerConn.onicecandidate = function (event) {
            console.log('icecandidate event:', event);
            if (event.candidate) {
                sendMessage({
                    type: 'candidate',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate
                });
            } else {
                console.log('End of candidates.');
            }
        };

        if (isInitiator) {
            console.log('Creating Data Channel');
            dataChannel = peerConn.createDataChannel('photos');
            onDataChannelCreated(dataChannel);

            console.log('Creating an offer');
            peerConn.createOffer().then(function (offer) {
                return peerConn.setLocalDescription(offer);
            })
                .then(() => {
                    console.log('sending local desc:', peerConn.localDescription);
                    sendMessage(peerConn.localDescription);
                })
                .catch(logError);

        } else {
            peerConn.ondatachannel = function (event) {
                console.log('ondatachannel:', event.channel);
                dataChannel = event.channel;
                onDataChannelCreated(dataChannel);
            };
        }
    }

    function onLocalSessionCreated(desc) {
        console.log('local session created:', desc);
        peerConn.setLocalDescription(desc).then(function () {
            console.log('sending local desc:', peerConn.localDescription);
            sendMessage(peerConn.localDescription);
        }).catch(logError);
    }

    function onDataChannelCreated(channel) {
        console.log('onDataChannelCreated:', channel);

        channel.onopen = function () {
            console.log('CHANNEL opened!!!');
            sendBtn.disabled = false;
            snapAndSendBtn.disabled = false;
        };

        channel.onclose = function () {
            console.log('Channel closed.');
            sendBtn.disabled = true;
            snapAndSendBtn.disabled = true;
        }

        channel.onmessage = (adapter.browserDetails.browser === 'firefox') ?
            receiveDataFirefoxFactory() : receiveDataChromeFactory();
    }

    function receiveDataChromeFactory() {
        var buf, count;

        return function onmessage(event) {
            if (typeof event.data === 'string') {
                buf = window.buf = new Uint8ClampedArray(parseInt(event.data));
                count = 0;
                console.log('Expecting a total of ' + buf.byteLength + ' bytes');
                return;
            }

            var data = new Uint8ClampedArray(event.data);
            buf.set(data, count);

            count += data.byteLength;
            console.log('count: ' + count);

            if (count === buf.byteLength) {
                // we're done: all data chunks have been received
                console.log('Done. Rendering photo.');
                renderPhoto(buf);
            }
        };
    }

    function receiveDataFirefoxFactory() {
        var count, total, parts;

        return function onmessage(event) {
            if (typeof event.data === 'string') {
                total = parseInt(event.data);
                parts = [];
                count = 0;
                console.log('Expecting a total of ' + total + ' bytes');
                return;
            }

            parts.push(event.data);
            count += event.data.size;
            console.log('Got ' + event.data.size + ' byte(s), ' + (total - count) +
                ' to go.');

            if (count === total) {
                console.log('Assembling payload');
                var buf = new Uint8ClampedArray(total);
                var compose = function (i, pos) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        buf.set(new Uint8ClampedArray(this.result as any), pos);
                        if (i + 1 === parts.length) {
                            console.log('Done. Rendering photo.');
                            renderPhoto(buf);
                        } else {
                            compose(i + 1, pos + (this.result as any).byteLength);
                        }
                    };
                    reader.readAsArrayBuffer(parts[i]);
                };
                compose(0, 0);
            }
        };
    }


    /****************************************************************************
    * Aux functions, mostly UI-related
    ****************************************************************************/

    function snapPhoto() {
        photoContext.drawImage(video, 0, 0, photo.width, photo.height);
        show(photo, sendBtn);
    }

    function sendPhoto() {
        // Split data channel message in chunks of this byte length.
        var CHUNK_LEN = 64000;
        console.log('width and height ', photoContextW, photoContextH);
        var img = photoContext.getImageData(0, 0, photoContextW, photoContextH),
            len = img.data.byteLength,
            n = len / CHUNK_LEN | 0;

        console.log('Sending a total of ' + len + ' byte(s)');

        if (!dataChannel) {
            logError('Connection has not been initiated. ' +
                'Get two peers in the same room first');
            return;
        } else if (dataChannel.readyState === 'closed') {
            logError('Connection was lost. Peer closed the connection.');
            return;
        }

        dataChannel.send(len);

        // split the photo and send in chunks of about 64KB
        for (var i = 0; i < n; i++) {
            var start = i * CHUNK_LEN,
                end = (i + 1) * CHUNK_LEN;
            console.log(start + ' - ' + (end - 1));
            dataChannel.send(img.data.subarray(start, end));
        }

        // send the reminder, if any
        if (len % CHUNK_LEN) {
            console.log('last ' + len % CHUNK_LEN + ' byte(s)');
            dataChannel.send(img.data.subarray(n * CHUNK_LEN));
        }
    }

    function snapAndSend() {
        snapPhoto();
        sendPhoto();
    }

    function renderPhoto(data) {
        var canvas = document.createElement('canvas');
        canvas.width = photoContextW;
        canvas.height = photoContextH;
        canvas.style.filter = "contrast(100) sepia(.5) saturate(100) invert(1) blur(5px)"
        canvas.classList.add('incomingPhoto');
        // trail is the element holding the incoming images
        trail.insertBefore(canvas, trail.firstChild);

        var context = canvas.getContext('2d');
        var img = context.createImageData(photoContextW, photoContextH);
        img.data.set(data);
        context.putImageData(img, 0, 0);
    }

    function show(...args : any[    ]) {
        Array.prototype.forEach.call(arguments, function (elem) {
            elem.style.display = null;
        });
    }

    function hide() {
        Array.prototype.forEach.call(arguments, function (elem) {
            elem.style.display = 'none';
        });
    }

    function randomToken() {
        return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
    }

    function logError(err) {
        if (!err) return;
        if (typeof err === 'string') {
            console.warn(err);
        } else {
            console.warn(err.toString(), err);
        }
    }

    return {
        sendMessage,
        updateRoomURL,
        grabWebCamVideo,
        gotStream,
        signalingMessageCallback,
        createPeerConnection,
        onLocalSessionCreated,
        onDataChannelCreated,
        receiveDataChromeFactory,
        receiveDataFirefoxFactory,
        snapPhoto,
        sendPhoto,
        snapAndSend,
        renderPhoto,
        show,
        hide,
        randomToken,
        logError
    }
}
