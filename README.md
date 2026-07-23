# css-token-publishing

CSS 커스텀 프로퍼티(디자인 토큰) 기반으로 만든 UI 컴포넌트 퍼블리싱 모음입니다. `tokens.css` 하나를 기준(single source of truth)으로 색상 · 간격 · 타이포 · radius · shadow 등을 관리하고, 각 컴포넌트 css는 하드코딩된 값 대신 토큰만 참조하도록 정리되어 있습니다.

## 폴더 구조

```
component-ui/
├─ index.html              # 컴포넌트 인덱스 — 여기서 시작. 토큰 카탈로그 + 컴포넌트 검색/미리보기(iframe)
├─ brickify.html            # 랜딩 페이지 데모(Brickify). 컴포넌트 인덱스와 무관, 별개 작업물
├─ component/               # 컴포넌트별 데모 페이지 (아래 "컴포넌트 보기" 표 참고)
├─ css/
│  ├─ tokens.css           # 디자인 토큰 정의 (primitive/semantic 색상 + spacing/gap/text/radius/shadow/transition/z-index/icon 등). 여기가 기준
│  ├─ base.css             # brickify.html 전용 토큰 + 기본 타이포 + container/grid 유틸
│  ├─ reset.css            # 브라우저 기본 스타일 초기화. 안 건드림
│  ├─ typography.css       # 타이포 유틸리티 클래스 (.text-display-*, .text-sm 등)
│  ├─ style.css             # brickify.html 전용 스타일
│  └─ component/            # 컴포넌트별 css (button.html ↔ button.css 1:1 대응)
├─ fonts/                    # Pretendard 서브셋 (Regular/Medium/Bold, woff2)
├─ images/
└─ js/
```

## index.html (컴포넌트 인덱스)

새 프로젝트 시작할 때 여기부터 엽니다. 두 구역으로 구성됩니다.

### 1. 토큰 카탈로그

`tokens.css`에 있는 값을 눈으로 보고 고를 수 있게 시각화합니다.

- **색상**: primitive(gray/primary/error/warning 50~900)와 semantic(텍스트/아이콘/테두리/배경/포커스링)을 구분해서 스와치로 표시
- **타이포**: `text-*`/`display-*` 각 스케일을 실제 텍스트로 렌더링
- **spacing**: 막대 길이로 시각화 (`gap-*`는 `spacing-*`와 값이 완전히 같아서 중복 표시 안 함)
- **radius / shadow**: 적용된 박스로 시각화
- 스와치를 클릭하면 `var(--토큰명)`이 클립보드에 복사됩니다
- 색상 hex, px 값은 JS에 하드코딩하지 않고 `getComputedStyle`로 **tokens.css의 실제 값을 런타임에 읽어옵니다.** 토큰 값이 바뀌면 이 카탈로그도 자동으로 따라옵니다.

### 2. 컴포넌트 검색 + 미리보기

- 검색창에 입력하면 컴포넌트 이름/설명으로 카드가 필터링됩니다
- 각 카드는 실제 `component/*.html`을 **iframe으로 통째로 띄운 것**입니다. 스크린샷이나 재구현이 아니라 진짜 그 페이지라서, 항상 최신 상태를 반영합니다
- 카드 우측 상단 "새 창에서 열기"로 전체 화면에서 볼 수 있습니다

**설계 메모**: 지시서 원안은 `index.html`의 툴 UI를 `#ix` + `all: unset`으로 격리하는 방식이었습니다(컴포넌트 css가 인덱스 페이지 자체를 침범하지 못하게). 대신 `index.html`이 `css/component/*.css`를 **아예 로드하지 않고** iframe으로만 컴포넌트를 보여주는 방식을 택했습니다 — 격리해야 할 대상 자체가 사라지기 때문에 `all:unset`보다 확실합니다. 인덱스 자체의 UI 클래스는 관례상 `.ix-` 접두사를 유지합니다.

새 컴포넌트를 추가하면 `index.html` 안 `COMPONENTS` 배열(파일명, 이름, 설명)에도 등록해야 인덱스에 노출됩니다. 등록 안 하면 파일은 있어도 검색에 안 뜹니다.

## 토큰 규칙 (`css/tokens.css`)

