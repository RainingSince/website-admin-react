import { primaryColor } from '../src/defaultSettings';
import routers from './router.config';

let mode = process.env.APP_MODE;

export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        chunks: mode == 'build' ? ['vendors', 'umi'] : null,
        antd: true,
        dva: {
          hmr: true,
        },
        pwa: mode == 'build',
        targets: {
          ie: 11,
        },
        locale: {
          enable: true,
          default: 'zh-CN',
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: {
    ie: 11,
  },

  chainWebpack: function(config, { webpack }) {
    mode == 'build' ? config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    }) : config;
  },
  routes: routers,
  disableRedirectHoist: true,

  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },

  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },

  ignoreMomentLocale: true,

  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  exportStatic: {
    htmlSuffix: true,
  },

};
