if(!mod)function mod(){return this.load.apply(this,arguments)}
if(!$)var $=mod;
mod.EndDOM=function(a){document.addEventListener("DOMContentLoaded",a)};
mod.load=function(){
	var args=[],option;
	Array.prototype.push.apply(args,arguments);
	option=args.pop()||{};
	if(option.key){
		
	}else{
		
	}

	console.log(args);
};
mod.xs=function(cb){
	var x=new XMLHttpRequest();
	x.onreadystatechange=function(){if(this.readyState==4)fin()};
	x.onerror=err;
	x.ontimeout=err;

	return x;

	function fin(){if(cb)switch(x.status/100|0){
		case 1:case 3:break;
		case 2:cb.call(x);break;
		default:cb.call(x,x.status);break;
	}}
	function err(e){cb.call(x,e);}
};
mod.url_host=(function(a){
	return a.src.replace("mod.js","");
})(document.querySelector("script[src$='mod.js']"));
mod.load.prototype=Array.prototype;