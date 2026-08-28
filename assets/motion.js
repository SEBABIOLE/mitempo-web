(function(){
  if(!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal-ready');

  var targets = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function(el){ observer.observe(el); });
})();

(function(){
  var burger = document.querySelector('.nav-burger');
  if(!burger) return;
  var header = document.querySelector('header');
  burger.addEventListener('click', function(){
    var open = header.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click', function(){
      header.classList.remove('nav-open');
      burger.setAttribute('aria-expanded','false');
    });
  });
})();
