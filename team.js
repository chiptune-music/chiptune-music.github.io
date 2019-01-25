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
function rs(t,cb){
	var c,s=(t||document).querySelectorAll("script"),l=s.length;
	r1(0);
	function r1(i){if(i<l){
		c=document.createElement("script");
		if(s[i].src){
			c.src=s[i].src;
			c.async=true;
			c.onload=function(){
				r1(i+1);
			};
		}else{
			c.text=s[i].text;
		}
		s[i].parentNode.insertBefore(c,s[i]);
		s[i].remove();
		if(c.text)r1(i+1);
	}else if(cb)cb()}
}
(function(){
var x=xs(function(){
	var m,s=this.responseText,d=document.createElement("div");
	m=/<body>([\w\W]*)<\/body>/.exec(s);
	document.body.innerHTML=m[1];
	m=/(<script[\w\W]*)<\/head>/.exec(s);
	d.innerHTML=m[1];
	rs(d,function(){
		for(var i=d.children.length;i>0;i--)document.head.appendChild(d.children[0]);
	});
});
x.open("GET","/",true);
x.send();
})()