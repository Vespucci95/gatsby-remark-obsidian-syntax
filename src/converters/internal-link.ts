import { ConvertObsidianSyntax } from '../type';
import { DEFAULT_OBSIDIAN_CLASSNAME, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertInternalLink: ConvertObsidianSyntax = (text, {
  toPageUrl,
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.internalLink,
    wrapWithTag('a', '$1', {
      class: className.internalLink,
      href: toPageUrl('$1')
    })
  );
};