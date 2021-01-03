import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import html from "@rollup/plugin-html";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import serve from "rollup-plugin-serve";
import typescript from "@rollup/plugin-typescript";

const isDevelopment = process.env.ROLLUP_WATCH;

export default {
  input: "src/index.tsx",
  output: [
    {
      dir: "build",
      format: "es",
    },
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    typescript({ noEmitOnError: true, tsconfig: "./tsconfig.json" }),
    babel({
      babelHelpers: "bundled",
      plugins: [
        [
          "relay",
          {
            eagerESModules: true,
            artifactDirectory: "./src/__generated__",
          },
        ],
      ],
      presets: [
        ["@babel/preset-react"],
        [
          "@babel/preset-typescript",
          {
            allowNamespaces: true,
            allowDeclareFields: true,
          },
        ],
      ],
    }),
    nodeResolve({
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      preferBuiltins: false,
      browser: true,
    }),
    commonjs({
      sourceMap: true,
    }),
    html({
      attributes: {
        link: {
          rel: "stylesheet",
          type: "text/css",
          href: "/index.css",
        },
      },
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "Relay + Rollup",
        },
      ],
      title: "Relay + Rollup",
      template: () => `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Relay + Rollup" />
          <link rel="stylesheet" type="text/css" href="bundle.css" />
          <title>Relay + Rollup</title>
        </head>
        <body>
          <h1>Relay + Rollup!</h1>
          <section id="root"></section>
          <script type="module" src="/index.js"></script>
        </body>
      </html>
      `,
    }),
    json(),
    isDevelopment &&
      serve({
        open: true,
        port: 9000,
        contentBase: "build",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }),
    isDevelopment &&
      livereload({
        watch: "src",
      }),
  ],
};
