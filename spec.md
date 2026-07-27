# css-token-publishing — 스펙 / 작업 지시서

> 프로젝트 컨텍스트, 정보구조(IA), 작성 규칙, Patterns 정의. 진행 히스토리(날짜순 기록)는 [history.md](history.md) 참고.
> 원본: TODO2.md (2026-07-24 작성) — 진행사항 기록을 history.md로 분리하며 스펙 부분만 이 파일로 정리함.

---

## 0. 컨텍스트

**무엇을 만드는가**
실무 퍼블리싱용 디자인 시스템 가이드 사이트. 디자인 토큰 → 컴포넌트 → 유틸리티 → 패턴 순으로
"이 클래스를 쓰면 화면에 뭐가 나오고, 어떤 토큰이 적용되는지"를 개발자·퍼블리셔가 바로 확인하는 문서.

**기술 제약**
- 정적 HTML + CSS (프레임워크 없음)
- 클래스 네이밍: BEM
- 모든 수치는 CSS 변수(토큰)로 참조. 하드코딩 금지.

**디렉터리** (현재 기준 — README.md 폴더 구조가 최신 상태를 반영하니 그쪽이 우선)
```
css-token-publishing/
├─ index.html          ← 문서 홈 (사이드바 + 카테고리 카드)
├─ component/          ← 컴포넌트별 개별 페이지
├─ patterns/           ← 여러 컴포넌트를 조합한 실무 화면 패턴
├─ css/
├─ images/
├─ history.md          ← 진행 히스토리
└─ spec.md             ← 이 문서
```

---

## 1. 작업 개요

### TASK-1. 컴포넌트 페이지 템플릿 통일 (완료 — history.md 참고)

`component/` 폴더 안 **모든 페이지**를 아래 6개 섹션 구조로 동일하게 재작성한다.
섹션 순서·제목을 임의로 바꾸지 않는다.

| # | 섹션 | 내용 |
|---|------|------|
| 1 | Overview | 목적 + 언제 쓰는지 (2~3줄) |
| 2 | Variants | 스타일 변형 (컴포넌트마다 다름) |
| 3 | Options | size(sm·md·lg) / round / icon-only / block / danger 등 부가 옵션 |
| 4 | States | default / hover / focus / active / disabled / loading 등 |
| 5 | Examples | 실제 조합 예시 |
| 6 | Guidelines | 해당 컴포넌트 한정 Do·Don't, aria 규칙 |

> ⚠️ 위 항목 예시는 Button 기준. 다른 컴포넌트는 **섹션 구조(6단계)만 동일하게 유지**하고 내부 항목은 해당 컴포넌트에 맞게 채운다.

### TASK-2. `index.html` 사이드바 구현 (완료 — history.md 참고)

- 2번 섹션의 IA 트리를 그대로 반영한 트리 구조 사이드바
- 컴포넌트 목록은 각 `component/*.html` 페이지로 링크
- index.html 본문은 카테고리별 카드 그리드로 분리 표시

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
| 입력 (Forms) | button, input, textarea, checkbox, radio, select, switch, dropdown, date-picker |
| 탐색/이동 (Navigation) | dropdown-menu, pagination, tabs |
| 조회/노출 (Data Display) | accordion, badge, card, chart, table, empty-state, tooltip |
| 알림/피드백 (Feedback) | alert, modal, toast, skeleton(미착수) |

> date-picker/chart는 2026-07-27에 신규 추가되며 이 표에 반영함 (history.md 참고). skeleton은 아직 미착수.

---

## 3. Utilities 페이지 작성 규칙

가이드 문서에 등록된 클래스를 사용할 때 **화면에 렌더링되는 시각적 결과물**과 **적용된 상세 스펙**을 함께 보여준다.

**선별 기준** — 현업에서 개발자가 퍼블리셔에게 가장 많이 질문하고, 가장 많이 실수하는 영역.

**각 항목 포맷**
1. `### N. 이름 (.클래스명)`
2. 설명 1~2줄
3. 렌더링 결과 이미지 — `![설명](../images/파일명.png)` (상대경로 사용)
4. 클래스명/마크업 ↔ 적용 토큰 2열 표

> 아래 원안 예시(버튼/폼 입력/ellipsis/badge/modal/gap)는 최초 작성 시 참고용으로 든 샘플이며, 실제 구현은 `index.html` section-utilities의 `ix-util-demo`/`ix-util-table` 방식으로 진행됨(spacing/gap, radius, shadow 데모 + 값 표). 클래스명 등 세부는 실제 구현 기준으로 확인할 것.

---

## 4. Patterns 정의 (7종 — 전부 구현 완료, `patterns/*.html` 참고)

### 개요
Patterns는 여러 **Components**와 **Utilities**를 조합해 실제 화면을 구성하는 UI 패턴이다.
단일 컴포넌트 사용법이 아니라, **실무에서 자주 쓰는 화면 구조와 배치 방법**을 정의한다.

### 구성 원칙
- Components를 조합해 화면을 구성한다.
- Design Tokens 기반으로 일관된 간격·크기를 유지한다.
- Utilities를 활용해 레이아웃을 구성한다.
- 동일한 목적의 화면은 동일한 패턴을 사용한다.

### 4-1. Search Form — ✅ `patterns/search-form.html`
목록 화면 상단에서 데이터를 검색·필터링하는 기본 검색 영역.
- **포함**: Input, Select, Date Picker, Button
- **사용 예**: 회원 관리, 게시판, 상품 목록, 사용자 조회

### 4-2. Search + Table — ✅ `patterns/search-table.html`
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

### 4-3. Dashboard — ✅ `patterns/dashboard.html`
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

### 4-4. Detail Page — ✅ `patterns/detail-page.html`
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

### 4-5. Login — ✅ `patterns/login.html`
서비스 인증 화면.
- **포함**: Logo(정식 컴포넌트 아님, 자리표시자로 처리), Input, Checkbox, Button
```
Logo
아이디
비밀번호
[로그인]
```

### 4-6. Modal Form — ✅ `patterns/modal-form.html`
데이터 등록·수정용 팝업 입력 화면.
- **포함**: Modal, Input, Select, Button
```
Modal
──────────
Input / Select / Textarea
──────────
[취소] [저장]
```

### 4-7. Empty State — ✅ `patterns/empty-state.html`
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

## 6. 확인 필요 사항 — 해결 현황

원래 "진행 전 질문할 것" 목록이었으나 전부 진행되며 아래처럼 정리됨. 해결 과정의 상세 판단 근거는 history.md 참고.

1. **토큰 원본 파일 위치** — 해결. `css/tokens.css`가 단일 출처 (README "토큰 규칙" 절에 명시).
2. **Chart** — 해결. 컴포넌트로 신규 제작(`component/chart.html`), 외부 라이브러리 대신 정적 CSS 막대 그래프.
3. **Date Picker** — 해결. Forms 카테고리에 신규 제작(`component/date-picker.html`), 네이티브 `input[type="date"]` 기반.
4. **Logo** — 해결. Login 패턴에서 정식 컴포넌트로 만들지 않고 자리표시자로 처리.
5. **dropdown vs dropdown-menu** — 해결. 두 페이지 Overview에 상호 참조 문구 추가, Forms/Navigation으로 역할 구분.
6. **Skeleton** — **미해결**. 아직 착수 안 함. 필요해지면 `component/skeleton.html`로 추가 (history.md 백로그 참고).
