/*
  • Fixed by Jarsépay
  • Github: https://github.com/jarsepay
  • Bot Script: https://github.com/jarsepay/Jarspy-Bot
  • My Bot: https://chat.whatsapp.com/KieFrG8MEt7C99IJKYS8qE
  • Ada kesulitan? Hubungi saya wa.me/6282148864989 (Jarsépay)
*/

// NOTE: KODE INI TIDAK DI ENC, FIX ERROR

console.log("Starting...");import{join,dirname}from"path";import{createRequire}from"module";import{fileURLToPath}from"url";import script from"./jarspy/jarspy-script.js";import{setupMaster,fork}from"cluster";import{watchFile,unwatchFile}from"fs";import cfonts from"cfonts";import tqto from"./jarspy/jarspy-tqto.js";import{createInterface}from"readline";import Helper from"./lib/helper.js";const __dirname=dirname(fileURLToPath(import.meta.url)),require=createRequire(__dirname),description=require(join(__dirname,"./package.json"))["description"],say=cfonts["say"],rl=createInterface(process.stdin,process.stdout);say("Lightweight\nWhatsApp Bot",{font:"chrome",align:"center",gradient:["red","magenta"]}),say(""+description,{font:"console",align:"center",gradient:["red","magenta"]});var isRunning=!1;function start(i){if(!isRunning){isRunning=!0;let t=[join(__dirname,i),...process.argv.slice(2)],r=(say([process.argv[0],...t].join(" "),{font:"console",align:"center",gradient:["red","magenta"]}),setupMaster({exec:t[0],args:t.slice(1)}),fork());r.on("message",e=>{switch(console.log("[RECEIVED]",e),e){case"reset":r.process.kill(),isRunning=!1,start.apply(this,arguments);break;case"uptime":r.send(process.uptime())}}),r.on("exit",(e,r)=>{isRunning=!1,console.error("Exited with code:",r),0!==r&&watchFile(t[0],()=>{unwatchFile(t[0]),start(i)})}),Helper.opts.test||rl.listenerCount()||rl.on("line",e=>{r.emit("message",e.trim())})}}start("jarspy.js");