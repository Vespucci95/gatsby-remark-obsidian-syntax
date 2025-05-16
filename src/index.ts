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

interface ObsidianSyntaxPluginOptions {
  className?: string;
}

const convertPhrasingContent = (node: Paragraph) => {
  node.children = node.children.map(convertToObsidianSyntax)
}

export default function remarkObsidianSyntax(
  { markdownAST, reporter }: RemarkPluginArgs,
  pluginOptions: ObsidianSyntaxPluginOptions
) {
  visit(markdownAST, 'paragraph', convertPhrasingContent);
  return markdownAST;
}