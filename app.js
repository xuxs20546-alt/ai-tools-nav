// AI工具导航 - app.js
const catMap = {
  chat:'💬 AI 对话',writing:'✍️ AI 写作',image:'🎨 AI 绘画',video:'🎬 AI 视频',
  audio:'🎵 AI 音频',code:'💻 AI 编程',design:'🎯 AI 设计',productivity:'⚡ AI 效率',
  research:'🔍 AI 搜索',education:'📚 AI 教育'
};
let tools=[],filtered=[],currentCat='all',currentSort='default',favs=JSON.parse(localStorage.getItem('ai-nav-favs')||'[]');

function init(){
  const el=document.getElementById('tools-data');
  if(!el){console.error('tools-data not found');return;}
  try{tools=JSON.parse(el.textContent);}catch(e){console.error('JSON parse error:',e);return;}
  filtered=[...tools];
  renderCats();
  renderTools();
  renderHotList();
  document.getElementById('statTools').textContent=tools.length;
  document.getElementById('favCount').textContent=favs.length;
  document.getElementById('searchInput').addEventListener('input',doSearch);
  window.addEventListener('scroll',()=>{
    const b=document.getElementById('backTop');
    b.style.display=window.scrollY>400?'block':'none';
  });
}

function renderCats(){
  const nav=document.getElementById('categories');
  const counts={};tools.forEach(t=>{counts[t.cat]=(counts[t.cat]||0)+1;});
  let html='<span class="cat-btn active" data-cat="all" onclick="selectCat(\'all\')">🌟 全部 ('+tools.length+')</span>';
  for(const[c,name]of Object.entries(catMap)){
    html+='<span class="cat-btn" data-cat="'+c+'" onclick="selectCat(\''+c+'\')">'+name+' ('+(counts[c]||0)+')</span>';
  }
  nav.innerHTML=html;
}

function selectCat(cat){
  currentCat=cat;
  document.querySelectorAll('.cat-btn').forEach(b=>{b.classList.toggle('active',b.dataset.cat===cat);});
  doFilter();
}

function setSort(sort){
  currentSort=sort;
  document.querySelectorAll('.sort-btn').forEach(b=>{b.classList.toggle('active',b.dataset.sort===sort);});
  doFilter();
}

function doSearch(){
  const q=document.getElementById('searchInput').value.trim().toLowerCase();
  const c=document.getElementById('searchClear');
  c.style.display=q?'inline':'none';
  filtered=tools.filter(t=>{
    if(currentCat!=='all'&&t.cat!==currentCat)return false;
    if(q&&!t.name.toLowerCase().includes(q)&&!t.desc.toLowerCase().includes(q)&&!(t.tags||[]).some(tag=>tag.includes(q)))return false;
    return true;
  });
  applySort();
  renderTools();
}

function doFilter(){doSearch();}

function applySort(){
  if(currentSort==='hot')filtered.sort((a,b)=>(parseInt(b.views)||0)-(parseInt(a.views)||0));
  else if(currentSort==='new')filtered.sort((a,b)=>(b.date||'').localeCompare(a.date||''));
}

