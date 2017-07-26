import * as React from "react";

/**
 * "component-pkg" is this component's npm package name to publish.
 * Feel free to change it based on your choice.
 * It's an alias deinfed by both `Webpack` config and `Typescript` config:
 *    ./tsconfig.json
 *    ./example/tsconfig.json
 *    ./config/typescript/tsconfig.dev.json
 *    ./config/webpack/webpack.dev.ts
 */
import { Dummy } from "component-pkg";

export default class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <Dummy name="Dummy Component" description="Example app for showcasing/developing the component" />
    );
  }
}
