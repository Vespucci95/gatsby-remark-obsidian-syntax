import { context } from './test-helpers';
import { wrapWithTag } from '../utils/wrap-with-tag';

describe('utils/dom: wrapWithTag', () => {
  context('wrapWithTag 태그 래핑 테스트', () => {
    it('div 태그로 변환', () => {
      expect(wrapWithTag('div', 'test')).toBe('<div>test</div>');
    });
    it('span 태그로 변환', () => {
      expect(wrapWithTag('span', 'test')).toBe('<span>test</span>');
    });
    it('a 태그로 변환', () => {
      expect(wrapWithTag('a', 'test')).toBe('<a>test</a>');
    });
    it('children 이 null 또는 undefined 인 경우 빈 태그로 변환', () => {
      expect(wrapWithTag('input', null)).toBe('<input />')
      expect(wrapWithTag('input', undefined)).toBe('<input />')
    });
  });

  context('wrapWithTag props 테스트', () => {
    it('props가 전달되는지 확인', () => {
      expect(wrapWithTag('span', 'text', { class: 'highlight' })).toBe('<span class="highlight">text</span>');
    });
  });
});