const { alias } = require('react-app-rewire-alias');
const path = require('path');

const aliasMap = {
  '@': path.resolve(__dirname, 'src'),
};

module.exports = alias(aliasMap);
