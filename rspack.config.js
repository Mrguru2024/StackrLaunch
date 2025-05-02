const path = require('path');

module.exports = {
  entry: {
    main: './app/page.tsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.next/static/chunks'),
    publicPath: '/_next/static/chunks/',
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
        exclude: [/node_modules/, /\.next/, /next\.config\.js/],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['tailwindcss', 'autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    fallback: {
      fs: false,
      path: false,
      os: false,
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
        shared: {
          name: 'shared',
          chunks: 'all',
          minChunks: 2,
          priority: 10,
        },
      },
    },
  },
  experiments: {
    topLevelAwait: true,
  },
  externals: {
    next: 'next',
    react: 'react',
    'react-dom': 'react-dom',
  },
};
