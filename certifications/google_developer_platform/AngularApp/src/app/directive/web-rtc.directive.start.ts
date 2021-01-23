import { Directive, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewContainerRef, ViewRef, EmbeddedViewRef, ViewChildren } from '@angular/core';
import { RyberService } from '../ryber.service'
import { fromEvent, from, Subscription, Subscriber, of, combineLatest } from 'rxjs';
import { deltaNode, eventDispatcher, numberParse, objectCopy } from '../customExports'
import { catchError, delay,first } from 'rxjs/operators'
import { environment as env } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import needed items
import {webRTCVideoInit,webRTCTextBoxInit,webRTCPeerAndSignaling,webRTCCamera} from '../webRTC.lib'
import * as socketFn from 'socket.io-client';
//

@Directive({
    selector: '[appWebRTC]'
})
export class WebRTCDirective {

    @Input() webRTC: any;
    extras: any;
    zChildren: any;
    agGrid:any = {
        zSymbol:""
    }

    constructor(
        private el: ElementRef,
        private http: HttpClient,
        private renderer2: Renderer2,
        private ryber: RyberService
    ) { }


    @HostListener('click') onClick() {


        if (this.extras?.confirm === 'true') {




            //communicate with the python backend
            this.http.post(
                "http://localhost:3005",
                {},
                {
                    responseType: 'text',
                }
            )
            .subscribe({


                error: (error) => {


                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                },
                next: (result: any) => {



                    eventDispatcher({
                        event: 'resize',
                        element: window
                    })
                }

            })
            //

        }

    }

    ngOnInit() {
        this.extras = this.webRTC
        if (this.extras?.confirm === 'true') {


            // add the adapter shim
            let {scripts} =this.ryber.appCO0.metadata

            scripts =  scripts .filter((x:any,i)=>{
                return x.name === "webRTC Adapter"
            })

            //

            combineLatest([
                // load event fires once however the rxjs helps this method fire
                ...Array.from(scripts,(x:any,i)=>{return fromEvent(x.element,"load")}),
                this.ryber[this.extras.co.valueOf()].metadata.zChildrenSubject
            ])
            .pipe(first())
            .subscribe((result) => {

                // console.log(result)
                // setup for all elements involved in the lab
                this.zChildren = this.ryber[this.extras.co.valueOf()].metadata.zChildren
                Object.entries(this.zChildren)
                .forEach((x:any,i)=>{
                    if(x[1]?.extras?.appWebRTC?.confirm === "pickup"){
                        this.extras[x[1].extras.appWebRTC.webRTC.item] = x[0]
                    }
                })

                //


                // self to self mediaStream

                //

                // rtcDatChannel

                //

                // camera app w/ signaling backend

                //


            })

        }
    }

    private cameraSocketSession(devObj) {
        let {updateRoomURL,socket, isInitiator, grabWebCamVideo, createPeerConnection, configuration, signalingMessageCallback, sendBtn, snapAndSendBtn} = devObj
        socket.on('ipaddr', function (ipaddr) {
            console.log('Server IP address is: ' + ipaddr);
            updateRoomURL(ipaddr);
        });

        socket.on('created', function (room, clientId) {
            console.log('Created room', room, '- my client ID is', clientId);
            isInitiator = true;
            grabWebCamVideo();
        });

        socket.on('joined', function (room, clientId) {
            console.log('This peer has joined room', room, 'with client ID', clientId);
            isInitiator = false;
            createPeerConnection(isInitiator, configuration);
            grabWebCamVideo();
        });

        socket.on('full', function (room) {
            alert('Room ' + room + ' is full. We will create a new room for you.');
            window.location.hash = '';
            window.location.reload();
        });

        socket.on('ready', function () {
            console.log('Socket is ready');
            createPeerConnection(isInitiator, configuration);
        });

        socket.on('log', function (array) {
            console.log.apply(console, array);
        });

        socket.on('message', function (message) {
            console.log('Client received message:', message);
            signalingMessageCallback(message);
        });

        // Leaving rooms and disconnecting from peers.
        socket.on('disconnect', function (reason) {
            console.log(`Disconnected: ${reason}.`);
            sendBtn.disabled = true;
            snapAndSendBtn.disabled = true;
        });

        socket.on('bye', function (room) {
            console.log(`Peer leaving room ${room}.`);
            sendBtn.disabled = true;
            snapAndSendBtn.disabled = true;
            // If peer did not create the room, re-enter to be creator.
            if (!isInitiator) {
                window.location.reload();
            }
        });
        return isInitiator;
    }

