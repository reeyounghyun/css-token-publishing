# css-token-publishing

CSS 커스텀 프로퍼티(디자인 토큰) 기반으로 만든 UI 컴포넌트 퍼블리싱 모음입니다. `tokens.css` 하나를 기준(single source of truth)으로 색상 · 간격 · 타이포 · radius · shadow 등을 관리하고, 각 컴포넌트 css는 하드코딩된 값 대신 토큰만 참조하도록 정리되어 있습니다.

## 폴더 구조

```
component-ui/
├─ index.html              # 랜딩 페이지 (Brickify)
├─ component/               # 컴포넌트별 데모 페이지
│  ├─ button.html
│  ├─ dropdown.html
│  ├─ dropdownMenu.html
│  ├─ input.html
│  ├─ pagination.html
│  ├─ switch.html
│  └─ textarea.html
├─ css/
│  ├─ tokens.css           # 디자인 토큰 정의 (색상/spacing/gap/text/radius/shadow/transition/z-index/icon 등). 여기가 기준
│  ├─ base.css             # 랜딩 페이지 전용 토큰 + 기본 타이포 + container/grid 유틸
│  ├─ reset.css            # 브라우저 기본 스타일 초기화. 안 건드림
│  ├─ typography.css       # 타이포 유틸리티 클래스 (.text-display-*, .text-sm 등)
│  ├─ style.css             # 랜딩 페이지 전용 스타일. 여기서 작업
│  └─ component/            # 컴포넌트별 css (button.html ↔ button.css 1:1 대응)
├─ fonts/                    # Pretendard 서브셋 (Regular/Medium/Bold, woff2)
├─ images/
└─ js/
```

## 토큰 규칙 (`css/tokens.css`)

- 새 값이 필요하면 하드코딩하지 말고 **먼저 `tokens.css`에 이미 있는 값인지 확인** 후, 없을 때만 새 토큰 추가
- **이름은 실제 px 값 기준**: `--spacing-4`, `--gap-8`, `--text-16`, `--radius-14`처럼 숫자가 곧 px 값입니다 (rem으로 환산해 저장, 16px 루트 기준)
- **색상 스케일**: `--gray-*`, `--primary-*`, `--error-*`는 50~900 단계, 그 외 반복되는 색은 `--slate-100`/`--slate-700`처럼 이름을 붙여 중복 정의를 없앴습니다
- **컴포넌트 전용 값**은 용도가 명확할 때만 별도 토큰으로 둡니다 (예: `--brand-facebook`, `--track-bg`)
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
| `button.html` | 버튼, SNS 로그인 버튼 |
| `dropdown.html` | 셀렉트 / 커스텀 드롭다운 5종 |
| `dropdownMenu.html` | 드롭다운 메뉴, 체크리스트 |
| `input.html` | 비밀번호 / 이메일 / 전화번호 인풋 |
| `pagination.html` | 페이지네이션 5종 |
| `switch.html` | 토글 스위치 (상태/사이즈) |
| `textarea.html` | 텍스트에어리어 |

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
