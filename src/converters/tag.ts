import { ConvertObsidianSyntax } from '../type';
import { DEFAULT_OBSIDIAN_CLASSNAME, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertTag: ConvertObsidianSyntax = (text, {
  toHashTagUrl,
  className = DEFAULT_OBSIDIAN_CLASSNAME
}) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.tag,
    (_, prefix, tag) => {
      return prefix + wrapWithTag('a', tag, {
        class: className.tag,
        href: toHashTagUrl(tag)
      })
    }
  );
};