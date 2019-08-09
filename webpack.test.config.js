var path = require('path');

module.exports = {
    entry: './test/test.js',
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
        path: path.resolve(__dirname, 'test'),
        filename: 'index.js'
    },
    optimization: {
        minimize: false
    }
}