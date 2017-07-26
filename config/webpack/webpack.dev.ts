import {
  Configuration,
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
  NoEmitOnErrorsPlugin
} from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

import * as helpers from "../webpack.helpers";

const COMPONENT_SRC = helpers.root("src"),
      DEPENDENCIES = helpers.root("node_modules"),
      EXAMPLE_SRC = helpers.root("example"),
      EXAMPLE_ENTRY = helpers.root("example/index.tsx"),
      OUTPUT_FOLDER = helpers.root("compiled_example"),
      ATL_TSCONFIG = helpers.root("config/typescript/tsconfig.dev.json"),
      INDEX_HTML = helpers.root("example/index.html");

const config: Configuration = {
  devtool: "eval-source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss"],
    modules: [COMPONENT_SRC, DEPENDENCIES],
    alias: {
      "component-pkg": COMPONENT_SRC
    }
  },
  entry: ["react-hot-loader/patch", EXAMPLE_ENTRY],
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
        use: [
          "react-hot-loader/webpack",
          `awesome-typescript-loader?configFileName=${ATL_TSCONFIG}`
        ]
      }, {
        enforce: "pre",
        test: /\.js$/,
        use: "source-map-loader"
      }, {
        test: /\.css$/,
        include: [DEPENDENCIES],
        exclude: [COMPONENT_SRC, EXAMPLE_SRC],
        use: [
          "style-loader?sourceMap",
          {
            loader: "css-loader",
            query: {
              sourceMap: true,
              modules: false,
              importLoaders: 1,
              camelCase: true,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          }
        ]
      }, {
        test: /\.scss$/,
        include: [COMPONENT_SRC, EXAMPLE_SRC],
        exclude: [DEPENDENCIES],
        use: [
          "style-loader?sourceMap",
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
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Component Example",
      template: INDEX_HTML
    }),
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
    new NoEmitOnErrorsPlugin()
  ],
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    inline: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};

export default config;
