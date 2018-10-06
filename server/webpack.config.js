const path = require("path");

module.exports = {
  entry: "./server.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "./index.js",
  },
};
