/* main.js */

// 드롭다운_오리지널 JS
  const select = document.getElementById('member');
  select.addEventListener('focus',  () => select.classList.add('is--open'));    // 포커스 → 위 화살표
  select.addEventListener('blur',   () => select.classList.remove('is--open')); // 벗어남 → 아래 화살표
  select.addEventListener('change', () => select.blur());                       // 선택 → blur (위 blur가 클래스 정리)

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