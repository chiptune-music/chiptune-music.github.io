mod.chiptune=(function mod_chiptune(r){

	return r;
})({
	config:{},
	new:function(){
		var frame_drop,chunk_s,chunk_l,chunk_r,config=this.config,on={
			sys_load:function(n,a){
				post("repeat",config.repeat||-1);
				chunk_s=0;
				if(r.load_wait)r.load_wait(a);
				if(this.load)this.load(a);
			},
			sys_stop:function(){
				if(this.stop)this.stop();
			},
			chunk:function(n,s,l,r){
				chunk_s=s,chunk_l=l,chunk_r=r;
			},
			sys_meta:function(n,a,b){
				r.meta=a,
				r.pattern_max_length=b;
				if(this.meta)this.meta(a);
			}
		},w=new Worker(config.url_worker),r={
			on:on,
			chip:r,
			context:null,
			processor:null,
			order:0,
			paused:true,
			meta:null,
			pattern_max_length:0,
			load:init,
			load_wait:null,
			stop_wait:null,
			play:function(toggle){
				if(this.meta){
					if(toggle){
						if(this.paused){
							chunk_s=undefined;
							this.processor.onaudioprocess=onaudioprocess;
							this.processor.connect(r.context.destination);
							if(this.on.play)this.on.play();
						}else{
							processor_disconnect();
							if(this.on.paused)this.on.paused();
						}
						this.paused=!this.paused;
					}else if(this.paused){
						chunk_s=undefined;
						this.processor.onaudioprocess=onaudioprocess;
						this.processor.connect(r.context.destination);
						if(this.on.play)this.on.play();
						this.paused=false;
					}
				}
				return this.paused;
			},stop:function(a){
				if(this.meta){
					this.meta=null;
					this.paused=true;
					if(a)this.stop_wait=function(){
						this.stop_wait=null;
						a.call(this);
					};
					processor_disconnect();
					if(this.on.unload)on.unload();
					post("stop");
				}
			},volume:function(a){
				post("volume",a);
			},repeat:function(a){
				config.repeat=a||-1;
				post("repeat",a);
			},position:function(a,b){
				if(a>=0)post2("position",a,b);
				else return this.order;
			},refresh:function(){
				post("refresh");
			},meta_update:function(){
				post("meta");
			},order_time:function(cb){
				this.on.order_time=function(a,b){
					this.order_time=null;
					if(cb)cb(b);
				}
				post("order_time");
			}
		};

		w.onerror=function(e){
			
		};
		w.onmessage=function(e){
			if(e.data[0] in on)on[e.data[0]].apply(on,e.data);
		};

		post2("init",config.url_libopenmpt,config.url_libopenmpt_wasm);

		return r;

		function init(s,a){
			var c=new (AudioContext||webkitAudioContext)(),p=c.createScriptProcessor(0,0,2);

			r.context=c;
			r.processor=p;
			p.onaudioprocess=onaudioprocess;

			this.load=function(s,aw){
				var x;
				if(aw)this.load_wait=function(b){
					this.load_wait=null;
					aw.call(this,b);
				};
				if(this.paused){
					if(s instanceof Blob){
						x=new FileReader();
						x.onload=function(){
							a(this.result);
						};
						x.readAsArrayBuffer(s);
					}else if(s.constructor==String){
						x=mod.xs(function(err){
							a(this.response);
						});
						x.open("GET",s,true);
						x.responseType="arraybuffer";
						x.send();
					}else a(s);
				}else{
					this.stop(function(){
						this.load(s,aw?aw:function(){
							this.play();
							if(this.on.play)this.on.play();
						});
					});
				}
				function a(b){load(b,c.sampleRate,p.bufferSize)}
			};
			this.load(s,a);
		}
		function processor_disconnect(e){
			frame_drop=3;
			r.processor.onaudioprocess=onaudioprocess_disconnect;
			if(e)r.processor.onaudioprocess(e);
		}
		function onaudioprocess(e){
			if(chunk_s<=0){
				processor_disconnect(e);
				return;
			}
			post("chunk");
			for(var out_l=e.outputBuffer.getChannelData(0),out_r=e.outputBuffer.getChannelData(1),i=0,c=chunk_s;i<c;i++){
				out_l[i]=chunk_l[i];
				out_r[i]=chunk_r[i];
			}
		}
		function onaudioprocess_disconnect(e){
			for(var out_l=e.outputBuffer.getChannelData(0),out_r=e.outputBuffer.getChannelData(1),i=0,c=out_l.length;i<c;i++){
				out_l[i]=out_r[i]=0;
			}
			if(--frame_drop<=0)
				this.onaudioprocess=function(){
					this.onaudioprocess=null;
					this.disconnect();
					if(r.stop_wait)r.stop_wait();
				}
		}
		function post(a,b){w.postMessage([a,b])}
		function post2(a,b,c){w.postMessage([a,b,c])}
		function post3(a,b,c,d){w.postMessage([a,b,c,d])}
		function load(arr,sam,sz){post3("load",arr,sam,sz)}
	}
})