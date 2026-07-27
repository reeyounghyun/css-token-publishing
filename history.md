# css-token-publishing — 진행 히스토리

> 날짜순 진행 기록. 스펙/작업지시서·IA·작성규칙·Patterns 정의는 [spec.md](spec.md) 참고.
> TODO.md + TODO2.md(6장 진행 메모) + TODO3.md를 통합해 정리함.
> 최종 수정: 2026-07-27

---

## 2026-07-22 — 최초 작성
- 프로젝트 생성, `tokens.css` 기반 구조 설계
- Card / Checkbox / Modal / Table / Tabs / Toast / Badge / Alert 컴포넌트 최초 작성

## 2026-07-23 — STEP 0~5: 초기 컴포넌트 구축

### STEP 0(현황 파악) ~ STEP 1(네이밍 정리)
- `dropdownMenu.html`/`.css` → `dropdown-menu`로 kebab-case 리네임 (README/TODO 참조도 동기화)
- `grid-table.css`를 `table.css`에 병합 (독립 컴포넌트가 아니라 `<table>` vs `div+grid`의 마크업 변형이라 판단)
- `dropdown-menu.css`의 체크박스(`.checklist__box`) → `checkbox.css`의 공용 `.checkbox`로 통합
- `table.css`의 상태 표시(`.table__status`) → `badge.css`의 `.badge`+`.badge__dot`로 통합
- `dropdown-menu.css`의 `.dropdown__status`(아바타 온라인 점)는 성격이 달라 통합 안 함 — 그대로 유지
- 색상 중복(`--title-color`, `--desc-color`, `--track-bg`, `--focus-ring` 등)은 `--gray-*` 스케일로 통합

### STEP 2: 토큰 primitive/semantic 2단 구조 재편
- `tokens.css`를 primitive(원시값)/semantic(역할) 2단 구조로 재편. `css/component/*.css`는 색상에 한해 semantic 토큰만 참조하도록 전부 교체
- `--menu-divider`/`--slate-100`/`--slate-700`/`--box-border`는 `--gray-*`와 값이 근접한 중복 정의였음(README엔 "이미 통합완료"라 적혀있었지만 실제로는 안 되어 있었음) → gray 스케일로 흡수하고 토큰 삭제
- focus-visible 링 색상: btn/sbtn만 `--primary-200`, 나머지는 `--primary-100`으로 갈라져 있던 걸 `--primary-200` 기준으로 통일
- `dropdown-menu.css`의 `box-shadow: 0 6px 20px var(--shadows-xs)`가 무효 CSS였던 버그 발견 → `var(--shadows-lg)`로 수정 (그림자가 아예 안 먹고 있었음)
- 새 토큰 추가할 땐 항상 `tokens.css`에 이미 있는 값인지 먼저 확인 후 추가하는 원칙 확립

### STEP 3 "하" 난이도: 상태/변형 채우기
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

### STEP 3 "중" 난이도
- `--warning-*` primitive 스케일(50~900) + semantic 토큰 신규 추가. alert/toast에 warning 변형 적용
- alert에 "닫기 버튼 없는 버전" 추가
- button에 `.is-loading` 로딩 상태 추가 (라벨을 `<span class="btn__label">`로 감싸야 동작)
- table에 로딩 상태(`.table__loading`)와 정렬 가능한 헤더(`.table__sort`, `aria-sort`) 추가 — 실제 정렬 동작(JS)은 이후 "정적 데모" 원칙이 확립되며 보류됨(아래 남은 작업 참고)

### STEP 3 마무리 정리
- focus-visible 감사: `badge__remove`, `field__btn`(눈 아이콘), `table__sort`, `banner__action`/`banner__close`에 누락돼 있던 스타일 추가. `textarea__box`는 `:focus-within` 자체가 없어서 input과 동일한 패턴으로 신규 추가
- disabled `cursor:not-allowed` 감사 — class 기반 선택자라 grep으로는 안 잡혔을 뿐 이미 다 커버되고 있었음을 확인
- `input.html` duplicate id 버그 수정: `id="email"` 4번, `id="pw"/"pw2"/"pw3"/"pw4"` 각 2번씩 쓰여서 label의 `for=`가 실제로는 첫 필드에만 연결되던 것 → 전부 고유 id로 분리. phone number 필드 `type="email"`→`type="tel"`, 라벨 오타도 수정
- `input.html`의 `field__btn`/`lang__box` 버튼에 `type="button"` 누락 발견 → 전부 추가 (실제 `<form>` 안에 복붙하면 의도치 않게 제출되는 버그)
- `input.html`, `dropdown-menu.html`의 SVG `clipPath id` 중복 정리
- `class-label` 캡션을 기존 예시 전체에 소급 적용

