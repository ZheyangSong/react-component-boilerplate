import * as path from "path";

const EVENT = process.env.npm_lifecycle_event || "",
      ROOT = path.resolve(__dirname, "..");

// Helper functions
function hasProcessFlag(flag: string): boolean {
  return process.argv.join("").indexOf(flag) > -1;
}

function hasNpmFlag(flag: string): boolean {
  return EVENT.includes(flag);
}

function isWebpackDevServer(): boolean {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

function root(args: string[] | string): string {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [ROOT].concat(args));
}

export {
  hasProcessFlag,
  hasNpmFlag,
  isWebpackDevServer,
  root
}
