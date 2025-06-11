import { ConvertObsidianSyntax } from '../type';
import { DEFAULT_OBSIDIAN_CLASSNAME, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertEmbedImage: ConvertObsidianSyntax = (text, {
  toImageUrl,
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.embedImage,
    wrapWithTag('img', null, {
      class: className.embedImage,
      src: toImageUrl('$1'),
      placeholder: '$1'
    })
  );
};