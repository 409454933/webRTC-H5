webpackJsonp([3],{"2AKb":function(e,t){},KUdl:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),i={data:function(){return{datas:[{name:"UCM IP PBX",url:"/index"},{name:"音视频会议",url:""},{name:"IP电话",url:"/ipTelephone"},{name:"云管理",url:""},{name:"路由器",url:""},{name:"语音网关",url:""},{name:"门禁和对讲",url:""},{name:"耳机",url:""},{name:"摄像机",url:""}],index:0}},methods:{Jump:function(e,t){e&&this.$router.push(e),this.index=+t,localStorage.setItem("index",this.index)}},mounted:function(){this.index=localStorage.getItem("index")||0},components:{}},a={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"Head"},[r("img",{staticClass:"logo",attrs:{src:n("vEHt"),alt:""}}),e._v(" "),r("div",{staticClass:"classification"},e._l(e.datas,function(t,n){return r("div",{key:n,staticClass:"classification-list",on:{click:function(r){return e.Jump(t.url,n)}}},[e._v("\n            "+e._s(t.name)+"\n            "),n==e.index?r("div",{staticClass:"strip"}):e._e()])}),0),e._v(" "),r("img",{staticClass:"search",attrs:{src:n("YYX0"),alt:""}})])},staticRenderFns:[]};var o={name:"App",provide:function(){return{reload:this.reload}},data:function(){return{isRouterAlive:!0}},components:{headNavigation:n("VU/8")(i,a,!1,function(e){n("KUdl")},"data-v-e2b75ed4",null).exports},method:{reload:function(){this.isRouterAlive=!1,this.$nextTick(function(){this.isRouterAlive=!0})}}},s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var d=n("VU/8")(o,s,!1,function(e){n("2AKb")},null,null).exports,p=n("mtWM"),m=n.n(p),l=n("zL8q"),c=n.n(l),f=n("dAEq"),u=n.n(f),g=(n("sVYa"),n("tvR6"),n("lHA8")),h=n.n(g),v=n("c/Tr"),y=n.n(v),x=n("fZjL"),A=n.n(x),b={v:[{name:"version",reg:/^(\d*)$/}],o:[{name:"origin",reg:/^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,names:["username","sessionId","sessionVersion","netType","ipVer","address"],format:"%s %s %d %s IP%d %s"}],s:[{name:"name"}],i:[{name:"description"}],u:[{name:"uri"}],e:[{name:"email"}],p:[{name:"phone"}],z:[{name:"timezones"}],r:[{name:"repeats"}],t:[{name:"timing",reg:/^(\d*) (\d*)/,names:["start","stop"],format:"%d %d"}],c:[{name:"connection",reg:/^IN IP(\d) (\S*)/,names:["version","ip"],format:"IN IP%d %s"}],b:[{push:"bandwidth",reg:/^(TIAS|AS|CT|RR|RS):(\d*)/,names:["type","limit"],format:"%s:%s"}],m:[{reg:/^(\w*) (\d*) ([\w/]*)(?: (.*))?/,names:["type","port","protocol","payloads"],format:"%s %d %s %s"}],a:[{push:"rtp",reg:/^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,names:["payload","codec","rate","encoding"],format:function(e){return e.encoding?"rtpmap:%d %s/%s/%s":e.rate?"rtpmap:%d %s/%s":"rtpmap:%d %s"}},{push:"fmtp",reg:/^fmtp:(\d*) ([\S| ]*)/,names:["payload","config"],format:"fmtp:%d %s"},{name:"control",reg:/^control:(.*)/,format:"control:%s"},{name:"rtcp",reg:/^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,names:["port","netType","ipVer","address"],format:function(e){return null!=e.address?"rtcp:%d %s IP%d %s":"rtcp:%d"}},{push:"rtcpFbTrrInt",reg:/^rtcp-fb:(\*|\d*) trr-int (\d*)/,names:["payload","value"],format:"rtcp-fb:%d trr-int %d"},{push:"rtcpFb",reg:/^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,names:["payload","type","subtype"],format:function(e){return null!=e.subtype?"rtcp-fb:%s %s %s":"rtcp-fb:%s %s"}},{push:"ext",reg:/^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,names:["value","direction","encrypt-uri","uri","config"],format:function(e){return"extmap:%d"+(e.direction?"/%s":"%v")+(e["encrypt-uri"]?" %s":"%v")+" %s"+(e.config?" %s":"")}},{push:"crypto",reg:/^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,names:["id","suite","config","sessionConfig"],format:function(e){return null!=e.sessionConfig?"crypto:%d %s %s %s":"crypto:%d %s %s"}},{name:"setup",reg:/^setup:(\w*)/,format:"setup:%s"},{name:"connectionType",reg:/^connection:(new|existing)/,format:"connection:%s"},{name:"mid",reg:/^mid:([^\s]*)/,format:"mid:%s"},{name:"msid",reg:/^msid:(\S*) (\S*)/,names:["msid","trackid"],format:"msid:%s %s"},{name:"ptime",reg:/^ptime:(\d*)/,format:"ptime:%d"},{name:"maxptime",reg:/^maxptime:(\d*)/,format:"maxptime:%d"},{name:"direction",reg:/^(sendrecv|recvonly|sendonly|inactive)/},{name:"icelite",reg:/^(ice-lite)/},{name:"iceUfrag",reg:/^ice-ufrag:(\S*)/,format:"ice-ufrag:%s"},{name:"record",reg:/^record:(\S*)/,format:"record:%s"},{name:"icePwd",reg:/^ice-pwd:(\S*)/,format:"ice-pwd:%s"},{name:"fingerprint",reg:/^fingerprint:(\S*) (\S*)/,names:["type","hash"],format:"fingerprint:%s %s"},{push:"candidates",reg:/^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,names:["foundation","component","transport","priority","ip","port","type","raddr","rport","tcptype","generation","network-id","network-cost"],format:function(e){var t="candidate:%s %d %s %d %s %d typ %s";return t+=null!=e.raddr?" raddr %s rport %d":"%v%v",t+=null!=e.tcptype?" tcptype %s":"%v",null!=e.generation&&(t+=" generation %d"),t+=null!=e["network-id"]?" network-id %d":"%v",t+=null!=e["network-cost"]?" network-cost %d":"%v"}},{name:"endOfCandidates",reg:/^(end-of-candidates)/},{name:"remoteCandidates",reg:/^remote-candidates:(.*)/,format:"remote-candidates:%s"},{name:"iceOptions",reg:/^ice-options:(\S*)/,format:"ice-options:%s"},{push:"ssrcs",reg:/^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,names:["id","attribute","value"],format:function(e){var t="ssrc:%d";return null!=e.attribute&&(t+=" %s",null!=e.value&&(t+=":%s")),t}},{push:"ssrcGroups",reg:/^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,names:["semantics","ssrcs"],format:"ssrc-group:%s %s"},{push:"msidSemantics",reg:/^msid-semantic:\s?(\w*) (\S*)/,names:["semantic","token"],format:"msid-semantic: %s %s"},{push:"groups",reg:/^group:(\w*) (.*)/,names:["type","mids"],format:"group:%s %s"},{name:"rtcpMux",reg:/^(rtcp-mux)/},{name:"rtcpRsize",reg:/^(rtcp-rsize)/},{name:"sctpmap",reg:/^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,names:["sctpmapNumber","app","maxMessageSize"],format:function(e){return null!=e.maxMessageSize?"sctpmap:%s %s %s":"sctpmap:%s %s"}},{name:"xGoogleFlag",reg:/^x-google-flag:([^\s]*)/,format:"x-google-flag:%s"},{push:"rids",reg:/^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,names:["id","direction","params"],format:function(e){return e.params?"rid:%s %s %s":"rid:%s %s"}},{push:"imageattrs",reg:new RegExp("^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"),names:["pt","dir1","attrs1","dir2","attrs2"],format:function(e){return"imageattr:%s %s %s"+(e.dir2?" %s %s":"")}},{name:"simulcast",reg:new RegExp("^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"),names:["dir1","list1","dir2","list2"],format:function(e){return"simulcast:%s %s"+(e.dir2?" %s %s":"")}},{name:"simulcast_03",reg:/^simulcast:[\s\t]+([\S+\s\t]+)$/,names:["value"],format:"simulcast: %s"},{name:"framerate",reg:/^framerate:(\d+(?:$|\.\d+))/,format:"framerate:%s"},{name:"sourceFilter",reg:/^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,names:["filterMode","netType","addressTypes","destAddress","srcList"],format:"source-filter: %s %s %s %s %s"},{name:"bundleOnly",reg:/^(bundle-only)/},{name:"label",reg:/^label:(.+)/,format:"label:%s"},{name:"sctpPort",reg:/^sctp-port:(\d+)$/,format:"sctp-port:%s"},{name:"maxMessageSize",reg:/^max-message-size:(\d+)$/,format:"max-message-size:%s"},{name:"keywords",reg:/^keywds:(.+)$/,format:"keywds:%s"},{name:"content",reg:/^content:(.+)$/,format:"content:%s"},{name:"quality",reg:/^quality:(.+)$/,format:"quality:%s"},{push:"invalid",names:["value"]}]};A()(b).forEach(function(e){b[e].forEach(function(e){e.reg||(e.reg=/(.*)/),e.format||(e.format="%s")})});var w=/%[sdv%]/g;function S(e){return"[object Object]"===Object.prototype.toString.call(e)?"Object":"[object Array]"===Object.prototype.toString.call(e)?"Array":"nomal"}function C(e){if("nomal"===S(e))return e;var t="Object"===S(e)?{}:[];for(var n in e)e.hasOwnProperty(n)&&(t[n]=C(e[n]));return t}var I=function(e,t,n){var r=[e+"="+(t.format instanceof Function?t.format(t.push?n:n[t.name]):t.format)];if(t.names)for(var i=0;i<t.names.length;i+=1){var a=t.names[i];t.name?r.push(n[t.name][a]):r.push(n[t.names[i]])}else r.push(n[t.name]);return function(e){var t=1,n=arguments,r=n.length;return e.replace(w,function(e){if(t>=r)return e;var i=n[t];switch(t+=1,e){case"%%":return"%";case"%s":return String(i);case"%d":return Number(i);case"%v":return""}})}.apply(null,r)},P=["v","o","s","i","u","e","p","c","b","t","r","z","a"],V=["i","c","b","a"],R=function(e){return String(Number(e))===e?Number(e):e},M=function(e,t,n,r){if(r&&!n)t[r]=R(e[1]);else for(var i=0;i<n.length;i+=1)null!=e[i+1]&&(t[n[i]]=R(e[i+1]))},E=function(e,t,n){var r=e.name&&e.names;e.push&&!t[e.push]?t[e.push]=[]:r&&!t[e.name]&&(t[e.name]={});var i=e.push?{}:r?t[e.name]:t;M(n.match(e.reg),i,e.names,e.name),e.push&&t[e.push].push(i)},O=RegExp.prototype.test.bind(/^([a-z])=(.*)/),D=function(e,t){var n=t.split(/=(.+)/,2);return 2===n.length?e[n[0]]=R(n[1]):1===n.length&&t.length>1&&(e[n[0]]=void 0),e},B={midMap:[],msidMap:[],sessionVersion:0,resolutionToLevelIdcMap:{2160:"33",1080:"28",720:"1f",480:"1e",360:"16",272:"15"},levelIdcToReSolutionMap:{15:{width:480,height:272},16:{width:640,height:360},"1e":{width:848,height:480},"1f":{width:1280,height:720},28:{width:1920,height:1080},33:{width:3840,height:2160}},maxFsToResolutionMap:{520:{width:480,height:272},920:{width:640,height:360},1596:{width:848,height:480},3600:{width:848,height:480},8160:{width:848,height:480},32400:{width:3840,height:2160}},increaseSessionVersion:function(e){if(e&&e.origin){var t=e.origin.sessionVersion;t+=1,e.origin.sessionVersion=t}},writeSDP:function(e,t){t=t||{},null==e.version&&(e.version=0),null==e.name&&(e.name=" "),e.media.forEach(function(e){null==e.payloads&&(e.payloads="")});var n=t.outerOrder||P,r=t.innerOrder||V,i=[];return n.forEach(function(t){b[t].forEach(function(n){n.name in e&&null!=e[n.name]?i.push(I(t,n,e)):n.push in e&&null!=e[n.push]&&e[n.push].forEach(function(e){i.push(I(t,n,e))})})}),e.media.forEach(function(e){i.push(I("m",b.m[0],e)),r.forEach(function(t){b[t].forEach(function(n){n.name in e&&null!=e[n.name]?i.push(I(t,n,e)):n.push in e&&null!=e[n.push]&&e[n.push].forEach(function(e){i.push(I(t,n,e))})})})}),i.join("\r\n")+"\r\n"},parseSDP:function(e){var t={},n=[],r=t;return e.split(/(\r\n|\r|\n)/).filter(O).forEach(function(e){var t=e[0],i=e.slice(2);"m"===t&&(n.push({rtp:[],fmtp:[]}),r=n[n.length-1]);for(var a=0;a<(b[t]||[]).length;a+=1){var o=b[t][a];if(o.reg.test(i))return E(o,r,i)}}),t.media=n,this.sessionVersion<=0&&(this.sessionVersion=t.origin.sessionVersion),t},adjustMLineOrder:function(e,t){if(t){for(var n=[],r=0;r<e.media.length;r++){var i=e.media[r].content||e.media[r].type;for(var a in t)i===t[a]&&(n[a]=e.media[r])}n&&n.length&&(e.media=n)}else{for(var o=[],s=[],d=0;d<e.media.length;d++)"audio"===e.media[d].type?o.push(e.media[d]):s.push(e.media[d]);e.media=o.concat(s)}},setBundleMaxCompat:function(e){e.groups=[];for(var t=0;t<e.media.length;t++)e.groups.push({type:"BUNDLE",mids:e.media[t].mid})},setMediaContentType:function(e,t){if(e&&t){if(e.media&&e.media.length)for(var n=0;n<e.media.length;n++){var r=e.media[n];"video"!==r.type||r.content||(r.content=t.shift())}}else console.error("invalid error..")},modifyBundleGroups:function(e,t){e.groups=[],e.groups.mids=[];for(var n=0;n<e.media.length;n++){e.media[n].mid!==t&&e.groups.mids.push(e.media[n].mid)}e.groups.push({type:"BUNDLE",mids:e.groups.mids.join(" ")}),delete e.groups.mids},getMediaByType:function(e,t){if(e&&t){var n=void 0;if(e.media&&e.media.length)for(var r=0;r<e.media.length;r++){var i=e.media[r];if("video"===i.type&&i.content===t){n=i;break}}return n}console.error("invalid error..")},removeCodecByPayload:function(e,t,n){if(t>=e.media.length)console.log("Error index");else{for(var r=e.media[t],i=0;i<n.length;i+=1)for(var a=0;a<r.fmtp.length;a+=1)null!=r.fmtp[a].config.match("apt="+n[i])&&-1===n.indexOf(r.fmtp[a].payload)&&n.push(r.fmtp[a].payload);if(r.payloads&&r.payloads.split){for(var o=r.payloads.split(" "),s=0;s<n.length;s++)for(var d=0;d<o.length;d++)parseInt(n[s])===parseInt(o[d])&&(o.splice(d,1),d--);r.payloads=o.join(" ")}n.forEach(function(e){if(void 0!==r.rtp)for(var t=0;t<r.rtp.length;){if(r.rtp[t].payload===e){r.rtp.splice(t,1);break}t+=1}if(void 0!==r.fmtp)for(var n=0;n<r.fmtp.length;)r.fmtp[n].payload===e?r.fmtp.splice(n,1):n+=1;if(void 0!==r.rtcpFb)for(var i=0;i<r.rtcpFb.length;)r.rtcpFb[i].payload===e?r.rtcpFb.splice(i,1):i+=1}),"string"==typeof r.payloads&&(r.payloads=r.payloads.replace(/[ ]+/g," ").replace(/^\s*|\s*$/g,""))}},removeCodecByName:function(e,t,n,r){if(t>=e.media.length)console.log("Error index");else{var i=[],a=e.media[t],o=[];a.rtp.forEach(function(e){r?n.includes(e.codec)?o.push(e.payload):i.push(e.payload):n.forEach(function(t){e.codec===t&&i.push(e.payload)})}),o.map(function(e){a.fmtp.forEach(function(t){if(t.config.match("apt="+e)){var n=i.indexOf(t.payload);n>=0&&i.splice(n,1)}})}),this.removeCodecByPayload(e,t,i)}},removeInvalidCode:function(e){for(var t=this,n=B.parseSDP(e),r=!1,i=function(e){var i=n.media[e],a=[];if("video"===i.type){if(i.payloads&&i.payloads.split){var o=i.payloads.split(" ");if(i.fmtp&&i.fmtp.length)for(var s=0;s<i.fmtp.length;s++){var d=String(i.fmtp[s].payload),p=void 0;i.fmtp[s].config&&i.fmtp[s].config.match("apt=")&&(p=i.fmtp[s].config.split("=")[1]),(p&&o.indexOf(p)<0||o.indexOf(d)<0)&&(p&&(console.log("invalid apt payload: ",p),a.push(p)),a.push(d),console.log("invalid fmtp payload: ",d))}if(i.rtp&&i.rtp.length)for(var m=0;m<i.rtp.length;m++){var l=String(i.rtp[m].payload);o.indexOf(l)<0&&(console.log("invalid rtp payload: ",l),a.push(l))}if(i.rtcpFb&&i.rtcpFb.length)for(var c=0;c<i.rtcpFb.length;c++){var f=String(i.rtcpFb[c].payload);o.indexOf(f)<0&&(console.log("invalid rtcpFb payload: ",f),a.push(f))}}if(a.length){a=y()(new h.a(a));for(var u=0;u<a.length;u++)a[u]=parseInt(a[u]);console.log("Delete invalid payload ",a),t.removeCodecByPayload(n,e,a),r=!0}}},a=0;a<n.media.length;a++)i(a);return r&&(e=B.writeSDP(n)),e},getRTCRtpCapabilities:function(e,t){if(!e)return console.warn("no sdp"),null;if(!t||!t.length)return console.error("excludeList is not allowed to be empty"),null;var n={0:"PCMU",3:"GSM",4:"G723",5:"DVI4",6:"DVI4",7:"LPC",8:"PCMA",9:"G722",10:"L16",11:"L16",12:"QCELP",13:"CN",14:"MPA",15:"G728",16:"DVI4",17:"DVI4",18:"G729",25:"CelB",26:"JPEG",28:"nv",31:"H261",32:"MPV",33:"MP2T",34:"H263"},r={haveAudio:!1,haveVideo:!1},i=!1,a=B.parseSDP(e);if(a&&a.media&&a.media.length)for(var o=0;o<a.media.length;o++){var s=a.media[o];if("audio"===s.type){if(r.haveAudio=!0,r.audioCodecs||(r.audioCodecs=[]),s.rtp&&s.rtp.length)for(var d=0;d<s.rtp.length;d++){var p=s.rtp[d];!p.codec||t.includes(p.codec)||r.audioCodecs.includes(p.codec)||r.audioCodecs.push(p.codec)}if(s.payloads&&s.payloads.split){var m=s.payloads&&s.payloads.split(" ");m&&m.length&&(console.info("find static payloads"),m.forEach(function(e){e<96&&!r.audioCodecs.includes(n[e])&&r.audioCodecs.push(n[e])}))}}else if("video"===s.type&&!i){if(r.haveVideo=!0,r.videoCodecs||(r.videoCodecs=[]),s.rtp&&s.rtp.length)for(var l=0;l<s.rtp.length;l++){var c=s.rtp[l];!c.codec||t.includes(c.codec)||r.videoCodecs.includes(c.codec)||r.videoCodecs.push(c.codec)}i=!0}}return r},getCodecByName:function(e,t,n){if(!(t>=e.media.length)){var r=[];return e.media[t].rtp.forEach(function(e){n.forEach(function(t){e.codec===t&&r.push(e.payload)})}),r}console.log("Error index")},setH264Resolution:function(e,t,n){if(e&&n){var r=this.resolutionToLevelIdcMap[n]||"16",i=this.getCodecByName(e,t,["H264"]),a=e.media[t];if(a){var o=a.fmtp;if(o.length>0)for(var s=0;s<o.length;s++){var d=o[s].config.indexOf("profile-level-id");if(d>=0){var p=o[s].config.substr(d,21)+r;o[s].config=o[s].config.replace(/profile-level-id=([a-zA-Z0-9]{6})/,p)}else{var m=void 0;o[s].config.indexOf("apt=")>=0&&(m=parseInt(o[s].config.match("apt=[0-9]+")[0].split("=")[1])),(i.includes(o[s].payload)||i.includes(m))&&(o[s].config=o[s].config+";profile-level-id=42e0"+r)}}else console.info("profile-level-id fmtp filed has not been find")}else console.log("no media")}else console.warn("h264 res: Invalid argument!")},setVp8Resolution:function(e,t,n,r){if(e&&n&&r){var i=(parseInt(n,10)+15)/16,a=(parseInt(r,10)+15)/16,o=Math.floor(i)*Math.floor(a),s=this.getCodecByName(e,t,["VP8"]),d=e.media[t];if(d)for(var p=d.fmtp,m=0;m<p.length;m++){if(p[m].config.indexOf("max-fs")>=0){var l="max-fs="+o;p[m].config=p[m].config.replace(/max-fs=([a-zA-Z0-9]{3,5})/,l)}else{var c=void 0;p[m].config.indexOf("apt=")>=0&&(c=parseInt(p[m].config.match("apt=[0-9]+")[0].split("=")[1])),(s.includes(p[m].payload)||s.includes(c))&&(p[m].config=p[m].config+";max-fs="+o)}}else console.warn("no media found")}else console.warn("VP8 res: Invalid argument!")},setResolution:function(e,t,n,r){if(!e||!n||!r)return console.error("Invalid argument"),null;this.setH264Resolution(e,t,r),this.setVp8Resolution(e,t,n,r)},getH264Resolution:function(e,t){var n=void 0,r=void 0,i=e.media[t];if(i){for(var a=0;a<i.fmtp.length;a++){if(i.fmtp[a].config.indexOf("profile-level-id=")>=0){r=i.fmtp[a].config.match("profile-level-id=[a-zA-Z0-9]{6}")[0].split("=")[1].substr(4,2).toLocaleLowerCase();break}}n=this.levelIdcToReSolutionMap[r]||{width:640,height:360}}return n},getVp8Resolution:function(e,t){var n=void 0,r=void 0,i=e.media[t];if(i){for(var a=0;a<i.fmtp.length;a++){if(i.fmtp[a].config.indexOf("max-fs=")>=0){r=parseInt(i.fmtp[a].config.match("max-fs=[0-9]+")[0].split("=")[1]);break}}r=parseInt(r),n=this.maxFsToResolutionMap[r]||{width:640,height:360}}return n},getResolution:function(e,t,n){if(e&&(t||0===t)){var r=void 0;return"H264"===(n=n||this.getPriorityCodec(e,t))?r=this.getH264Resolution(e,t):"VP8"===n&&(r=this.getVp8Resolution(e,t)),r}console.error("Invalid argument")},getPriorityCodec:function(e,t){if(e){var n=e.media[t],r=void 0;if(n&&n.rtp&&n.rtp.length)for(var i=0;i<n.rtp.length;i++)if(n.rtp[i].codec&&"rtx"!==n.rtp[i].codec){r=n.rtp[i].codec;break}return r}console.warn("setFrameRate: Invalid argument!")},setFrameRate:function(e,t,n){if(e&&n){var r=e.media[t];if(r)if(r.framerate)r.framerate=n;else if(r.fmtp&&r.fmtp.length>0)for(var i=r.fmtp,a=0;a<i.length;a++){if(i[a].config.indexOf("max-fr")>=0){var o="max-fr="+n;i[a].config=i[a].config.replace(/max-fr=([a-zA-Z0-9]{1,2})/,o)}}}else console.warn("setFrameRate: Invalid argument!")},getFramerate:function(e,t){var n=e.media[t],r=null;if(n)if(n.framerate)r=n.framerate;else if(n.fmtp&&n.fmtp.length>0)for(var i=n.fmtp,a=0;a<i.length;a++){var o=i[a].config.indexOf("max-fr");if(o>=0){var s=i[a].config.substring(o+7),d=s.indexOf(";");d>=0&&(s=s.substring(0,d)),r=parseInt(s)}}return r},setMediaBandwidth:function(e,t,n){if(e&&n){var r={AS:n/1e3+192,TIAS:n},i=e.media[t];i&&(i.bandwidth&&i.bandwidth.length?i.bandwidth.forEach(function(e){e.limit=r[e.type]}):(i.bandwidth=[],A()(r).forEach(function(e){e&&i.bandwidth.push({type:e,limit:r[e]})})))}},setXgoogle:function(e,t,n){if("audio"!==e.type&&e.fmtp&&e.fmtp.length)for(var r=0;r<e.fmtp.length;r++)if(t.includes(e.fmtp[r].payload)){var i=e.fmtp[r].config;i=(i=(i=i.indexOf("x-google-min-bitrate=")>=0?i.replace(/x-google-min-bitrate=([a-zA-Z0-9]{1,8})/,"x-google-min-bitrate="+n):i+";x-google-min-bitrate="+n).indexOf("x-google-start-bitrate=")>=0?i.replace(/x-google-start-bitrate=([a-zA-Z0-9]{1,8})/,"x-google-start-bitrate="+n):i+";x-google-start-bitrate="+n).indexOf("x-google-max-bitrate=")>=0?i.replace(/x-google-max-bitrate=([a-zA-Z0-9]{1,8})/,"x-google-max-bitrate="+n):i+";x-google-max-bitrate="+n,e.fmtp[r].config=i}},setXgoogleBitrate:function(e,t,n){if(n||0===n){var r=this.getCodecByName(e,n,["H264"]),i=e.media[n];this.setXgoogle(i,r,t)}else for(var a=0;a<e.media.length;a++){var o=this.getCodecByName(e,a,["H264"]),s=e.media[a];this.setXgoogle(s,o,t)}},removeRembAndTransportCC:function(e,t){var n=function(e){if(e.rtcpFb&&e.rtcpFb.length)for(var t=0;t<e.rtcpFb.length;t++){var n=e.rtcpFb[t].type;n&&(n.indexOf("goog-remb")>=0||n.indexOf("transport-cc")>=0)&&(e.rtcpFb.splice(t,1),t--)}};if(void 0!==t)n(e.media[t]);else for(var r=0;r<e.media.length;r++)n(e.media[r])},addCandidate:function(e,t){if(e&&t){e.candidates&&e.candidates.length||(e.candidates=[]);for(var n=t[0],r=t.slice(2),i=0;i<(b[n]||[]).length;i+=1){var a=b[n][i];if(a.reg.test(r)){var o={};M(r.match(a.reg),o,a.names,a.name),o&&!o.value&&e.candidates.push(o)}}}},parseFmtpConfig:function(e){return e.split(/;\s?/).reduce(D,{})},parsePayloads:function(e){return e.toString().split(" ").map(Number)},parseRemoteCandidates:function(e){for(var t=[],n=e.split(" ").map(R),r=0;r<n.length;r+=3)t.push({component:n[r],ip:n[r+1],port:n[r+2]});return t},parseImageAttributes:function(e){return e.split(" ").map(function(e){return e.substring(1,e.length-1).split(",").reduce(D,{})})},parseSimulcastStreamList:function(e){return e.split(";").map(function(e){return e.split(",").map(function(e){var t=void 0,n=!1;return"~"!==e[0]?t=R(e):(t=R(e.substring(1,e.length)),n=!0),{scid:t,paused:n}})})},mergeSDP:function(e){for(var t=[],n=0;n<e.length;n+=1)t[n]=this.parseSDP(e[n]);for(var r=0,i=0;i<e.length;i+=1)for(var a=0;a<t[i].media.length;a+=1){var o={};o.msid=t[i].media[a].msid,o.mid=t[i].media[a].mid,o.mappedMID=r,this.midMap.push(o),"string"==typeof t[i].groups[0].mids?t[i].groups[0].mids=t[i].groups[0].mids.replace(t[i].media[a].mid,r):"number"==typeof t[i].groups[0].mids?t[i].groups[0].mids=r:console.log("ERROR on Process mid mapping"),t[i].media[a].mid=r,r+=1}void 0===t[0].groups&&(t[0].groups=[]),void 0===t[0].msidSemantics&&(t[0].msidSemantics=[]);for(var s=function(e){console.log("Session "+e+"th:\n"+t[e]),void 0!==t[e].fingerprint&&(t[e].media.forEach(function(n){n.fingerprint=C(t[e].fingerprint)}),delete t[e].fingerprint),void 0!==t[e].groups&&e>0&&t[e].groups.forEach(function(e){t[0].groups.push(C(e))}),void 0!==t[e].msidSemantics&&e>0&&t[e].msidSemantics.forEach(function(e){t[0].msidSemantics.push(C(e))})},d=0;d<e.length;d+=1)s(d);for(var p=0;p<e.length;p+=1)void 0!==t[p].media&&p>0&&t[p].media.forEach(function(e){t[0].media.push(C(e))});return this.writeSDP(t[0])},splitSDP:function(e){var t=this,n=[],r=this.parseSDP(e);if(void 0===r.groups){console.log("No GROUP information, need to split m lines to each pc"),r.groups=[],this.midMap=[];for(var i=0;i<r.media.length;i+=1){r.groups.push({type:"BUNDLE",mids:r.media[i].mid});var a={};a.msid=r.media[i].msid,a.mid=0,a.mappedMID=r.media[i].mid,this.midMap.push(a)}}for(var o=function(e){var i,a=C(r);a.groups=new Array(a.groups[e]),void 0!==a.msidSemantics?a.msidSemantics=new Array(a.msidSemantics[e]):delete a.msidSemantics;var o=[];if("number"==typeof a.groups[e].mids){for(var s=0;s<a.media.length;s+=1)if(a.media[s].mid===a.groups[e].mids){o.push(a.media[s]);break}}else"string"==typeof a.groups[e].mids&&a.groups[0].mids.split(" ").forEach(function(e){for(var t=0;t<a.media.length;t+=1)if(a.media[t].mid===e){o.push(a.media[t]);break}});a.media=o;for(var d=0;d<a.media.length;d+=1)for(var p=0;p<t.midMap.length;p+=1)if(a.media[d].mid===t.midMap[p].mappedMID){a.media[d].mid=t.midMap[p].mid,"string"==typeof a.groups[0].mids?a.groups[0].mids=a.groups[0].mids.replace(a.media[d].mid,t.midMap[p].mid):"number"==typeof a.groups[0].mids?a.groups[0].mids=t.midMap[p].mid:console.log("ERROR on Process mid mapping");break}i=t.writeSDP(a),n.push(i)},s=0;s<r.groups.length;s+=1)o(s);return n}},F=B,G=n("/ocq");r.default.use(G.a);var Z=new G.a({routes:[{path:"/",redirect:"/index"},{path:"/index",component:function(e){return n.e(0).then(function(){var t=[n("Q5sX")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"/index1",component:function(e){return n.e(1).then(function(){var t=[n("OwUT")];e.apply(null,t)}.bind(this)).catch(n.oe)}},{path:"*",redirect:"/404"}]});r.default.use(u.a,{ak:"UNdhyZsv9nE51VuEGyesyxbkGY7VBhmZ"}),r.default.use(c.a,{size:"small"}),r.default.config.productionTip=!1,r.default.prototype.$axios=m.a,r.default.prototype.$sdp_tools=F,new r.default({router:Z,render:function(e){return e(d)}}).$mount("#app")},YYX0:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABH9JREFUaEPtmF1oHFUUx//nzhg1aVLT0iKpCK02Fb9eTEXBh6xaP5LsrqJsMlvpzj7aFqw+1AexaKWCfZD60fgk3S00myyKbjYJaq3bBx+CJVCQComVipSgLSpNk6rNzhyZ3Z0mLdmdO7PZbBZyYZ7m3HPP75xzz733EGp8UI3bjxWAakdwJQI1H4Fk8kzdv3zOZxhmgAj3AtwCwPqsMQnQJDN+UhQxeAttzIRC911dTGjPKXQkOXw7GeY+MG9ncJOMUQSaAtExVsT+aKjzd5k5TjKuAUZGRm6+eMl4g5lfY3CD0wIL/SfQDBG9v261cqCjo+M/LzrsOa4A8l43vmDmR+YvSoQJkPiSiI6D6bdbRf2k9f8f80oLiO9k5m1g8zlmtF4/j0ZZUZ4vJxrSAPG+1IMMDDNwxxw9jQlg745w4DsZLx7tG3zcBA4y+KF5HjyvqmrHS6HOH2V03CgjBZDzfDZ7yjaeiLIA7Yn0dPUSEbtZmJkp3j+0E+BDzKxacwk4z6q61UskHAGsnL9wKXvSThsC/U2KeCHS3ZVxY/iNsvGBIR8b5ucMbs5BEI2uX622u90TjgDxRHq/yeabhUWyJMRT5Rpvw+QgTPMbOxKCxDsRzb/PjWNKAuRTxzhrVxsisVvX/IfdLOAkG0ukdzGbH+dTiWZYVe52k0olAWKJdC+z+XJB+VhE8291m/NOALk9kUifsjc2kfhE1/w7neY5llHrhL2S/eWifUgpoCdkq43s4racVZ0M8ImCo6bq1bvWyZ7YRSNwdGDoacMwviosMh4NB+9xa5gb+VgiNW6fE4qiPLOju+trmflFAY70DR4GOBdKEuKg3uN/XUahV5lYf/o9Ns29+fnUGw0HdsnoKgoQSwxmmLndUiIUZVuku+tbGYVeZeIDQ0+ahnG8UO1O6lrAJ6OrBMBcSIVQt0R6OidkFHqVifcPt5pmdjwPgAldC26R0VUK4DIzVllKGtSmxlDINy2j0KtMMplZNZOdulwAmNa1YKOMLimANQ1rm4LBx3LKKzVSqe8b/5r5c6pQiWb0cCDnPKexTFOIzulaYJOT8XnYIqPKm3hU1wKPlgVQzTJKRB/qWuCVsgCqeZARKUFd6xosC6BqVwnCdHP92hbZorHsLnMAPoiGg3tkvF9yE1s/l+I6He9P7TZNfFQweBZU1xrVnv11UQAsJUv5oAHh7agWfEvWeMcIWAJL9qQETt/fuuHhtra22UUFmEulyj3qcwYTJgWpPrd3Lsc3se2NSrVVrvO2BwhpgGuRWKCxBWCchEi5bmwBp5mwHnytl+o6Eq4A7D1RbmsRwCwI7z6wecOBM2f/2GhyNuMVwjWAHXJPzV3CNDM+BdUdml8qc28BjxCeAWyQYu11BgkCXwDI6kL/AIgTzfW3ZYqdsF4hygZwU/KcZItB1N0k2re/6P95ofnLCiB3cC6QTgQa08OBtpoAWAjC6sfq4cCamgGwDD32WXrz7FVOANhE4Fcj4WC8pgCc9ov9f9ntAVnDVwDceqpS8ispVCnPyur9H+9OiE9ZA+Q5AAAAAElFTkSuQmCC"},tvR6:function(e,t){},vEHt:function(e,t){e.exports="data:image/png;base64,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"}},["NHnr"]);