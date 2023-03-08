const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        anchor: path.resolve('src/contentScripts/Anchor.tsx'),
        checkout: path.resolve('src/contentScripts/Checkout.tsx'),
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        // background: path.resolve('src/background/background.ts'),
    },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/i,
            },
            {
                type: 'asset/resource',
                test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('src/static'),
                    to: path.resolve('dist'),
                }
            ]
        }),
        ...getHtmlPlugins([
            'popup', 'options',
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
    },
    optimization: {
        splitChunks: {
            chunks(chunk) {
                return chunk.name != 'anchor' && chunk.name != 'checkout' && chunk.name != 'popup'
            }
        },
    },
}

function getHtmlPlugins(chunks) {
    return chunks.map(chunk => {
        const name = chunk.charAt(0).toUpperCase() + chunk.slice(1);
        return new HtmlPlugin({
            title: `${name} Page`,
            filename: `${chunk}.html`,
            chunks: [chunk],
        })
    });
}