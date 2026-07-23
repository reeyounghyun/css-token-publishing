# 컴포넌트 진행 현황

## 앞으로 할 것

- [ ] **STEP 6 — JS 동작** table 정렬 헤더 클릭 시 실제 정렬 등, 아직 시각적 상태만 있고 동작은 없는 부분
- [ ] **보류 중** — 참고 이미지 기반 "코드패널(구문강조) + Copy 버튼"을 기존 컴포넌트 페이지들의 `class-label` 캡션에도 적용할지. `css/component/code-panel.css`는 만들어뒀지만 아직 어디에도 연결 안 함
- [ ] **반영 대기 백로그** — 아래 표 8개. 규칙은 정해졌고 적용만 남음
- [ ] **Breadcrumb** — 페이지 경로 표시 (Home > 설정 > 프로필), 필요할 때 추가
- [ ] **Skeleton** — 로딩 플레이스홀더, 필요할 때 추가

### 반영 대기 백로그

| 내용 | 대상 파일 |
|---|---|
| `is--open`/`is--active` → `is-open`/`is-active` | dropdown.css(4곳) + main.js — CSS와 JS를 같이 고쳐야 함 |
| primitive 직접 참조 → semantic | code-panel.css 43~44줄 |
| `--White` → `--color-bg-surface` 등으로 교체 후 토큰 삭제 | tokens.css + code-panel.css(3곳) |
| `--gray: gray` / `--black: black` 삭제 (사용처 0곳) | tokens.css |
| `--weight-Semibold` → `--weight-semibold` | tokens.css + 컴포넌트 8개 |
| `--radius-*` / `--height-*` 숫자 표기로 통일 | tokens.css + 대부분의 컴포넌트 |
| `img` → `image` | dropdown-menu.css, style.css |
| `dropdown__userinfo` → `dropdown__user-info` | dropdown-menu.css + dropdown-menu.html |

## 한 것

### 2026-07-22 — 최초 작성
- 프로젝트 생성, `tokens.css` 기반 구조 설계
- Card / Checkbox / Modal / Table / Tabs / Toast / Badge / Alert 컴포넌트 최초 작성

### 2026-07-23 — STEP 0(현황 파악) ~ STEP 1(네이밍 정리)
- `dropdownMenu.html`/`.css` → `dropdown-menu`로 kebab-case 리네임 (README/TODO 참조도 동기화)
- `grid-table.css`를 `table.css`에 병합 (독립 컴포넌트가 아니라 `<table>` vs `div+grid`의 마크업 변형이라 판단)
- `dropdown-menu.css`의 체크박스(`.checklist__box`) → `checkbox.css`의 공용 `.checkbox`로 통합
- `table.css`의 상태 표시(`.table__status`) → `badge.css`의 `.badge`+`.badge__dot`로 통합
- `dropdown-menu.css`의 `.dropdown__status`(아바타 온라인 점)는 성격이 달라 통합 안 함 — 그대로 유지
- 색상 중복(`--title-color`, `--desc-color`, `--track-bg`, `--focus-ring` 등)은 `--gray-*` 스케일로 통합

### 2026-07-23 — STEP 2: 토큰 primitive/semantic 2단 구조 재편
- `tokens.css`를 primitive(원시값)/semantic(역할) 2단 구조로 재편. `css/component/*.css`는 색상에 한해 semantic 토큰(`--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-icon-*`, `--color-ring-*`)만 참조하도록 전부 교체
- `--menu-divider`/`--slate-100`/`--slate-700`/`--box-border`는 `--gray-*`와 값이 근접한 중복 정의였음(README에 "이미 통합완료"라 적혀있었지만 실제로는 안 되어 있었음) → gray 스케일로 흡수하고 토큰 삭제
- focus-visible 링 색상: btn/sbtn만 `--primary-200`, 나머지는 `--primary-100`으로 갈라져 있던 걸 `--primary-200` 기준으로 통일
- `dropdown-menu.css`의 `box-shadow: 0 6px 20px var(--shadows-xs)`가 무효 CSS였던 버그 발견 → `var(--shadows-lg)`로 수정 (그림자가 아예 안 먹고 있었음)
- 새 토큰 추가할 땐 항상 `tokens.css`에 이미 있는 값인지 먼저 확인 후 추가하는 원칙 확립

### 2026-07-23 — STEP 3 "하" 난이도: 상태/변형 채우기
- input: 사이즈 3종(sm/md/lg) 데모, disabled, readonly 추가
- textarea: disabled, resize 제어 추가
- radio: checked+disabled 조합 추가
- badge: sm/lg 사이즈 변형 추가 (`--text-12` 신규 토큰)
- card: hover 가능형 `.card--hoverable` 추가
- table: 고정 헤더 `.table-wrap--scroll-y` 추가
- tabs: disabled 탭 추가
- pagination: 마지막 페이지 활성 / 페이지 적을 때 데모 추가
- modal: sm 데모, 하단버튼 없는 버전 추가
- dropdown: disabled 항목/구분선 추가 — `main.js`에 `aria-disabled` 클릭 무시 가드 추가

