import { visit } from 'unist-util-visit';

export default function remarkObsidianSyntax(
  { markdownAST, reporter }: any,
  pluginOptions: any
) {
  visit(markdownAST,'paragraph',node => console.log(node));
  return markdownAST;
}