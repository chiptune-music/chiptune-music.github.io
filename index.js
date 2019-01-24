var el={},audio_player,audio_meta={};
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