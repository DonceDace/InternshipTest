import postcssPx2remExclude from 'postcss-px2rem-exclude';
import { defineConfig } from 'umi';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { version as umiVersion } from 'umi/package.json';

// 输出的js和css在dist内的存放地址
const BaseDir = {
  js: 'static/js/',
  css: 'static/css/'
};

export default defineConfig({
  devServer: {
    port: 8000
  },
  base: '/',
  publicPath: './',
  hash: true,
  history: {
    type: 'hash'
  },
  nodeModulesTransform: {
    type: 'none'
  },
  fastRefresh: {},
  cssLoader: {
    localsConvention: 'camelCase',
    modules: {
      auto: (path) => {
        return !/[\\/]node_modules[\\/]/.test(path)
      },
      mode: 'local',
      localIdentName: '[local]_[hash:8]'
    }
  },
  // postcss自动转换px->rem
  extraPostCSSPlugins: [
    postcssPx2remExclude({
      remUnit: 75,
      exclude: /node_modules/i
    })
  ],
  // 路由懒加载
  dynamicImport: {
    loading: '@/components/loading/index'
  },
  // 去除antd
  antd: false,
  // 定义全局变量`SERVER_ENV` 配合环境切换
  define: {
    SERVER_ENV: process.env.SERVER_ENV
  },
  // 大于10b的图不压进代码
  inlineLimit: 10,
  // 忽略打包`moment` 内的local(100kb+)文件
  ignoreMomentLocale: true,
  chunks: [`umi.${umiVersion}`, 'vendor', 'umi'],
  chainWebpack(config) {
    // 修改js打包地址。将umi文件与其它node包分开打包至 umi.3.5.20.[hash].js
    // 、vendor.[hash].js 和项目js更名为 main.[hash].js
    config.merge({
      output: {
        chunkFilename: `${BaseDir.js}[name].[hash].chunk.js`,
        filename: `${BaseDir.js}main.[hash].js`
      },
      optimization: {
        usedExports: true,
        chunkIds: 'size',
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 1,
          automaticNameDelimiter: '.',
          cacheGroups: {
            umiVendors: {
              name: `umi.${umiVersion}`,
              test: /[\\/]node_modules[\\/].*(?=umi|antd)+/,
              priority: 10
            },
            defaultVendors: {
              name: `vendor`,
              test({ resource }) {
                return (
                  !/[\\/]node_modules[\\/].*(?=umi)+/.test(resource) &&
                  /[\\/]node_modules[\\/]/.test(resource)
                );
              },
              priority: 10
            }
          }
        }
      }
    });
    // 清空dist文件夹内容
    config.plugin('clean-plugin').use(CleanWebpackPlugin);
  }
});
