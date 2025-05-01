const path = require('path');

module.exports = {
  entry: './src/js/index.js', // Your main JavaScript file
  output: {
    filename: 'bundle.js', // Output file name
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  mode: 'development', // Keeps the output readable
  devtool: 'source-map', // Generates source maps for debugging
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/, // Exclude dependencies
        use: {
          loader: 'babel-loader', // Optional: Transpile modern JS for compatibility
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};