import { PhrasingContent } from 'mdast';
import { wrapWithTag } from './utils/wrap-with-tag';
import { ObsidianSyntaxPluginOptions } from './index';

export const OBSIDIAN_CLASSNAME: Record<string, string> = {
  HIGHLIGHT: 'obsidian-highlight',
  TAG: 'obsidian-tag',
  LINK_PAGE: 'obsidian-link-page',
} as const;

export const OBSIDIAN_REGEX: Record<string, RegExp> = {
  HIGHLIGHT: /==(.*?)==/g,
  TAG: /(#[\w가-힣]+(-[\w가-힣]+)*)/g,
  LINK_PAGE: /(?<!!)\[\[(.*?)\]\]/g,
} as const;

type ConvertObsidianSyntax = (text: string, options: ObsidianSyntaxPluginOptions) => string;

export const convertHashTag: ConvertObsidianSyntax = (text, { toHashTagUrl }) => {
  return text.replace(OBSIDIAN_REGEX.TAG, wrapWithTag('a', '$1', {
    class: OBSIDIAN_CLASSNAME.TAG,
    href: toHashTagUrl('$1')
  }));
};

export const convertHighlightText: ConvertObsidianSyntax = (text, options) => {
  return text.replace(OBSIDIAN_REGEX.HIGHLIGHT, wrapWithTag('span', '$1', { class: OBSIDIAN_CLASSNAME.HIGHLIGHT }));
};

export const convertLinkPage: ConvertObsidianSyntax = (text, { toPageUrl }) => {
  return text.replace(OBSIDIAN_REGEX.LINK_PAGE, wrapWithTag('a', '$1', {
    class: OBSIDIAN_CLASSNAME.LINK_PAGE,
    href: toPageUrl('$1')
  }));
};

const hasObsidianSyntax = (text: string): boolean => {
  return Object.values(OBSIDIAN_REGEX)
    .map(regex => regex.test(text))
    .some(Boolean);
};

const extendObsidianSyntax = (text: string, options: ObsidianSyntaxPluginOptions): string => [
  convertHashTag,
  convertHighlightText,
  convertLinkPage
].reduce((a, f) => f(a, options), text);

const convertToObsidianSyntax = (phrasingContent: PhrasingContent, options: ObsidianSyntaxPluginOptions): PhrasingContent => {
  if (phrasingContent.type !== 'text') {
    return phrasingContent;
  }
  const { value } = phrasingContent

  if (!hasObsidianSyntax(value)) {
    return phrasingContent;
  }

  return {
    type: 'html',
    value: extendObsidianSyntax(value, options)
  };
}

export default convertToObsidianSyntax