import { PhrasingContent } from 'mdast';
import { OBSIDIAN_MARKDOWN_REGEX } from './constants';
import { ObsidianSyntaxPluginOptions } from './type';
import { convertEmbedImage, convertHighlightText, convertInternalLink, convertTag } from './converters';

export const hasObsidianSyntax = (text: string): boolean => {
  return Object.values(OBSIDIAN_MARKDOWN_REGEX)
    .map(regex => regex.test(text))
    .some(Boolean);
};

export const extendObsidianSyntax = (text: string, options: ObsidianSyntaxPluginOptions): string => [
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
    ...phrasingContent,
    type: 'html',
    value: extendObsidianSyntax(value, options)
  };
}

export default convertToObsidianSyntax