### STEP 4: 누락 컴포넌트 추가
- radio/select/form-field는 이미 존재하는 것으로 확인됨(radio=`checkbox.css`의 `.radio`, select=`dropdown.css`의 `.select`, form-field=`input.css`의 `.field`) → 별도로 안 만듦
- Tooltip 추가 — 4방향(top/bottom/left/right), JS 없이 `:hover`/`:focus-within`만으로 동작
- Accordion 추가 — 네이티브 `<details>/<summary>` 기반, JS 없이 동작
- Empty State 추가 — 기본(액션버튼)/검색결과 없음/에러(`empty-state--error`)

### STEP 5: index.html을 진짜 컴포넌트 인덱스로 재구성
- 기존 `index.html`(Brickify 랜딩페이지)을 `brickify.html`로 이름만 바꿔서 그대로 보존
- `index.html` 자리에 진짜 컴포넌트 인덱스 신규 작성 — 토큰 카탈로그(클릭 시 `var(--토큰명)` 복사) + 컴포넌트 검색/iframe 미리보기
- `index.html`은 `css/component/*.css`를 전혀 로드하지 않음 — 컴포넌트 미리보기는 iframe으로 `component/*.html`을 통째로 띄우는 방식이라 문서가 물리적으로 분리돼 스타일 충돌이 원천적으로 불가능 (지시서의 `#ix`+`all:unset` 격리보다 확실한 방식으로 대체)
- 색상 hex/px 값은 JS 하드코딩 대신 `getComputedStyle`로 tokens.css 실제 값을 읽어와 표시
- 새 컴포넌트 추가 시 `index.html`의 `COMPONENTS` 배열에도 등록해야 인덱스에 노출됨 (README에도 명시)

---

## 2026-07-24 전후 — TASK-1 · TASK-2 (TODO2.md 작업지시서 기준)

### TASK-1 — 컴포넌트 페이지 템플릿 통일 [완료]
`component/` 안 18개 파일 전부 **Overview → Variants → Options → States → Examples → Guidelines** 6단계로 재작성.
- 공용 CSS `css/component/doc-template.css` 신설, 18개 파일 전부 연결
- 코드패널(`css/component/code-panel.css`) — Copy 버튼을 코드와 안 겹치는 별도 툴바로 분리하는 구조로 통일
- `button.html`을 레퍼런스로 먼저 확정한 뒤, 나머지 17개를 간단 → 중간 → 어려움 순으로 순차 적용
- 대상 18개: Button, Input, Textarea, Checkbox/Radio, Switch, Dropdown, Dropdown Menu, Pagination, Tabs, Accordion, Badge/Tag, Card, Table, Empty State, Tooltip, Alert/Banner, Modal, Toast

**변경 파일**: `component/*.html`(18개), `css/component/doc-template.css`(신규), `css/component/code-panel.css`, `css/component/button.css`, `css/tokens.css`(Primary 컬러 Purple→Blue), `js/main.js`(드롭다운 아바타 선택 동기화 버그 수정)

### TASK-2 — index.html 사이드바 [완료 + 추가 작업]
TODO2 2장 IA를 그대로 반영한 트리 구조 사이드바 구현.
- 6개 대분류: 시스템 소개 / Design Tokens / 공통 원칙 / 컴포넌트 목록 / Utilities / Patterns
- 콘텐츠 없는 4개 항목(시스템 소개·공통 원칙·Utilities·Patterns)은 "준비중" 플레이스홀더로 표시
- Design Tokens 하위 9개 앵커: 전부 `tokens.css` 실제 값을 `getComputedStyle`로 읽어와 표시, 클릭하면 `var(--토큰명)` 복사
- 컴포넌트 목록은 4개 카테고리(입력/탐색이동/조회노출/알림피드백)로 그룹핑
- 클릭 시 같은 페이지 안에서 앵커로 스크롤 이동 (페이지 분리 없음)

