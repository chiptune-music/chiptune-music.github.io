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
	var m,s=this.responseText,d=document.createElement("div"),c=d.children;
	m=/<body>([\w\W]*)<\/body>/.exec(s);
	document.body.innerHTML=m[1];
	m=/(<script[\w\W]*)<\/head>/.exec(s);
	d.innerHTML=m[1];
	r1();
	function r1(){
		if(!c.length)return;
		if(c[0].tagName=="script"){
			var a=document.createElement("script");
			a.src=c[0].src;
			a.onload=function(){
				r1(i+1);
			}
			d.removeChild(c[0]);
			document.head.appendChild(a);
		}else{
			document.head.appendChild(c[0]);
		}
	}
});
x.open("GET","/",true);
x.send();
})()