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
        libraryTarget: 'umd',
        // umdNamedDefine: true,
    },
    optimization: {
        minimize: true
    }
}