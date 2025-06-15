import { context } from './test-helpers';
import { convertEmbedImage, convertHighlight, convertInternalLink, convertTag } from '../converters';
import { DEFAULT_OBSIDIAN_CLASSNAME, DEFAULT_PLUGIN_OPTIONS } from '../constants';

describe('converter', () => {
  context('convertTag', () => {
    it('태그가 올바르게 변환하는지 확인합니다.', () => {
      const input = `obsidian의 #태그 기능은 편리합니다.`;
      const expected = `obsidian의 <a class="obsidian-tag" href="/tags/태그">#태그</a> 기능은 편리합니다.`;

      const result = convertTag(input)

      expect(result).toBe(expected)
    });

    it('여러 태그가 있을 때 올바르게 변환하는지 확인합니다.', () => {
      const input = `#obsidian 의 #태그 기능은 편리합니다.`;
      const expected = `<a class="obsidian-tag" href="/tags/obsidian">#obsidian</a> 의 <a class="obsidian-tag" href="/tags/태그">#태그</a> 기능은 편리합니다.`;

      const result = convertTag(input)

      expect(result).toBe(expected)
    });

    it('href 속성이 올바르게 포함되는지 확인합니다.', () => {
      const input = 'tags: #javascript #typescript #react';
      const result = convertTag(input);

      expect(result).toContain('href="/tags/javascript"');
      expect(result).toContain('href="/tags/typescript"');
      expect(result).toContain('href="/tags/react"');
    });

    it('href 속성이 올바르게 포함되는지 확인합니다.(custom)', () => {
      const input = 'tags: #javascript #typescript #react';
      const result = convertTag(input, {
        linkTag: hashTag => `/${hashTag.replace('#', '')}`
      });

      expect(result).toContain('href="/javascript"');
      expect(result).toContain('href="/typescript"');
      expect(result).toContain('href="/react"');
    });

    it('class 속성이 올바르게 포함되는지 확인합니다.', () => {
      const result = convertTag('#test');

      expect(result).toContain(`class="${DEFAULT_OBSIDIAN_CLASSNAME.tag}"`);
    });

    it('class 속성이 올바르게 포함되는지 확인합니다. (custom)', () => {
      const customClassName = `tag`
      const result = convertTag('#test', {
        className: {
          tag: customClassName
        }
      });

      expect(result).toContain(`class="${customClassName}"`);
    });

    it('태그가 없는 경우, 기존 텍스트를 반환합니다.', () => {
      const input = `obsidian의 태그 기능은 편리합니다.`;
      const result = convertTag(input);

      expect(result).toBe(input);
    });
  });

  context('convertHighlight', () => {
    it('태그가 올바르게 변환하는지 확인합니다.', () => {
      const input = `obsidian의 ==하이라이트== 기능은 편리합니다.`;
      const expected = `obsidian의 <span class="${DEFAULT_OBSIDIAN_CLASSNAME.highlight}">하이라이트</span> 기능은 편리합니다.`;

      const result = convertHighlight(input)

      expect(result).toBe(expected)
    });

    it('여러 태그가 있을 때 올바르게 변환하는지 확인합니다.', () => {
      const input = `==obsidian==의 ==하이라이트== 기능은 편리합니다.`;
      const expected = `<span class="${DEFAULT_OBSIDIAN_CLASSNAME.highlight}">obsidian</span>의 <span class="${DEFAULT_OBSIDIAN_CLASSNAME.highlight}">하이라이트</span> 기능은 편리합니다.`;

      const result = convertHighlight(input)

      expect(result).toBe(expected)
    });

    it('class 속성이 올바르게 포함되는지 확인합니다.', () => {
      const result = convertHighlight('==test==');

      expect(result).toContain(`class="${DEFAULT_OBSIDIAN_CLASSNAME.highlight}"`);
    });

    it('class 속성이 올바르게 포함되는지 확인합니다. (custom)', () => {
      const customClassName = `highlight`
      const result = convertHighlight('==test==', {
        className: {
          highlight: customClassName
        }
      });

      expect(result).toContain(`class="${customClassName}"`);
    });

    it('태그가 없는 경우, 기존 텍스트를 반환합니다.', () => {
      const input = `obsidian의 하이라이트 기능은 편리합니다.`;
      const result = convertHighlight(input);

      expect(result).toBe(input);
    });
  });

  context('convertEmbedImage', () => {
    it('태그가 올바르게 변환하는지 확인합니다.', () => {
      const input = `obsidian의 ![[image.png]] 기능은 편리합니다.`;
      const expected = `obsidian의 <img class="${DEFAULT_OBSIDIAN_CLASSNAME.embedImage}" src="/assets/image.png" placeholder="image.png" /> 기능은 편리합니다.`

      const result = convertEmbedImage(input)

      expect(result).toBe(expected)
    });

    it('여러 태그가 있을 때 올바르게 변환하는지 확인합니다.', () => {
      const input = `![[image1.png]] ![[image2.png]]`;
      const expected = `<img class="${DEFAULT_OBSIDIAN_CLASSNAME.embedImage}" src="/assets/image1.png" placeholder="image1.png" /> <img class="${DEFAULT_OBSIDIAN_CLASSNAME.embedImage}" src="/assets/image2.png" placeholder="image2.png" />`;

      const result = convertEmbedImage(input)

      expect(result).toBe(expected)
    });

    it('src 속성이 올바르게 포함되는지 확인합니다.', () => {
      const result = convertEmbedImage('![[image.png]]');

      expect(result).toContain(`src="${DEFAULT_PLUGIN_OPTIONS.linkImage('image.png')}"`);
    });

    it('src 속성이 올바르게 포함되는지 확인합니다. (custom)', () => {
      const customLinkImage = (filename:string) => `/${filename}`;
      const result = convertEmbedImage('![[image.png]]', {
        linkImage: customLinkImage
      });

      expect(result).toContain(`src="${customLinkImage('image.png')}"`);
    });

    it('class 속성이 올바르게 포함되는지 확인합니다.', () => {
      const result = convertEmbedImage('![[image.png]]');

      expect(result).toContain(`class="${DEFAULT_OBSIDIAN_CLASSNAME.embedImage}"`);
    });

    it('class 속성이 올바르게 포함되는지 확인합니다. (custom)', () => {
      const customClassName = `embedImage`
      const result = convertEmbedImage('![[image.png]]', {
        className: {
          embedImage: customClassName
        }
      });

      expect(result).toContain(`class="${customClassName}"`);
    });

    it('태그가 없는 경우, 기존 텍스트를 반환합니다.', () => {
      const input = `obsidian의 하이라이트 기능은 편리합니다.`;
      const result = convertEmbedImage(input);

      expect(result).toBe(input);
    });
  });

  context('internal-link', () => {
    it('태그가 올바르게 변환하는지 확인합니다.', () => {
      const input = `obsidian의 [[page]] 기능은 편리합니다.`;
      const expected = `obsidian의 <a class="${DEFAULT_OBSIDIAN_CLASSNAME.internalLink}" href="/pages/page">page</a> 기능은 편리합니다.`

      const result = convertInternalLink(input)

      expect(result).toBe(expected)
    });

    it('여러 태그가 있을 때 올바르게 변환하는지 확인합니다.', () => {
      const input = `[[page1]] [[page2]]`;
      const expected = `<a class="${DEFAULT_OBSIDIAN_CLASSNAME.internalLink}" href="/pages/page1">page1</a> <a class="${DEFAULT_OBSIDIAN_CLASSNAME.internalLink}" href="/pages/page2">page2</a>`;

      const result = convertInternalLink(input)

      expect(result).toBe(expected)
    });

    it('href 경로가 올바르게 포함되는지 확인합니다.', () => {
      const result = convertInternalLink('[[page]]');

      expect(result).toContain(`href="${DEFAULT_PLUGIN_OPTIONS.linkPage('page')}"`);
    });

    it('href 경로가 올바르게 포함되는지 확인합니다. (custom)', () => {
      const customLinkPage = (page:string) => `/${page}`;
      const result = convertInternalLink('[[page]]', {
        linkPage: customLinkPage
      });

      expect(result).toContain(`href="${customLinkPage('page')}"`);
    });
  })

  context('internal-link | custom text', () => {
    it('태그가 올바르게 변환하는지 확인합니다.', () => {
      const input = `obsidian의 [[page|text]] 기능은 편리합니다.`;
      const expected = `obsidian의 <a class="${DEFAULT_OBSIDIAN_CLASSNAME.internalLink}" href="/pages/page">text</a> 기능은 편리합니다.`

      const result = convertInternalLink(input)

      expect(result).toBe(expected)
    });

    it('여러 태그가 있을 때 올바르게 변환하는지 확인합니다.', () => {
      const input = `[[page1|text1]] [[page2|abc|abc]]`;
      const expected = `<a class="${DEFAULT_OBSIDIAN_CLASSNAME.internalLink}" href="/pages/page1">text1</a> <a class="${DEFAULT_OBSIDIAN_CLASSNAME.internalLink}" href="/pages/page2">abcabc</a>`;

      const result = convertInternalLink(input)

      expect(result).toBe(expected)
    });

    it('href 경로가 올바르게 포함되는지 확인합니다.', () => {
      const result = convertInternalLink('[[page|text]]');

      expect(result).toContain(`href="${DEFAULT_PLUGIN_OPTIONS.linkPage('page')}"`);
    });

    it('href 경로가 올바르게 포함되는지 확인합니다. (custom)', () => {
      const customLinkPage = (page:string) => `/${page}`;
      const result = convertInternalLink('[[page|text]]', {
        linkPage: customLinkPage
      });

      expect(result).toContain(`href="${customLinkPage('page')}"`);
    });
  })
});