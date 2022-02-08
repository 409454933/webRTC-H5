/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

'use strict';


// const callButton = document.getElementById('callButton');
// const restartButton = document.getElementById('restartButton');
// const hangupButton = document.getElementById('hangupButton');
// callButton.disabled = true;
// hangupButton.disabled = true;
// restartButton.disabled = true;
// startButton.onclick = start;
// callButton.onclick = call;
// hangupButton.onclick = hangup;
// restartButton.onclick = restart;
let candidatePair = []
let startTime;
let localVideo;
let remoteVideo;
let remoteVideo1;


let localStream;
let localStream1;
let pc1;
let pc2;
let pc11;
let pc22;
const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1
};


function getName(pc) {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}
function getOtherPc1(pc) {
  return (pc === pc11) ? pc22 : pc11;
}

function gotStream(stream) {
  console.log('Received local stream');
  localVideo.srcObject = stream;
  localStream = stream;
  call()
}

function gotStream1(stream) {
  console.log('Received local stream');
  // console.log(pc2.getRemoteStreams())
  // remoteVideo = pc2.getRemoteStreams()[0]
  // remoteVideo1 = pc2.getRemoteStreams()[1]
  // localVideo.srcObject = stream;
  localStream1 = stream;
  call1(stream)
  // let track = stream.getVideoTracks()[0]
  // pc1.getTransceivers()[1].sender.replaceTrack(track)
  //     .then(function () {
  //         console.log('use replaceTrack to add stream ')
  //     })
  //     .catch(function (error) {
  //         console.log(error)
  //     })
}

function start() {
  console.log('Requesting local stream');
  localVideo = document.getElementById('local');
  remoteVideo = document.getElementById('remote');
  remoteVideo1 = document.getElementById('remoteVideo1');
  localVideo.addEventListener('loadedmetadata', function() {
    console.log(`Local video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
  });

  remoteVideo.addEventListener('loadedmetadata', function() {
    console.log(`Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
  });

  remoteVideo.onresize = () => {
    console.log(`Remote video size changed to ${remoteVideo.videoWidth}x${remoteVideo.videoHeight}`);
    // We'll use the first onsize callback as an indication that video has started
    // playing out.
    if (startTime) {
      const elapsedTime = window.performance.now() - startTime;
      console.log('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
      startTime = null;
      // Have run these functions again in order to get the getStats() reports
      // with type candidatePair and populate the candidate id
      // elements.
      checkStats(pc1);
      checkStats(pc2);
    }
  };
  navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false
      })
      .then(gotStream)
      .catch(e => alert(`getUserMedia() error: ${e}`));
}

function start1() {
  navigator.mediaDevices
      .getDisplayMedia()
      .then(gotStream1)
      .catch(e => alert(`getUserMedia() error: ${e}`));
}

// Simulate an ice restart.
function restart() {
  // restartButton.disabled = true;
  offerOptions.iceRestart = true;
  console.log(pc2.getTransceivers())
  console.log(pc2.getRemoteStreams())
  console.log('pc1 createOffer restart');
  pc1.createOffer(offerOptions).then(onCreateOfferSuccess, onCreateSessionDescriptionError);
}

function call() {
  // callButton.disabled = true;
  // hangupButton.disabled = false;
  console.log('Starting call');
  startTime = window.performance.now();
  const videoTracks = localStream.getVideoTracks();
  const audioTracks = localStream.getAudioTracks();
  if (videoTracks.length > 0) {
    console.log(`Using video device: ${videoTracks[0].label}`);
  }
  if (audioTracks.length > 0) {
    console.log(`Using audio device: ${audioTracks[0].label}`);
  }
  const servers = null;
  pc1 = window.pc1 = new RTCPeerConnection(servers);
  console.log('Created local peer connection object pc1');
  pc1.onicecandidate = e => onIceCandidate(pc1, e);
  pc2 = window.pc2 = new RTCPeerConnection(servers);
  console.log('Created remote peer connection object pc2');
  pc2.onicecandidate = e => onIceCandidate(pc2, e);
  pc1.oniceconnectionstatechange = e => {
    onIceStateChange(pc1, e);
    if (pc1 && pc1.iceConnectionState === 'connected') {
      // restartButton.disabled = false;
    }
  };
  pc2.oniceconnectionstatechange = e => onIceStateChange(pc2, e);
  pc2.ontrack = gotRemoteStream;

  localStream.getTracks().forEach(track => pc1.addTrack(track, localStream)
  );
  console.log('Added local stream to pc1');

  console.log('pc1 createOffer start');
  pc1.createOffer(offerOptions).then(onCreateOfferSuccess, onCreateSessionDescriptionError);
}

