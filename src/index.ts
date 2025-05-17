import { visit } from 'unist-util-visit';
import { Paragraph, Root } from 'mdast'
import convertToObsidianSyntax from './convertToObsidianSyntax';

interface RemarkPluginArgs {
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

export interface ObsidianSyntaxPluginOptions {
  toHashTagUrl: (hashTag: string) => string;
  toPageUrl: (page: string) => string;
  toImageUrl: (filename: string) => string;
}

const convertPhrasingContent = (node: Paragraph, options: ObsidianSyntaxPluginOptions) => {
  node.children = node.children.map(phrasingContent => convertToObsidianSyntax(phrasingContent, options))
}

export default function remarkObsidianSyntax(
  { markdownAST, reporter }: RemarkPluginArgs,
  pluginOptions: ObsidianSyntaxPluginOptions
) {
  visit(markdownAST, 'paragraph', node => convertPhrasingContent(node, pluginOptions));
  return markdownAST;
}