### 2026-07-23 — STEP 3 "중" 난이도
- `--warning-*` primitive 스케일(50~900) + semantic(`--color-text-warning`, `--color-icon-warning`, `--color-bg-warning-subtle`, `--color-border-warning-subtle`) 신규 추가. alert/toast에 warning 변형 적용
- alert에 "닫기 버튼 없는 버전" 추가
- button에 `.is-loading` 로딩 상태 추가 (라벨을 `<span class="btn__label">`로 감싸야 동작). `--color-spinner-track` 재사용
- table에 로딩 상태(`.table__loading`)와 정렬 가능한 헤더(`.table__sort`, `aria-sort`) 추가 — 정렬 헤더는 STEP 0에서 놓쳤던 항목, 뒤늦게 발견해서 같이 처리. 실제 정렬 동작(JS)은 STEP 6 몫

### 2026-07-23 — STEP 3 마무리 정리
- focus-visible 감사: `badge__remove`, `field__btn`(눈 아이콘), `table__sort`, `banner__action`/`banner__close`에 누락돼 있던 스타일 추가. `textarea__box`는 `:focus-within` 자체가 없어서 input과 동일한 패턴으로 신규 추가
- disabled `cursor:not-allowed` 감사 — class 기반 선택자라 grep으로는 안 잡혔을 뿐 이미 다 커버되고 있었음을 확인
- `input.html` duplicate id 버그 수정: `id="email"` 4번, `id="pw"/"pw2"/"pw3"/"pw4"` 각 2번씩 쓰여서 label의 `for=`가 실제로는 첫 필드에만 연결되던 것 → 전부 고유 id로 분리. 겸사겸사 phone number 필드 `type="email"`→`type="tel"`, `_ver2` 라벨 오타(`_ver1`로 잘못 표기)도 수정
- `input.html`의 `field__btn`/`lang__box` 버튼에 `type="button"` 누락 발견 → 전부 추가 (실제 `<form>` 안에 복붙하면 의도치 않게 제출되는 버그)
- `input.html`, `dropdown-menu.html`의 SVG `clipPath id` 중복(같은 아이콘 반복 사용) 정리 — 두 번째 등장하는 것만 `-2` 접미사
- `class-label` 캡션(적용된 class를 화면에 텍스트로 표시)을 기존 예시 전체에 소급 적용 — 리스트형은 개별로, 매트릭스형(button 매트릭스, switch 상태 그리드)은 범례 한 줄로

### 2026-07-23 — STEP 4: 누락 컴포넌트 추가
- radio/select/form-field는 이미 존재하는 것으로 확인됨(radio=`checkbox.css`의 `.radio`, select=`dropdown.css`의 `.select`, form-field=`input.css`의 `.field`가 이미 그 역할) → 별도로 안 만듦
- Tooltip 추가 — 4방향(top/bottom/left/right), JS 없이 `:hover`/`:focus-within`만으로 동작
- Accordion 추가 — 네이티브 `<details>/<summary>` 기반, JS 없이 동작
- Empty State 추가 — 기본(액션버튼)/검색결과 없음/에러(`empty-state--error`)

### 2026-07-23 — STEP 5: index.html을 진짜 컴포넌트 인덱스로 재구성
- 기존 `index.html`(Brickify 랜딩페이지)을 `brickify.html`로 이름만 바꿔서 그대로 보존
- `index.html` 자리에 진짜 컴포넌트 인덱스 신규 작성:
  - 토큰 카탈로그(색상 primitive/semantic, 타이포, spacing, radius, shadow) — 클릭하면 `var(--토큰명)` 클립보드 복사
  - 컴포넌트 검색 + 카드별 iframe 미리보기 (18개 전체)
- `index.html`은 `css/component/*.css`를 전혀 로드하지 않음 — 컴포넌트 미리보기는 iframe으로 `component/*.html`을 통째로 띄우는 방식이라 문서가 물리적으로 분리돼 있어 스타일 충돌이 원천적으로 불가능(지시서의 `#ix`+`all:unset` 격리보다 확실한 방식으로 대체)
- 색상 hex/px 값은 JS에 하드코딩하지 않고 `getComputedStyle`로 tokens.css 실제 값을 읽어와 표시 — 토큰 값이 바뀌면 자동으로 따라옴
- 새 컴포넌트 추가 시 `index.html`의 `COMPONENTS` 배열에도 등록해야 인덱스에 노출됨 (README에도 명시)
