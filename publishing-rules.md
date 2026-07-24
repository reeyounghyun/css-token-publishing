# 퍼블리싱 규칙

v0.4 · 2026.07
기준 저장소 — `css-token-publishing`

---

## 0. 기준

`css/tokens.css` 하나가 색상 · 간격 · 타이포 · radius · shadow의 기준이다.
새 값이 필요하면 하드코딩하지 않고, **tokens.css에 이미 있는 값인지 먼저 확인한 뒤** 없을 때만 토큰을 추가한다.

컴포넌트는 `css/component/*.css` ↔ `component/*.html` 1:1로 둔다.

---

## 1. 토큰 이름은 실제 px 값을 쓴다

```
--spacing-4    /* 4px */
--text-16      /* 16px */
--radius-14    /* 14px */
```

값은 rem으로 저장하되(16px = 1rem) 이름은 px 기준.
`sm` `md` `lg` 같은 상대 표기는 크기 비교가 안 되고, 새 값이 끼어들 때 이름이 꼬인다.

토큰 이름에 대문자를 쓰지 않는다.

**t-shirt 표기(`xs` `sm` `md` `lg`)를 쓰지 않는다.** 값 비교가 안 되고, 사이 값이 필요할 때 이름이 꼬인다.

```
--radius-4  --radius-6  --radius-8  --radius-14  --radius-16  --radius-full
--height-36 --height-40 --height-44 --height-48 --height-56 --height-60 --height-108
```

예외는 `--radius-full`(999px) 하나. px 값이 아니라 "완전히 둥글게"라는 의미다.

값이 바뀌면 이름도 같이 바꿔야 한다는 단점이 있지만,
`--spacing-*` `--text-*`이 이미 숫자 표기라 한 파일 안에 두 체계를 두지 않는 쪽을 택한다.

> **수정 필요** — `--radius-xs/sm/md/lg`, `--height-xs~xl`, `--height-1xl`, `--weight-Semibold`, `--White` 남아 있음.

---

## 2. 색상은 primitive / semantic 2단으로 나눈다

| 단계 | 예 | 쓰는 곳 |
|---|---|---|
| primitive | `--gray-500` `--primary-600` | `tokens.css` 안에서만 |
| semantic | `--color-text-*` `--color-bg-*` `--color-border-*` `--color-icon-*` `--color-ring-*` | 컴포넌트 CSS |

**컴포넌트 CSS에서 primitive를 직접 참조하지 않는다.**
컬러가 바뀔 때 semantic 매핑만 갈아끼우면 전체가 따라오게 하기 위해서다.

> 색상 중복(`--title-color`, `--track-bg`, `--slate-*`, `--box-border` 등)이 계속 생겨서
> gray 스케일로 흡수 통합했음. 통합했다고 생각한 뒤에도 남아 있던 게 나왔다.

---

## 3. 단위

- **font-size** — rem
- **gap · padding · border** — px
- **미디어쿼리** — em (`48em` = 768, `64em` = 1024, `80em` = 1280)

`min-width`만 쓴다. 모바일 스타일을 기본값으로 두고 위로 덮어쓴다.
미디어쿼리는 해당 컴포넌트 규칙 바로 아래에 붙여 쓴다. 파일 끝에 몰지 않는다.

---

## 4. 레이아웃

- **바깥 반복** — grid
- **안쪽 정렬** — flex

grid 컬럼 수는 클래스를 만들지 않고 인라인 변수로 넘긴다.

```html
<ul class="grid" style="--cols:4">
```

```css
.card-grid { --cols: 1; }
@media (min-width: 48em) { .card-grid { --cols: 2; } }
@media (min-width: 64em) { .card-grid { --cols: 4; } }
```

---

## 5. 클래스 이름은 BEM

```
block__element--modifier
```

요소는 **2단계까지만**. 마크업이 깊어져도 `card__text`로 끝낸다.

**상태는 `is-` 접두사.** `is-active` `is-open` `is-disabled` `is-loading`
`--`는 모디파이어 기호이므로 상태에 쓰지 않는다. `is--open` 같은 표기 금지.

> **수정 필요** — `dropdown.css`와 `main.js`가 `is--open` / `is--active`를 쓰고 있음.
> 나머지(modal · tabs · pagination)는 `is-`. 두 파일만 고치면 됨.

**안 하는 것**

- 스타일을 이름에 넣기 — `red-btn` → `btn--danger`
- 위치를 이름에 넣기 — `left-box` (반응형에서 왼쪽이 아니게 됨)
- 번호 붙이기 — `box1` `box2`

---

## 6. 단어를 고정한다

### 감싸는 요소

| 표기 | 위치 | 예 |
|---|---|---|
| `wrap` | 부모. 블록 전체를 감싼다 | `table-wrap` `state-wrap` |
| `box` | 자식. 블록 안쪽을 감싼다 | `field__box` `textarea__box` |

둘을 바꿔 쓰지 않는다. 이름만 보고 계층을 알 수 있어야 한다.

### 줄임말

**줄임** — `btn` `wrap` `desc` `thumb` `nav`
**풀어씀** — `image` `title` `text` `icon` `list` `item` `label`

