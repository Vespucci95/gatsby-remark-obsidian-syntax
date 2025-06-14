import { ConverterFn } from '../type';
import { DEFAULT_PLUGIN_OPTIONS, OBSIDIAN_MARKDOWN_REGEX } from '../constants';
import { wrapWithTag } from '../utils/wrap-with-tag';

export const convertEmbedImage: ConverterFn = (text, {
  linkImage = DEFAULT_PLUGIN_OPTIONS.linkImage,
  className = DEFAULT_PLUGIN_OPTIONS.className
} = DEFAULT_PLUGIN_OPTIONS) => {
  return text.replace(
    OBSIDIAN_MARKDOWN_REGEX.embedImage,
    wrapWithTag('img', null, {
      class: className.embedImage,
      src: linkImage('$1'),
      placeholder: '$1'
    })
  );
};