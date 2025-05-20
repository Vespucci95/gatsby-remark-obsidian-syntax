import { PhrasingContent } from 'mdast';
import { wrapWithTag } from './utils/wrap-with-tag';
import { DEFAULT_OBSIDIAN_CLASSNAME, OBSIDIAN_MARKDOWN_REGEX, ObsidianSyntaxPluginOptions } from './constants';

type ConvertObsidianSyntax = (text: string, options: ObsidianSyntaxPluginOptions) => string;

export const convertTag: ConvertObsidianSyntax = (text, {
  toHashTagUrl,
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(OBSIDIAN_MARKDOWN_REGEX.tag, wrapWithTag('a', '$1', {
    class: className.tag,
    href: toHashTagUrl('$1')
  }));
};

export const convertHighlightText: ConvertObsidianSyntax = (text, {
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(OBSIDIAN_MARKDOWN_REGEX.highlight, wrapWithTag('span', '$1', {
    class: className?.highlight
  }));
};

export const convertInternalLink: ConvertObsidianSyntax = (text, {
  toPageUrl,
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(OBSIDIAN_MARKDOWN_REGEX.internalLink, wrapWithTag('a', '$1', {
    class: className?.internalLink,
    href: toPageUrl('$1')
  }));
};

export const convertEmbedImage: ConvertObsidianSyntax = (text, {
  toImageUrl,
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(OBSIDIAN_MARKDOWN_REGEX.embedImage, wrapWithTag('img', null, {
    class: className?.embedImage,
    src: toImageUrl('$1'),
    placeholder: '$1'
  }));
};

const hasObsidianSyntax = (text: string): boolean => {
  return Object.values(OBSIDIAN_MARKDOWN_REGEX)
    .map(regex => regex.test(text))
    .some(Boolean);
};

const extendObsidianSyntax = (text: string, options: ObsidianSyntaxPluginOptions): string => [
  convertTag,
  convertHighlightText,
  convertInternalLink,
  convertEmbedImage
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