같은 뜻에 두 표기를 섞지 않는다.

> **수정 필요** — `img`(7곳)를 `image`로 통일.

### 표기

kebab-case로 쓴다.

> **수정 필요** — `dropdown__userinfo` → `dropdown__user-info`

---

## 7. 마크업

**div는 이유가 있을 때만 만든다.** 레이아웃(정렬·간격), 배경, 테두리가 필요할 때.
클래스만 붙이려고 만든 div는 지운다.

> 남의 코드를 받았을 때 생략 가능한 부모 태그가 제일 걸렸음.

**간격은 피그마 수치를 그대로 옮기지 않는다.**
텍스트는 line-height 때문에 위아래 여백이 생기므로 피그마에서 잰 값과 실제가 다르다.
텍스트에 margin을 주는 대신 부모에 gap을 주고, 작업 후 브라우저에서 실측해 맞춘다.

> 피그마와 브라우저 간격이 달라 오픈 직전에 급하게 고친 적이 있음.

---

## 8. 코드 스타일

### 들여쓰기

스페이스 2칸. 탭을 쓰지 않는다.
선택자 앞에 공백을 넣지 않는다.

### 속성 순서

빈 줄로 묶어서 쓴다. 순서는 **배치 → 크기 → 타이포 → 색상 → 기타**.

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--gap-8);

  height: var(--height-44);
  padding: 0 var(--spacing-20);
  border-radius: var(--radius-8);

  font-size: var(--text-16);
  font-weight: var(--weight-semibold);
  line-height: 1;

  background: transparent;
  color: var(--color-text-secondary);

  cursor: pointer;
  transition: background var(--transition-normal);
}
```

### 주석

**섹션 주석** — 번호를 붙인다. 파일 안에서 위치를 찾는 용도다.

```css
/* 1. Base — 기본 사이즈 = md(44px) */

/* 2. Type Variants — 상황별 스타일 --------------------------- */
```

**인라인 주석** — 값이 아니라 **이유**를 적는다.

```css
/* 좋음 — 왜 그 값인지 */
padding: 0 40px 0 var(--spacing-12);   /* 오른쪽은 화살표 자리 */
object-fit: cover;                      /* 정사각형 아니어도 안 찌그러짐 */
left: 26px;                             /* 6 + 20 */

/* 나쁨 — 코드를 그대로 읽은 것 */
display: flex;   /* 플렉스 정렬 */
```

주석이 필요 없으면 안 쓴다. 코드로 드러나는 건 적지 않는다.

---

## 9. 이미지

| 종류 | 포맷 | 비고 |
|---|---|---|
| 아이콘 · 로고 | SVG | 크기 조절해도 안 깨짐. `currentColor`로 색 상속 가능 |
| 사진 · 일러스트 | PNG | 2배수(`@2x`)로 내려받아 사용 |

PNG를 2배로 쓸 때는 **표시 크기를 CSS나 `width`/`height` 속성으로 명시한다.**
안 하면 실제 크기로 나와서 두 배로 커진다.

```html
<img src="../images/banner@2x.png" alt="" width="320" height="180">
```

SVG를 인라인으로 넣을 때는 `clipPath` id 중복에 주의한다. (10번 참조)

---

## 10. 겪어서 생긴 규칙

작업하다 실제로 터진 것들. 검수 항목의 근거다.

**id는 페이지 전체에서 고유해야 한다**
`input.html`에서 `id="email"`이 4번, `id="pw"`가 2번 쓰여 label의 `for`가 첫 번째 필드에만 연결되고 있었다. 화면상으론 멀쩡해 보였다.
→ 같은 컴포넌트를 여러 번 배치할 땐 id에 접미사를 붙인다. (`email-default` `email-error`)

**SVG의 `clipPath id`도 id다**
같은 아이콘을 반복 사용하면 id가 중복된다. 두 번째부터 접미사를 붙인다.

**폼 안 버튼은 `type="button"`을 명시한다**
누락하면 `<form>` 안에 복붙했을 때 의도치 않게 제출된다.

**CSS 변수 이름을 틀리면 조용히 무시된다**
`box-shadow: 0 6px 20px var(--shadows-xs)`가 무효 CSS라 그림자가 아예 안 먹고 있었다. 에러도 안 난다.
→ 변수를 바꾼 뒤엔 브라우저에서 실제로 적용됐는지 눈으로 확인한다.

**입력 타입을 맞춘다**
전화번호 필드가 `type="email"`이었다. 모바일 키보드가 다르게 뜬다.

**focus 스타일은 만들 때 같이 넣는다**
나중에 감사하면 반드시 빠진 게 나온다. `badge__remove` `field__btn` `table__sort` `banner__action`에서 누락이 발견됐고, `textarea__box`는 `:focus-within` 자체가 없었다.

---

## 11. 검수 항목

`workflow.md`의 QA 섹션 참조.

체크리스트를 두 문서에 중복해서 두지 않는다. 한쪽만 갱신되어 어긋난다.

---

## 12. 아직 안 정한 것

- JS 파일 구조 — 지금은 `main.js` 하나. 컴포넌트별 분리 여부
- 다크 모드 대응 범위
- 애니메이션 · transition 사용 기준