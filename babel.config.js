module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
    "next/babel",
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          components: "./src/components",
          constants: "./src/constants",
          hooks: "./src/hooks",
          libs: "./src/libs",
          styles: "./src/styles",
          types: "./src/types",
        },
        extensions: [".js", ".ts", ".tsx"],
      },
    ],
  ],
};
