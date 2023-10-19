const {
  shareAll,
  withModuleFederationPlugin,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    mixCms: 'http://localhost:4200/remoteEntry.js',
    mixDatabase: 'http://localhost:4200/remoteEntry.js',
    mixKanban: 'http://localhost:4200/remoteEntry.js',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },
});
