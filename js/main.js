/* main.js */

// 드롭다운_오리지널 JS
  const select = document.getElementById('member');
  if (select) {
    select.addEventListener('focus',  () => select.classList.add('is--open'));    // 포커스 → 위 화살표
    select.addEventListener('blur',   () => select.classList.remove('is--open')); // 벗어남 → 아래 화살표
    select.addEventListener('change', () => select.blur());                       // 선택 → blur (위 blur가 클래스 정리)
  }

  // 드롭다운_커스탐1 JS
  // 작업 중엔 class 에 is--open 붙여서 열린 상태로 스타일 잡고, 넘길 땐 is--open 만 빼면 됨
  document.querySelectorAll('[data-dropdown-custom]').forEach(root => {
    const trigger = root.querySelector('.dropdown__trigger');
    const value   = root.querySelector('.dropdown__value');

    // 1) 토글
    trigger.addEventListener('click', () => {
      const open = root.classList.toggle('is--open');
      trigger.setAttribute('aria-expanded', open);
    });

    // 2) 선택
    root.querySelectorAll('.dropdown__item').forEach(item => {
      item.addEventListener('click', () => {
        value.textContent = item.textContent;
        root.classList.remove('is--open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // 3) 바깥클릭 → 닫기
    document.addEventListener('click', e => {
      if (!root.contains(e.target)) {
        root.classList.remove('is--open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 드롭다운_커스텀2
  document.querySelectorAll('[data-dropdown]').forEach(setupDropdown);
  function setupDropdown(root) {
    const trigger = root.querySelector('.dropdown__trigger');
    const value   = root.querySelector('.dropdown__value');
    const list    = root.querySelector('.dropdown__list');
    const hidden  = root.querySelector('input[type="hidden"]');
    const items   = Array.from(root.querySelectorAll('.dropdown__item'));
    let activeIndex = items.findIndex(i => i.getAttribute('aria-selected') === 'true');
    if (activeIndex < 0) activeIndex = 0;
    

    // --- 열기/닫기 ---
    function open() {
      trigger.setAttribute('aria-expanded', 'true');
      setActive(items.findIndex(i => i.getAttribute('aria-selected') === 'true') || 0);
      list.focus();
    }
    function close() {
      trigger.setAttribute('aria-expanded', 'false');
      items.forEach(i => i.classList.remove('is--active'));
    }
    function isOpen() {
      return trigger.getAttribute('aria-expanded') === 'true';
    }
    function toggle() { isOpen() ? close() : open(); }

    // --- 키보드 이동용 활성 항목 표시 ---
    function setActive(index) {
      activeIndex = (index + items.length) % items.length;
      items.forEach((i, n) => i.classList.toggle('is--active', n === activeIndex));
      list.setAttribute('aria-activedescendant', items[activeIndex].id);
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    }

    // --- 선택 확정 ---
    function select(index) {
      items.forEach(i => i.removeAttribute('aria-selected'));
      items[index].setAttribute('aria-selected', 'true');
      const val = items[index].dataset.value;
      value.textContent = val;   // 트리거 텍스트 갱신
      hidden.value = val;        // 폼 값 갱신
      close();
      trigger.focus();           // 포커스 트리거로 복귀
    }

    // --- 트리거 클릭 ---
    trigger.addEventListener('click', toggle);

    // --- 트리거 키보드: ↓/Enter/Space 로 열기 ---
    trigger.addEventListener('keydown', (e) => {
      if (['ArrowDown', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        open();
      }
    });

    // --- 옵션 클릭 ---
    items.forEach((item, index) => {
      item.addEventListener('click', () => select(index));
    });

    // --- 목록 키보드: ↑↓ 이동, Enter 선택, ESC 닫기 ---
    list.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowDown': e.preventDefault(); setActive(activeIndex + 1); break;
        case 'ArrowUp':   e.preventDefault(); setActive(activeIndex - 1); break;
        case 'Home':      e.preventDefault(); setActive(0); break;
        case 'End':       e.preventDefault(); setActive(items.length - 1); break;
        case 'Enter':
        case ' ':         e.preventDefault(); select(activeIndex); break;
        case 'Escape':    e.preventDefault(); close(); trigger.focus(); break;
        case 'Tab':       close(); break;
        default:
          // 타이핑 점프: 첫 글자 매칭
          if (e.key.length === 1) {
            const i = items.findIndex(it =>
              it.dataset.value.toLowerCase().startsWith(e.key.toLowerCase()));
            if (i >= 0) setActive(i);
          }
      }
    });

    // --- 바깥 클릭 → 닫기 ---
    document.addEventListener('click', (e) => {
      if (!root.contains(e.target)) close();
    });
  }

  // 모달 JS
  function openModal(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    overlay.querySelector('.modal__close, .btn')?.focus();
  }
  function closeModal(overlay) {
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  // 열기 트리거
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.modalOpen));
  });

  // 닫기 트리거 (X 버튼, 확인/취소 버튼 등)
  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('[data-modal]');
      if (overlay) closeModal(overlay);
    });
  });

  // 오버레이 바깥(딤 배경) 클릭 → 닫기
  document.querySelectorAll('[data-modal]').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // ESC → 열려있는 모달 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('[data-modal].is-open').forEach(closeModal);
  });

  // 토스트 JS
  function showToast({ title, desc = '', variant = '' } = {}) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast' + (variant ? ` toast--${variant}` : '');
    toast.innerHTML = `
      <svg class="toast__icon" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
      </svg>
      <div class="toast__body">
        <div class="toast__title"></div>
        <div class="toast__desc" hidden></div>
      </div>
      <button type="button" class="toast__close" aria-label="닫기">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
    toast.querySelector('.toast__title').textContent = title;
    if (desc) {
      const descEl = toast.querySelector('.toast__desc');
      descEl.textContent = desc;
      descEl.hidden = false;
    }
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('is-visible'));

    function remove() {
      toast.classList.remove('is-visible');
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }
    toast.querySelector('.toast__close').addEventListener('click', remove);
    setTimeout(remove, 4000);
  }

  // 탭 JS
  document.querySelectorAll('[data-tabs]').forEach(root => {
    const tabs = Array.from(root.querySelectorAll('.tabs__tab'));
    const panels = Array.from(root.querySelectorAll('.tabs__panel'));

    function activate(tab, focus = true) {
      tabs.forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
      panels.forEach(p => p.classList.toggle('is-active', p.dataset.tabPanel === tab.dataset.tab));
      if (focus) tab.focus();
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(tab, false));
      tab.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowRight': e.preventDefault(); activate(tabs[(i + 1) % tabs.length]); break;
          case 'ArrowLeft':  e.preventDefault(); activate(tabs[(i - 1 + tabs.length) % tabs.length]); break;
          case 'Home':       e.preventDefault(); activate(tabs[0]); break;
          case 'End':        e.preventDefault(); activate(tabs[tabs.length - 1]); break;
        }
      });
    });
  });

  // Alert/Banner 닫기 (data-dismiss="alert" 또는 "banner")
  document.querySelectorAll('[data-dismiss]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.closest(`.${btn.dataset.dismiss}`);
      if (target) target.remove();
    });
  });

  // 뱃지/태그 삭제 (filter chip)
  document.querySelectorAll('[data-tag-remove]').forEach(btn => {
    btn.addEventListener('click', () => btn.closest('.badge').remove());
  });

  // 데모 트리거: data-toast="success|error|" + data-toast-title/data-toast-desc
  document.querySelectorAll('[data-toast]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      showToast({
        title: trigger.dataset.toastTitle || '알림',
        desc: trigger.dataset.toastDesc || '',
        variant: trigger.dataset.toast || '',
      });
    });
  });