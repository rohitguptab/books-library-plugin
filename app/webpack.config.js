module.exports = {
  entry: "./app.js",
  output: {
    path: __dirname,
    filename: "app.build.js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: "css-loader" },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        query: {
          limit: "10000",
          mimetype: "application/svg+xml",
        },
      },
    ],
  },
};
