const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const getAbsolutePath = p => path.resolve(__dirname, p)

const paths = {
  index: getAbsolutePath("src/index.js"),
  vendor: getAbsolutePath("src/vendor.js"),
  output: getAbsolutePath("dist"),
  style: getAbsolutePath("src/index.css")
}

module.exports = {
  entry: {
    index: paths.index,
    vendor: paths.vendor,
    style: paths.style
  },
  output: {
    path: paths.output,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }
    ]
  },
  resolve: {
    extensions: [".js"]
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].min.css"
    }),
    new OptimizeCssAssetsPlugin()
  ],
  devtool: false
}
