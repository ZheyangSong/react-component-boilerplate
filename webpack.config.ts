import { Configuration } from "webpack";

export default function configChooser(env: string): Configuration {
  switch (env) {
    case "prod":
    case "production":
      return require("./config/webpack/webpack.prod");
    case "test":
      return require("./config/webpack/webpack.test");
    case "dev":
    case "development":
    default:
      return require("./config/webpack/webpack.dev");
  }
}
