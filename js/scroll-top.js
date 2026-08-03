/* scroll-top.js
   맨 위로 이동 버튼 — index.html + 모든 component/*.html이 공유.
   스타일/마크업을 스크립트 안에서 직접 주입하므로 각 파일엔 이 스크립트 태그 한 줄만 추가하면 됨.
   iframe에 임베드된 상태(is-embedded)에선 숨김 — 미리보기 카드 안에 떠 있을 이유가 없음. */
(function () {
  var style = document.createElement('style');
  style.textContent =
    '.scroll-top-btn{position:fixed;right:20px;bottom:20px;width:40px;height:40px;' +
    'display:flex;align-items:center;justify-content:center;border:none;' +
    'border-radius:var(--radius-full,999px);background:var(--color-bg-accent-active);color:var(--color-text-inverse);' +
    'box-shadow:var(--shadows-lg);cursor:pointer;opacity:0;visibility:hidden;' +
    'transform:translateY(8px);transition:opacity .15s ease,transform .15s ease,visibility .15s,background .15s;z-index:9999;}' +
    '.scroll-top-btn.is-visible{opacity:1;visibility:visible;transform:translateY(0);}' +
    '.scroll-top-btn:hover{background:var(--color-bg-accent-hover);}' +
    '.is-embedded .scroll-top-btn{display:none;}';
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', '맨 위로 이동');
  btn.title = '맨 위로 이동';
  btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 15.8333V4.16667M10 4.16667L4.16667 10M10 4.16667L15.8333 10" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function onScroll() {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(btn);
    onScroll();
  });
})();
