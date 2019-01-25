var el={},audio_player,audio_meta={};
EndDOM(init);
function init(){
	var frm=document.createElement("div");
	frm.innerHTML='<iframe class="lib-svg" src="https://chiptune-db.tistory.com/?init"></iframe>';
	frm=frm.firstChild;
	document.body.appendChild(frm);

	addEventListener("message",msg);
	function msg(e){
		var d=e.data;
		if(d[0]=="init-cdn"){
			mod.dom.var(el);
			removeEventListener("message",msg);
			frm.remove();

			el["lib-svg"].innerHTML=d[1];

			mod.chiptune.config.html_control=d[3];

			var a=document.createElement("script");
			a.textContent=d[2];
			document.head.appendChild(a);

			mod.chiptune.config.url_worker=URL.createObjectURL(d[4]);
			mod.chiptune.config.url_libopenmpt=d[5];
			mod.chiptune.config.url_libopenmpt_wasm=URL.createObjectURL(d[6]);

			audio_player=mod.chiptune_control.new(".chip-control");
			audio_player.onplay=function(){
				state_play(audio_meta.url,audio_meta.native);
			};
			audio_player.onstop=state_stop;
		}
	}
}
function t_toHref(a){
	return a.toLowerCase().replace(/[^a-z0-9_\s]/g,"").replace(/[\s-]+/g,"-").replace(/^[\s\W]+|[\s\W]+&/,"")
}
function t_toFileName(a){
	return a.replace(/[\\\/\*?"<>|]/g,"").trim();
}
function hmsToSeconds(d){
	d=[0,0].concat(d.split(":")).splice(-3);
	return (d[0]|0)*3600+(d[1]|0)*60+(d[2]|0);
}
function secondsToHms(d){
	d=Number(d);
	var h=Math.floor(d/3600),m=Math.floor(d%3600/60),s=Math.floor(d%3600%60);
	return ("0"+h).slice(-2)+":"+("0"+m).slice(-2)+":"+("0"+s).slice(-2);
}
function EndDOM(a){document.addEventListener("DOMContentLoaded",a)}
function $qs(a){return document.querySelector(a)}
function $bk(a){return a.cancelBubble=true;a.stopPropagation()}
function charm(t,a){
	if(a.classList.toggle('on'))onclick=evt;
	else onclick=null;
	function evt(e){
		if(a.contains(e.target))return;
		onclick=null;
		t.click();
	}
}
function state_play(url,native){
	var a=".post [data-ctl='"+url+"'] ."+(native?"sw-play":"sw-play-chip");
	el.playstate1.selectorText=a+" .a";
	el.playstate2.selectorText=a+" .b";
}
function state_stop(){
	el.playstate1.selectorText=
	el.playstate2.selectorText=".post .null";
}
function newDownload(urls,rtype,cb,cb1){
	var cnt=urls.length,rr=new Array(urls.length);

	for(var x,i=urls.length-1;i>=0;i--)down0(urls[i].replace(/#.*$/,""),i);

	function down0(url,idx){
		var x=mod.xs(function(){
			if(cb1)cb1(this.response,idx);
			rr[idx]=new File([this.response],url);
			cnt--;
			if(!cnt)cb(rr);
		});
		x.open("GET",url,true);
		if(rtype)x.responseType=rtype;
		x.send();
	}
}
(function(){
	var u_m4a,u_ogg,on_cmd={
		cpyURLOnly:function(t,url,title){
			var a=document.querySelectorAll(".cpyURL .bk"),b=window.getSelection(),r=document.createRange();
			b.removeAllRanges();
			r.selectNode(a[1].firstChild);
			b.addRange(r);
			document.execCommand("copy");
			b.removeAllRanges();
		},
		cpyURL_done:function(t){
			document.querySelector(".cpyURL").classList.remove("on");
		},
		cpyURL:function(t,url,title){
			var a=document.createElement("a"),b=window.getSelection(),r=document.createRange();
			a.href=url;
			url=a.href;
			a=document.querySelectorAll(".cpyURL .bk");
			a[0].innerHTML='<a href="'+url+'" target="_blank">'+title+" - "+url+"</a>";
			a[1].innerHTML='<a href="'+url+'" target="_blank">'+url+"</a>";
			a[2].innerHTML=url;
			document.querySelector(".cpyURL").classList.add("on");
			b.removeAllRanges();
			r.selectNode(a[0].firstChild);
			b.addRange(r);
			document.execCommand("copy");
			b.removeAllRanges();
			a=document.querySelectorAll(".cpyURL .a");
			a[0].name="cpyURL	"+url+"	"+title;
			a[1].name="cpyURLOnly	"+url;
			a[2].name="cpyText	"+url;
		},
		cpyText:function(t,url){
			var a=document.createElement("input");
			a.value=url;
			a.select();
			document.execCommand("copy");
		},
		fileURL_done:function(t){
			document.querySelector(".fileURL").classList.remove("on");
		},
		fileURL:function(t,a){
			var b=document.querySelectorAll(".fileURL .fd"),c=document.querySelectorAll(".fileURL span"),n;

			if(b[1].value)URL.revokeObjectURL(b[1].value),b[1].value="";
			if(b[2].value)URL.revokeObjectURL(b[2].value),b[2].value="";
			n=a.mod.split("#");b[0].href=n[0];c[0].textContent=n[1];
			n=a.m4a.split("#");clk(b[1],n);c[1].textContent=n[1].replace(/!$/,"");
			n=a.ogg.split("#");clk(b[2],n);c[2].textContent=n[1].replace(/!$/,"");

			document.querySelector(".fileURL").classList.add("on");
			function clk(t,n){
				t.onclick=function(){
					download1(this,n[0],n[1])
				}
			}
			function download1(t,url,name){
				t.onclick=null;
				var x=mod.xs(function(){
					var a=new DataView(this.response);
					a.setInt8(0,a.getInt8(0)^255);
					t.name=name.replace(/!$/,"");
					t.value=URL.createObjectURL(new File([this.response],t.name));
					t.onclick=download2;
					t.onclick();
				});
				x.open("GET",url,true);
				x.responseType="arraybuffer";
				x.send();
			}
			function download2(){
				var a=document.createElement("a");
				a.href=this.value;
				a.download=this.name;
				a.click();
			}
		},
		footer:function(t){
			var a=document.querySelectorAll(".btn-footer,.recent");
			for(var i=a.length-1;i>=0;i--)a[i].classList.toggle("on");
		},
		play:function(t,url,native){
			var a=result_media(url);

			audio_meta.url=url;
			audio_meta.native=native;

			if(native){
				if(audio_meta.file==a.m4a){
					audio_player.play(1);
					return;
				}
				var down=[a.m4a,a.ogg];

				newDownload(down,"arraybuffer",function(rr){
					if(u_m4a)URL.revokeObjectURL(u_m4a);
					if(u_ogg)URL.revokeObjectURL(u_ogg);
					u_m4a=URL.createObjectURL(rr[0]);
					u_ogg=URL.createObjectURL(rr[1]);
					audio_player.load_native(function(){
						audio_player.play();
					},[[u_m4a,"audio/mp4"],[u_ogg,"audio/ogg"]],a);
				},function(b,idx){
					if(/!$/.exec(down[idx])){
						var a=new DataView(b);
						a.setInt8(0,a.getInt8(0)^255);
					}
				});
				audio_meta.file=a.m4a;
			}else{
				if(audio_meta.file==a.mod){
					audio_player.play(1);
					return;
				}
				audio_player.load(function(){
					audio_player.play();
				},a.mod);
				audio_meta.file=a.mod;
			}
		},
		cue:function(t,url){
		},
		keygenmusic:function(t,url){
			var a=result_media(url),b=a.info.title;
			if(!b&&a.info.message)b=a.info.message.split("\n")[0];
			open("http://keygenmusic.net/?page=search&query="+encodeURIComponent(b),"keygenmusic");
		},
		download:function(t,url){
			this.fileURL(t,result_media(url));
		}
	};
	addEventListener("click",function(e){
		for(var a,p=e.target,i=16;p&&i>0;p=p.parentNode,i--)
		switch(p.constructor){
		case HTMLButtonElement:
			a=p.name.split("\t");
			if(a[0] in on_cmd)on_cmd[a[0]].apply(on_cmd,a);
			break;
		}
	});
	ondragover=function(e){
		e.preventDefault();
		e.dataTransfer.dropEffect="link";
	};
	ondragend=function(e){e.preventDefault()};
	ondrop=function(e){
		e.preventDefault();
		var file=e.dataTransfer.files[0];
		if(!file){
			file=e.dataTransfer.getData("text/plain");
			if(audio_meta.file==file){
				audio_player.play(1);
				return;
			}
			audio_player.load_native(function(){
				audio_player.play();
			},[[file]]);
		}else if(new Audio().canPlayType(file.type)){
			if(audio_meta.file==file){
				audio_player.play(1);
				return;
			}
			if(audio_meta.url_blob)URL.revokeObjectURL(audio_meta.url_blob),audio_meta.url_blob=null;
			audio_meta.url_blob=URL.createObjectURL(file);
			audio_player.load_native(function(){
				audio_player.play();
			},[[audio_meta.url_blob,file.type]]);
		}else{
			if(audio_meta.file==file){
				audio_player.play(1);
				return;
			}
			audio_player.load(function(){
				audio_player.play();
			},file);
		}
		audio_meta.file=file;
	};
	function result_media(url){
		return JSON.parse(document.querySelector("[data-ctl='"+url+"']").parentNode.querySelector("[name=media]").value);
	}
})()