import { visit } from 'unist-util-visit';
import { Root } from 'mdast'
import convertToObsidianSyntax from './convertToObsidianSyntax';
import { ObsidianSyntaxPluginOptions } from './constants';

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

export default function remarkObsidianSyntax(
  { markdownAST, reporter }: RemarkPluginArgs,
  pluginOptions: ObsidianSyntaxPluginOptions
) {
  visit(markdownAST, 'paragraph', node => {
    node.children = node.children.map(phrasingContent => convertToObsidianSyntax(phrasingContent, pluginOptions))
  });
  return markdownAST;
}