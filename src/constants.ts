import { ObsidianMarkDownSyntax, ObsidianSyntaxPluginOptions } from './type';

export const OBSIDIAN_MARKDOWN_REGEX = {
  highlight: /==(.*?)==/g,
  tag: /(^|\s)(#(?![0-9]+(?:\s|$))[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_-]+)/g,
  internalLink: /(?<!!)\[\[(.*?)\]\]/g,
  embedImage: /!\[\[(.*?)\]\]/g,
} as const satisfies Record<ObsidianMarkDownSyntax, RegExp>;

export const DEFAULT_OBSIDIAN_CLASSNAME = {
  highlight: 'obsidian-highlight',
  tag: 'obsidian-tag',
  internalLink: 'obsidian-internal-link',
  embedImage: 'obsidian-image'
} satisfies Record<ObsidianMarkDownSyntax, string>;

export const CALLOUT_REGEX = /^\[!(\w+)\]\s*(.*)/

export const DEFAULT_PLUGIN_OPTIONS: ObsidianSyntaxPluginOptions = {
  linkTag: (tag) => `/tags/${tag.replace(/^#/, '')}`,
  linkPage: (page) => `/pages/${page}`,
  linkImage: (filename) => `/assets/${filename}`,
  className: DEFAULT_OBSIDIAN_CLASSNAME
}