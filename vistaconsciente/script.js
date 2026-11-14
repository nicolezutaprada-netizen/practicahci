'use strict';
const clock=document.querySelector('#clock');
const start=document.querySelector('#start');
const reset=document.querySelector('#reset');
const feedback=document.querySelector('#feedback');
const count=document.querySelector('#count');
const progress=document.querySelector('#progress');
const bar=document.querySelector('#bar-inner');
const reminders=document.querySelector('#reminders');
const status=document.querySelector('#estado');
let remaining=20*60, interval=null, completed=4;
function draw(){const m=Math.floor(remaining/60),s=remaining%60;clock.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
function pauseDone(){clearInterval(interval);interval=null;start.textContent='Iniciar otra pausa';completed=Math.min(6,completed+1);count.textContent=`${String(completed).padStart(2,'0')} / 06`;progress.setAttribute('aria-valuenow',String(completed));bar.style.width=`${completed/6*100}%`;feedback.textContent='¡Pausa completada! Has cuidado tu vista.';remaining=20*60;draw();}
start.addEventListener('click',()=>{if(interval){clearInterval(interval);interval=null;start.textContent='Continuar pausa';feedback.textContent='Temporizador en pausa.';return;}if(remaining===0)remaining=20*60;start.textContent='Pausar';feedback.textContent='Temporizador iniciado. Recuerda mirar lejos de la pantalla.';interval=setInterval(()=>{remaining--;draw();if(remaining<=0)pauseDone();},1000);});
reset.addEventListener('click',()=>{clearInterval(interval);interval=null;remaining=20*60;draw();start.textContent='Iniciar pausa';feedback.textContent='Temporizador reiniciado.';});
reminders.addEventListener('change',()=>{status.textContent=reminders.checked?'● Recordatorios activos':'○ Recordatorios desactivados';});