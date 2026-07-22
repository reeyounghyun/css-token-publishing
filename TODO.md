# 컴포넌트 진행 현황

## 완료

| 컴포넌트 | 파일 |
|---|---|
| Modal | `css/component/modal.css`, `component/modal.html` |
| Toast | `css/component/toast.css`, `component/toast.html` |
| Checkbox / Radio | `css/component/checkbox.css`, `component/checkbox.html` |
| Card | `css/component/card.css`, `component/card.html` |
| Badge / Tag | `css/component/badge.css`, `component/badge.html` |
| Table (일반 / 피벗형 / div 기반 Grid Table) | `css/component/table.css`, `css/component/grid-table.css`, `component/table.html` |
| Tabs (Underline / Pill) | `css/component/tabs.css`, `component/tabs.html` |
| Alert / Banner | `css/component/alert.css`, `component/alert.html` |

## 다음에 할 것

- [ ] **Tooltip** — 아이콘/버튼 hover 시 뜨는 설명
- [ ] **Breadcrumb** — 페이지 경로 표시 (Home > 설정 > 프로필)
- [ ] **Accordion** — 펼치고 접는 콘텐츠

## 참고 (진행하며 정리한 것들)

- `dropdownMenu.css`의 체크박스(`.checklist__box`) → `checkbox.css`의 공용 `.checkbox`로 통합 완료
- `table.css`의 상태 표시(`.table__status`) → `badge.css`의 `.badge` + `.badge__dot`로 통합 완료
- `dropdownMenu.css`의 `.dropdown__status`(아바타 온라인 점)는 성격이 달라 통합 안 함 — 그대로 유지
- 색상 중복(`--title-color`, `--desc-color`, `--track-bg`, `--focus-ring`, `--menu-divider`/`--list-divider` 등)은 `_tokens.css`의 `--gray-*` 스케일로 전부 통합 완료
- 새 토큰 추가할 땐 항상 `_tokens.css`에 이미 있는 값인지 먼저 확인 후 추가
