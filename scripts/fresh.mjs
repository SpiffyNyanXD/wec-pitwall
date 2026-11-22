import { chromium } from 'playwright';import {spawn} from 'node:child_process';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','8099','--strictPort'],{cwd:process.cwd(),stdio:'ignore'});await new Promise(r=>setTimeout(r,600));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
for(const w of [1440,1024,390]){
  for(const route of ['/teams/7','/teams/toyota-7','/cookie-preferences','/teams/50']){
    const p=await b.newPage({viewport:{width:w,height:w===390?844:900}});
    await p.goto('http://127.0.0.1:8099'+route);await p.waitForTimeout(1500);
    const r=await p.evaluate(()=>({title:document.title,h1:(document.querySelector('main h1, main h2')||{}).textContent||'',nf:document.body.innerText.includes('Off the Racing Line'),errors:0,sw:document.documentElement.scrollWidth}));
    console.log(w,route,JSON.stringify(r));
    await p.close();
  }
}
await b.close();server.kill();
