(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33744,e=>{"use strict";var t=e.i(43476),i=e.i(46932),r=e.i(88653),o=e.i(22016),n=e.i(68877),a=e.i(71645);function s({visible:e}){let[i,r]=(0,a.useState)(0);(0,a.useEffect)(()=>{if(!e)return;let t=setInterval(()=>r(e=>e+1),1600);return()=>clearInterval(t)},[e]);let o=i%3,n=[{id:0,cx:48,cy:80,label:"Trigger"},{id:1,cx:140,cy:40,label:"Filter"},{id:2,cx:140,cy:120,label:"Route"},{id:3,cx:232,cy:80,label:"Action"}],l=[{from:0,to:1,id:"e01"},{from:0,to:2,id:"e02"},{from:1,to:3,id:"e13"},{from:2,to:3,id:"e23"}];return(0,t.jsx)("div",{style:{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"20px"},children:(0,t.jsxs)("svg",{viewBox:"0 0 280 160",style:{width:"100%",flex:1},"aria-hidden":!0,children:[(0,t.jsxs)("defs",{children:[(0,t.jsx)("marker",{id:"arr-a",markerWidth:"5",markerHeight:"5",refX:"4",refY:"2.5",orient:"auto",children:(0,t.jsx)("path",{d:"M0 0 L5 2.5 L0 5Z",fill:"var(--accent)",opacity:"0.7"})}),(0,t.jsx)("marker",{id:"arr-p",markerWidth:"5",markerHeight:"5",refX:"4",refY:"2.5",orient:"auto",children:(0,t.jsx)("path",{d:"M0 0 L5 2.5 L0 5Z",fill:"#2A2A28"})})]}),l.map((e,i)=>{let r=n[e.from],a=n[e.to],s={x:(r.cx+a.cx)/2,y:(r.cy+a.cy)/2},l=`M ${r.cx+14},${r.cy} Q ${s.x},${s.y} ${a.cx-14},${a.cy}`,c=i===o;return(0,t.jsxs)("g",{children:[(0,t.jsx)("path",{d:l,fill:"none",stroke:c?"var(--accent)":"#2A2A28",strokeWidth:c?1.2:.8,opacity:c?.8:.5,markerEnd:c?"url(#arr-a)":"url(#arr-p)"}),c&&(0,t.jsx)("circle",{r:"2.5",fill:"var(--accent)",opacity:"0.9",children:(0,t.jsx)("animateMotion",{dur:"1.4s",repeatCount:"indefinite",children:(0,t.jsx)("mpath",{href:`#${e.id}-path`})})}),(0,t.jsx)("path",{id:`${e.id}-path`,d:l,fill:"none",stroke:"none"})]},e.id)}),n.map((e,i)=>{let r=l[o]?.from===i||l[o]?.to===i;return(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:e.cx-14,y:e.cy-12,width:28,height:24,rx:2,fill:r?"#0D1020":"#111318",stroke:r?"var(--accent)":"#2A2A28",strokeWidth:.8}),r&&(0,t.jsx)("rect",{x:e.cx-14,y:e.cy-12,width:2.5,height:24,rx:1,fill:"var(--accent)"}),(0,t.jsx)("text",{x:e.cx,y:e.cy+1,textAnchor:"middle",dominantBaseline:"middle",fontFamily:"var(--font-body), sans-serif",fontSize:"6.5",fill:r?"#F0EFE9":"#5A5A58",children:e.label})]},e.id)}),(0,t.jsx)("text",{x:"140",y:"152",textAnchor:"middle",fontFamily:"var(--font-body), sans-serif",fontSize:"6.5",fill:"#2A2A28",letterSpacing:"0.12em",children:"RUNNING · 4 ACTIVE ROUTES"})]})})}function l({visible:e}){let[i,r]=(0,a.useState)(!0),[o,n]=(0,a.useState)(0);return(0,a.useEffect)(()=>{if(!e)return;let t=setInterval(()=>r(e=>!e),560),i=setInterval(()=>n(e=>(e+1)%5),900);return()=>{clearInterval(t),clearInterval(i)}},[e]),(0,t.jsx)("div",{style:{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"20px"},children:(0,t.jsxs)("svg",{viewBox:"0 0 280 160",style:{width:"100%",flex:1},"aria-hidden":!0,children:[(0,t.jsx)("rect",{x:"20",y:"8",width:"240",height:"148",rx:"3",fill:"#0D0D0D",stroke:"#2A2A28",strokeWidth:"0.8"}),(0,t.jsx)("rect",{x:"20",y:"8",width:"240",height:"22",rx:"3",fill:"#1A1A18",stroke:"#2A2A28",strokeWidth:"0.8"}),(0,t.jsx)("rect",{x:"20",y:"22",width:"240",height:"8",fill:"#1A1A18"}),(0,t.jsx)("circle",{cx:"34",cy:"19",r:"3.5",fill:"#C0192C",opacity:"0.7"}),(0,t.jsx)("circle",{cx:"46",cy:"19",r:"3.5",fill:"#2A2A28"}),(0,t.jsx)("circle",{cx:"58",cy:"19",r:"3.5",fill:"#2A2A28"}),(0,t.jsx)("rect",{x:"72",y:"13",width:"120",height:"12",rx:"2",fill:"#111111",stroke:"#2A2A28",strokeWidth:"0.6"}),(0,t.jsx)("text",{x:"132",y:"21",textAnchor:"middle",dominantBaseline:"middle",fontFamily:"var(--font-body), sans-serif",fontSize:"5.5",fill:"#3A3A38",letterSpacing:"0.04em",children:"obsidia.co"}),(0,t.jsx)("rect",{x:"28",y:"38",width:"60",height:"7",rx:"1",fill:"#1A1A18"}),[100,126,152,178].map(e=>(0,t.jsx)("rect",{x:e,y:"38",width:"18",height:"7",rx:"1",fill:"#1A1A18"},e)),(0,t.jsx)("rect",{x:"214",y:"37",width:"30",height:"9",rx:"1",fill:"var(--accent)",opacity:"0.4"}),(0,t.jsx)("rect",{x:"28",y:"53",width:"224",height:"14",rx:"1",fill:"#161616",stroke:"#1E1E1C",strokeWidth:"0.5"}),[{y:72,w:182},{y:86,w:134},{y:104,w:220},{y:118,w:170},{y:132,w:110}].map((e,i)=>(0,t.jsx)("rect",{x:"28",y:e.y,width:e.w,height:"6",rx:"1",fill:i<=o?"#1E1E1C":"#141414",style:{transition:"fill 300ms ease"}},i)),(0,t.jsx)("rect",{x:28+(o<5?8+20*o:0),y:"119",width:"5",height:"1.5",fill:"var(--accent)",opacity:.9*!!i,style:{transition:"opacity 100ms"}}),(0,t.jsx)("text",{x:"140",y:"152",textAnchor:"middle",fontFamily:"var(--font-body), sans-serif",fontSize:"6.5",fill:"#2A2A28",letterSpacing:"0.12em",children:"LOADING · 98 LIGHTHOUSE"})]})})}function c({visible:e}){let[i,r]=(0,a.useState)(0);return(0,a.useEffect)(()=>{if(!e)return;let t=setInterval(()=>r(e=>(e+1)%4),1200);return()=>clearInterval(t)},[e]),(0,t.jsx)("div",{style:{position:"relative",width:"100%",height:"100%",display:"flex",flexDirection:"column",padding:"20px"},children:(0,t.jsxs)("svg",{viewBox:"70 0 140 160",style:{width:"100%",flex:1},"aria-hidden":!0,children:[(0,t.jsx)("rect",{x:"80",y:"4",width:"120",height:"152",rx:"10",fill:"#0D0D0D",stroke:"#2A2A28",strokeWidth:"0.8"}),(0,t.jsx)("rect",{x:"114",y:"4",width:"52",height:"8",rx:"0 0 6 6",fill:"#1A1A18"}),(0,t.jsx)("rect",{x:"128",y:"6",width:"24",height:"4",rx:"2",fill:"#111111"}),(0,t.jsx)("rect",{x:"120",y:"149",width:"40",height:"2.5",rx:"1.5",fill:"#2A2A28"}),(0,t.jsx)("rect",{x:"80",y:"16",width:"120",height:"12",fill:"#0D0D0D"}),(0,t.jsx)("text",{x:"92",y:"24",fontFamily:"var(--font-mono), monospace",fontSize:"5.5",fill:"#3A3A38",children:"9:41"}),(0,t.jsx)("rect",{x:"172",y:"19",width:"20",height:"5",rx:"1",fill:"#1A1A18",stroke:"#2A2A28",strokeWidth:"0.5"}),(0,t.jsx)("rect",{x:"172",y:"19",width:"12",height:"5",rx:"1",fill:"#2A2A28"}),(0,t.jsx)("rect",{x:"80",y:"28",width:"120",height:"18",fill:"#111111"}),(0,t.jsx)("text",{x:"140",y:"39",textAnchor:"middle",dominantBaseline:"middle",fontFamily:"var(--font-body), sans-serif",fontSize:"7",fontWeight:"600",fill:"#F0EFE9",children:"Obsidia Hub"}),[{icon:"◈",label:"Dashboard",sub:"4 new updates"},{icon:"⟶",label:"Workflows",sub:"12 running"},{icon:"↗",label:"Reports",sub:"Updated 2m ago"},{icon:"◉",label:"Team",sub:"8 members"}].map((e,r)=>{let o=r===i,n=50+24*r;return(0,t.jsxs)("g",{children:[(0,t.jsx)("rect",{x:"80",y:n,width:"120",height:"22",fill:o?"rgba(61,82,230,0.08)":"#0D0D0D",style:{transition:"fill 300ms ease"}}),o&&(0,t.jsx)("rect",{x:"80",y:n,width:"2.5",height:"22",fill:"var(--accent)"}),(0,t.jsx)("rect",{x:"88",y:n+6,width:"10",height:"10",rx:"2",fill:o?"#0D1020":"#111318",stroke:o?"var(--accent)":"#2A2A28",strokeWidth:"0.6"}),(0,t.jsx)("text",{x:"94",y:n+13,textAnchor:"middle",dominantBaseline:"middle",fontFamily:"var(--font-mono), monospace",fontSize:"5.5",fill:o?"var(--accent)":"#5A5A58",children:e.icon}),(0,t.jsx)("text",{x:"104",y:n+9,dominantBaseline:"middle",fontFamily:"var(--font-body), sans-serif",fontSize:"6.5",fill:o?"#F0EFE9":"#9A9890",children:e.label}),(0,t.jsx)("text",{x:"104",y:n+17,dominantBaseline:"middle",fontFamily:"var(--font-body), sans-serif",fontSize:"5.5",fill:"#3A3A38",children:e.sub})]},r)})]})})}function d(){let e=(0,a.useRef)(null),[i,r]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{let e=setTimeout(()=>r(!0),600);return()=>clearTimeout(e)},[]),(0,t.jsxs)("div",{ref:e,style:{position:"absolute",inset:0,backgroundColor:"#0A0A0A",borderLeft:"1px solid #1E1E1C",overflow:"hidden",display:"grid",gridTemplateColumns:"repeat(3, 1fr)"},children:[(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, #1A1A18 1px, transparent 1px)",backgroundSize:"24px 24px",pointerEvents:"none",zIndex:0}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",top:"20px",left:"24px",zIndex:2,fontFamily:"var(--font-body), sans-serif",fontSize:"9px",fontWeight:500,letterSpacing:"0.2em",textTransform:"uppercase",color:"#3A3A38"},children:"What We Build"}),[{key:"automation",Panel:s},{key:"websites",Panel:l},{key:"apps",Panel:c}].map(({key:e,Panel:r},o)=>(0,t.jsx)("div",{style:{position:"relative",zIndex:1,borderRight:o<2?"1px solid #1E1E1C":"none",opacity:+!!i,transform:i?"translateY(0)":"translateY(12px)",transition:`opacity 800ms ease ${140*o+300}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${140*o+300}ms`},children:(0,t.jsx)(r,{visible:i})},e))]})}var p=e.i(78084);let x={hidden:{},visible:{transition:{staggerChildren:.09,delayChildren:.2}}},h=[.22,1,.36,1],m={hidden:{y:28,opacity:0},visible:{y:0,opacity:1,transition:{duration:.65,ease:h}}},g={hidden:{y:20,opacity:0},visible:e=>({y:0,opacity:1,transition:{duration:.65,ease:h,delay:e}})};e.s(["default",0,function(){let[e,s]=(0,a.useState)(0);return(0,a.useEffect)(()=>{let e=setInterval(()=>s(e=>(e+1)%4),2200);return()=>clearInterval(e)},[]),(0,t.jsxs)("section",{id:"home-hero","data-section-label":"Home",style:{position:"relative",minHeight:"100dvh",display:"grid",gridTemplateColumns:"44% 56%",gridTemplateRows:"1fr",alignItems:"stretch",overflow:"hidden",backgroundColor:"var(--bg)"},className:"hero-grid",children:[(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,width:"55%",backgroundImage:"radial-gradient(circle, rgba(128,128,128,0.3) 1.5px, transparent 1.5px)",backgroundSize:"28px 28px",opacity:.85,pointerEvents:"none"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",top:"30%",left:"-80px",width:"640px",height:"640px",background:"radial-gradient(circle, rgba(61,82,230,0.055) 0%, transparent 65%)",pointerEvents:"none",zIndex:0}}),(0,t.jsxs)("div",{style:{position:"relative",zIndex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"120px 16px 80px 32px",maxWidth:"680px"},children:[(0,t.jsx)("h1",{className:"font-heading",style:{fontSize:"clamp(48px, 5.5vw, 88px)",fontWeight:500,lineHeight:1,letterSpacing:"-0.03em",color:"var(--text)",marginBottom:"28px"},children:(0,t.jsxs)(i.motion.div,{variants:x,initial:"hidden",animate:"visible",style:{display:"block"},children:[(0,t.jsx)("span",{style:{display:"flex",flexWrap:"wrap",alignItems:"baseline",gap:"0.22em",marginBottom:"0.04em"},children:"We build what".split(" ").map((e,r)=>(0,t.jsx)(i.motion.span,{variants:m,style:{display:"inline-block"},children:e},r))}),(0,t.jsx)("span",{style:{display:"flex",alignItems:"baseline",gap:"0.22em",marginBottom:"0.08em"},children:"your business needs.".split(" ").map((e,r)=>(0,t.jsx)(i.motion.span,{variants:m,style:{display:"inline-block"},children:e},r))}),(0,t.jsx)(i.motion.span,{variants:m,style:{display:"block",minWidth:"2ch"},"aria-live":"polite","aria-atomic":"true",children:(0,t.jsx)(r.AnimatePresence,{mode:"wait",children:(0,t.jsx)(i.motion.span,{initial:{opacity:0,y:14},animate:{opacity:1,y:0},exit:{opacity:0,y:-14},transition:{duration:.3,ease:h},style:{display:"inline-block",color:"var(--accent)",fontStyle:"italic"},children:["Faster.","Smarter.","Cleaner.","Automated."][e]},e)})})]})}),(0,t.jsx)(i.motion.p,{variants:g,custom:.85,initial:"hidden",animate:"visible",className:"font-body",style:{fontSize:"clamp(15px, 1.4vw, 18px)",lineHeight:1.8,color:"var(--text-secondary)",maxWidth:"460px",marginBottom:"44px"},children:"Obsidia builds custom automations, websites, and applications for businesses that are serious about how they operate."}),(0,t.jsxs)(i.motion.div,{variants:g,custom:1.05,initial:"hidden",animate:"visible",style:{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap",marginBottom:"32px"},children:[(0,t.jsx)(p.default,{strength:.22,children:(0,t.jsxs)(o.default,{href:"/contact",className:"hero-btn-primary",children:["Start a Project ",(0,t.jsx)(n.ArrowRight,{size:13})]})}),(0,t.jsxs)(o.default,{href:"/services",className:"hero-btn-secondary",children:["Our Services ",(0,t.jsx)(n.ArrowRight,{size:12})]})]})]}),(0,t.jsx)(i.motion.div,{initial:{opacity:0,x:24},animate:{opacity:1,x:0},transition:{duration:.9,ease:[.22,1,.36,1],delay:.4},style:{position:"relative",height:"100%"},children:(0,t.jsx)(d,{})}),(0,t.jsx)("style",{children:`
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          background-color: var(--accent);
          padding: 14px 28px;
          border-radius: 50px;
          transition: background-color 200ms ease;
        }
        .hero-btn-primary:hover { background-color: var(--accent-hover); }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body), sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          border-bottom: 1px solid var(--border);
          padding-bottom: 3px;
          transition: color 200ms ease, border-color 200ms ease;
        }
        .hero-btn-secondary:hover {
          color: var(--text);
          border-color: var(--text);
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            min-height: 100dvh !important;
          }
          .hero-grid > div:last-child {
            display: none !important;
          }
        }
      `})]})}],33744)},52006,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(46932);let o=[.22,1,.36,1],n=[{cssClass:"high",bars:3,label:"HIGH",pct:78,hex:"#D4A00A"},{cssClass:"critical",bars:4,label:"CRITICAL",pct:84,hex:"#D0611A"},{cssClass:"systemic",bars:5,label:"SYSTEMIC",pct:83,hex:"#C8201A"}];function a(e,t,i,r=950){i.current&&cancelAnimationFrame(i.current);let o=performance.now(),n=a=>{let s=Math.min((a-o)/r,1);t(Math.round((1-Math.pow(1-s,4))*e)),s<1&&(i.current=requestAnimationFrame(n))};i.current=requestAnimationFrame(n)}function s({rows:e,active:i,color:r}){return(0,t.jsx)("div",{"aria-hidden":!0,style:{display:"flex",flexDirection:"column",gap:"9px"},children:e.map(e=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono), monospace",fontSize:"7.5px",letterSpacing:"0.12em",textTransform:"uppercase",color:i?"rgba(13,17,71,0.45)":"rgba(13,17,71,0.2)",minWidth:"80px",transition:"color 320ms ease"},children:e.label}),(0,t.jsx)("div",{style:{flex:1,height:"2px",backgroundColor:"rgba(13,17,71,0.07)",position:"relative",overflow:"hidden"},children:(0,t.jsx)("div",{style:{position:"absolute",top:0,left:0,bottom:0,width:`${e.count}%`,backgroundColor:i?r:"rgba(13,17,71,0.15)",transition:"background-color 380ms ease"}})}),(0,t.jsxs)("span",{style:{fontFamily:"var(--font-mono), monospace",fontSize:"8px",fontWeight:600,minWidth:"28px",textAlign:"right",color:i?r:"rgba(13,17,71,0.22)",transition:"color 380ms ease"},children:[e.count,"%"]})]},e.label))})}function l({active:e,color:r}){let[o,n]=(0,i.useState)(0),[c,d]=(0,i.useState)(0),[p,x]=(0,i.useState)(0),h=(0,i.useRef)(null),m=(0,i.useRef)(null),g=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,i;return e?(a(78,n,h),t=setTimeout(()=>a(23,d,m),160),i=setTimeout(()=>a(14,x,g),320)):([h,m,g].forEach(e=>{e.current&&(cancelAnimationFrame(e.current),e.current=null)}),n(0),d(0),x(0)),()=>{void 0!==t&&clearTimeout(t),void 0!==i&&clearTimeout(i),[h,m,g].forEach(e=>{e.current&&cancelAnimationFrame(e.current)})}},[e]),(0,t.jsx)(s,{rows:[{label:"VISITORS",pct:78,count:o,delay:0},{label:"LEADS",pct:23,count:c,delay:160},{label:"CONVERSION",pct:14,count:p,delay:320}],active:e,color:r})}function c({active:e,color:r}){let[o,n]=(0,i.useState)(0),[l,d]=(0,i.useState)(0),p=(0,i.useRef)(null),x=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t;return e?(a(84,n,p),t=setTimeout(()=>a(36,d,x),210)):([p,x].forEach(e=>{e.current&&(cancelAnimationFrame(e.current),e.current=null)}),n(0),d(0)),()=>{void 0!==t&&clearTimeout(t),[p,x].forEach(e=>{e.current&&cancelAnimationFrame(e.current)})}},[e]),(0,t.jsx)(s,{rows:[{label:"HOURS",pct:84,count:o,delay:0},{label:"CAPACITY",pct:36,count:l,delay:210}],active:e,color:r})}function d({active:e,color:r}){let[o,n]=(0,i.useState)(0),[l,c]=(0,i.useState)(0),[p,x]=(0,i.useState)(0),h=(0,i.useRef)(null),m=(0,i.useRef)(null),g=(0,i.useRef)(null);return(0,i.useEffect)(()=>{let t,i;return e?(a(71,n,h),t=setTimeout(()=>a(58,c,m),160),i=setTimeout(()=>a(83,x,g),320)):([h,m,g].forEach(e=>{e.current&&(cancelAnimationFrame(e.current),e.current=null)}),n(0),c(0),x(0)),()=>{void 0!==t&&clearTimeout(t),void 0!==i&&clearTimeout(i),[h,m,g].forEach(e=>{e.current&&cancelAnimationFrame(e.current)})}},[e]),(0,t.jsx)(s,{rows:[{label:"WORKAROUNDS",pct:71,count:o,delay:0},{label:"GAPS",pct:58,count:l,delay:160},{label:"FRICTION",pct:83,count:p,delay:320}],active:e,color:r})}function p({index:e,active:i,color:r}){return 0===e?(0,t.jsx)(l,{active:i,color:r}):1===e?(0,t.jsx)(c,{active:i,color:r}):(0,t.jsx)(d,{active:i,color:r})}function x({finding:e,index:n,meta:a}){let[s,l]=(0,i.useState)(!1);return(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:44},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.25},transition:{duration:.72,ease:o,delay:.22+.13*n},className:`finding-card card-${a.cssClass}`,onMouseEnter:()=>l(!0),onMouseLeave:()=>l(!1),children:[(0,t.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"20px"},children:[(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",gap:"7px"},children:[(0,t.jsx)("span",{className:"sev-label",style:{fontFamily:"var(--font-mono), monospace",fontSize:"13px",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase"},children:a.label}),(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono), monospace",fontSize:"9px",letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(13,17,71,0.28)"},children:e.code})]}),(0,t.jsx)("div",{style:{display:"flex",gap:"3px",alignItems:"center",paddingTop:"3px"},children:Array.from({length:5}).map((e,i)=>(0,t.jsx)("div",{style:{width:"14px",height:"3px",borderRadius:"1.5px",backgroundColor:s&&i<a.bars?a.hex:"rgba(13,17,71,0.09)",transition:s?`background-color 200ms ease ${90*i}ms`:"background-color 300ms ease"}},i))})]}),(0,t.jsx)("div",{className:"sev-divider",style:{height:"1px",marginBottom:"22px"}}),(0,t.jsx)("h3",{className:"font-heading",style:{fontSize:"clamp(19px, 2vw, 27px)",fontWeight:500,letterSpacing:"-0.025em",lineHeight:1.16,color:"#0D1147",margin:"0 0 14px"},children:e.statement}),(0,t.jsx)("p",{className:"font-body",style:{fontSize:"13px",lineHeight:1.78,color:"rgba(13,17,71,0.5)",margin:0},children:e.note}),(0,t.jsx)("div",{className:"viz-border",style:{marginTop:"auto",paddingTop:"22px"},children:(0,t.jsx)(p,{index:n,active:s,color:a.hex})})]})}e.s(["default",0,function(){let e=[{code:"D-01",statement:"Your website exists. It does not work for you.",note:"A site that does not convert visitors into leads is a cost with a logo on it."},{code:"D-02",statement:"Your team is doing work that should not require a human.",note:"Every hour spent on approvals and data entry is an hour your business is not growing."},{code:"D-03",statement:"You are managing your operation through workarounds.",note:"Spreadsheets, WhatsApp threads, manual handoffs. Built to cope, not to scale."}];return(0,t.jsxs)("section",{id:"home-problem","data-section-label":"Findings",style:{backgroundColor:"#FFFFFF",padding:"96px 32px 112px",position:"relative",overflow:"hidden"},children:[(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",top:"-8%",left:"-5%",width:"600px",height:"600px",background:"radial-gradient(circle, rgba(136,96,230,0.06) 0%, transparent 62%)",pointerEvents:"none"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",bottom:"-6%",right:"-4%",width:"440px",height:"440px",background:"radial-gradient(circle, rgba(61,82,230,0.05) 0%, transparent 60%)",pointerEvents:"none"}}),(0,t.jsxs)("div",{style:{maxWidth:"1200px",margin:"0 auto"},children:[(0,t.jsxs)(r.motion.div,{initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.5},transition:{duration:.62,ease:o,delay:.3},style:{marginBottom:"64px"},children:[(0,t.jsxs)("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"32px"},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"font-heading",style:{fontSize:"clamp(52px, 7vw, 96px)",fontWeight:500,letterSpacing:"-0.045em",lineHeight:.92,color:"#0D1147",margin:0},children:"The Diagnosis"}),(0,t.jsxs)("p",{style:{fontFamily:"var(--font-body), sans-serif",fontSize:"15px",lineHeight:1.6,color:"#0D1147",margin:"18px 0 0",maxWidth:"480px"},children:["This is what costs you"," ",(0,t.jsx)("span",{style:{color:"var(--accent)"},children:"time"}),", ",(0,t.jsx)("span",{style:{color:"var(--accent)"},children:"money"}),", and ",(0,t.jsx)("span",{style:{color:"var(--accent)"},children:"momentum"}),"."]})]}),(0,t.jsxs)("div",{style:{flexShrink:0,textAlign:"right",paddingBottom:"10px"},children:[(0,t.jsxs)("span",{style:{fontFamily:"var(--font-mono), monospace",fontSize:"clamp(36px, 4.5vw, 58px)",fontWeight:400,letterSpacing:"-0.04em",lineHeight:1,color:"var(--accent)",display:"block"},children:["0",e.length]}),(0,t.jsx)("span",{style:{fontFamily:"var(--font-mono), monospace",fontSize:"9px",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(61,82,230,0.5)",display:"block",marginTop:"4px"},children:"ENTRIES"})]})]}),(0,t.jsx)(r.motion.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!1,amount:.5},transition:{duration:1.1,ease:o,delay:.45},style:{height:"1px",background:"linear-gradient(to right, rgba(61,82,230,0.35), rgba(136,96,230,0.18) 55%, transparent)",transformOrigin:"left center",marginTop:"28px"}})]}),(0,t.jsx)("div",{className:"findings-grid",children:e.map((e,i)=>(0,t.jsx)(x,{finding:e,index:i,meta:n[i]},e.code))})]}),(0,t.jsx)("style",{children:`
        .findings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: stretch;
        }
        @media (max-width: 900px) {
          .findings-grid { grid-template-columns: 1fr; gap: 16px; }
        }

        /* Card base */
        .finding-card {
          display: flex;
          flex-direction: column;
          padding: 32px 30px 28px;
          background: #FFFFFF;
          border-top: 3px solid rgba(13,17,71,0.09);
          border-right: 1px solid rgba(13,17,71,0.1);
          border-bottom: 1px solid rgba(13,17,71,0.1);
          border-left: 1px solid rgba(13,17,71,0.1);
          transition:
            border-top-color 420ms ease,
            border-right-color 420ms ease,
            border-bottom-color 420ms ease,
            border-left-color 420ms ease;
          cursor: default;
        }

        .sev-label   { color: rgba(13,17,71,0.22); transition: color 420ms ease; }
        .sev-divider { background: rgba(13,17,71,0.08); transition: background 420ms ease; }
        .viz-border  { border-top: 1px solid rgba(13,17,71,0.08); transition: border-color 420ms ease; }

        /* HIGH — yellow */
        .card-high:hover {
          border-top-color: #D4A00A;
          border-right-color: rgba(212,160,10,0.26);
          border-bottom-color: rgba(212,160,10,0.26);
          border-left-color: rgba(212,160,10,0.26);
        }
        .card-high:hover .sev-label   { color: #D4A00A; }
        .card-high:hover .sev-divider { background: rgba(212,160,10,0.11); }
        .card-high:hover .viz-border  { border-color: rgba(212,160,10,0.11); }

        /* CRITICAL — orange */
        .card-critical:hover {
          border-top-color: #D0611A;
          border-right-color: rgba(208,97,26,0.26);
          border-bottom-color: rgba(208,97,26,0.26);
          border-left-color: rgba(208,97,26,0.26);
        }
        .card-critical:hover .sev-label   { color: #D0611A; }
        .card-critical:hover .sev-divider { background: rgba(208,97,26,0.11); }
        .card-critical:hover .viz-border  { border-color: rgba(208,97,26,0.11); }

        /* SYSTEMIC — red */
        .card-systemic:hover {
          border-top-color: #C8201A;
          border-right-color: rgba(200,32,26,0.26);
          border-bottom-color: rgba(200,32,26,0.26);
          border-left-color: rgba(200,32,26,0.26);
        }
        .card-systemic:hover .sev-label   { color: #C8201A; }
        .card-systemic:hover .sev-divider { background: rgba(200,32,26,0.11); }
        .card-systemic:hover .viz-border  { border-color: rgba(200,32,26,0.11); }

        @media (prefers-reduced-motion: reduce) {
          .finding-card, .sev-label, .sev-divider, .viz-border {
            transition-duration: 0.01ms !important;
          }
        }
      `})]})}])},59963,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(22016),o=e.i(68877),n=e.i(46932),a=e.i(35382),s=e.i(83411),l=e.i(12381);function c(e,...t){let i=e.length;return(0,l.useCombineMotionValues)(t.filter(s.isMotionValue),function(){let r="";for(let o=0;o<i;o++){r+=e[o];let i=t[o];i&&(r+=(0,s.isMotionValue)(i)?i.get():i)}return r})}var d=e.i(91994);let p=[.22,1,.36,1];function x({n:e,go:r}){let[o,n]=(0,i.useState)("--"),a=(0,i.useRef)(!1);return(0,i.useEffect)(()=>{if(!r||a.current)return;let t="0123456789",i=0,o=setInterval(()=>{if(++i>=22){n(e),a.current=!0,clearInterval(o);return}let r=i/22;n((r>.55?e[0]:t[Math.floor(10*Math.random())])+(r>.72?e[1]:t[Math.floor(10*Math.random())]))},38);return()=>clearInterval(o)},[r,e]),(0,t.jsx)(t.Fragment,{children:o})}function h({s:e,idx:s}){let l=(0,i.useRef)(null),[m,g]=(0,i.useState)(!1),[f,u]=(0,i.useState)(!1),v=(0,a.useMotionValue)(0),b=(0,a.useMotionValue)(0),y=c`radial-gradient(360px circle at ${v}px ${b}px, rgba(255,255,255,0.1), transparent 55%)`,j=(0,d.useSpring)(1,{stiffness:300,damping:26}),w=(0,d.useSpring)(0,{stiffness:300,damping:26});return(0,i.useEffect)(()=>{j.set(f?1.028:1),w.set(f?-7:0)},[f,j,w]),(0,i.useEffect)(()=>{let e=l.current;if(!e)return;let t=new IntersectionObserver(([e])=>{e.isIntersecting&&(g(!0),t.disconnect())},{threshold:.22});return t.observe(e),()=>t.disconnect()},[]),(0,t.jsx)(n.motion.div,{ref:l,initial:{opacity:0,y:56},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.28},transition:{duration:.78,ease:p,delay:.22+.16*s},children:(0,t.jsx)(n.motion.div,{style:{scale:j,y:w,position:"relative",height:"100%"},onHoverStart:()=>u(!0),onHoverEnd:()=>u(!1),children:(0,t.jsxs)(r.default,{href:e.href,onMouseMove:e=>{let t=e.currentTarget.getBoundingClientRect();v.set(e.clientX-t.left),b.set(e.clientY-t.top)},className:"svc3-card",children:[(0,t.jsx)(n.motion.div,{"aria-hidden":!0,style:{position:"absolute",inset:0,background:y,opacity:+!!f,transition:"opacity 260ms ease",pointerEvents:"none",zIndex:2}}),(0,t.jsx)("span",{className:"svc3-wm","aria-hidden":"true",children:e.n}),(0,t.jsxs)("div",{className:"svc3-cardhead",children:[(0,t.jsx)("span",{className:"svc3-num",children:(0,t.jsx)(x,{n:e.n,go:m})}),(0,t.jsx)("div",{className:"svc3-rule"})]}),(0,t.jsx)("h3",{className:"font-heading svc3-title",children:e.title}),(0,t.jsx)("p",{className:"font-body svc3-desc",children:e.desc}),(0,t.jsxs)("div",{className:"svc3-footer",children:[(0,t.jsx)("span",{className:"svc3-time",children:e.time}),(0,t.jsx)("span",{className:"svc3-arrow",children:(0,t.jsx)(o.ArrowRight,{size:15})})]})]})})})}e.s(["default",0,function(){return(0,t.jsxs)("section",{id:"home-services","data-section-label":"What We Build",className:"svc3-section",children:[(0,t.jsx)("style",{children:`
        .svc3-section {
          background-color: var(--bg);
          padding: 0 32px;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        /* ── Ambient ore glows ── */
        .svc3-ore-1 {
          position: absolute; top: -15%; right: -8%;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(61,82,230,0.18) 0%, transparent 65%);
          pointer-events: none;
        }
        .svc3-ore-2 {
          position: absolute; bottom: -12%; left: -6%;
          width: 720px; height: 720px; border-radius: 50%;
          background: radial-gradient(circle, rgba(136,96,230,0.13) 0%, transparent 65%);
          pointer-events: none;
        }
        .svc3-ore-3 {
          position: absolute; top: 50%; left: 40%;
          transform: translate(-50%, -50%);
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(61,82,230,0.07) 0%, transparent 60%);
          pointer-events: none;
        }

        .svc3-inner {
          max-width: 1200px; margin: 0 auto;
          padding: 80px 0; width: 100%;
          position: relative; z-index: 1;
        }
        .svc3-hdr {
          display: flex; justify-content: space-between;
          align-items: flex-end; margin-bottom: 56px;
        }
        .svc3-h2 {
          font-size: clamp(52px, 7vw, 96px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.92;
          color: #0D1147;
          margin-bottom: 14px;
        }
        .svc3-sub { font-size: 14px; color: var(--accent); line-height: 1.6; }
        .svc3-link {
          font-family: var(--font-body), sans-serif; font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #fff;
          text-decoration: none; background-color: var(--accent);
          padding: 14px 28px; border-radius: 50px;
          transition: background-color 200ms ease; flex-shrink: 0;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .svc3-link:hover { background-color: var(--accent-hover); }

        .svc3-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          align-items: stretch;
        }

        /* ── Card ── */
        .svc3-card {
          display: flex; flex-direction: column;
          padding: 52px 44px;
          text-decoration: none; color: var(--text);
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.58);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.9);
          box-shadow:
            0 8px 32px rgba(61,82,230,0.1),
            0 1px 0 rgba(255,255,255,1) inset,
            inset 0 0 0 1px rgba(61,82,230,0.06);
          transition:
            background-color 340ms ease,
            border-color 340ms ease,
            box-shadow 340ms ease;
          cursor: pointer;
          height: 100%;
        }
        .svc3-card:hover {
          background-color: var(--accent);
          border-color: var(--accent);
          box-shadow: 0 16px 56px rgba(61,82,230,0.45), 0 2px 0 rgba(255,255,255,0.18) inset;
        }

        /* Ghost number watermark */
        .svc3-wm {
          position: absolute; bottom: -20px; right: -6px;
          font-family: var(--font-mono), monospace;
          font-size: clamp(92px, 11vw, 158px);
          font-weight: 400; line-height: 1;
          color: rgba(8,9,14,0.05);
          user-select: none; pointer-events: none;
          transition: color 340ms ease, transform 500ms cubic-bezier(0.22,1,0.36,1);
        }
        .svc3-card:hover .svc3-wm {
          color: rgba(61,82,230,0.22);
          transform: scale(1.07) translateY(-4px);
        }

        /* Number + rule header row */
        .svc3-cardhead {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: 30px;
          position: relative; z-index: 3;
        }
        .svc3-num {
          font-family: var(--font-mono), monospace;
          font-size: 10px; font-weight: 500;
          letter-spacing: 0.2em;
          color: var(--accent);
          transition: color 340ms ease;
          flex-shrink: 0;
          min-width: 22px;
        }
        .svc3-card:hover .svc3-num { color: rgba(255,255,255,0.65); }

        .svc3-rule {
          flex: 1; height: 1px;
          background-color: var(--border);
          transform: scaleX(0.32);
          transform-origin: left center;
          transition:
            transform 460ms cubic-bezier(0.22,1,0.36,1),
            background-color 340ms ease;
        }
        .svc3-card:hover .svc3-rule {
          transform: scaleX(1);
          background-color: rgba(255,255,255,0.28);
        }

        /* Service title — italic on hover for editorial serif weight */
        .svc3-title {
          font-size: clamp(34px, 3.8vw, 56px);
          font-weight: 500;
          letter-spacing: -0.042em;
          line-height: 1.04;
          color: var(--text);
          margin-bottom: 22px;
          white-space: pre-line;
          transition: color 340ms ease;
          position: relative; z-index: 1;
        }
        .svc3-card:hover .svc3-title {
          color: #FAFBFF;
          font-style: italic;
        }

        /* Description — slides up from below on hover */
        .svc3-desc {
          font-size: 14px; line-height: 1.76;
          color: var(--text-secondary); flex: 1;
          opacity: 0;
          transform: translateY(11px);
          transition:
            color 340ms ease,
            opacity 340ms ease 30ms,
            transform 460ms cubic-bezier(0.22,1,0.36,1) 15ms;
          position: relative; z-index: 1;
        }
        .svc3-card:hover .svc3-desc {
          color: rgba(255,255,255,0.72);
          opacity: 1;
          transform: translateY(0);
        }

        /* Footer */
        .svc3-footer {
          margin-top: 32px; padding-top: 22px;
          border-top: 1px solid transparent;
          display: flex; justify-content: space-between; align-items: center;
          position: relative; z-index: 1;
          transition: border-color 340ms ease;
        }
        .svc3-card:hover .svc3-footer { border-color: rgba(255,255,255,0.15); }
        .svc3-time {
          font-family: var(--font-mono), monospace; font-size: 10px;
          color: var(--muted); letter-spacing: 0.06em; transition: color 340ms ease;
        }
        .svc3-card:hover .svc3-time { color: rgba(255,255,255,0.55); }
        .svc3-arrow {
          display: inline-flex; color: var(--muted);
          transition: transform 260ms cubic-bezier(0.22,1,0.36,1), color 340ms ease;
        }
        .svc3-card:hover .svc3-arrow { transform: translateX(7px); color: rgba(255,255,255,0.8); }

        @media (max-width: 768px) {
          .svc3-grid { grid-template-columns: 1fr; gap: 16px; }
          .svc3-hdr { flex-direction: column; align-items: flex-start; gap: 20px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .svc3-card, .svc3-title, .svc3-desc, .svc3-rule,
          .svc3-wm, .svc3-footer, .svc3-arrow, .svc3-num {
            transition-duration: 0.01ms !important;
          }
        }
      `}),(0,t.jsx)("div",{className:"svc3-ore-1","aria-hidden":!0}),(0,t.jsx)("div",{className:"svc3-ore-2","aria-hidden":!0}),(0,t.jsx)("div",{className:"svc3-ore-3","aria-hidden":!0}),(0,t.jsxs)("div",{className:"svc3-inner",children:[(0,t.jsxs)(n.motion.div,{className:"svc3-hdr",initial:{opacity:0,y:22},whileInView:{opacity:1,y:0},viewport:{once:!1,amount:.5},transition:{duration:.62,ease:p,delay:.28},children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"font-heading svc3-h2",children:"What We Build"}),(0,t.jsxs)("p",{className:"font-body svc3-sub",style:{color:"var(--accent)"},children:[(0,t.jsx)("span",{style:{color:"#0D1147"},children:"Three"})," ","Disciplines."," ",(0,t.jsx)("span",{style:{color:"#0D1147"},children:"One"})," ","Partner."]})]}),(0,t.jsxs)(r.default,{href:"/services",className:"svc3-link",children:["All Services ",(0,t.jsx)(o.ArrowRight,{size:10})]})]}),(0,t.jsx)("div",{className:"svc3-grid",children:[{n:"01",title:"Workflow\nAutomation",desc:"Replace manual processes with digital workflows that run themselves. Approvals, data sync, reporting.",href:"/services/automation",time:"Built to operate without us."},{n:"02",title:"Website\nDevelopment",desc:"Sites built to convert visitors into leads. Engineered for performance.",href:"/services/websites",time:"Yours to run from day one."},{n:"03",title:"Application\nDevelopment",desc:"Custom tools for exactly how your team operates. Internal portals, dashboards, integrations.",href:"/services/apps",time:"Fully documented at handoff."}].map((e,i)=>(0,t.jsx)(h,{s:e,idx:i},e.n))})]})]})}],59963)},22756,e=>{"use strict";var t=e.i(43476),i=e.i(71645),r=e.i(46932);let o=[.22,1,.36,1];function n({hovered:e}){return(0,t.jsx)("div",{"aria-hidden":!0,style:{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"6px",width:"74px"},children:[1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1].map((i,r)=>(0,t.jsx)("div",{style:{width:"10px",height:"10px",backgroundColor:i?e?"var(--accent)":"rgba(61,82,230,0.32)":e?"rgba(61,82,230,0.1)":"rgba(61,82,230,0.07)",transition:`background-color 220ms ease ${14*r}ms`}},r))})}function a({hovered:e}){return(0,t.jsx)("div",{"aria-hidden":!0,style:{display:"flex",alignItems:"flex-end",gap:"4px",height:"52px",width:"74px"},children:[.3,.58,.42,.92,.65,.78,.48].map((i,r)=>(0,t.jsx)("div",{style:{flex:1,height:e?`${100*i}%`:"8%",backgroundColor:3===r?"var(--accent)":"rgba(61,82,230,0.32)",borderRadius:"1px 1px 0 0",transition:`height 520ms cubic-bezier(0.22,1,0.36,1) ${55*r}ms`}},r))})}function s({hovered:e}){return(0,t.jsx)("div",{"aria-hidden":!0,style:{display:"flex",flexDirection:"column",gap:"10px"},children:[0,1,2].map(i=>(0,t.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"9px"},children:[(0,t.jsx)("div",{style:{width:"13px",height:"13px",flexShrink:0,border:`1px solid ${e?"rgba(61,82,230,0.55)":"rgba(61,82,230,0.18)"}`,display:"flex",alignItems:"center",justifyContent:"center",transition:`border-color 200ms ease ${100*i}ms`},children:(0,t.jsx)("svg",{width:"7",height:"6",viewBox:"0 0 7 6",style:{opacity:+!!e,transition:`opacity 200ms ease ${100*i+90}ms`},children:(0,t.jsx)("path",{d:"M1 3L3 5L6 1",stroke:"var(--accent)",strokeWidth:"1.4",fill:"none",strokeLinecap:"round",strokeLinejoin:"round"})})}),(0,t.jsx)("div",{style:{height:"1px",width:"48px",backgroundColor:e?"rgba(61,82,230,0.4)":"rgba(61,82,230,0.18)",transition:`background-color 200ms ease ${80*i}ms`}})]},i))})}function l({index:e,hovered:i}){return 0===e?(0,t.jsx)(n,{hovered:i}):1===e?(0,t.jsx)(a,{hovered:i}):(0,t.jsx)(s,{hovered:i})}function c({standard:e,index:n}){let[a,s]=(0,i.useState)(!1);return(0,t.jsxs)(r.motion.div,{initial:{opacity:0,scale:.91},whileInView:{opacity:1,scale:1},viewport:{once:!1,amount:.28},transition:{duration:.68,ease:o,delay:.28+.12*n},onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),style:{padding:"40px 36px",background:a?"rgba(61,82,230,0.1)":"rgba(61,82,230,0.05)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",border:`1px solid ${a?"rgba(61,82,230,0.55)":"rgba(61,82,230,0.22)"}`,boxShadow:a?"0 8px 40px rgba(61,82,230,0.12), inset 0 1px 0 rgba(255,255,255,0.8)":"0 2px 16px rgba(61,82,230,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",transition:"background 380ms ease, border-color 380ms ease",position:"relative",overflow:"hidden",cursor:"default",display:"flex",flexDirection:"column"},children:[(0,t.jsx)("h3",{className:"font-heading",style:{fontSize:"clamp(20px, 2.2vw, 30px)",fontWeight:500,letterSpacing:"-0.025em",color:a?"#3D52E6":"#0D1147",lineHeight:1.1,marginBottom:"14px",transition:"color 280ms ease",position:"relative",zIndex:1},children:e.title}),(0,t.jsx)("div",{style:{height:"1px",background:a?"rgba(61,82,230,0.55)":"rgba(61,82,230,0.2)",marginBottom:"16px",transform:`scaleX(${a?1:.35})`,transformOrigin:"left",transition:"transform 480ms cubic-bezier(0.22,1,0.36,1), background 280ms ease",position:"relative",zIndex:1}}),(0,t.jsx)("p",{className:"font-body",style:{fontSize:"13px",lineHeight:1.8,color:a?"rgba(13,17,71,0.72)":"rgba(13,17,71,0.52)",margin:0,flex:1,transition:"color 280ms ease",position:"relative",zIndex:1},children:e.body}),(0,t.jsx)("div",{style:{marginTop:"24px",position:"relative",zIndex:1},children:(0,t.jsx)(l,{index:n,hovered:a})})]})}e.s(["default",0,function(){return(0,t.jsxs)("section",{id:"home-why","data-section-label":"Why Obsidia",style:{minHeight:"100dvh",display:"flex",flexDirection:"column",justifyContent:"center",padding:"64px 32px",position:"relative",overflow:"hidden",backgroundColor:"#FFFFFF",borderTop:"1px solid var(--border)"},children:[(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle, rgba(61,82,230,0.28) 1px, transparent 1px)",backgroundSize:"36px 36px",opacity:.45,pointerEvents:"none"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",bottom:"-25%",left:"50%",transform:"translateX(-50%)",width:"900px",height:"600px",background:"radial-gradient(ellipse, rgba(61,82,230,0.18) 0%, transparent 65%)",pointerEvents:"none"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",top:"-10%",left:"-5%",width:"500px",height:"500px",background:"radial-gradient(circle, rgba(136,96,230,0.08) 0%, transparent 60%)",pointerEvents:"none"}}),(0,t.jsx)("div",{"aria-hidden":!0,style:{position:"absolute",top:0,right:"22%",bottom:0,width:"1px",background:"linear-gradient(to bottom, transparent, rgba(61,82,230,0.1) 20%, rgba(61,82,230,0.1) 80%, transparent)",pointerEvents:"none"}}),(0,t.jsxs)("div",{style:{maxWidth:"1200px",margin:"0 auto",width:"100%",position:"relative",zIndex:1},children:[(0,t.jsxs)(r.motion.div,{initial:{opacity:0,x:-36},whileInView:{opacity:1,x:0},viewport:{once:!1,amount:.5},transition:{duration:.7,ease:o,delay:.28},style:{marginBottom:"40px"},children:[(0,t.jsxs)("h2",{className:"font-heading",style:{fontSize:"clamp(52px, 7vw, 96px)",fontWeight:500,letterSpacing:"-0.045em",lineHeight:.92,color:"#0D1147",marginBottom:"18px"},children:["Three standards.",(0,t.jsx)("br",{}),(0,t.jsx)("em",{style:{color:"var(--accent)",fontStyle:"italic"},children:"No exceptions."})]}),(0,t.jsxs)("p",{className:"font-body",style:{fontSize:"14px",lineHeight:1.6,textTransform:"uppercase",letterSpacing:"0.06em",margin:0},children:[(0,t.jsx)("span",{style:{color:"#0D1147"},children:"Obsidia"})," ",(0,t.jsx)("span",{style:{color:"var(--accent)"},children:"Standards"})]})]}),(0,t.jsx)(r.motion.div,{initial:{scaleX:0},whileInView:{scaleX:1},viewport:{once:!1,amount:.5},transition:{duration:.9,ease:o,delay:.44},style:{height:"1px",background:"rgba(61,82,230,0.22)",marginBottom:"32px",transformOrigin:"left center"}}),(0,t.jsx)("div",{className:"pillars-grid",children:[{n:"01",title:"We audit before we build.",body:"We map before we build. No assumptions, no proposals built on guesswork."},{n:"02",title:"Weeks, not quarters.",body:"Urgency is a design constraint, not a risk. Delivery is planned before build begins."},{n:"03",title:"Built to hand off.",body:"When the engagement ends, your team runs it. Full documentation and a walkthrough on every project, without exception."}].map((e,i)=>(0,t.jsx)(c,{standard:e,index:i},e.n))})]}),(0,t.jsx)("style",{children:`
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: 1fr; gap: 12px; }
        }
      `})]})}])}]);