import { ConverterFn } from '../type';
import { DEFAULT_PLUGIN_OPTIONS, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

const parseLinkText = (text: string): [string, string] => {
  const [value, ...rest] = text.split('\|');
  const target = value.trim();
  if (rest.length) {
    return [target, rest.join('')]
  }
  return [target, target]
}

export const convertInternalLink: ConverterFn = (
  text,
  {
    linkPage = DEFAULT_PLUGIN_OPTIONS.linkPage,
    className = DEFAULT_PLUGIN_OPTIONS.className
  } = DEFAULT_PLUGIN_OPTIONS
) => text.replace(
  OBSIDIAN_MARKDOWN_REGEX.internalLink,
  (_, value) => {
    const [target, display] = parseLinkText(value)
    return wrapWithTag(
      'a',
      display,
      {
        class: className.internalLink,
        href: linkPage(target)
      }
    )
  }
)