const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['./src/js/index.js'], // Your entry file
  bundle: true, // Bundle all dependencies into a single file
  outfile: './dist/bundle.js', // Output file
  minify: false, // Optional: Set to true if you want to minify the output
  sourcemap: false, // Optional: Set to true if you want source maps
  platform: 'browser', // Target platform (e.g., browser or node)
}).catch(() => process.exit(1));