function call1(stream) {
    localStream1 = stream;
  // callButton.disabled = true;
  // hangupButton.disabled = false;
  console.log('Starting call');
  // startTime = window.performance.now();
  // const videoTracks = localStream.getVideoTracks();
  // const audioTracks = localStream.getAudioTracks();
  // if (videoTracks.length > 0) {
  //   console.log(`Using video device: ${videoTracks[0].label}`);
  // }
  // if (audioTracks.length > 0) {
  //   console.log(`Using audio device: ${audioTracks[0].label}`);
  // }
  const servers = null;
  pc11 = window.pc11 = new RTCPeerConnection(servers);
  // console.log('Created local peer connection object pc1');
  pc11.onicecandidate = e => onIceCandidate1(pc11, e);
  pc22 = window.pc22 = new RTCPeerConnection(servers);
  // console.log('Created remote peer connection object pc2');
  pc22.onicecandidate = e => onIceCandidate1(pc22, e);
  pc11.oniceconnectionstatechange = e => {
    onIceStateChange(pc11, e);
    if (pc11 && pc11.iceConnectionState === 'connected') {
      // restartButton.disabled = false;
    }
  };
  pc22.oniceconnectionstatechange = e => onIceStateChange(pc22, e);
  pc22.ontrack = gotRemoteStream1;

  localStream1.getTracks().forEach(track => pc11.addTrack(track, localStream1)
  );
  console.log('Added local stream to pc1');

  console.log('pc1 createOffer start');
  pc11.createOffer(offerOptions).then(onCreateOfferSuccess1, onCreateSessionDescriptionError);
}

function onCreateSessionDescriptionError(error) {
  console.log(`Failed to create session description: ${error.toString()}`);
}

function onCreateOfferSuccess(desc) {
  // console.log(`Offer from pc1\n${desc.sdp}`);
  console.log('pc1 setLocalDescription start');
  pc1.setLocalDescription(desc).then(() => onSetLocalSuccess(pc1), onSetSessionDescriptionError);
  console.log('pc2 setRemoteDescription start');
  pc2.setRemoteDescription(desc).then(() => onSetRemoteSuccess(pc2), onSetSessionDescriptionError);
  console.log('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  pc2.createAnswer().then(onCreateAnswerSuccess, onCreateSessionDescriptionError);
}

function onCreateOfferSuccess1(desc) {
  // console.log(`Offer from pc1\n${desc.sdp}`);
  // console.log('pc1 setLocalDescription start');
  pc11.setLocalDescription(desc).then(() => onSetLocalSuccess(pc11), onSetSessionDescriptionError);
  // console.log('pc2 setRemoteDescription start');
  pc22.setRemoteDescription(desc).then(() => onSetRemoteSuccess(pc22), onSetSessionDescriptionError);
  //console.log('pc2 createAnswer start');
  // Since the 'remote' side has no media stream we need
  // to pass in the right constraints in order for it to
  // accept the incoming offer of audio and video.
  pc22.createAnswer().then(onCreateAnswerSuccess1, onCreateSessionDescriptionError);
}

function onSetLocalSuccess(pc) {
  console.log(`${getName(pc)} setLocalDescription complete`);
}

function onSetRemoteSuccess(pc) {
  console.log(`${getName(pc)} setRemoteDescription complete`);
}

function onSetSessionDescriptionError(error) {
  console.log(`Failed to set session description: ${error.toString()}`);
}

function gotRemoteStream(e) {
  if (remoteVideo.srcObject !== e.streams[0]) {
    remoteVideo.srcObject = e.streams[0];
    console.log(e.streams[0])
    console.log('pc2 received remote stream');
  }
}

function gotRemoteStream1(e) {
  if (remoteVideo1.srcObject !== e.streams[0]) {
    remoteVideo1.srcObject = e.streams[0];
    //console.log(e.streams[0])
    console.log('pc22 received remote stream');
  }
}

function onCreateAnswerSuccess(desc) {
  //console.log(`Answer from pc2:\n${desc.sdp}`);
  console.log('pc2 setLocalDescription start');
  pc2.setLocalDescription(desc).then(() => onSetLocalSuccess(pc2), onSetSessionDescriptionError);
  console.log('pc1 setRemoteDescription start');
  pc1.setRemoteDescription(desc).then(() => onSetRemoteSuccess(pc1), onSetSessionDescriptionError);
}

function onCreateAnswerSuccess1(desc) {
  //console.log(`Answer from pc2:\n${desc.sdp}`);
  //console.log('pc2 setLocalDescription start');
  pc22.setLocalDescription(desc).then(() => onSetLocalSuccess(pc22), onSetSessionDescriptionError);
  //console.log('pc1 setRemoteDescription start');
  pc11.setRemoteDescription(desc).then(() => onSetRemoteSuccess(pc11), onSetSessionDescriptionError);
}

function onIceCandidate(pc, event) {
  getOtherPc(pc)
      .addIceCandidate(event.candidate)
      .then(() => onAddIceCandidateSuccess(pc), err => onAddIceCandidateError(pc, err));
  //console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
}

function onIceCandidate1(pc, event) {
  getOtherPc1(pc)
      .addIceCandidate(event.candidate)
      .then(() => onAddIceCandidateSuccess(pc), err => onAddIceCandidateError(pc, err));
  //console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
}

function onAddIceCandidateSuccess(pc) {
  console.log(`${getName(pc)} addIceCandidate success`);
}

function onAddIceCandidateError(pc, error) {
  //console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
    //console.log('ICE state change event: ', event);
    // TODO: get rid of this in favor of http://w3c.github.io/webrtc-pc/#widl-RTCIceTransport-onselectedcandidatepairchange
    if (pc.iceConnectionState === 'connected' ||
      pc.iceConnectionState === 'completed') {
      checkStats(pc);
    }
  }
}

