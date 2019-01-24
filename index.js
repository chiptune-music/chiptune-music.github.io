onmessage=function(e){
	var a=e.data,b;
	if(a[0]=="init"){
		b=document.createElement("script");
		b.src=a[1];
		document.head.appendChild(b);
	}
};