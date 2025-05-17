import { PhrasingContent } from 'mdast';
import { wrapWithTag } from './utils/wrap-with-tag';

export const OBSIDIAN_CLASSNAME: Record<string, string> = {
  HIGHLIGHT: 'obsidian-highlight',
  TAG: 'obsidian-tag',
  LINK_PAGE: 'obsidian-link-page',
} as const;

export const OBSIDIAN_REGEX: Record<string, RegExp> = {
  HIGHLIGHT: /==(.*?)==/g,
  TAG: /(#[\w가-힣]+(-[\w가-힣]+)*)/g,
  LINK_PAGE: /\[\[(.*?)\]\]/g,
} as const;

type ConvertObsidianSyntax = (text: string, className?: string) => string;

export const convertTag: ConvertObsidianSyntax = (text, className = OBSIDIAN_CLASSNAME.TAG) => {
  return text.replace(OBSIDIAN_REGEX.TAG, wrapWithTag('a', '$1', { class: className, href: '$1' }));
};

export const convertHighlightText: ConvertObsidianSyntax = (text, className = OBSIDIAN_CLASSNAME.HIGHLIGHT) => {
  return text.replace(OBSIDIAN_REGEX.HIGHLIGHT, wrapWithTag('span', '$1', { class: className }));
};

export const convertLinkPage: ConvertObsidianSyntax = (text, className = OBSIDIAN_CLASSNAME.LINK_PAGE) => {
  return text.replace(OBSIDIAN_REGEX.LINK_PAGE, wrapWithTag('a', '$1', { class: className, href: '$1' }));
};

const hasObsidianSyntax = (text: string): boolean => {
  return Object.values(OBSIDIAN_REGEX)
    .map(regex => regex.test(text))
    .some(Boolean);
};

const extendObsidianSyntax = (text: string): string => [
  convertTag,
  convertHighlightText,
  convertLinkPage
].reduce((a, f) => f(a), text);

const convertToObsidianSyntax = (phrasingContent: PhrasingContent): PhrasingContent => {
  if (phrasingContent.type !== 'text') {
    return phrasingContent;
  }
  const { value } = phrasingContent

  if (!hasObsidianSyntax(value)) {
    return phrasingContent;
  }

  return {
    type: 'html',
    value: extendObsidianSyntax(value)
  };
}

export default convertToObsidianSyntax