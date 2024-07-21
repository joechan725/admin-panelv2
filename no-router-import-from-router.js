module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow importing useRouter from next/router',
      category: 'Best Practices',
      recommended: false
    },
    messages: {
      incorrectImport: 'Importing useRouter from next/router is deprecated. Use next/navigation instead.'
    },
    schema: [] // no options
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'next/router') {
          const hasUseRouterImport = node.specifiers.some(
            specifier => specifier.imported && specifier.imported.name === 'useRouter'
          );

          if (hasUseRouterImport) {
            context.report({
              node,
              messageId: 'incorrectImport'
            });
          }
        }
      }
    };
  }
};