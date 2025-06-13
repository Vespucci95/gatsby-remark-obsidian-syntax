import { context } from './test-helpers';
import { convertTag } from '../converters';
import { DEFAULT_OBSIDIAN_CLASSNAME } from '../constants';

describe('converter', () => {
  context('convertTag', () => {
    it('태그가 올바르게 변환하는지 확인합니다.', () => {
      const input = `obsidian의 #태그 기능은 강력합니다.`;
      const expected = `obsidian의 <a class="obsidian-tag" href="/tags/태그">#태그</a> 기능은 강력합니다.`;

      const result = convertTag(input)

      expect(result).toBe(expected)
    });

    it('여러 태그가 있을 때 올바르게 변환하는지 확인합니다.', () => {
      const input = `#obsidian 의 #태그 기능은 강력합니다.`;
      const expected = `<a class="obsidian-tag" href="/tags/obsidian">#obsidian</a> 의 <a class="obsidian-tag" href="/tags/태그">#태그</a> 기능은 강력합니다.`;

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
      const defaultClassName = `class="${DEFAULT_OBSIDIAN_CLASSNAME.tag}"`

      expect(result).toContain(defaultClassName);
    });

    it('태그가 없는 경우, 기존 텍스트를 반환합니다.', () => {
      const input = `obsidian의 태그 기능은 강력합니다.`;
      const result = convertTag(input);

      expect(result).toBe(input);
    });
  });
});