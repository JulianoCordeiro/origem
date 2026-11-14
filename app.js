const profiles=[
  {
    "id": "001",
    "name": "Priscila Prado Teixeira",
    "profession": "Arquiteta",
    "dob": "1994-04-09",
    "sex": "Feminino",
    "photo": "fotos/priscila.jfif",
    "role": "Arquitetura Espacial",
    "line": "Certas falhas sempre chamaram sua atenção. Seu novo nível de acesso permitirá investigá-las."
  },
  {
    "id": "002",
    "name": "Thamiriz Prado Teixeira",
    "profession": "Marketing",
    "dob": "2000-05-31",
    "sex": "Feminino",
    "photo": "fotos/thamiriz.jfif",
    "role": "Comunicação e Coerência",
    "line": "Há conexões que precisam ser preservadas. Sua convocação faz parte do protocolo de continuidade."
  },
  {
    "id": "003",
    "name": "Gustavo Heil Antunes",
    "profession": "Arquiteto",
    "dob": "1994-11-29",
    "sex": "Masculino",
    "photo": "fotos/gustavo.jfif",
    "role": "Integridade Estrutural",
    "line": "Sua capacidade de perceber desvios foi registrada. Instruções adicionais serão liberadas na transmissão."
  },
  {
    "id": "004",
    "name": "Reneé Augusto Ribeiro",
    "profession": "Analista e Desenvolvedor de Sistemas",
    "dob": "1995-09-17",
    "sex": "Masculino",
    "photo": "fotos/renee.jfif",
    "role": "Sistemas e Continuidade",
    "line": "A continuidade depende do que permanece. Seu registro foi selecionado para preservar essa integridade."
  }
];
let step=0,answers={dob:'',sex:'',appearance:''};const app=document.querySelector('#app');const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(error=''){app.innerHTML=`<div class="layout"><section><p class="eyebrow">PROTOCOLO DE RECONHECIMENTO / 3450</p><h1>O ciclo continua.<br><em>Você foi localizado.</em></h1><p class="intro">Quatro registros foram convocados para a próxima etapa.<br>Confirme sua identidade para acessar a transmissão de continuidade.</p><div class="orb" aria-hidden="true"><div class="orbitline"></div><div class="sphere"></div><div class="mono">NÚCLEO DE O.R.I.G.E.M.<br>4 REGISTROS VINCULADOS<br>AGUARDANDO IDENTIFICAÇÃO<br>────────────<br>SINAL ATIVO _</div></div></section><section class="card"><div class="cardtop"><span>VERIFICAÇÃO DE IDENTIDADE</span><span>0${step+1} / 03</span></div><div class="steps">${[0,1,2].map(i=>`<span class="${i<=step?'on':''}"></span>`).join('')}</div><form id="form"><h2>${['Quando você chegou aqui?','Como consta no seu registro?','Como você se descreveria?'][step]}</h2><p class="hint">${['Informe sua data de nascimento para localizar o início do seu registro.','Selecione o sexo informado no cadastro.','Descreva cabelo, olhos, altura ou algum traço marcante. Esse campo apenas complementa sua ficha.'][step]}</p>${step===0?`<label for="dob">Data de nascimento</label><input id="dob" type="date" required min="1900-01-01" max="${new Date().toISOString().slice(0,10)}" value="${answers.dob}">`:step===1?`<label>Sexo</label><div class="choices" role="group" aria-label="Sexo">${['Masculino','Feminino'].map(s=>`<button type="button" class="choice ${answers.sex===s?'selected':''}" aria-pressed="${answers.sex===s}" data-sex="${s}">${s}</button>`).join('')}</div>`:`<label for="appearance">Descrição da aparência</label><textarea id="appearance" required maxlength="600" placeholder="Ex.: cabelo castanho curto, olhos escuros, uso óculos…">${esc(answers.appearance)}</textarea>`}${error?`<p class="error" role="alert">${error}</p>`:''}<button class="primary" type="submit">${step===2?'Localizar meu arquivo':'Continuar'} <span></span></button>${step?'<button type="button" class="back"> Voltar uma etapa</button>':''}<div class="note"><span>⌁</span><span>CICLO 3450 · 4 SUCESSORES CONVOCADOS.<br>SEU NOME NÃO SERÁ SOLICITADO.</span></div></form></section></div>`;
document.querySelectorAll('[data-sex]').forEach(b=>b.onclick=()=>{answers.sex=b.dataset.sex;document.querySelectorAll('[data-sex]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b))})});document.querySelector('.back')?.addEventListener('click',()=>{if(step===2)answers.appearance=document.querySelector('#appearance').value;step--;render()});document.querySelector('#form').onsubmit=e=>{e.preventDefault();if(step===0)answers.dob=document.querySelector('#dob').value;if(step===1&&!answers.sex)return render('Selecione uma das opções para continuar.');if(step===2){answers.appearance=document.querySelector('#appearance').value.trim();if(!answers.appearance)return render('Inclua uma breve descrição da sua aparência.');const matches=profiles.filter(p=>p.dob===answers.dob&&p.sex===answers.sex);if(matches.length!==1){step=0;answers={dob:'',sex:'',appearance:''};return render('ERRO DE IDENTIFICAÇÃO: os dados não correspondem a um registro autorizado. Protocolo reiniciado. Confira sua data de nascimento e sexo.');}app.innerHTML='<section class="loading" aria-live="polite"><div class="spinner"></div><p class="eyebrow">VALIDANDO VÍNCULO / CICLO 3450</p><h2>Compatibilidade de sucessão confirmada.</h2><p class="muted">Recuperando instruções da próxima gestão…</p></section>';setTimeout(()=>dossier(matches[0]),1300)}else{step++;render()}}}
function dossier(p){try{sessionStorage.setItem('origem3450',JSON.stringify({id:p.id,answers}));}catch{}history.replaceState(null,'','#arquivo-'+p.id);app.innerHTML=`<section class="dossier"><div class="dhead"><div><p class="eyebrow">REGISTRO LOCALIZADO / O.R.I.G.E.M.</p><h1>Olá, ${esc(p.name.split(' ')[0])}.</h1><p class="muted">Seu registro foi transferido para o ciclo 3450.</p></div><span class="badge">CICLO 3450 / CADEIRA ${p.id}</span></div><div class="profilegrid"><aside><div class="avatar profile-photo"><img src="${esc(p.photo)}" alt="Foto de ${esc(p.name)}"><span class="photo-id">CADEIRA ${p.id} / CICLO 3450</span></div><div class="fields"><div class="field"><small>IDENTIFICAÇÃO</small><p>${esc(p.name)}</p></div><div class="field"><small>PROFISSÃO / REGISTRO CIVIL</small><p>${esc(p.profession)}</p></div><div class="field"><small>DATA DE NASCIMENTO</small><p>${p.dob.split('-').reverse().join('/')}</p></div><div class="field"><small>SEXO</small><p>${p.sex}</p></div><div class="field"><small>APARÊNCIA INFORMADA</small><p>${esc(answers.appearance)}</p></div><div class="field"><small>ATRIBUIÇÃO / AGUARDANDO ATIVAÇÃO</small><p>${p.role}</p></div></div></aside><div><div class="video"><p class="eyebrow">TRANSMISSÃO DE SUCESSÃO / ${p.id}</p><div class="play" aria-hidden="true"></div><h2>Instruções de continuidade.</h2><p class="hint">Canal reservado à sua credencial.<br>Aguardando liberação da transmissão de continuidade.</p><span class="badge">TRANSMISSÃO PENDENTE</span></div><div class="message">“Olá, ${esc(p.name.split(' ')[0])}. ${p.line}”</div><p class="muted">CANAL INDIVIDUAL · CICLO 3450</p></div></div><p class="session-lock">PROTOCOLO ATIVADO · VÍNCULO DE CONTINUIDADE ESTABELECIDO</p></section>`;mountVideo(p);window.scrollTo(0,0)}
function reset(){const active=getActiveProtocol();if(active){answers=active.answers;dossier(active.profile);return;}location.hash='';step=0;answers={dob:'',sex:'',appearance:''};render()}document.querySelector('.brand').onclick=e=>{e.preventDefault();reset()};document.querySelector('#about').onclick=()=>document.querySelector('#info').showModal();document.querySelector('.close').onclick=()=>document.querySelector('#info').close();render();

// Documentos narrativos restritos: a censura faz parte da experiência fictícia.
const baseRender=render,baseDossier=dossier;
function addClassified(){const target=document.querySelector('.layout>section:first-child')||document.querySelector('.dossier');if(!target||target.querySelector('.classified'))return;const block=document.createElement('section');block.className='classified';block.innerHTML='<p class="restricted-label">DIVISÃO DE CONTINUIDADE / NÍVEL 05</p><p>CICLOS ANTERIORES · ACESSO COMPARTIMENTADO</p><button class="redacted" type="button" aria-label="Abrir documento censurado: operação"><span class="secret" aria-hidden="true">CICLO 3449 / TITULARES ███████</span></button><button class="redacted" type="button" aria-label="Abrir documento censurado: relatório"><span class="secret" aria-hidden="true">ENCERRAMENTO VITAL / ███████</span></button><p class="restricted-label">ULTRASSECRETO · ACESSO COMPARTIMENTADO</p>';target.append(block);const ledger=document.createElement('div');ledger.className='cycle-ledger';ledger.innerHTML='<div><small>PROTOCOLO ANTERIOR</small><strong>3449 / ENCERRADO</strong></div><div><small>CADEIRAS EM TRANSIÇÃO</small><strong>01 · 02 · 03 · 04</strong></div><div><small>CONTINUIDADE DO AMBIENTE</small><strong class=active-state>PRESERVADA</strong></div><p>Última gestão: arquivo selado.<br>Motivo da vacância: [RESTRITO]<br>Próxima etapa: instrução individual.</p>';block.before(ledger);block.querySelectorAll('button').forEach(b=>b.onclick=()=>{location.href='acesso-negado.html'});if(document.querySelector('.card')&&!document.querySelector('.classification')){const tag=document.createElement('div');tag.className='classification';tag.textContent='O.R.I.G.E.M. / DIRETRIZ DE SUCESSÃO 3450';document.querySelector('.card').prepend(tag)}}
render=function(...args){baseRender(...args);addClassified()};dossier=function(...args){baseDossier(...args);addClassified()};addClassified();

// A ativação é preservada durante esta sessão, inclusive após consultar arquivos restritos.
function getActiveProtocol(){try{const saved=JSON.parse(sessionStorage.getItem('origem3450')||'null');const profile=profiles.find(p=>p.id===saved?.id);if(!profile||typeof saved.answers?.appearance!=='string'||saved.answers.dob!==profile.dob||saved.answers.sex!==profile.sex)return null;return {profile,answers:saved.answers};}catch{return null;}}
function restoreProtocol(){const active=getActiveProtocol();if(active){answers=active.answers;dossier(active.profile);}}
restoreProtocol();
window.addEventListener('pageshow',restoreProtocol);
window.addEventListener('popstate',restoreProtocol);

// Preencher apenas os endereços quando os quatro vídeos estiverem prontos.
function mountVideo(profile){
 const source=window.ORIGEM_VIDEOS?.[profile.id];
 if(!source)return;
 const panel=document.querySelector('.video');
 panel.innerHTML='<p class="eyebrow">TRANSMISSÃO DE SUCESSÃO / '+profile.id+'</p><button class="transmission-button" type="button"><span class="transmission-icon" aria-hidden="true">◉</span><strong>INICIAR TRANSMISSÃO</strong><span>CANAL INDIVIDUAL / CICLO 3450</span></button><p class="muted">Toque para abrir sua transmissão.</p>';
 panel.querySelector('button').addEventListener('click',()=>openTransmission(source,profile));
}
function openTransmission(source,profile){
 if(document.querySelector('.transmission-overlay'))return;
 const trigger=document.activeElement;
 const overlay=document.createElement('div');overlay.className='transmission-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Transmissão de '+profile.name.split(' ')[0]);
 const close=document.createElement('button');close.className='transmission-close';close.textContent='FECHAR TRANSMISSÃO';
 const player=document.createElement('video');player.controls=true;player.preload='auto';player.src=source;player.setAttribute('aria-label','Vídeo individual');
 const status=document.createElement('p');status.className='transmission-status';status.setAttribute('role','status');
 const previousOverflow=document.body.style.overflow;
 const background=[...document.querySelectorAll('header,main,footer')];background.forEach(el=>el.inert=true);
 function finish(){player.pause();player.removeAttribute('src');player.load();overlay.remove();document.body.style.overflow=previousOverflow;background.forEach(el=>el.inert=false);document.removeEventListener('keydown',onKey);trigger?.focus();}
 function onKey(event){if(event.key==='Escape'&&!document.fullscreenElement)finish();if(event.key==='Tab'){const focusable=[close,player];if(event.shiftKey&&document.activeElement===close){event.preventDefault();player.focus()}else if(!event.shiftKey&&document.activeElement===player){event.preventDefault();close.focus()}}}
 close.onclick=()=>{if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{});finish()};
 player.addEventListener('error',()=>{status.textContent='Transmissão indisponível. Verifique se o arquivo MP4 foi colocado na pasta videos.'});
 let nativeAttempt=false;
 function nativeFullscreen(){if(!nativeAttempt&&typeof player.webkitEnterFullscreen==='function'){try{player.webkitEnterFullscreen();nativeAttempt=true}catch{}}}
 player.addEventListener('loadedmetadata',nativeFullscreen,{once:true});
 player.addEventListener('webkitendfullscreen',()=>player.pause());
 overlay.append(close,player,status);document.body.append(overlay);document.body.style.overflow='hidden';document.addEventListener('keydown',onKey);close.focus();
 // Solicitação dentro do gesto do usuário. O navegador decide se permite tela cheia.
 if(typeof player.webkitEnterFullscreen==='function'){nativeFullscreen()}else if(player.requestFullscreen){try{const request=player.requestFullscreen();request?.catch(()=>{})}catch{}}
 const playback=player.play();playback?.catch(()=>{if(!player.error)status.textContent='Toque no controle de reprodução para iniciar.'});
}
