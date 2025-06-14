# gatsby-remark-obsidian-syntax

Gatsby 플러그인으로, Obsidian 마크다운 문법을 Gatsby 사이트에서 사용할 수 있게 해주는 remark 플러그인입니다.

## 설치

```bash
npm install gatsby-remark-obsidian-syntax
# 또는
yarn add gatsby-remark-obsidian-syntax
```

## 기능

이 플러그인은 다음과 같은 Obsidian 문법을 지원합니다:

- **하이라이트**: `==하이라이트==` → `<span class="obsidian-highlight">하이라이트</span>`
- **태그**: `#태그` → `<a class="obsidian-tag" href="/tags/태그">#태그</a>`
- **내부 링크**: `[[페이지]]` → `<a class="obsidian-internal-link" href="/pages/페이지">페이지</a>`
- **이미지**: `![[이미지.png]]` → `<img class="obsidian-image" src="/assets/이미지.png" alt="이미지.png" />`

## 사용법

### gatsby-config.js 설정

```javascript
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-obsidian-syntax`,
            options: {
              // 해시태그를 URL로 변환하는 함수
              linkTag: (hashTag) => `/tags/${hashTag.replace(/^#/, '')}`,
              
              // 내부 링크를 URL로 변환하는 함수
              linkPage: (page) => `/pages/${page}`,
              
              // 이미지 경로를 URL로 변환하는 함수
              linkImage: (filename) => `/assets/${filename}`,
              
              // (선택 사항) 커스텀 CSS 클래스명 지정
              className: {
                highlight: 'custom-highlight',     // 기본값: 'obsidian-highlight'
                tag: 'custom-tag',                 // 기본값: 'obsidian-tag'
                internalLink: 'custom-page-link',  // 기본값: 'obsidian-internal-link'
                embedImage: 'custom-image'         // 기본값: 'obsidian-image'
              }
            },
          },
        ],
      },
    },
  ],
};
```

### CSS 스타일링

플러그인은 다음 클래스를 사용하여 변환된 Obsidian 요소에 스타일을 적용할 수 있습니다.

```css
/* 하이라이트 스타일링 */
.obsidian-highlight {
  background-color: yellow;
  padding: 0 2px;
}

/* 해시태그 스타일링 */
.obsidian-tag {
  color: #0366d6;
  text-decoration: none;
}

/* 내부 링크 스타일링 */
.obsidian-internal-link {
  color: #8b5cf6;
  text-decoration: none;
}

/* 이미지 스타일링 */
.obsidian-image {
  max-width: 100%;
  border-radius: 4px;
}
```

## 옵션

플러그인은 다음과 같은 옵션을 사용합니다.

| 옵션          | 타입 | 필수 | 설명 |
|-------------|------|------|------|
| `linkTag`   | 함수 | 예 | 해시태그를 URL로 변환하는 함수 |
| `linkPage`  | 함수 | 예 | 내부 링크를 URL로 변환하는 함수 |
| `linkImage` | 함수 | 예 | 이미지 경로를 URL로 변환하는 함수 |
| `className` | 객체 | 아니오 | 각 요소에 적용할 CSS 클래스명 (기본값 제공됨) |

## 예제

### 마크다운 입력

```markdown
안녕하세요, 이것은 Obsidian 문법 예시입니다.

==중요한 내용==은 하이라이트로 표시됩니다.

#개츠비 #마크다운 #옵시디언 태그도 지원합니다.

내부 링크: [[관련페이지]]

이미지: ![[screenshot.png]]
```

### HTML 출력

```html
<p>안녕하세요, 이것은 Obsidian 문법 예시입니다.</p>

<p><span class="obsidian-highlight">중요한 내용</span>은 하이라이트로 표시됩니다.</p>

<p><a class="obsidian-tag" href="/tags/개츠비">#개츠비</a> <a class="obsidian-tag" href="/tags/마크다운">#마크다운</a> <a class="obsidian-tag" href="/tags/옵시디언">#옵시디언</a> 태그도 지원합니다.</p>

<p>내부 링크: <a class="obsidian-internal-link" href="/pages/관련페이지">관련페이지</a></p>

<p>이미지: <img class="obsidian-image" src="/assets/screenshot.png" alt="screenshot.png" /></p>
```

### 커스텀 클래스명 사용 예

```javascript
// gatsby-config.js
{
  resolve: `gatsby-remark-obsidian-syntax`,
  options: {
    linkTag: (hashTag) => `/tags/${hashTag.replace(/^#/, '')}`,
    linkPage: (page) => `/pages/${page}`,
    linkImage: (filename) => `/assets/${filename}`,
    className: {
      highlight: 'custom-highlight',
      tag: 'custom-tag',
      internalLink: 'custom-page-link',
      embedImage: 'custom-image'
    }
  }
}
```

위 설정의 HTML 출력:

```html
<p><span class="custom-highlight">중요한 내용</span>은 하이라이트로 표시됩니다.</p>

<p><a class="custom-tag" href="/tags/gatsby">gatsby</a> <a class="custom-tag" href="/tags/markdown">markdown</a></p>

<p>내부 링크: <a class="custom-page-link" href="/pages/관련페이지">관련페이지</a></p>

<p>이미지: <img class="custom-image" src="/assets/screenshot.png" alt="screenshot.png" /></p>
```

## 기여

이슈와 풀 리퀘스트는 환영합니다! 기여하기 전에 이슈를 먼저 생성해주세요.

## 라이선스

MIT 라이선스
