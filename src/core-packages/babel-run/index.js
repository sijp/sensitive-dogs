// run.cjs
require('ignore-styles');
require('@babel/register')({
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  ignore: [/node_modules\/(?!wouter)/]
});

const path = require('path');

const packageName = process.argv[2];
if (!packageName) {
  console.error('❌ Missing packageName to run');
  process.exit(1);
}

const modulePath = path.resolve(__dirname, '..', packageName, 'index.ts');
require(modulePath);