- 새 값이 필요하면 하드코딩하지 말고 **먼저 `tokens.css`에 이미 있는 값인지 확인** 후, 없을 때만 새 토큰 추가
- **이름은 실제 px 값 기준**: `--spacing-4`, `--gap-8`, `--text-16`, `--radius-14`처럼 숫자가 곧 px 값입니다 (rem으로 환산해 저장, 16px 루트 기준)
- **색상은 primitive / semantic 2단 구조**입니다.
  - primitive: `--gray-*`, `--primary-*`, `--error-*`(50~900 단계) 등 원시값. `tokens.css` 안에서만 참조
  - semantic: `--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-icon-*`, `--color-ring-*` 등 역할 기반 토큰. **`css/component/*.css`는 색상은 이 semantic 토큰만 참조**하고 primitive를 직접 쓰지 않습니다
  - 컬러가 바뀔 때 semantic 매핑(`tokens.css`의 `--color-*` 정의부)만 갈아끼우면 전체 컴포넌트가 따라오도록 하기 위함
  - `--slate-*`, `--box-border`, `--menu-divider`는 `--gray-*` 스케일과 값이 근접한 중복 정의여서 gray 스케일로 흡수 통합했습니다(제거됨)
- **컴포넌트 전용 값**은 용도가 명확할 때만 별도 토큰으로 둡니다 (예: `--brand-facebook`, `--color-status-dot`)
- **transition**: `--transition-fast`(0.15s) / `--transition-normal`(0.18s) / `--transition-slow`(0.2s)로 컴포넌트별 기존 속도를 유지한 채 이름만 통일
- **z-index**: `--z-dropdown` / `--z-modal` / `--z-toast`로 겹침 순서를 미리 정의
- font-size = rem, 나머지(gap/padding/border) = px
- 미디어쿼리 = min-width, 단위 em (48em=768, 64em=1024, 80em=1280), 해당 컴포넌트 바로 밑에 작성
- 바깥 반복 = grid, 안쪽 정렬 = flex

## grid

컬럼 수는 클래스 안 만들고 인라인 변수로:

```html
<ul class="grid" style="--cols:4">
```

```css
/* 반응형은 --cols만 덮어쓰기 */
.card-grid { --cols: 1; }
@media (min-width: 48em) { .card-grid { --cols: 2; } }
@media (min-width: 64em) { .card-grid { --cols: 4; } }
```

## 컴포넌트 보기

각 `component/*.html`을 브라우저로 열면 해당 컴포넌트의 상태/사이즈 변형을 한 페이지에서 확인할 수 있습니다.

| 파일 | 컴포넌트 |
|---|---|
| `button.html` | 버튼, SNS 로그인 버튼, 로딩 상태 |
| `input.html` | 비밀번호 / 이메일 / 전화번호 / 기본 텍스트 인풋, 사이즈 3종 |
| `textarea.html` | 텍스트에어리어 (기본/에러/비활성/resize 제어) |
| `checkbox.html` | 체크박스 / 라디오 |
| `switch.html` | 토글 스위치 (상태/사이즈) |
| `dropdown.html` | 셀렉트 / 커스텀 드롭다운 5종 (disabled 항목, 구분선 포함) |
| `dropdown-menu.html` | 드롭다운 메뉴, 체크리스트 |
| `alert.html` | Alert / Banner (info/success/warning/error) |
| `toast.html` | 토스트 (info/success/warning/error) |
| `badge.html` | 뱃지/태그 (색상·크기 변형, 삭제 가능한 태그) |
| `card.html` | 카드 (기본/가로형/통계/리스트/플레이스홀더/hover 가능형) |
| `table.html` | 테이블 (기본/정렬가능 헤더/빈 상태/로딩/고정헤더/피벗/div 기반 Grid Table) |
| `tabs.html` | 탭 (Underline/Pill, disabled 탭) |
| `pagination.html` | 페이지네이션 7종 |
| `modal.html` | 모달 (sm/md/lg, 폼/테이블 포함, 하단버튼 없는 버전) |
| `tooltip.html` | 툴팁 (4방향, JS 없이 CSS만으로 동작) |
| `accordion.html` | 아코디언 (`<details>/<summary>` 기반, JS 없이 동작) |
| `empty-state.html` | 빈 상태 (기본/검색결과 없음/에러) |

## 폰트

Pretendard 1.3.9 로컬 호스팅. CDN 없이 동작합니다.

- `fonts/`에 subset woff2 3개 (Regular 400 / Medium 500 / Bold 700), 총 800KB
- `base.css` 최상단 `@font-face`에서 연결
- 굵기 더 필요하면 원본 zip의 `web/static/woff2-subset/`에서 파일 복사 + `@font-face` 블록 추가

굵기 추가 예시:
```css
@font-face {
  font-family: "Pretendard";
  src: url("../fonts/Pretendard-SemiBold.subset.woff2") format("woff2");
  font-weight: 600;
  font-display: swap;
}
```
