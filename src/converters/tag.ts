import { ConverterFn } from '../type';
import { DEFAULT_PLUGIN_OPTIONS, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertTag: ConverterFn = (
  text,
  {
    linkTag = DEFAULT_PLUGIN_OPTIONS.linkTag,
    className = DEFAULT_PLUGIN_OPTIONS.className
  } = {}
) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.tag,
    (_, prefix, tag) => {
      return prefix + wrapWithTag('a', tag, {
        class: className.tag,
        href: linkTag(tag)
      })
    }
  )
}