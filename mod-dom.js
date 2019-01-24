mod.dom=(function mod_dom(r){

	return r;
})({
	new:function(src,o){
		var d=document.createDocumentFragment(),
		r={
			option:o,
			insert:this.insert,
			insertPrev:this.insertPrev,
			insertNext:this.insertNext
		};

		d.innerHTML=src;

		for(var n in o.exec)if(r[n]){r[n].apply(r,o.exec[n]);break;}

		return r;
	},
	var:function(r,t,m){
		m=m||"var";
		for(var m0=new RegExp("^#"+m+"\\b"),rule,s=(t||document).styleSheets||(t||document).querySelectorAll("style"),i=s.length-1;i>=0;i--){
			try{
				rule=s[i].cssRules||s[i].rules||s[i].sheet.cssRules||s[i].sheet.rules;
			}catch(e){continue}

			if(rule==null)continue;

			for(var a,j=rule.length-1,n;j>=0;j--){
				n=rule[j].selectorText;
				if(!n)continue;
				if(m0.exec(n)&&(a=/ ([^,]+)/.exec(n))){
					r[a[1]]=rule[j];
					a=n.indexOf(",");
					rule[j].selectorText=n.substr(a+1);
				}
			}
		}
	
		for(var s=(t||document).querySelectorAll("[class^='"+m+"']"),i=s.length-1;i>=0;i--){
			r[s[i].classList[1]]=s[i];
			s[i].classList.remove(m);
		}
	},
	find:function(arr,doc){
		var ret=[];
		for(var i=arr.length-1;i>=0;i--)
		if(arr[i].constructor==String){
			ret.push.apply(ret,b=(doc||document).querySelectorAll(arr[i]));
		}else ret.push(arr[i]);
		return ret;
	},
	prop:function(arr,a){
		if(arr.constructor!=Array)arr=[arr];
		arr=this.find(arr);
		for(var n in a)
		for(var i=arr.length-1;i>=0;i--)arr[i][n]=a[n];
	},
	evt:function(arr){
		if(arr.constructor!=Array)arr=[arr];
		arr=this.find(arr);
		for(var i=arr.length-1,a=arguments;i>=0;i--)arr[i].addEventListener(a[1],a[2],a[3]);
	},
	evt_click:function(proc,arr){
		arr=arr||[HTMLButtonElement,HTMLAnchorElement];
		return function(e){
			for(var c=0,n,l,v,u,j=0,p=e.target,i=16;p&&i>0;p=p.parentNode,i--){
				if(arr.indexOf(p.constructor)<0)continue;
				if(n=p.name||p.href){
					n=n.split(";"),l=n.length;
					for(;j<l;j++){
						if(v=n[j].split("\t"),u=v.shift(),u in proc)c++,proc[u].apply(proc,v);
					}
				}
				if(c<1&&"*" in proc)proc["*"].call(p,e);
			}
		};
	},
	rot:function(arr){
		if(arr.constructor!=Array)arr=[arr];
		arr=this.find(arr);
		for(var ret,x=arr.length-1,a=arguments;x>=0;x--){
			var n=arr[x].className;
			if(a.length==2)a=[a[0],a[1],""];
			for(var b,i=1,l=a.length;i<l;i++){
				ret=i-1;
				if(a[i]==""){
					arr[x].className=n.replace(/(\s*)$/," "+a[1]).trim();
					break;
				}else if(b="\\b"+a[i].replace(/ /g,"\\b|\\b")+"\\b",n.match(new RegExp(b,"g"))){
					arr[x].className=n.replace(new RegExp("(\\s*)"+b,"g")," "+a[(i+1)%l||1]).trim();
					break;
				}
			}
		}
		return ret;
	},
	rmv:function(arr){
		if(arr.constructor!=Array)arr=[arr];
		arr=this.find(arr);
		for(var ret,x=arr.length-1,a=arguments;x>=0;x--){
			var n=arr[x].className;
			for(var b,i=1,l=a.length;i<l;i++){
				if(b="\\b"+a[i].replace(/ /g,"\\b|\\b")+"\\b",n.match(new RegExp(b,"g"))){
					ret=i;
					n=n.replace(new RegExp("(\\s*)"+b,"g"),"").trim();
				}
			}
			arr[x].className=n;
		}
		return ret;
	},
	focus:function(node){
		document.querySelectorAll(node).focus();
	},
	clone:function(list_node){
		var i,r=[];
		for(i=list_node.length-1;i>=0;i--)r[i]=list_node[i].cloneNode(true);
		return r;
	},
	insert:function(parent0,new0,offset0){
		var ch=parent0.children[offset0<0?parent0.children.length+offset0:offset0];
		if(ch)for(var i=0,l=new0.length;i<l;i++)parent0.insertBefore(new0[i],ch);
		else for(var i=0,l=new0.length;i<l;i++)parent0.appendChild(new0[i]);
	},
	insertPrev:function(child0,new0,offset0){
		var i,p=child0.parentNode,ch=p.children;
		for(i=ch.length-1;i>=0;i--)if(child0==ch[i]){
			ch=ch[Math.max(0,i-(offset0||0))];
			if(ch)for(var i=0,l=new0.length;i<l;i++)p.insertBefore(new0[i],ch);
			break;
		}
	},
	insertNext:function(child0,new0,offset0){
		offset0=(offset0||0)+1;
		var i,p=child0.parentNode,ch=p.children;
		for(i=ch.length-1;i>=0;i--)if(child0==ch[i]){
			ch=ch[i+offset0];
			if(ch)for(var i=0,l=new0.length;i<l;i++)p.insertBefore(new0[i],ch);
			else for(var i=0,l=new0.length;i<l;i++)p.appendChild(new0[i]);
			break;
		}
	}
})