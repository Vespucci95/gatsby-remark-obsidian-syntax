import { DEFAULT_OBSIDIAN_CLASSNAME } from './constants';
import { Blockquote, Root } from 'mdast';

export type ObsidianMarkDownSyntax = 'highlight' | 'internalLink' | 'embedImage' | 'tag'

export interface ObsidianSyntaxPluginOptions {
  toHashTagUrl: (hashTag: string) => string;
  toPageUrl: (page: string) => string;
  toImageUrl: (filename: string) => string;
  className?: Partial<typeof DEFAULT_OBSIDIAN_CLASSNAME>
}

export type ConvertObsidianSyntax = (text: string, options: ObsidianSyntaxPluginOptions) => string;

export interface RemarkPluginArgs {
  markdownAST: Root;
  markdownNode: {
    fileAbsolutePath?: string;
  };
  reporter: {
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
  };
}

export interface ExtendedBlockquote extends Blockquote {
  data?: {
    hProperties?: {
      className?: string
    }
  }
}