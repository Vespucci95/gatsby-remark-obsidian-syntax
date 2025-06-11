import { ConvertObsidianSyntax } from '../type';
import { DEFAULT_OBSIDIAN_CLASSNAME, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertHighlightText: ConvertObsidianSyntax = (text, {
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.highlight,
    wrapWithTag('span', '$1', {
      class: className.highlight
    })
  );
};