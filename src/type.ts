import { DEFAULT_OBSIDIAN_CLASSNAME } from './constants';

export type ObsidianMarkDownSyntax = 'highlight' | 'internalLink' | 'embedImage' | 'tag'

export interface ObsidianSyntaxPluginOptions {
  toHashTagUrl: (hashTag: string) => string;
  toPageUrl: (page: string) => string;
  toImageUrl: (filename: string) => string;
  className?: Partial<typeof DEFAULT_OBSIDIAN_CLASSNAME>
}

export type ConvertObsidianSyntax = (text: string, options: ObsidianSyntaxPluginOptions) => string;