추가 UX 작업(진행 중 사용자 피드백 반영): 하위 목록 접기·펼치기, 스크롤 스파이(IntersectionObserver), 반응형 3단계(1024/900/480px), 900px 이하는 사이드바를 전체화면 오버레이 메뉴로 전환.

**변경 파일**: `index.html`

---

## 2026-07-27

### .code-panel 폭 불일치 수정 [완료]
- 원인: `button.html`의 States 섹션 `.tabs`에만 인라인 `style="max-width: 768px"`가 걸려 있었고, 같은 페이지의 Examples(`.sgroup`)와 나머지 17개 컴포넌트 페이지는 폭 제한이 없어 body 폭까지 늘어남
- "큰 값(=uncapped)에 기준을 맞춘다" 원칙에 따라 button.html의 인라인 `max-width: 768px` 제거로 처리
- 변경 파일: `component/button.html`

### input.html에 Search 필드 추가 [완료]
- 처음엔 States 영역에 넣었다가 재검토 — Search는 "상태"가 아니라 password/phone number와 같은 "입력 타입 종류"라 **Variants로 이동**
- Variants 표에 `field--search` 행 추가, `type="search"` + 우측 돋보기 아이콘 버튼(`field__btn`, password와 동일 패턴)
- `input.css`에 `.field--password .field__input { margin-left: 0 }` 규칙을 `.field--search`에도 적용
- 변경 파일: `component/input.html`, `css/component/input.css`

### `.field` 폭 통일 [완료]
- 발견: `.field--password`의 `.field__box`가 264×46 — 어떤 토큰값도 아니었음. `.field { max-width: 320px }`만 있고 `width`가 없어서 row 레이아웃에서 각 필드가 placeholder 길이만큼만 auto로 좁아짐
- 수정: `.field { max-width: 320px }` → `.field { width: 100%; max-width: 320px }`
- 영향 범위 확인: modal.html의 `.field`도 있으나 column 레이아웃이라 문제 없음
- 변경 파일: `css/component/input.css`

### 문서 페이지 공통 컨테이너/컬러 개편 + 맨 위로 버튼 [완료]
- input.html에서 devtools로 먼저 실험(전체 폭 1024px 중앙 정렬, 회색 캔버스 배경, 표 헤더 강조, 구분선 강화) → 확인 후 18개 페이지 전체 롤아웃
- `.page-container` 신설, `tokens.css`에 `--gray-75`/`--color-bg-canvas` 신규 추가
- `.doc-table th` 배경을 primary-800 + 흰 글자로, `.page-header` 구분선을 시맨틱 토큰으로 교체
- `js/scroll-top.js` 신규 — 맨 위로 이동 버튼, iframe 임베드 상태(`is-embedded`)에선 자동 숨김
- 변경 파일: `css/component/doc-template.css`, `css/tokens.css`, `js/scroll-top.js`(신규), `component/*.html`(18개), `index.html`

### index.html 버그 수정 3건 [완료]
- Accordion 카드가 Badge/Tag와 결과물이 다름 → `COMPONENTS` 배열 desc의 `<details>/<summary>`가 `innerHTML`로 그대로 삽입되며 실제 태그로 해석된 버그. `&lt;details&gt;/&lt;summary&gt;`로 이스케이프해서 수정 (index.html:1009)
- 컴포넌트 영역 스크롤 시 검색창 미고정 → PC(900px 초과)에서만 제목+검색창을 `.ix-search-sticky`로 묶어 `position:sticky` 적용
- 사이드바 Design Tokens 클릭 시 안 맞는 문제 → 재확인 결과 실사용에서 문제 없어 종료(원인 특정 못함)
- 컴포넌트 검색input을 input.html의 새 검색input과 동일한 룩으로 → index.html은 컴포넌트 css를 안 불러오므로 `.ix-search-box`/`.ix-search-icon`을 토큰만 참조해 새로 만듦

### 컴포넌트 그리드 1열 고정 + 태블릿 카드 높이 제한 + 모바일 메뉴 버튼 크기 [완료]
- `.ix-component-grid`를 `grid-template-columns: 1fr`로 명확히 정리(어차피 항상 1열이었음)
- `.ix-card__frame-wrap`: 990px 이하에서 `height: 600px`로 스크롤 부담 완화
- `.ix-sidebar-toggle`: 터치 타겟 최소 44px 확보
- 변경 파일: `index.html`