function renderTools(){
  const c=document.getElementById('content');
  const info=document.getElementById('resultInfo');
  if(!filtered.length){c.innerHTML='<div class="empty-state"><div class="empty-icon">🔍</div><p>没有找到匹配的工具</p></div>';info.textContent='';return;}
  info.textContent='共 '+filtered.length+' 个工具';
  let html='<div class="tool-grid">';
  filtered.forEach((t,i)=>{
    const isFav=favs.includes(t.name);
    const hot=t.tags&&t.tags.includes('hot');
    const free=t.tags&&t.tags.includes('free');
    const tags=(t.tags||[]).map(tag=>{
      if(tag==='hot')return'<span class="tag hot">🔥 热门</span>';
      if(tag==='free')return'<span class="tag free">✨ 免费</span>';
      if(tag==='new')return'<span class="tag new">🆕 新品</span>';
      return'';
    }).join('');
    html+='<div class="tool-card" onclick="showDetail(\''+t.name+'\')">'
      +'<div class="card-header"><span class="tool-icon" style="background:'+t.color+'">'+t.icon+'</span>'
      +'<h3 class="tool-name">'+t.name+'</h3>'
      +'<button class="fav-btn '+(isFav?'active':'')+'" onclick="event.stopPropagation();toggleFav(\''+t.name.replace(/'/g,"\\'")+'\')">'+(isFav?'❤️':'🤍')+'</button></div>'
      +'<p class="tool-desc">'+t.desc+'</p>'
      +'<div class="card-footer"><span class="cat-tag">'+catMap[t.cat]+'</span>'
      +'<span class="views">👁 '+t.views+'</span></div>'
      +(tags?'<div class="card-tags">'+tags+'</div>':'')
      +'</div>';
  });
  html+='</div>';
  c.innerHTML=html;
}

function renderHotList(){
  const list=document.getElementById('hotList');
  const sorted=[...tools].sort((a,b)=>(parseInt(b.views)||0)-(parseInt(a.views)||0)).slice(0,10);
  list.innerHTML=sorted.map((t,i)=>'<li onclick="showDetail(\''+t.name+'\')"><span class="rank '+(i<3?'top':'')+'">'+(i+1)+'</span><span class="tool-icon-sm">'+t.icon+'</span><span class="tool-name-sm">'+t.name+'</span><span class="views-sm">'+t.views+'</span></li>').join('');
}

function toggleFav(name){
  const idx=favs.indexOf(name);
  if(idx>-1)favs.splice(idx,1);else favs.push(name);
  localStorage.setItem('ai-nav-favs',JSON.stringify(favs));
  document.getElementById('favCount').textContent=favs.length;
  renderTools();
}

function showFavorites(){
  currentCat='all';
  document.querySelectorAll('.cat-btn').forEach(b=>{b.classList.toggle('active',b.dataset.cat==='all');});
  document.getElementById('searchInput').value='';
  document.getElementById('searchClear').style.display='none';
  if(!favs.length){filtered=[];applySort();renderTools();showToast('⭐ 还没有收藏的工具');return;}
  filtered=tools.filter(t=>favs.includes(t.name));
  applySort();renderTools();
  document.getElementById('resultInfo').textContent='⭐ 收藏 '+filtered.length+' 个工具';
}

function showDetail(name){
  const t=tools.find(x=>x.name===name);if(!t)return;
  const isFav=favs.includes(t.name);
  const feats=(t.features||[]).map(f=>'<li>'+f+'</li>').join('');
  document.getElementById('detailContent').innerHTML='<h2>'+t.icon+' '+t.name+'</h2>'
    +'<p class="detail-cat">'+catMap[t.cat]+'</p>'
    +'<p class="detail-desc">'+t.desc+'</p>'
    +'<div class="detail-stats"><span>👁 '+t.views+'</span><span>🏷️ '+catMap[t.cat]+'</span></div>'
    +(feats?'<ul class="detail-features">'+feats+'</ul>':'')
    +'<div class="detail-actions"><a href="https://'+t.url+'" target="_blank" class="btn btn-primary">🔗 访问网站</a>'
    +'<button class="btn btn-ghost" onclick="toggleFav(\''+t.name.replace(/'/g,"\\'")+'\');showDetail(\''+t.name.replace(/'/g,"\\'")+'\')">'+(isFav?'❤️ 已收藏':'🤍 收藏')+'</button></div>';
  document.getElementById('detailModal').classList.add('active');
}

function closeModal(id){
  document.querySelectorAll('.modal-overlay').forEach(m=>m.classList.remove('active'));
}

function clearSearch(){
  document.getElementById('searchInput').value='';
  document.getElementById('searchClear').style.display='none';
  doFilter();
}

function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}

function submitTool(){
  const name=document.getElementById('subName').value.trim();
  const url=document.getElementById('subUrl').value.trim();
  const desc=document.getElementById('subDesc').value.trim();
  if(!name||!url||!desc){showToast('❌ 请填写必填项');return;}
  showToast('✅ 提交成功，感谢推荐！');
  closeModal();
  document.getElementById('subName').value='';
  document.getElementById('subUrl').value='';
  document.getElementById('subDesc').value='';
  document.getElementById('subContact').value='';
}

function openModal(){document.getElementById('submitModal').classList.add('active');}

document.addEventListener('DOMContentLoaded',init);
document.addEventListener('click',e=>{
  if(e.target.classList.contains('modal-overlay'))e.target.classList.remove('active');
});
