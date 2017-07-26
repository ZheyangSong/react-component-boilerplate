import { Configuration, BannerPlugin, DefinePlugin, optimize } from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as ExtractTextPlugin from "extract-text-webpack-plugin";

import * as helpers from "../webpack.helpers";

const CopyRights = "Copyright XXX Inc.",
      COMPONENT_SRC = helpers.root("src"),
      DEPENDENCIES = helpers.root("node_modules"),
      OUTPUT_FOLDER = helpers.root("dist"),
      ATL_TSCONFIG = helpers.root("config/typescript/tsconfig.prod.json");

const config: Configuration = {
  devtool: "cheap-module-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  entry: COMPONENT_SRC,
  output: {
    path: OUTPUT_FOLDER,
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
      },
      {
        test: /\.json$/,
        use: "json-loader"
      }, {
        test: /\.tsx?$/,
        use: `awesome-typescript-loader?configFileName=${ATL_TSCONFIG}`
      }, {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }, {
        test: /\.css$/,
        include: [DEPENDENCIES],
        exclude: [COMPONENT_SRC],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader",
            query: {
              sourceMap: true,
              modules: false,
              importLoaders: 1,
              camelCase: true,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          }]
        })
      }, {
        test: /\.scss$/,
        include: [COMPONENT_SRC],
        exclude: [DEPENDENCIES],
        use: ExtractTextPlugin.extract({
          fallback: "style-loader?sourceMap",
          use: [
            "css-loader?sourceMap",
            {
              loader: "postcss-loader",
              query: {
                sourceMap: true,
                plugins: (loader: any) => [
                  require("autoprefixer")()
                ]
              }
            },
            "sass-loader?sourceMap"
          ]
        })
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin({
      filename: "[name].[contenthash:8].css",
      disable: false,
      allChunks: true
    }),
    new optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      comments: false,
    }),
    new BannerPlugin(CopyRights),
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

export default config;
