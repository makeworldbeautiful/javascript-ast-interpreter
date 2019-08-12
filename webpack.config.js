var path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            },
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        // library: 'astInterpreter',
        // libraryTarget: 'commonjs',
        /**
         * - configuration.output.libraryTarget should be one of these:
   "var" | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
   -> Type of library
         */
        libraryTarget: 'this',
        // umdNamedDefine: true,
    },
    optimization: {
        minimize: true
    }
}