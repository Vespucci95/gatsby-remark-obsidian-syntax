import _ from 'lodash';

/**
 * HTML 태그로 콘텐츠를 래핑하는 함수
 * @param tagName
 * @param children
 * @param props
 */

export function wrapWithTag(
  tagName: any,
  children: string | null | undefined,
  props?: any
): string {
  // 유효 속성 필터링
  const validProps = _.pickBy(props || {}, value =>
    !_.isNil(value) && value !== false
  );

  // 속성 문자열 생성
  const attrEntries = _.map(validProps, (value, key) => {
    // boolean true 값은 속성명만 출력
    if (value === true) {
      return key;
    }
    // 문자열 값은 이스케이프
    const escapedValue = _.escape(String(value)).replace(/"/g, '&quot;');
    return `${key}="${escapedValue}"`;
  });

  // 속성 문자열 결합
  const attrStr = _.compact(attrEntries).join(' ');

  if (children) {
    // 태그 생성
    const template = _.template('<${tagName}${attrStr}>${children}</${tagName}>');

    return template({
      tagName,
      attrStr: attrStr ? ' ' + attrStr : '',
      children
    });
  }

  const template = _.template('<${tagName}${attrStr} />');

  return template({
    tagName,
    attrStr: attrStr ? ' ' + attrStr : ''
  });
}