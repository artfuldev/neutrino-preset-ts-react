const typescript = require('neutrino-preset-ts');
const { join } = require('path');

const MODULES = join(__dirname, 'node_modules');

module.exports = (neutrino) => {
  neutrino.use(typescript);
  neutrino.config
    .resolve
      .modules
        .add(MODULES)
        .end()
      .extensions
        .add('.tsx')
        .end()
      .alias
        .set('react-native', 'react-native-web')
        .end()
      .end()
    .resolveLoader
      .modules
        .add(MODULES)
        .end()
      .end()
    .externals({
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    })
    .when(process.env.NODE_ENV === 'development', config => config
      .entry('index')
      .prepend(require.resolve('react-hot-loader/patch')));
};