### dropdown vs dropdown-menu 역할 구분 명문화 [완료]
- 두 페이지 Overview에 상호 참조 문장 추가 + Forms/Navigation 용어로 요약
- dropdown-menu.html Guidelines의 "검색 가능한 Dropdown이 더 적합" 문구가 사실과 다름을 발견해 같이 정정

### Utilities(3장) 실제 콘텐츠 작성 [완료]
- `index.html` section-utilities에 spacing/gap, radius, shadow 데모 + 값 표로 실 콘텐츠 채움. 사이드바 플레이스홀더 해제
- 변경 파일: `index.html`

### input에 success 상태 추가 [완료]
- `tokens.css`: success primitive 10단계(`--success-50~900`) + semantic 3개(`--color-border-success`/`--color-text-success-medium`/`--color-ring-success`), danger 대칭 구조
- `input.css`: `.field--success` 비주얼 + focus ring, `.required`(필수 표시 `*`, `--color-text-danger-medium` 재사용)
- `input.html` States: error 예시 옆에 success 예시 추가, 둘 다 `aria-invalid`/`aria-describedby`/`required`+`*` 적용
- 판단: 새 클래스명은 `field__success`가 아니라 `field--success`로 정함 — 기존 Guidelines("신규 옵션은 field-- 형태로")를 따름
- 변경 파일: `component/input.html`, `css/component/input.css`, `css/tokens.css`

### Patterns(4장) 착수 — Login 패턴 [완료]
- 구조 결정: `index.html`은 컴포넌트 css를 직접 안 불러오므로, 패턴처럼 여러 컴포넌트 css를 동시에 써야 하는 콘텐츠는 컴포넌트 페이지와 동일하게 iframe 임베드 방식으로 처리 → `patterns/` 폴더 신설
- `patterns/login.html`: Logo(자리표시자) + `field` + `field--password` + `checkbox` + `btn btn--primary`
- Logo 처리: 정식 컴포넌트가 아니므로 회색 placeholder 박스로만 표시
- 변경 파일(신규): `patterns/login.html` / 변경 파일(수정): `index.html`, `README.md`

### 사이드바 "6. Patterns" 링크 is-placeholder 누락 수정 [완료]
- Login 패턴 작업 때 Patterns 섹션에 실 콘텐츠를 채우면서 사이드바 링크의 `is-placeholder` 클래스 제거를 빠뜨림 → 클릭은 되지만 회색+`cursor:default`라 비활성처럼 보이던 버그, 클래스 제거로 수정
- 변경 파일: `index.html`

### Patterns — Search + Table [완료]
- Date Picker가 없어 검색 영역에서 기간 필터는 제외. select는 네이티브 사용
- `patterns/search-table.html`: 검색결과 있음(search-bar+table+pagination) / 검색결과 없음(search-bar+empty-state) 2예시
- 변경 파일(신규): `patterns/search-table.html`

### Patterns — Empty State [완료]
- 세 상황(검색 결과 없음/등록된 데이터 없음/권한 없음)을 나란히 비교
- 권한 없음은 사용자 실수가 아니므로 `empty-state--error`(위험색) 대신 기본형 유지, 잠금 아이콘 신규 추가
- 변경 파일(신규): `patterns/empty-state.html`

### Patterns — Detail Page [완료]
- 기본 정보(field 2개) → 추가 정보(textarea+toggle) → 저장/취소
- Guidelines에 "Switch는 즉시 반영 전제이므로 저장 버튼을 눌러야만 반영되게 만들지 말 것" 명시
- 변경 파일(신규): `patterns/detail-page.html`

### Patterns — Modal Form [완료]
- 트리거 버튼 → Modal(field+select+textarea) → 취소/저장. `js/main.js`의 `data-modal-open/close`를 그대로 재사용(특정 id에 하드코딩 안 돼 있어 재사용 가능함을 확인)
- Guidelines에 "필드 3~4개 이하면 Modal Form, 그 이상은 Detail Page로 분리" 기준 명시
- 변경 파일(신규): `patterns/modal-form.html`

