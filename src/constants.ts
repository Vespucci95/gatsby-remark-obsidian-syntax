export type ObsidianMarkDownSyntax = 'highlight' | 'internalLink' | 'embedImage' | 'tag'

export interface ObsidianSyntaxPluginOptions {
  toHashTagUrl: (hashTag: string) => string;
  toPageUrl: (page: string) => string;
  toImageUrl: (filename: string) => string;
  className?: Partial<typeof DEFAULT_OBSIDIAN_CLASSNAME>
}

export const OBSIDIAN_MARKDOWN_REGEX: Record<ObsidianMarkDownSyntax, RegExp> = {
  highlight: /==(.*?)==/g,
  tag: /(#[\w가-힣]+(-[\w가-힣]+)*)/g,
  internalLink: /(?<!!)\[\[(.*?)\]\]/g,
  embedImage: /!\[\[(.*?)\]\]/g,
} as const;

export const DEFAULT_OBSIDIAN_CLASSNAME: Record<ObsidianMarkDownSyntax, string> = {
  highlight: 'obsidian-highlight',
  tag: 'obsidian-tag',
  internalLink: 'obsidian-internal-link',
  embedImage: 'obsidian-image'
} as const;