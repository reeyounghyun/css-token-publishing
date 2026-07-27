# css-token-publishing

CSS 커스텀 프로퍼티(디자인 토큰) 기반으로 만든 UI 컴포넌트 퍼블리싱 모음입니다. `tokens.css` 하나를 기준(single source of truth)으로 색상 · 간격 · 타이포 · radius · shadow 등을 관리하고, 각 컴포넌트 css는 하드코딩된 값 대신 토큰만 참조하도록 정리되어 있습니다.

이 문서는 **프로젝트 사용 설명서**입니다 — 처음 열었을 때 "뭘 어디서부터 봐야 하는지"만 안내합니다. 규칙·작업절차·진행기록은 각자 문서로 분리돼 있습니다.

## 문서 안내

| 문서 | 용도 |
|---|---|
| **README.md** (이 문서) | 프로젝트 사용 설명서 — 폴더 구조, index.html 사용법, 시작점 |
| [publishing-rules.md](publishing-rules.md) | 퍼블리싱 규칙 (토큰 네이밍, BEM, 단위, 코드 스타일) |
| [workflow.md](workflow.md) | 작업 절차 (STEP 단위, QA 체크리스트, AI 요청 양식) |
| [spec.md](spec.md) | 프로젝트 스펙/지시서 (IA, Utilities·Patterns 정의) |
| [history.md](history.md) | 날짜순 진행 히스토리 + 남은 작업(백로그) |

## 폴더 구조

```
component-ui/
├─ index.html              # 컴포넌트 인덱스 — 여기서 시작. 토큰 카탈로그 + 컴포넌트 검색/미리보기(iframe)
├─ brickify.html            # 랜딩 페이지 데모(Brickify). 컴포넌트 인덱스와 무관, 별개 작업물
├─ component/               # 컴포넌트별 데모 페이지 (아래 "컴포넌트 보기" 표 참고)
├─ patterns/                 # 여러 컴포넌트를 조합한 실무 화면 패턴 (Login 등). index.html Patterns 섹션에서 iframe으로 임베드
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

## 토큰·네이밍·레이아웃 규칙

`tokens.css`에 이미 있는 값인지 먼저 확인 후 새 토큰을 추가하는 것, 색상 primitive/semantic 2단 구조, px 기준 토큰 네이밍, grid/flex 레이아웃 원칙 등 전체 규칙은 **[publishing-rules.md](publishing-rules.md)** 참고. 여기서 중복 설명하지 않습니다.

## 컴포넌트 보기

각 `component/*.html`을 브라우저로 열면 해당 컴포넌트의 상태/사이즈 변형을 한 페이지에서 확인할 수 있습니다.

전체 목록·설명은 여기 표로 따로 관리하지 않습니다 — 컴포넌트가 추가/변경될 때마다 손으로 동기화해야 해서 금방 낡습니다.
대신 `index.html`을 열어 검색하세요. `index.html`의 `COMPONENTS` 배열이 유일한 최신 목록이고, 카테고리별 분류는 `spec.md` 2-2절 참고.

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
