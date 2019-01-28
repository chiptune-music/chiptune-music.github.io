var el={},audio_player,audio_meta={};
EndDOM(init);
function init(body){
	var frm=document.createElement("div");
	frm.innerHTML='<iframe class="lib-svg" src="https://chiptune-cdn.tistory.com/1"></iframe>';
	frm=frm.firstChild;
	document.body.appendChild(frm);

	addEventListener("message",msg);
	function msg(e){
		var d=e.data;
		if(d[0]=="init-cdn"){
			mod.dom.var(el);
			removeEventListener("message",msg);
			document.body.removeChild(frm);

			if(body){
				el.frame.textContent="";
				for(var i=body.length-1;i>=0;i--)el.frame.appendChild(body[i]);
			}

			el["lib-svg"].innerHTML=d[1];


			scr(d[2]);
			scr(d[3]);
			scr(d[4]);
			mod.chiptune.config.html_control=d[6];
			scr(d[5]);

			mod.chiptune.config.url_worker=URL.createObjectURL(d[7]);
			mod.chiptune.config.url_libopenmpt=d[8];
			mod.chiptune.config.url_libopenmpt_wasm=URL.createObjectURL(d[9]);

			audio_player=mod.chiptune_control.new(".chip-control");
			audio_player.onplay=function(){
				state_play(audio_meta.url,audio_meta.native);
			};
			audio_player.onstop=state_stop;
		}
	}
	function scr(a){
		var b=document.createElement("script");
		b.text=a;
		document.head.appendChild(b);
	}
}
function EndDOM(a){document.addEventListener("DOMContentLoaded",a)}