# css-token-publishing — 퍼블리싱 가이드 문서 구축

> Claude Code 작업 지시서 겸 명세서
> 최종 수정: 2026-07-24

---

## 0. 컨텍스트

**무엇을 만드는가**
실무 퍼블리싱용 디자인 시스템 가이드 사이트. 디자인 토큰 → 컴포넌트 → 유틸리티 → 패턴 순으로
"이 클래스를 쓰면 화면에 뭐가 나오고, 어떤 토큰이 적용되는지"를 개발자·퍼블리셔가 바로 확인하는 문서.

**기술 제약**
- 정적 HTML + CSS (프레임워크 없음)
- 클래스 네이밍: BEM
- 모든 수치는 CSS 변수(토큰)로 참조. 하드코딩 금지.

**디렉터리**
```
css-token-publishing/
├─ index.html          ← 문서 홈 (사이드바 + 카테고리 카드)
├─ component/          ← 컴포넌트별 개별 페이지
├─ css/
├─ images/
└─ TODO2.md       ← 이 문서
```

---

## 1. 이번 작업 (우선순위 순)

### TASK-1. 컴포넌트 페이지 템플릿 통일 **[최우선]**

`component/` 폴더 안 **모든 페이지**를 아래 6개 섹션 구조로 동일하게 재작성한다.
섹션 순서·제목을 임의로 바꾸지 않는다.

| # | 섹션 | 내용 |
|---|------|------|
| 1 | Overview | 목적 + 언제 쓰는지 (2~3줄) |
| 2 | Variants | primary / default / outline / dashed / text / link |
| 3 | Options | size(sm·md·lg) / round / icon-only / block / danger |
| 4 | States | default / hover / focus / active / disabled / loading |
| 5 | Examples | Icon / SNS Login / Button Group |
| 6 | Guidelines | 해당 컴포넌트 한정 Do·Don't, aria 규칙 |

> ⚠️ 위 Variants·Options·Examples 값은 **Button 기준**으로 작성된 예시다.
> Input, Table 등 다른 컴포넌트는 **섹션 구조(6단계)만 동일하게 유지**하고
> 내부 항목은 해당 컴포넌트에 맞게 채운다. Button 값을 그대로 복사하지 말 것.

### TASK-2. `index.html` 사이드바 구현

- 2번 섹션의 IA 트리를 그대로 반영한 **트리 구조 사이드바**
- 컴포넌트 목록은 각 `component/*.html` 페이지로 링크
- index.html 본문은 카테고리별 **카드 그리드**로 분리 표시

---

## 2. 정보 구조 (IA)

`index.html` 사이드바 = 아래 트리.

```
1. 시스템 소개              무엇을 위한 문서인지
2. Design Tokens            색 / 타이포 / spacing / radius / shadow
3. 공통 원칙                전역 Do·Don't, BEM 네이밍, 접근성 기본
4. 컴포넌트 목록            카드 그리드 → 각 페이지 링크
5. Utilities
6. Patterns
```

### 2-1. Design Tokens 하위

| 중분류 | 항목 |
|---|---|
| Visual Style | 컬러(Color) / 그림자(Box Shadow) / 트랜지션(Transition) |
| Layout & Spacing | 패딩·마진(Padding / Margin) / flex 간격(Gap) |
| Size | 높이(Height) / 아이콘 크기(Icon Size) |
| z-index | 레이어 우선순위 |
| Radius | Border Radius |
| Typography | 폰트 크기(Font Size) / 폰트 굵기(Font Weight) |

### 2-2. Components 하위

| 중분류 | 컴포넌트 |
|---|---|
| 입력 (Forms) | button, input, textarea, checkbox, radio, select, switch, dropdown |
| 탐색/이동 (Navigation) | dropdown-menu, pagination, tabs |
| 조회/노출 (Data Display) | accordion, badge, card, table, empty-state, tooltip |
| 알림/피드백 (Feedback) | alert, modal, toast, skeleton |

---

## 3. Utilities 페이지 작성 규칙

가이드 문서에 등록된 클래스를 사용할 때 **화면에 렌더링되는 시각적 결과물**과
**적용된 상세 스펙**을 함께 보여준다.

**선별 기준** — 현업에서 개발자가 퍼블리셔에게 가장 많이 질문하고, 가장 많이 실수하는 영역.

