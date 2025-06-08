import { visit } from 'unist-util-visit';
import { Blockquote, Root } from 'mdast'
import convertToObsidianSyntax from './convertToObsidianSyntax';
import { CALLOUT_REGEX, ObsidianSyntaxPluginOptions } from './constants';
import _ from 'lodash'

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

export default function remarkObsidianSyntax(
  { markdownAST, reporter }: RemarkPluginArgs,
  pluginOptions: ObsidianSyntaxPluginOptions
) {
  visit(markdownAST, 'paragraph', node => {
    node.children = node.children.map(phrasingContent => convertToObsidianSyntax(phrasingContent, pluginOptions))
  });


  visit(markdownAST, 'blockquote', (node: ExtendedBlockquote) => {
    let className = ''
    const firstContent = _.head(node.children)
    if (firstContent && firstContent.type === 'paragraph') {
      const [firstChild, ...rest] = firstContent.children;
      if (firstChild.type === 'text' && CALLOUT_REGEX.test(firstChild.value)) {
        const [_, calloutName] = firstChild.value.match(CALLOUT_REGEX)!;
        className = [calloutName, 'blockquote'].join('-');
        node.children = [
          {
            type: 'paragraph',
            children: [
              {
                type: 'html',
                value: firstChild.value.replace(CALLOUT_REGEX, '$2')
              },
              ...rest
            ]
          }
        ]
      }
    }
    node.data = node.data || {};
    node.data.hProperties = node.data.hProperties || {};
    node.data.hProperties.className = className;
  })
  return markdownAST;
}