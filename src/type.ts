import { DEFAULT_OBSIDIAN_CLASSNAME } from './constants';
import { Blockquote, Root } from 'mdast';

export type ObsidianMarkDownSyntax = 'highlight' | 'internalLink' | 'embedImage' | 'tag'

export interface ObsidianSyntaxPluginOptions {
  linkTag: (tag: string) => string;
  linkPage: (page: string) => string;
  linkImage: (filename: string) => string;
  className: Partial<typeof DEFAULT_OBSIDIAN_CLASSNAME>
}

export type ConverterFn = (text: string, options?: Partial<ObsidianSyntaxPluginOptions>) => string;

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