    // challenge setup RTC and Peer with the code in this section
    private rtcPeerSocketSession(devObj) {

        if(false){

            let isChannelReady = false;
            let isInitiator = false;
            let isStarted = false;
            let localStream;
            let pc;
            let remoteStream;
            let turnReady;
            let pcConfig = {
                'iceServers': [{
                    'urls': 'stun:stun.l.google.com:19302'
                }]
            };
            let sdpConstraints = {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            };
            let room = 'foo';
            let constraints = {
                video: true
            };

            let localVideo = this.el.nativeElement;
            let remoteVideo = this.zChildren[this.extras.remoteVideo].element;

            //initalize the client socket
            let socketFn = require ('socket.io-client')
            let {io} = socketFn("http://localhost:8080/")
            let socket = io.connect();
            //


            let  {gotStream,requestTurn,sendMessage,maybeStart,doAnswer,handleRemoteHangup} =  webRTCPeerAndSignaling({
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
            });

            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true
            })
            .then(gotStream)
            .catch(function (e) {
                alert('getUserMedia() error: ' + e.name);
            });

            if (location.hostname !== 'localhost') {
                requestTurn(
                    'https://computeengineondemand.appspot.com/turn?username=41784574&key=4080218913'
                );
            }

            fromEvent(window,"beforeunload")
            .subscribe(()=>{
                sendMessage('bye');
            });


            // ({ isInitiator, isChannelReady } = this.socketSession({room, socket, isInitiator, isChannelReady, isStarted, pc,maybeStart,doAnswer,handleRemoteHangup}));

        }

        let {room, socket, isInitiator, isChannelReady, isStarted, pc,maybeStart,doAnswer,handleRemoteHangup} = devObj
        if (room !== '') {
            socket.emit('create or join', room);
            console.log('Attempted to create or  join room', room);
        }

        socket.on('created', function (room) {
            console.log('Created room ' + room);
            isInitiator = true;
        });

        socket.on('full', function (room) {
            console.log('Room ' + room + ' is full');
        });

        socket.on('join', function (room) {
            console.log('Another peer made a request to join room ' + room);
            console.log('This peer is the initiator of room ' + room + '!');
            isChannelReady = true;
        });

        socket.on('joined', function (room) {
            console.log('joined: ' + room);
            isChannelReady = true;
        });

        socket.on('log', function (array) {
            console.log.apply(console, array);
        });

        socket.on('message', function (message) {
            console.log('Client received message:', message);
            if (message === 'got user media') {
                maybeStart();
            } else if (message.type === 'offer') {
                if (!isInitiator && !isStarted) {
                    maybeStart();
                }
                pc.setRemoteDescription(new RTCSessionDescription(message));
                doAnswer();
            } else if (message.type === 'answer' && isStarted) {
                pc.setRemoteDescription(new RTCSessionDescription(message));
            } else if (message.type === 'candidate' && isStarted) {
                let candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate
                });
                pc.addIceCandidate(candidate);
            } else if (message === 'bye' && isStarted) {
                handleRemoteHangup();
            }
        });
        return { isInitiator, isChannelReady };
    }
    //

                //     // stop the recoding
                //     console.log(localStream.getVideoTracks())
                //     // localStream.getVideoTracks()[0].stop()




    ngOnDestroy() {
        if (this.extras?.confirm === 'true') {
            Object.values(this)
                .forEach((x: any, i) => {
                    if (x instanceof Subscriber) {
                        x.unsubscribe?.()
                    }

                })
        }
    }
}

