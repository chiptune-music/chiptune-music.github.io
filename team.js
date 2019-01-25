function xs(a){
	var x=new XMLHttpRequest();
	x.onreadystatechange=function(){if(this.readyState==4)fin()};
	x.onerror=err;
	x.ontimeout=err;

	return x;

	function fin(){if(a)switch(x.status/100|0){
		case 1:case 3:break;
		case 2:a.call(x);break;
		default:a.call(x,x.status);break;
	}}
	function err(e){a.call(x,e)}
}
(function(){
var x=xs(function(){
	var body=[],m,s=this.responseText,d=document.createElement("div"),c=d.children;
	m=/<body>([\w\W]*)<\/body>/.exec(s);
	for(var bd=document.body,ch=bd.children,i=ch.length;i>0;i--){
		body.push(ch[0]);
		bd.removeChild(ch[0]);
	}
	document.body.innerHTML=m[1];
	m=/(<script[\w\W]*)<\/head>/.exec(s);
	d.innerHTML=m[1];
	r1();
	function r1(){
		if(!c.length){
			init(body);
			return;
		}
		var a,b;
		if(c[0] instanceof HTMLScriptElement){
			a=document.createElement("script");
			if(c[0].src){
				a.src=c[0].src;
				a.onload=r1;
			}else{
				a.text=c[0].text;
				b=1;
			}
			d.removeChild(c[0]);
			document.head.appendChild(a);
		}else{
			document.head.appendChild(c[0]);
			b=1;
		}
		if(b)r1();
	}
});
x.open("GET","/",true);
x.send();
})()