(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)};
  var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  // Mobile menu
  var burger=$('#burger'),menu=$('#menu');
  burger.addEventListener('click',function(){
    var open=menu.classList.toggle('open');
    burger.setAttribute('aria-expanded',open);
  });
  $$('#menu a').forEach(function(a){a.addEventListener('click',function(){
    menu.classList.remove('open');burger.setAttribute('aria-expanded','false');
  })});

  // Scroll state: nav shadow, back-to-top, active section
  var nav=$('#nav'),top=$('#top');
  var sections=['home','about','activities','edupulse','documentation','references'].map(function(id){return document.getElementById(id)});
  var links=$$('#menu a');
  function onScroll(){
    var y=window.scrollY;
    nav.classList.toggle('scrolled',y>10);
    top.classList.toggle('show',y>600);
    var cur='home',mark=y+140;
    sections.forEach(function(s){if(s&&s.offsetTop<=mark)cur=s.id});
    links.forEach(function(a){a.classList.toggle('active',a.dataset.s===cur)});
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  top.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});

  // Reveal on scroll
  var items=$$('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
    })},{threshold:.12});
    items.forEach(function(el){io.observe(el)});
  }else{items.forEach(function(el){el.classList.add('in')})}

  // Missing image handling (shows the expected file path instead of a broken icon)
  $$('.ph img').forEach(function(img){
    function miss(){img.closest('.ph').classList.add('missing')}
    img.addEventListener('error',miss);
    if(img.complete&&img.naturalWidth===0&&img.getAttribute('src'))miss();
  });


  // PDF preview: show the iframe only when the PDF exists; otherwise a clean fallback
  var pf=$('#pdfFrame'),pfb=$('#pdfFallback'),pb=$('#pdfBtn');
  if(pf){
    function showPdf(){pf.src=pf.dataset.src;pf.hidden=false}
    function noPdf(){pfb.hidden=false;pb.classList.add('disabled');pb.setAttribute('aria-disabled','true');pb.removeAttribute('href')}
    var url=pf.dataset.src.split('#')[0];
    if(location.protocol==='file:'){showPdf()}
    else{fetch(url,{method:'HEAD'}).then(function(r){
      var t=(r.headers.get('content-type')||'').toLowerCase();
      (r.ok&&t.indexOf('pdf')>-1)?showPdf():noPdf();
    }).catch(noPdf)}
  }

  // Lightbox
  var lb=$('#lb'),lbimg=$('#lbimg'),lbcap=$('#lbcap'),lastFocus=null;
  function openLb(img){
    if(!img||img.closest('.ph').classList.contains('missing'))return;
    lastFocus=document.activeElement;
    lbimg.src=img.currentSrc||img.src;lbimg.alt=img.alt;lbcap.textContent=img.alt;
    lb.hidden=false;document.body.style.overflow='hidden';$('#lbx').focus();
  }
  function closeLb(){lb.hidden=true;lbimg.src='';document.body.style.overflow='';if(lastFocus)lastFocus.focus()}
  $$('[data-lb]').forEach(function(img){img.addEventListener('click',function(){openLb(img)})});
  $$('[data-open]').forEach(function(btn){btn.addEventListener('click',function(){
    var card=btn.closest('.card');var img=$('[data-lb]',card);openLb(img);
  })});
  $('#lbx').addEventListener('click',closeLb);
  lb.addEventListener('click',function(e){if(e.target===lb)closeLb()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden)closeLb()});
})();