function checkStats(pc) {
  pc.getStats(null).then(results => {
    // figure out the peer's ip
    let activeCandidatePair = null;
    let remoteCandidate = null;

    // Search for the candidate pair, spec-way first.
    results.forEach(report => {
      if (report.type === 'transport') {
        activeCandidatePair = results.get(report.selectedCandidatePairId);
      }
    });
    // Fallback for Firefox.
    if (!activeCandidatePair) {
      results.forEach(report => {
        if (report.type === 'candidate-pair' && report.state === 'succeeded' && report.selected) {
          activeCandidatePair = report;
        }
      });
    }
    if (activeCandidatePair && activeCandidatePair.remoteCandidateId) {
      results.forEach(report => {
        if (report.type === 'remote-candidate' && report.id === activeCandidatePair.remoteCandidateId) {
          remoteCandidate = report;
        }
      });
    }
    //console.log(remoteCandidate);
    if (remoteCandidate && remoteCandidate.id) {

        if(pc === pc1){
            console.log('localCandidateId' + remoteCandidate.id)
            candidatePair.push(remoteCandidate)
        }else{
            console.log('remoteCandidateId' + remoteCandidate.id)
            candidatePair.push(remoteCandidate)
        }
      // TODO: update a div showing the remote ip/port?
      // document.getElementById(pc === pc1 ? 'localCandidateId' : 'remoteCandidateId').textContent = remoteCandidate.id;
    }
  });
}

function hangup() {
  console.log('Ending call');
  pc11.close();
  pc22.close();
  pc11 = null;
  pc22 = null;
  // hangupButton.disabled = true;
  // restartButton.disabled = true;
  // callButton.disabled = false;
}

function Switch(constraints){
    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess, handleError);
}

function handleSuccess(stream) {
	localStream1 = stream;
    localVideo = document.getElementById('local');
    localVideo.srcObject = localStream1;
    let videoTrack = localStream1.getVideoTracks()[0];
    var sender = pc1.getSenders().find(function(s) {
    	console.log(s)
        return s.track.kind == videoTrack.kind;
    });
    console.log('found sender:', sender);
    sender.replaceTrack(videoTrack);
	stream.getVideoTracks()[0].addEventListener('ended', () => {
        errorMsg('The user has ended sharing the screen');
	});
}

function handleError(error) {
	console.log(`getDisplayMedia error: ${error.name}`, error);
}

function upgrade(res) {
  navigator.mediaDevices
      .getUserMedia(res)
      .then(stream => {
        // const videoTracks = stream.getVideoTracks();
        // if (videoTracks.length > 0) {
        //   console.log(`Using video device: ${videoTracks[0].label}`);
        // }
        // localStream.addTrack(videoTracks[0]);
        // localVideo.srcObject = null;
        // localVideo.srcObject = localStream;
        //pc1.addTrack(videoTracks[0], localStream);
        console.log(stream.getVideoTracks())
        localVideo.srcObject = stream;
        localStream = stream
        stream.getTracks().forEach(track => pc1.addTrack(track, stream))
        return pc1.createOffer();
      })
      .then(offer => pc1.setLocalDescription(offer))
      .then(() => pc2.setRemoteDescription(pc1.localDescription))
      .then(() => pc2.createAnswer())
      .then(answer => pc2.setLocalDescription(answer))
      .then(() => pc1.setRemoteDescription(pc2.localDescription));
}

function streamMuteSwitch(res){
    for(let i in localStream.getAudioTracks()){
        if(res){
            localStream.getAudioTracks()[i].enabled = true
            // localStream.getVideoTracks()[i].enabled = true
        }else{
            localStream.getAudioTracks()[i].enabled = false
            // localStream.getVideoTracks()[i].enabled = false
        }
    }
    console.log(localStream.getAudioTracks())
}
export default {
    start,
    start1,
    restart,
    candidatePair,
    Switch,
    upgrade,
    streamMuteSwitch,
    hangup,
}
