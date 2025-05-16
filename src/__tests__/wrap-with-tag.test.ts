import { context } from './test-helpers';
import { wrapWithTag } from '../utils/wrap-with-tag';

describe('utils/dom: wrapWithTag', () => {
  context('wrapWithTag 태그 래핑 테스트', () => {
    it('div 태그가 올바르게 래핑되는지 확인', () => {
      expect(wrapWithTag('div', 'test')).toBe('<div>test</div>');
    });
    it('span 태그가 올바르게 래핑되는지 확인', () => {
      expect(wrapWithTag('span', 'test')).toBe('<span>test</span>');
    });
    it('a 태그가 올바르게 래핑되는지 확인', () => {
      expect(wrapWithTag('a', 'test')).toBe('<a>test</a>');
    });
  });

  context('wrapWithTag props 테스트', () => {
    it('props가 전달되는지 확인', () => {
      expect(wrapWithTag('span', 'text', { class: 'highlight' })).toBe('<span class="highlight">text</span>');
    });
  });
});