### Chart 컴포넌트 신규 제작 + Patterns — Dashboard [완료]
- "JS 없이 가능한지" 확인 요청 → 정적 CSS만으로 가능함을 확인 후 진행(막대 높이/너비를 인라인 style로 직접 지정)
- `component/chart.html` + `css/component/chart.css`: Variants 2종(`chart` 세로 / `chart--horizontal` 가로), Options 2종(`is-accent`/`is-muted`)
- `index.html` COMPONENTS 배열에 등록(card.html-table.html 사이, "조회/노출" 카테고리)
- `patterns/dashboard.html`: `card--stat` 4개 → 카드로 감싼 chart → 카드로 감싼 table+badge
- 변경 파일(신규): `component/chart.html`, `css/component/chart.css`, `patterns/dashboard.html`

### Date Picker 컴포넌트 신규 제작 [완료]
- "네이티브 input[type=date] 스타일링" vs "커스텀 캘린더 팝업" 중 네이티브 방식으로 결정 (dropdown.html의 네이티브 select 권장 원칙과 동일)
- `component/date-picker.html` + `css/component/date-picker.css`: Input의 `field`/`field__box`/`field__input` 구조 재사용, `type="date"`만 다름. `field-range`(기간 선택) 옵션 추가. States는 Input의 disabled/error/success 그대로 상속
- `index.html` COMPONENTS 배열에 등록(dropdown.html 다음, "입력 (Forms)" 카테고리)
- 변경 파일(신규): `component/date-picker.html`, `css/component/date-picker.css`

### Patterns — Search Form [완료, Patterns 7/7 전부 완성]
- Search + Table 때 뺐던 기간 필터(`field-range`)를 이번엔 포함해 완전한 조합으로 제작
- `patterns/search-form.html`: 간단형(검색어+검색버튼) / 상세형(검색어+상태+기간+검색/초기화) 2예시
- **TODO2.md에 정의된 Patterns 7개(Search Form/Search+Table/Dashboard/Detail Page/Login/Modal Form/Empty State) 전부 완성.**
- 변경 파일(신규): `patterns/search-form.html`

### 진행상황 문서 통합 [완료]
- TODO.md / TODO2.md / TODO3.md 3개로 흩어져 있던 진행사항+히스토리를 이 파일(`history.md`)로, 스펙/지시사항은 `spec.md`로 분리 통합. 원본 3개 파일은 삭제(git 이력에는 남아있어 복구 가능)
- `index.html`/`patterns/dashboard.html`/`patterns/search-table.html`에 남아있던 "TODO2.md" 언급을 "spec.md"로 갱신 (삭제된 파일을 계속 가리키고 있었음)
- `workflow.md`의 `TODO.md` 언급 3곳을 `history.md`로 갱신
- css/docs.css: 확인해보니 빈 디렉터리(2026-07-24 생성, 어디서도 참조 안 됨, git 미추적). 문서 전용 css를 component css와 분리하려던 계획의 흔적으로 추정되나 실제로는 doc-template.css/code-panel.css 둘 다 `css/component/`에 만들어져 계획이 실행 안 된 것으로 보임 — 확실한 근거는 없음. 사용자 확인 후 그대로 둠
- 5개 md 파일(README/publishing-rules/workflow/spec/history) 전수 검토해 중복 3건 발견(① README↔publishing-rules.md 토큰규칙/grid 설명 중복, ② README의 stale한 18개 컴포넌트 표, ③ publishing-rules.md 인라인 "수정 필요" 콜아웃 4곳이 history.md 백로그 표와 중복)
- ②: README의 "컴포넌트 보기" 표(18개, chart/date-picker 누락된 stale 버전) 삭제하고 index.html/spec.md 참조로 대체 [완료]
- ①: README의 "토큰 규칙"/"grid" 섹션(publishing-rules.md와 거의 동일한 설명) 전부 삭제하고 publishing-rules.md 링크 한 줄로 대체 [완료]. publishing-rules.md 쪽은 이미 더 상세한 원본이라 수정 없이 유지
- README 최상단에 "이 문서는 프로젝트 사용 설명서"임을 명시하고, 규칙/절차/스펙/히스토리가 각각 어느 문서에 있는지 안내하는 "문서 안내" 표 신규 추가 (README ↔ publishing-rules.md/workflow.md/spec.md/history.md 역할 분리를 문서 자체에 명문화)
- ③(publishing-rules.md 인라인 콜아웃 vs history.md 백로그 중복)은 README가 관련 없는 별개 파일쌍이라 사용자에게 별도 확인 [완료] — publishing-rules.md에서 삭제하기로 결정. 원문은 요약 없이 그대로 이 파일 "남은 작업(백로그)" 절로 옮기고, publishing-rules.md 4곳엔 "history.md의 남은 작업(백로그) 참고" 포인터만 남김

