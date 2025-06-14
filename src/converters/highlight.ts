import { ConverterFn } from '../type';
import { DEFAULT_PLUGIN_OPTIONS, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertHighlight: ConverterFn = (
  text,
  {
    className = DEFAULT_PLUGIN_OPTIONS.className
  } = DEFAULT_PLUGIN_OPTIONS
) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.highlight,
    wrapWithTag('span', '$1', {
      class: className.highlight
    })
  );
};