**각 항목 포맷**
1. `### N. 이름 (.클래스명)`
2. 설명 1~2줄
3. 렌더링 결과 이미지 — `![설명](../images/파일명.png)` (상대경로 사용)
4. 클래스명/마크업 ↔ 적용 토큰 2열 표

### 작성 예시

#### 1. 버튼 컴포넌트 (`.btn-primary`)
메인 브랜드 컬러와 표준 여백 토큰이 적용된 가장 기본이 되는 솔리드(Solid)형 버튼.

| 클래스명 / HTML 마크업 | 적용된 디자인 토큰 |
| :--- | :--- |
| `.btn-primary`<br><br>`<button class="btn-primary">확인</button>` | • 배경색: `var(--color-primary)` (`#007bff`)<br>• 글자색: `var(--color-white)` (`#ffffff`)<br>• 안쪽여백: `var(--padding-md)` (`8px 16px`)<br>• 모서리곡률: `var(--radius-sm)` (`4px`)<br>• 글자굵기: `var(--font-weight-bold)` (`700`) |

#### 2. 폼 입력 컴포넌트 (`.form-input`)
텍스트 입력 시 표준 여백·테두리 색상, 포커스 상태의 시각적 피드백이 토큰화된 기본 입력창.

| 클래스명 / HTML 마크업 | 적용된 디자인 토큰 |
| :--- | :--- |
| `.form-input`<br><br>`<input type="text" class="form-input" placeholder="내용을 입력하세요.">` | • 기본 테두리: `1px solid var(--color-gray-300)`<br>• 포커스 테두리: `1px solid var(--color-primary)`<br>• 안쪽여백: `var(--padding-sm) var(--padding-md)` (`10px 14px`)<br>• 폰트 크기: `var(--font-size-base)` (`16px`)<br>• 트랜지션: `border-color var(--transition-fast)` |

#### 3. 텍스트 생략 유틸리티 (`.ellipsis`)
카드 UI나 리스트에서 제목이 지정 너비를 넘어가면 말줄임표(…) 처리.

| 클래스명 / HTML 마크업 | 적용된 스펙 |
| :--- | :--- |
| `.ellipsis`<br><br>`<p class="ellipsis" style="width:200px;">이 텍스트는 길어서 잘립니다.</p>` | • `overflow: hidden;`<br>• `text-overflow: ellipsis;`<br>• `white-space: nowrap;` |

#### 4. 상태 표시 배지 (`.badge-success`)
승인·대기·거절 등 데이터 상태를 칩 형태로 표시.

| 클래스명 / HTML 마크업 | 적용된 디자인 토큰 |
| :--- | :--- |
| `.badge-success`<br><br>`<span class="badge badge-success">승인</span>` | • 배경색: `var(--color-success-light)` (`#e6f4ea`)<br>• 글자색: `var(--color-success-dark)` (`#137333`)<br>• 모서리곡률: `var(--radius-full)` (`9999px`)<br>• 폰트 크기: `var(--font-size-xs)` (`12px`) |

#### 5. 모달 레이어 (`.modal-overlay`, `.modal-content`)
화면 최상단 팝업. 뒷배경 투명도와 z-index 매핑이 핵심.

| 클래스명 / HTML 마크업 | 적용된 디자인 토큰 |
| :--- | :--- |
| `.modal-overlay`<br><br>`<div class="modal-overlay"><div class="modal-content">…</div></div>` | • 레이어: `z-index: var(--z-index-modal)` (`1000`)<br>• 배경: `rgba(0,0,0,var(--opacity-dim))` (`0.5`)<br>• 그림자: `var(--shadow-lg)`<br>• 곡률: `var(--radius-md)` (`8px`) |

#### 6. 간격 유틸리티 (`.gap-x-md`)
개별 요소에 margin을 주는 대신 부모에 한 줄로 일정 간격 적용.

| 클래스명 / HTML 마크업 | 적용된 디자인 토큰 |
| :--- | :--- |
| `.gap-x-md`<br><br>`<div class="d-flex gap-x-md"><div>Card 1</div><div>Card 2</div></div>` | • 가로 간격: `gap: var(--flex-gap-md);` (`16px`)<br>• 용도: 카드 리스트·버튼 그룹 가로 정렬 |

