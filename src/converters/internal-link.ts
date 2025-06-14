import { ConverterFn } from '../type';
import { DEFAULT_PLUGIN_OPTIONS, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertInternalLink: ConverterFn = (
  text,
  {
    linkPage = DEFAULT_PLUGIN_OPTIONS.linkPage,
    className = DEFAULT_PLUGIN_OPTIONS.className
  } = DEFAULT_PLUGIN_OPTIONS
) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.internalLink,
    wrapWithTag('a', '$1', {
      class: className.internalLink,
      href: linkPage('$1')
    })
  );
};