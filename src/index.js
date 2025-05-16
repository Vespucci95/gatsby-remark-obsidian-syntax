const visit = require('unist-util-visit');

module.exports = ({markdownAST}, pluginOptions) => {
  // 여기에 플러그인 로직 작성
  visit(markdownAST, 'paragraph', (node) => {
    // 노드 변환 로직
  });

  return markdownAST;
};