---

## 4. Patterns

### 개요
Patterns는 여러 **Components**와 **Utilities**를 조합해 실제 화면을 구성하는 UI 패턴이다.
단일 컴포넌트 사용법이 아니라, **실무에서 자주 쓰는 화면 구조와 배치 방법**을 정의한다.

### 구성 원칙
- Components를 조합해 화면을 구성한다.
- Design Tokens 기반으로 일관된 간격·크기를 유지한다.
- Utilities를 활용해 레이아웃을 구성한다.
- 동일한 목적의 화면은 동일한 패턴을 사용한다.

### 4-1. Search Form
목록 화면 상단에서 데이터를 검색·필터링하는 기본 검색 영역.

- **포함**: Input, Select, Date Picker, Button
- **사용 예**: 회원 관리, 게시판, 상품 목록, 사용자 조회

```html
<!-- 클래스는 예시. 실제 작업 시 토큰 기반 클래스 사용 -->
<section class="search-area">
  <input type="text" placeholder="검색어 입력">
  <select><option>전체</option></select>
  <button class="btn-primary">검색</button>
  <button class="btn-secondary">초기화</button>
</section>
```

### 4-2. Search + Table
검색 조건과 결과 목록을 함께 쓰는 가장 대표적인 관리 화면 패턴.

- **포함**: Search Form, Table, Pagination, Empty State
- **사용 예**: 회원관리, 사용자관리, 공지사항, 주문관리

```
검색 영역
────────────────
테이블
────────────────
페이지네이션
```

### 4-3. Dashboard
주요 현황과 통계를 카드 형태로 제공하는 대시보드.

- **포함**: Card, Badge, Chart, Table
- **사용 예**: 관리자 메인, 프로젝트 현황, 운영 현황

```
Card  Card  Card  Card
──────────────
Chart
──────────────
최근 목록
```

### 4-4. Detail Page
선택한 데이터의 상세 정보를 조회·수정하는 화면.

- **포함**: Input, Textarea, Switch, Button
- **사용 예**: 회원 상세, 상품 상세, 게시글 상세

```
기본 정보
──────────────
추가 정보
──────────────
[저장] [취소]
```

### 4-5. Login
서비스 인증 화면.

- **포함**: Logo, Input, Checkbox, Button

```
Logo
아이디
비밀번호
[로그인]
```

### 4-6. Modal Form
데이터 등록·수정용 팝업 입력 화면.

- **포함**: Modal, Input, Select, Button

```
Modal
──────────
Input / Select / Textarea
──────────
[취소] [저장]
```

### 4-7. Empty State
조회 결과가 없거나 데이터가 없을 때 현재 상태를 안내하는 패턴.

- **포함**: Empty State, Button
- **사용 예**: 검색 결과 없음, 등록된 데이터 없음, 권한 없음

---

## 5. 작업 규칙

- 목차의 번호는 **문서 내 순서 표현용**이다. 실제 HTML 클래스명·파일명에 번호를 넣지 않는다.
- 이미지 경로는 **상대경로**만 사용한다. (`../images/…`)
- 토큰 값은 반드시 실제 CSS 파일을 읽어서 채운다. 추정값을 쓰지 않는다.
- 한 번에 한 TASK씩 진행하고, 완료 후 변경 파일 목록을 보고한다.

---

## 6. 확인 필요 (진행 전 질문할 것)

1. **토큰 원본 파일 위치** — `css/` 안 어느 파일이 토큰 정의의 단일 출처인가? 위 3장 표의 값들은 예시이므로 실제 값으로 대체 필요.
2. **Chart** — Patterns(Dashboard)에서 쓰이지만 컴포넌트 목록에 없다. 추가할지, 외부 라이브러리로 뺄지?
3. **Date Picker** — Search Form에서 쓰이지만 컴포넌트 목록에 없다. Forms에 추가할지?
4. **Logo** — Login 패턴에서 컴포넌트로 취급되지만 컴포넌트가 아니다. 패턴 설명에서 제외할지?
5. **dropdown vs dropdown-menu** — Forms의 `dropdown`과 Navigation의 `dropdown-menu` 역할 구분이 필요하다.
6. **Skeleton** — "추가 화면"이라는 메모가 있었다. 이번 범위에 포함인지 확인.
