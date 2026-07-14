module.exports = {
  multipass: true,
  plugins: [
    "preset-default",
    "removeTitle",
    "removeViewBox",
    "cleanupIDs",
    { name: "convertPathData", params: { floatPrecision: 2 } },
    { name: "convertTransform", params: { floatPrecision: 2 } },
    { name: "mergePaths", params: { floatPrecision: 2 } },
    "removeUselessStrokeAndFill",
    "collapseGroups",
    "sortDefsChildren",
    "inlineStyles",
  ],
};
