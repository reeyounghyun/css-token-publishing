# TASK-1 · TASK-2 진행 현황

> TODO2.md 작업 지시서 기준 진행 상황 기록
> 최종 수정: 2026-07-24

---

## TASK-1 — 컴포넌트 페이지 템플릿 통일 [완료]

`component/` 안 18개 파일 전부 **Overview → Variants → Options → States → Examples → Guidelines** 6단계로 재작성 완료.

- 공용 CSS `css/component/doc-template.css` 신설, 18개 파일 전부 연결
- 코드패널(`css/component/code-panel.css`) — Copy 버튼을 코드와 안 겹치는 별도 툴바로 분리하는 구조로 통일
- `button.html`을 레퍼런스로 먼저 확정한 뒤, 나머지 17개를 간단 → 중간 → 어려움 순으로 순차 적용
- 대상 18개: Button, Input, Textarea, Checkbox/Radio, Switch, Dropdown, Dropdown Menu, Pagination, Tabs, Accordion, Badge/Tag, Card, Table, Empty State, Tooltip, Alert/Banner, Modal, Toast

**변경 파일**
`component/*.html`(18개), `css/component/doc-template.css`(신규), `css/component/code-panel.css`, `css/component/button.css`, `css/tokens.css`(Primary 컬러 Purple→Blue), `js/main.js`(드롭다운 아바타 선택 동기화 버그 수정)

---

## TASK-2 — index.html 사이드바 [완료 + 추가 작업]

TODO2 2장 IA를 그대로 반영한 트리 구조 사이드바 구현.

- 6개 대분류: 시스템 소개 / Design Tokens / 공통 원칙 / 컴포넌트 목록 / Utilities / Patterns
- 콘텐츠 없는 4개 항목(시스템 소개·공통 원칙·Utilities·Patterns)은 "준비중" 플레이스홀더로 표시
- Design Tokens 하위 9개 앵커: Color, Typography, Spacing, Radius, Shadow, Transition, Z-Index, Icon Size, Font Weight — 전부 `tokens.css` 실제 값을 `getComputedStyle`로 읽어와 표시, 클릭하면 `var(--토큰명)` 복사
- 컴포넌트 목록은 TODO2 2-2 표의 4개 카테고리(입력/탐색이동/조회노출/알림피드백)로 그룹핑, 각 항목이 해당 컴포넌트 카드로 앵커 이동
- 클릭 시 같은 페이지 안에서 앵커로 스크롤 이동 (페이지 분리 없음)

### 추가 UX 작업 (진행 중 사용자 피드백 반영)
- Design Tokens / 컴포넌트 목록 하위 목록 접기·펼치기 토글
- 스크롤 스파이 — 지금 보고 있는 섹션이 사이드바에서 하이라이트되도록 IntersectionObserver 적용
- 반응형 3단계 브레이크포인트(1024px / 900px / 480px)
- 900px 이하(태블릿·모바일): 사이드바를 전체화면 오버레이 메뉴로 전환, 상단 고정된 ☰ 메뉴 / ✕ 닫기 버튼, 메뉴 열림 중 배경 스크롤 잠금, 메뉴 항목 클릭 시 자동으로 닫힘

**변경 파일**
`index.html`

---

## 남은 것 / 확인 필요

- TODO2 2-1표의 "Padding/Margin"과 "Gap"은 `tokens.css`상 값이 동일해서 지금은 별도 카탈로그로 안 나눔 — 세분화가 필요하면 추가
- TODO2 6장 질문 중 미해결: dropdown(Forms) vs dropdown-menu(Navigation) 역할 구분을 문서로 명문화하는 작업
- Utilities(3장) / Patterns(4장) 실제 콘텐츠는 아직 없음 — 사이드바·플레이스홀더까지만 완료, 내용 작성은 별도 TASK로 남음
