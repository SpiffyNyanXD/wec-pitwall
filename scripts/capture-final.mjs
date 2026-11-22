import { chromium } from 'playwright';import {spawn} from 'node:child_process';import fs from 'node:fs';
const server=spawn(process.execPath,['node_modules/vite/bin/vite.js','preview','--host','127.0.0.1','--port','8099','--strictPort'],{cwd:process.cwd(),stdio:'ignore'});await new Promise(r=>setTimeout(r,600));
const b=await chromium.launch({executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
const shots=[[1440,'/'],[1440,'/circuits'],[1440,'/compare'],[1440,'/drivers/sebastien-buemi'],[1024,'/'],[1024,'/circuits'],[1024,'/compare'],[1024,'/schedule'],[390,'/'],[390,'/circuits'],[390,'/compare'],[390,'/teams/007']];
fs.mkdirSync('verification/final2',{recursive:true});
for(const [w,route] of shots){
  const p=await b.newPage({viewport:{width:w,height:w===390?844:900},colorScheme:'dark'});
  await p.goto('http://127.0.0.1:8099'+route);await p.waitForTimeout(1800);
  await p.screenshot({path:`verification/final2/${w}${route.replace(/\//g,'_')}.png`});
  await p.close();
}
await b.close();server.kill();console.log('captured',shots.length);