---

## 남은 작업 (백로그)

TODO.md 원본 백로그 중 실제 코드 기준으로 재확인한 현재 상태:

| 내용 | 대상 파일 | 상태 |
|---|---|---|
| `is--open`/`is--active` → `is-open`/`is-active` | `dropdown.css`(4곳) + `main.js` | 미해결 (코드에 여전히 `is--open`/`is--active` 존재, 2026-07-27 재확인) |
| primitive 직접 참조 → semantic | `code-panel.css` | 미해결 (`var(--White)` 등 직접 참조 여전히 존재) |
| `--White` → `--color-bg-surface` 등으로 교체 후 토큰 삭제 | `tokens.css` + `code-panel.css` | 미해결 |
| `--gray: gray` / `--black: black` 삭제 (사용처 0곳) | `tokens.css` | 미확인 — 재검토 필요 |
| `--weight-Semibold` → `--weight-semibold` | `tokens.css` + 컴포넌트 다수(18곳 확인) | 미해결 |
| `--radius-*` / `--height-*` 숫자 표기로 통일 | `tokens.css` + 대부분의 컴포넌트 | 미해결 (현재 xs/sm/md/lg 네이밍 유지 중) |
| `img` → `image` | `dropdown-menu.css`, `style.css` | 미확인 — 재검토 필요 |
| `dropdown__userinfo` → `dropdown__user-info` | `dropdown-menu.css` + `dropdown-menu.html` | 미해결 |

publishing-rules.md 안에 있던 인라인 "수정 필요" 콜아웃 4개도 위 표와 같은 내용이라 중복이었음 — publishing-rules.md에서는 삭제하고, 원문 그대로 이곳으로 옮김(요약 없이 원본 문구 보존):

> **수정 필요** — `--radius-xs/sm/md/lg`, `--height-xs~xl`, `--height-1xl`, `--weight-Semibold`, `--White` 남아 있음.
> (publishing-rules.md §1 "토큰 이름은 실제 px 값을 쓴다" 아래에 있던 콜아웃)

> **수정 필요** — `dropdown.css`와 `main.js`가 `is--open` / `is--active`를 쓰고 있음.
> 나머지(modal · tabs · pagination)는 `is-`. 두 파일만 고치면 됨.
> (publishing-rules.md §5 "클래스 이름은 BEM" 아래에 있던 콜아웃)

> **수정 필요** — `img`(7곳)를 `image`로 통일.
> (publishing-rules.md §6 "단어를 고정한다 — 줄임말" 아래에 있던 콜아웃)

> **수정 필요** — `dropdown__userinfo` → `dropdown__user-info`
> (publishing-rules.md §6 "단어를 고정한다 — 표기" 아래에 있던 콜아웃)

그 외:
- **STEP 6 — Table 정렬 헤더 등 실제 JS 동작**: 원래 백로그였지만, 이후 작업에서 Pagination("실제 페이지 전환 JS는 없는 정적 데모")·Chart("데이터 바인딩 JS 없음")·Date Picker(네이티브 우선) 등 "정적 데모, 필요한 경우만 최소 JS(dropdown/modal 열고 닫기)" 원칙이 반복적으로 채택됨 — 이 백로그 항목이 그 원칙과 맞는지 재검토 필요. 그대로 만들 거면 우선순위 재확인.
- **code-panel(구문강조+Copy 버튼)을 컴포넌트 페이지에 적용할지**: TASK-1에서 이미 18개 전체에 적용 완료 — 해결됨, 백로그에서 제외.
- **Breadcrumb**: 아직 미착수. "필요할 때 추가".
- **Skeleton**: 아직 미착수 (TODO2.md 6장 질문 #6, 답변 안 됨). "필요할 때 추가".
