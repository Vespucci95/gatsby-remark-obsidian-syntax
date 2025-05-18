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

- **하이라이트**: `==하이라이트==` → <span class="obsidian-highlight">하이라이트</span>
- **해시태그**: `#태그` → <a class="obsidian-tag" href="/tags/태그">#태그</a>
- **내부 링크**: `[[페이지]]` → <a class="obsidian-link-page" href="/pages/페이지">페이지</a>
- **이미지**: `![[이미지.png]]` → <img class="obsidian-image" src="/assets/이미지.png" />

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
              toHashTagUrl: (hashTag) => `/tags/${hashTag.replace(/^#/, '')}`,
              
              // 내부 링크를 URL로 변환하는 함수
              toPageUrl: (page) => `/pages/${page}`,
              
              // 이미지 경로를 URL로 변환하는 함수
              toImageUrl: (filename) => `/assets/${filename}`,
            },
          },
        ],
      },
    },
  ],
};
```

### CSS 스타일링

플러그인은 다음 클래스를 사용하여 변환된 Obsidian 요소에 스타일을 적용할 수 있습니다:

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
.obsidian-link-page {
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

| 옵션 | 타입 | 설명 |
|------|------|------|
| `toHashTagUrl` | 함수 | 해시태그를 URL로 변환하는 함수 |
| `toPageUrl` | 함수 | 내부 링크를 URL로 변환하는 함수 |
| `toImageUrl` | 함수 | 이미지 경로를 URL로 변환하는 함수 |

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

<p>내부 링크: <a class="obsidian-link-page" href="/pages/관련페이지">관련페이지</a></p>

<p>이미지: <img class="obsidian-image" src="/assets/screenshot.png" /></p>
```

### 기여

이슈와 풀 리퀘스트는 환영합니다! 기여하기 전에 이슈를 먼저 생성해주세요.

## 라이선스

MIT 라이선스
