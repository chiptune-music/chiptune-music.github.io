var el={};
addEventListener("message",msg);
function msg(e){
	var d=e.data;
	if(d[0]=="init-cdn"){
		mod.dom.var(el);
		removeEventListener("message",msg);

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