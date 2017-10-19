import test from 'ava';
import { validate } from 'webpack';
import { Neutrino } from 'neutrino';
import { join } from 'path';

test('loads preset', t => {
  t.notThrows(() => require('..'));
});

test('uses preset', t => {
  const api = Neutrino();
  t.notThrows(() => api.use(require('..')));
});

test('valid preset production', t => {
  process.env.NODE_ENV = 'production';
  const api = Neutrino();
  api.use(require('..'));
  const config = api.config.toConfig();
  // console.log(config);
  const errors = validate(config);
  t.is(errors.length, 0);
});

test('valid preset development', t => {
  process.env.NODE_ENV = 'development';
  const api = Neutrino();
  api.use(require('..'));
  const config = api.config.toConfig();
  // console.log(config);
  const errors = validate(config);
  t.is(errors.length, 0);
});

test('preset development has given entry if available', t => {
  process.env.NODE_ENV = 'development';
  const options = { entry: 'index.xyz' };
  const api = Neutrino(options);
  api.use(require('..'));
  const config = api.config.toConfig();
  t.is(config.entry.index[1], join(api.options.source, 'index.xyz'));
});

test('preset production has given entry if available', t => {
  process.env.NODE_ENV = 'production';
  const options = { entry: 'index.xyz' };
  const api = Neutrino(options);
  api.use(require('..'));
  const config = api.config.toConfig();
  t.is(config.entry.index[0], join(api.options.source, 'index.xyz'));
});

test('preset development entry defaults to index.ts', t => {
  process.env.NODE_ENV = 'development';
  const api = Neutrino();
  api.use(require('..'));
  const config = api.config.toConfig();
  t.is(config.entry.index[1], join(api.options.source, 'index.ts'));
});

test('preset production entry defaults to index.ts', t => {
  process.env.NODE_ENV = 'production';
  const api = Neutrino();
  api.use(require('..'));
  const config = api.config.toConfig();
  t.is(config.entry.index[0], join(api.options.source, 'index.ts'));
});

test('preset development has hmr enabled for react', t => {
  process.env.NODE_ENV = 'development';
  const api = Neutrino();
  api.use(require('..'));
  const config = api.config.toConfig();
  const regexp = new RegExp(join(api.options.root, 'node_modules[\\/]react-hot-loader[\\/]patch.js'));
  t.is(regexp.test(config.entry.index[0], true);
});

test('preset development has tsx extension', t => {
  process.env.NODE_ENV = 'development';
  const api = Neutrino();
  api.use(require('..'));
  const config = api.config.toConfig();
  t.true(config.resolve.extensions.indexOf('.tsx') > -1);
});

test('preset production has tsx extension', t => {
  process.env.NODE_ENV = 'production';
  const api = Neutrino();
  api.use(require('..'));
  const config = api.config.toConfig();
  t.true(config.resolve.extensions.indexOf('.tsx') > -1);
});
