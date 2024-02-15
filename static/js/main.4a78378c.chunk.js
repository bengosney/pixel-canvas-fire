(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,i){},15:function(e,t,i){},16:function(e,t,i){"use strict";i.r(t);var a=i(0),n=i.n(a),r=i(3),s=i.n(r),o=(i(14),i(4)),h=i(5),l=i(7),c=i(6),u=i(8),f=i(1),d=(i(15),function(e){function t(e){var i;return Object(o.a)(this,t),(i=Object(l.a)(this,Object(c.a)(t).call(this,e))).state={pixelSize:10,height:500,width:150},i.drawing=!1,i.fireState=[],i.ctx=null,i.pallet=["#070707","#1f0707","#2f0f07","#470f07","#571707","#671f07","#771f07","#8f2707","#9f2f07","#af3f07","#bf4707","#c74707","#DF4F07","#DF5707","#DF5707","#D75F07","#D7670F","#cf6f0f","#cf770f","#cf7f0f","#CF8717","#C78717","#C78F17","#C7971F","#BF9F1F","#BF9F1F","#BFA727","#BFA727","#BFAF2F","#B7AF2F","#B7B72F","#B7B737","#CFCF6F","#DFDF9F","#EFEFC7","#FFFFFF"],i.max=i.pallet.length-1,i.updateWindowDimensions=i.updateWindowDimensions.bind(Object(f.a)(Object(f.a)(i))),i}return Object(u.a)(t,e),Object(h.a)(t,[{key:"emptyFireState",value:function(){var e=this.getWidth(),t=this.getHeight();console.log("height",t);var i=Array(t).fill().map(function(){return Array(e).fill(0)});return i[0]=Array(e).fill(this.max),i}},{key:"componentDidMount",value:function(){var e=this,t=this.refs.canvas;this.ctx=t.getContext("2d"),this.fireState=this.emptyFireState(),this.rAF=requestAnimationFrame(function(){return e.updateAnimationState()}),this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"updateWindowDimensions",value:function(){var e=this,t=this.state.pixelsPerRow;this.setState({width:window.innerWidth,height:window.innerHeight,pixelSize:Math.ceil(window.innerWidth/t)},function(){return e.fireState=e.emptyFireState()})}},{key:"componentWillUnmount",value:function(){cancelAnimationFrame(this.rAF),window.removeEventListener("resize",this.updateWindowDimensions)}},{key:"updateAnimationState",value:function(){var e=this;this.updateFire(),this.rAF=requestAnimationFrame(function(){return e.updateAnimationState()})}},{key:"resetFire",value:function(){this.fireState=this.emptyFireState()}},{key:"getWidth",value:function(){var e=this.state.width,t=this.getPixelSize();return Math.ceil(e/t)}},{key:"getHeight",value:function(){var e=this.state.height,t=this.getPixelSize();return Math.max(1,Math.ceil(e/t))}},{key:"getPixelSize",value:function(){var e=this.state.pixelSize;return Math.max(1,e)||10}},{key:"updateFire",value:function(){for(var e=this.getWidth(),t=this.getHeight(),i=this.emptyFireState(),a=0;a<e;a++)for(var n=0;n<t-1;n++){var r=3&Math.round(3*Math.random()),s=n,o=Math.min(a+0,e),h=Math.max(n+1,0),l=Math.min(Math.max(a,0),e);try{var c=this.fireState[s][o];i[h][l]=Math.max(0,c-(1&r))}catch(u){}}this.fireState=i,this.drawFire()}},{key:"drawFire",value:function(){var e=this.getWidth(),t=this.getHeight(),i=this.getPixelSize(),a=this.ctx;a.fillStyle=this.pallet[0],a.fillRect(0,0,e*i,t*i);for(var n=0;n<e;n++)for(var r=0;r<t;r++){var s=t-r-1,o=n;try{if(0!==this.fireState[s][o]){var h=this.fireState[s][o]||0;a.fillStyle=this.pallet[h],a.fillRect(n*i,r*i,i,i)}}catch(l){}}}},{key:"changePixelSize",value:function(e){var t=parseInt(e.target.value);t&&(console.log("set pixelSize",t),this.setState({pixelSize:t}),this.resetFire())}},{key:"render",value:function(){var e=this,t=this.state,i=t.width,a=t.height,r=t.pixelSize;return n.a.createElement("div",null,n.a.createElement("div",{className:"controls"},n.a.createElement("label",{for:"pixelsize"},"Pixel Size"),n.a.createElement("input",{id:"pixelsize",type:"number",min:"1",max:"100",value:r||10,onChange:function(t){return e.changePixelSize(t)}})),n.a.createElement("div",{className:"canvasWrapper"},n.a.createElement("canvas",{ref:"canvas",width:i,height:a})))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,i){e.exports=i(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.4a78378c.chunk.js.map