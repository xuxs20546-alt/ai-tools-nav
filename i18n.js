/**
 * 蜂巢 AI 多语言系统 (i18n)
 * 支持: 中文·English·Deutsch·Français·日本語·Русский
 */
(function(){
  'use strict';
  var LANG_KEY='hive-lang', SUPPORTED=['zh','en','de','fr','ja','ru'];
  var LANG_NAMES={zh:'🇨🇳 中文',en:'🇺🇸 English',de:'🇩🇪 Deutsch',fr:'🇫🇷 Français',ja:'🇯🇵 日本語',ru:'🇷🇺 Русский'};
  var LANG_HTML={zh:'zh-CN',en:'en',de:'de',fr:'fr',ja:'ja',ru:'ru'};
  var DICT={};
  function A(key){var e=DICT[key];if(!e)return key;var v=e[currentLang]||e['zh']||key;return v;}

  // ═════ 翻译字典 ═════
  function loadDict(){
    DICT={
      siteName:{zh:'蜂巢 AI',en:'Beehive AI',de:'Beehive AI',fr:'Beehive AI',ja:'ビーハイブ AI',ru:'Beehive AI'},
      siteDesc:{zh:'发现最好用的 AI 人工智能工具 | 蜂巢式 AI 导航',en:'Discover the Best AI Tools | AI Directory',de:'KI-Tools entdecken | KI-Verzeichnis',fr:'Découvrez les meilleurs outils IA',ja:'最高のAIツールを見つける | AIナビ',ru:'Лучшие ИИ-инструменты | Навигатор'},
      navHome:{zh:'首页',en:'Home',de:'Start',fr:'Accueil',ja:'ホーム',ru:'Главная'},
      navDaily:{zh:'日报',en:'Briefing',de:'Bericht',fr:'Briefing',ja:'デイリー',ru:'Брифинг'},
      navBlog:{zh:'资讯',en:'Blog',de:'Blog',fr:'Blog',ja:'ブログ',ru:'Блог'},
      navAbout:{zh:'关于',en:'About',de:'Über',fr:'À propos',ja:'について',ru:'О нас'},
      navPrivacy:{zh:'隐私',en:'Privacy',de:'Datenschutz',fr:';Confidentialité',ja:'プライバシー',ru:'Конфид.'},
      navContact:{zh:'联系',en:'Contact',de:'Kontakt',fr:'Contact',ja:'お問合せ',ru:'Контакты'},
      heroTitle:{zh:'慢慢逛，',en:'Take your time,',de:'In Ruhe stöbern,',fr:'Prenez votre temps,',ja:'ゆっくり、',ru:'Не спешите,'},
      heroTitle2:{zh:'AI 工具',en:'AI Tool',de:'KI-Tool',fr:'outil IA',ja:'AIツールを',ru:'ИИ-инструмент'},
      heroSub:{zh:'五百多件工具，像摆在家里的器物，不喧哗，不催促。按需取用，用顺手的就是好工具。',en:'Over five hundred tools, arranged like things in a home—quiet, unhurried. Take what you need.',de:'Über fünfhundert Werkzeuge, wie Dinge im eigenen Heim—still und unaufdringlich. Nimm, was du brauchst.',fr:'Plus de cinq cents outils, rangés comme chez soi—calmes, sans hâte. Prenez ce qu'il vous faut.',ja:'五百を超える道具を、家の中の物のように静かに並べて。必要なものをどうぞ。',ru:'Более пятисот инструментов — как вещи дома: тихо, без суеты. Берите то, что нужно.'},
      searchPlaceholder:{zh:'搜索 AI 工具…',en:'Search AI tools…',de:'KI-Tools suchen…',fr:'Rechercher…',ja:'AIツール検索…',ru:'Поиск ИИ…'},
      statTools:{zh:'AI 工具',en:'AI Tools',de:'KI-Tools',fr:'Outils IA',ja:'AIツール',ru:'Инструм.'},
      statCats:{zh:'大分类',en:'Categories',de:'Kategorien',fr:'Catégories',ja:'カテゴリ',ru:'Категории'},
      statArticles:{zh:'深度文章',en:'Articles',de:'Artikel',fr:'Articles',ja:'記事',ru:'Статьи'},
      statDaily:{zh:'每日',en:'Daily',de:'Täglich',fr:'Quotidien',ja:'毎日',ru:'Ежедн.'},
      picksTitle:{zh:'蜂王精选',en:"Editor's Picks",de:'Redaktionsauswahl',fr:"Choix de l'éditeur",ja:'編集部おすすめ',ru:'Выбор ред.'},
      picksSub:{zh:'人工精选 · 每周更新',en:'Curated · Updated weekly',de:'Kuratiert · Wöchentlich',fr:'Sélectionné · Hebdomadaire',ja:'厳選 · 毎週更新',ru:'Отобрано · Еженед.'},
      sceneTitle:{zh:'点击场景筛选 · 10 个常用用途',en:'Filter by use case · 10 scenarios',de:'Nach Anwendung · 10 Szenarien',fr:'Par usage · 10 scénarios',ja:'用途で絞り込む',ru:'По задачам'},
      sceneWrite:{zh:'写作',en:'Writing',de:'Schreiben',fr:'Écriture',ja:'文章',ru:'Тексты'},
      sceneCode:{zh:'编码',en:'Coding',de:'Code',fr:'Code',ja:'コード',ru:'Код'},
      sceneDesign:{zh:'设计',en:'Design',de:'Design',fr:'Design',ja:'デザイン',ru:'Дизайн'},
      sceneVideo:{zh:'视频',en:'Video',de:'Video',fr:'Vidéo',ja:'動画',ru:'Видео'},
      sceneMarket:{zh:'营销',en:'Marketing',de:'Marketing',fr:'Marketing',ja:'マーケ',ru:'Маркет.'},
      sceneAudio:{zh:'音频',en:'Audio',de:'Audio',fr:'Audio',ja:'オーディオ',ru:'Аудио'},
      sceneEdu:{zh:'教育',en:'Education',de:'Bildung',fr:'Éducation',ja:'教育',ru:'Обуч.'},
      sceneAuto:{zh:'自动化',en:'Automation',de:'Auto',fr:'Auto',ja:'自動化',ru:'Авто'},
      sceneResearch:{zh:'研究',en:'Research',de:'Forschung',fr:'Recherche',ja:'リサーチ',ru:'Анализ'},
      sceneAsset:{zh:'素材',en:'Assets',de:'Assets',fr:'Ressources',ja:'素材',ru:'Ресурсы'},
      sortDefault:{zh:'综合',en:'Default',de:'Standard',fr:'Défaut',ja:'おすすめ',ru:'По умолч.'},
      sortHot:{zh:'最热',en:'Popular',de:'Beliebt',fr:'Populaire',ja:'人気',ru:'Попул.'},
      sortNew:{zh:'最新',en:'Newest',de:'Neueste',fr:'Récents',ja:'最新',ru:'Новые'},
      resultText:{zh:'共 {n} 个工具',en:'{n} tools',de:'{n} Tools',fr:'{n} outils',ja:'{n} ツール',ru:'{n} инстр.'},
      resultSearch:{zh:'找到 {n} 个相关工具',en:'{n} matching tools',de:'{n} passende',fr:'{n} trouvés',ja:'{n} 件',ru:'{n} совп.'},
      priceFree:{zh:'免费',en:'Free',de:'Kostenlos',fr:'Gratuit',ja:'無料',ru:'Беспл.'},
      pricePaid:{zh:'付费',en:'Paid',de:'Kostenpfl.',fr:'Payant',ja:'有料',ru:'Платно'},
      priceFreePaid:{zh:'免费+付费',en:'Free+Paid',de:'Kostenlos+',fr:'Gratuit+',ja:'無料+有料',ru:'Беспл.+'},
      emptySearch:{zh:'没找到匹配的工具',en:'No matching tools',de:'Keine Treffer',fr:'Aucun résultat',ja:'一致なし',ru:'Нет результ.'},
      btnVisit:{zh:'访问官网',en:'Visit',de:'Besuchen',fr:'Visiter',ja:'訪問',ru:'Перейти'},
      btnDetail:{zh:'评测详情',en:'Review',de:'Review',fr:'Avis',ja:'レビュー',ru:'Обзор'},
      footerDesc:{zh:'蜂巢 AI 是一站式 AI 工具导航平台。已收录 500+ 款 AI 工具，涵盖 10 大领域。',en:'Beehive AI is an AI tool directory with 500+ tools across 10 categories.',de:'Beehive AI – KI-Tool-Verzeichnis mit 500+ Tools.',fr:'Beehive AI – Annuaire IA avec 500+ outils.',ja:'ビーハイブAI – 500以上のAIツールを紹介。',ru:'Beehive AI – навигатор 500+ ИИ-инструментов.'},
      footerLinks:{zh:'快速链接',en:'Quick Links',de:'Links',fr:'Liens',ja:'リンク',ru:'Ссылки'},
      footerDisclaimer:{zh:'免责声明：所有工具归原作者所有。',en:'Disclaimer: All tools belong to their respective owners.',de:'Haftungsausschluss.',fr:'Avertissement.',ja:'免責事項。',ru:'Отказ от ответ.'},
      copyright:{zh:'© 2026 蜂巢 AI',en:'© 2026 Beehive AI',de:'© 2026 Beehive AI',fr:'© 2026 Beehive AI',ja:'© 2026 ビーハイブAI',ru:'© 2026 Beehive AI'},
      allTools:{zh:'全站工具评测',en:'All Tool Reviews',de:'Alle Reviews',fr:'Tous les avis',ja:'全レビュー',ru:'Все обзоры'},
      allPosts:{zh:'全部文章',en:'All Posts',de:'Alle Beiträge',fr:'Tous les articles',ja:'全記事',ru:'Все статьи'},
      blogHero:{zh:'AI 教程与行业观察',en:'AI Tutorials & Insights',de:'KI-Tutorials',fr:'Tutoriels IA',ja:'AIチュートリアル',ru:'ИИ-уроки'},
      blogSub:{zh:'深度文章帮助你掌握 AI 工具',en:'Master AI tools with in-depth articles',de:'KI-Tools meistern',fr:'Maîtrisez les outils IA',ja:'AIツールを使いこなす',ru:'Освойте ИИ-инструменты'},
    };
  }
  loadDict();

  var currentLang=(function(){var l=localStorage.getItem(LANG_KEY);return(l&&SUPPORTED.indexOf(l)>=0)?l:'zh';})();
  window.__i18nGet=A;
  window.__i18nLang=function(){return currentLang;};
  window.__i18nSet=function(lang){
    if(SUPPORTED.indexOf(lang)===-1)return;
    currentLang=lang;localStorage.setItem(LANG_KEY,lang);
    document.documentElement.lang=LANG_HTML[lang]||lang;
    applyAll();
    if(window.renderTools)window.renderTools();
    if(window.renderFeatured)window.renderFeatured();
    if(window.renderCatFilter)window.renderCatFilter();
  };

  function buildSelector(){
    var sel=document.createElement('div');sel.className='lang-selector';
    sel.innerHTML='<button class="lang-btn" onclick="event.stopPropagation();this.parentElement.classList.toggle(\'open\')">'+LANG_NAMES[currentLang]+' ▾</button><div class="lang-drop">'+SUPPORTED.map(function(l){return'<button class="lang-opt'+(l===currentLang?' active':'')+'" onclick="__i18nSet(\''+l+'\')">'+LANG_NAMES[l]+'</button>';}).join('')+'</div>';
    return sel;}

  function applyAll(){
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var k=el.getAttribute('data-i18n');
      if(el.tagName==='INPUT'||el.tagName==='TEXTAREA')el.placeholder=A(k);
      else el.textContent=A(k);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(function(el){
      el.title=A(el.getAttribute('data-i18n-title'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el){
      el.placeholder=A(el.getAttribute('data-i18n-placeholder'));
    });
    var btn=document.querySelector('.lang-btn');
    if(btn)btn.innerHTML=LANG_NAMES[currentLang]+' ▾';
    document.querySelectorAll('.lang-opt').forEach(function(o,i){o.classList.toggle('active',SUPPORTED[i]===currentLang);});
    document.title=A('siteName')+' - '+A('siteDesc');
    document.dispatchEvent(new CustomEvent('i18n-change',{detail:{lang:currentLang}}));
  }

  function injectStyles(){
    if(document.getElementById('i18n-styles'))return;
    var s=document.createElement('style');s.id='i18n-styles';
    s.textContent='.lang-selector{position:relative;display:inline-block;margin-left:8px}.lang-btn{background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:12px;font-weight:600;padding:7px 10px;cursor:pointer;display:flex;align-items:center;gap:4px;white-space:nowrap;min-width:100px;justify-content:space-between;font-family:inherit}.lang-btn:hover{border-color:var(--honey)}.lang-drop{display:none;position:absolute;right:0;top:100%;margin-top:4px;background:var(--bg2);border:1px solid var(--border);border-radius:10px;box-shadow:0 8px 30px rgba(0,0,0,.18);z-index:1000;min-width:155px;overflow:hidden}.lang-selector.open .lang-drop{display:block}.lang-opt{display:block;width:100%;text-align:left;padding:10px 14px;background:none;border:none;color:var(--text);font-size:13px;cursor:pointer;font-family:inherit}.lang-opt:hover{background:var(--bg3)}.lang-opt.active{background:rgba(240,168,48,.12);color:var(--honey2);font-weight:600}';
    document.head.appendChild(s);}

  function init(){
    injectStyles();
    var oldBtn=document.querySelector('.lang-btn');
    var headerRight=oldBtn?oldBtn.parentElement:document.querySelector('.hdr-right');
    if(headerRight){
      if(oldBtn&&oldBtn.classList.contains('lang-btn')&&!oldBtn.closest('.lang-selector'))oldBtn.remove();
      if(!headerRight.querySelector('.lang-selector'))headerRight.insertBefore(buildSelector(),headerRight.firstChild);
    }
    document.addEventListener('click',function(e){if(!e.target.closest('.lang-selector'))document.querySelectorAll('.lang-selector').forEach(function(s){s.classList.remove('open');});});
    document.documentElement.lang=LANG_HTML[currentLang]||currentLang;
    setTimeout(applyAll,200);
    new MutationObserver(function(){setTimeout(applyAll,50);}).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
