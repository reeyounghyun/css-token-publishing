/* main.js */

// 드롭다운_오리지널 JS
  const select = document.getElementById('member');
  if (select) {
    select.addEventListener('focus',  () => select.classList.add('is-open'));    // 포커스 → 위 화살표
    select.addEventListener('blur',   () => select.classList.remove('is-open')); // 벗어남 → 아래 화살표
    select.addEventListener('change', () => select.blur());                       // 선택 → blur (위 blur가 클래스 정리)
  }

  // 드롭다운_커스탐1 JS
  // 작업 중엔 class 에 is-open 붙여서 열린 상태로 스타일 잡고, 넘길 땐 is-open 만 빼면 됨
  document.querySelectorAll('[data-dropdown-custom]').forEach(root => {
    const trigger = root.querySelector('.dropdown__trigger');
    const value   = root.querySelector('.dropdown__value');
    const triggerAvatar = trigger.querySelector('.dropdown__avatar');

    // 1) 토글
    trigger.addEventListener('click', () => {
      const open = root.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', open);
    });

    // 2) 선택 (aria-disabled="true" 항목은 무시)
    root.querySelectorAll('.dropdown__item').forEach(item => {
      item.addEventListener('click', () => {
        if (item.getAttribute('aria-disabled') === 'true') return;
        value.textContent = item.textContent.trim();
        // 항목에 아바타가 있으면 트리거 아바타도 같이 바꿔서 선택된 사람이 보이게
        const itemAvatar = item.querySelector('.dropdown__avatar');
        if (triggerAvatar && itemAvatar) {
          triggerAvatar.src = itemAvatar.src;
          triggerAvatar.alt = itemAvatar.alt;
        }
        root.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });

    // 3) 바깥클릭 → 닫기
    document.addEventListener('click', e => {
      if (!root.contains(e.target)) {
        root.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 모달 JS
  const modalTriggerMap = new WeakMap(); // overlay → 연 트리거(닫을 때 포커스 복귀용)

  function getFocusable(container) {
    return Array.from(container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetParent !== null);
  }

  function openModal(id, trigger) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('is-open');
    document.body.classList.add('modal-open');
    if (trigger) modalTriggerMap.set(overlay, trigger);
    overlay.querySelector('.modal__close, .btn')?.focus();
  }
  function closeModal(overlay) {
    overlay.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    modalTriggerMap.get(overlay)?.focus(); // 트리거로 포커스 복귀
  }

  // 열기 트리거
  document.querySelectorAll('[data-modal-open]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.modalOpen, trigger));
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

  // 포커스 트랩 — 열린 모달 안에서만 Tab 순환, 밖으로 못 나가게 함
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const overlay = document.querySelector('[data-modal].is-open');
    if (!overlay) return;
    const panel = overlay.querySelector('.modal');
    const focusable = getFocusable(panel);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (!panel.contains(document.activeElement)) {
      e.preventDefault();
      first.focus();
    }
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
      </div>
      <button type="button" class="toast__close" aria-label="닫기">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;
    toast.querySelector('.toast__title').textContent = title;
    if (desc) {
      const descEl = document.createElement('div');
      descEl.className = 'toast__desc';
      descEl.textContent = desc;
      toast.querySelector('.toast__title').after(descEl);
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
    const enabledTabs = tabs.filter(tab => !tab.disabled && tab.getAttribute('aria-disabled') !== 'true');

    tabs.forEach((tab, index) => {
      const panel = panels.find(p => p.dataset.tabPanel === tab.dataset.tab);
      if (!tab.id) tab.id = `tab-${index}-${tab.dataset.tab}`;
      if (panel) {
        if (!panel.id) panel.id = `panel-${index}-${tab.dataset.tab}`;
        tab.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', tab.id);
      }
    });

    function activate(tab, focus = true) {
      if (!enabledTabs.includes(tab)) return;
      tabs.forEach(t => {
        const selected = t === tab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(p => {
        const selected = p.dataset.tabPanel === tab.dataset.tab;
        p.classList.toggle('is-active', selected);
        p.hidden = !selected;
      });
      if (focus) tab.focus();
    }

    activate(enabledTabs.find(tab => tab.getAttribute('aria-selected') === 'true') || enabledTabs[0], false);

    tabs.forEach((tab, i) => {
      const enabledIndex = enabledTabs.indexOf(tab);
      tab.addEventListener('click', () => activate(tab, false));
      tab.addEventListener('keydown', (e) => {
        if (enabledIndex < 0) return;
        switch (e.key) {
          case 'ArrowRight': e.preventDefault(); activate(enabledTabs[(enabledIndex + 1) % enabledTabs.length]); break;
          case 'ArrowLeft':  e.preventDefault(); activate(enabledTabs[(enabledIndex - 1 + enabledTabs.length) % enabledTabs.length]); break;
          case 'Home':       e.preventDefault(); activate(enabledTabs[0]); break;
          case 'End':        e.preventDefault(); activate(enabledTabs[enabledTabs.length - 1]); break;
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
