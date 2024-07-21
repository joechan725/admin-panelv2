module.exports = {
  create: function (context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === 'next/navigation') {
          context.report({
            node,
            message: "Importing from 'next/navigation' is not allowed."
          });
        }
      }
    };
  },
  meta: {
    type: 'problem',
    docs: {
      description: "Warn when imports are from 'next/navigation'",
      category: 'Possible Errors',
      recommended: false
    },
    schema: [] // no options
  }
};