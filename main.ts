import{readdirSync,readFileSync,mkdirSync,writeFileSync}from"node:fs";
import{join}from"node:path";
const I=process.env.MAKEFUN_INPUT_DIR??"/input",O=process.env.MAKEFUN_OUTPUT_DIR??"/output";
const P="000112239999999922222221222122292229999999999999011009999999999912999999999999991101",Q="011022339999999911111111111111191119999999999999000009999999999910999999999999990010";
function run(p:Buffer,n:Buffer):[Buffer,number]{
let s:number[]=[],c:number[]=[],m=new Int32Array(256),o="",pc=0,st=0,ip=0,e=-1;
L:for(;;){
if(st>=1e6){e=10;break;}
if(pc<0||pc>=p.length){e=9;break;}
let k=p[pc];
if(k>83){e=5;break;}
let po=P.charCodeAt(k)-48;
if(po>3){e=5;break;}
let pu=Q.charCodeAt(k)-48,im=k==1?1:k==2?4:k>47&&k<52?2:0;
if(pc+im>=p.length){e=9;break;}
st++;let nx=pc+1+im;
if(s.length<po){e=2;break;}
if(s.length-po+pu>256){e=3;break;}
if(k==0){e=0;break;}
else if(k==1)s.push((p[pc+1]<<24)>>24);
else if(k==2)s.push(p.readInt32LE(pc+1));
else if(k==3)s.pop();
else if(k==4)s.push(s[s.length-1]);
else if(k==5){let x=s[s.length-1];s[s.length-1]=s[s.length-2];s[s.length-2]=x;}
else if(k==6)s.push(s[s.length-2]);
else if(k==7){let a=s[s.length-3],b=s[s.length-2],d=s[s.length-1];s[s.length-3]=b;s[s.length-2]=d;s[s.length-1]=a;}
else if(k==23)s.push(-s.pop()!|0);
else if(k==27)s.push(~s.pop()!);
else if(k>=16&&k<=34){
let b=s.pop()!,a=s.pop()!,r=0;
if(k==16)r=(a+b)|0;else if(k==17)r=(a-b)|0;else if(k==18)r=Math.imul(a,b);
else if(k==19){if(!b){e=4;break L;}r=(a/b)|0;}
else if(k==20){if(!b){e=4;break L;}r=a%b|0;}
else if(k==21){if(!b){e=4;break L;}r=((a>>>0)/(b>>>0))|0;}
else if(k==22){if(!b){e=4;break L;}r=((a>>>0)%(b>>>0))|0;}
else if(k==24)r=a&b;else if(k==25)r=a|b;else if(k==26)r=a^b;
else if(k==28)r=a<<b;else if(k==29)r=a>>b;else if(k==30)r=(a>>>b)|0;
else if(k==32)r=a==b?1:0;else if(k==33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
s.push(r);
}
else if(k==48){pc=nx+p.readInt16LE(pc+1);continue;}
else if(k==49){let v=s.pop()!;pc=v?nx:nx+p.readInt16LE(pc+1);continue;}
else if(k==50){let v=s.pop()!;pc=v?nx+p.readInt16LE(pc+1):nx;continue;}
else if(k==51){if(c.length>=64){e=7;break;}c.push(nx);pc=p.readUInt16LE(pc+1);continue;}
else if(k==52){if(!c.length){e=8;break;}pc=c.pop()!;continue;}
else if(k==64){let a=s.pop()!;if(a<0||a>255){e=6;break;}s.push(m[a]);}
else if(k==65){let a=s.pop()!,v=s.pop()!;if(a<0||a>255){e=6;break;}m[a]=v;}
else if(k==80){let v=s.pop()!,t=String(v);if(o.length+t.length>65536){e=11;break;}o+=t;}
else if(k==81){let v=s.pop()!;if(o.length+1>65536){e=11;break;}o+=String.fromCharCode(v&255);}
else if(k==82)s.push(ip<n.length?n[ip++]:-1);
else if(k==83){e=s.pop()!&255;break;}
pc=nx;
}
return[Buffer.from(o,"latin1"),e];
}
for(const id of readdirSync(I).sort()){
const d=join(I,id);let p:Buffer,n:Buffer;
try{p=readFileSync(join(d,"program.bin"))}catch{p=Buffer.alloc(0)}
try{n=readFileSync(join(d,"input.bin"))}catch{n=Buffer.alloc(0)}
const[o,e]=run(p,n);
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,"stdout.bin"),o);
writeFileSync(join(O,id,"exit.txt"),e+"\n");
}
