const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        index: './src/js/index.js',
    },
    output: {
        filename: '[name].js', // название выходного файла равно полю из entry 
        path: path.resolve(__dirname, 'dist'), // __dirname - абсолютный путь
        clean: true, // очистить папку dist
    },                                        
    module: {
        rules: [ // webpack может импортировать только JS и Json, для импорта других типов файлов нужны лоадеры
            {
                test: /\.css$/i, // название файла
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },                                      
            {                                       
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource', // создает отдельный файл и экспортирует URL
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
            },   
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.scss$/i,
                use: [ 
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "autoprefixer",
                                        {
                                            "browsers": 'last 10 versions'
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader", 
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "ie 11" }]
                        ]
                    }
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ // HtmlWebpackPlugin создает index.html в директории с бандлом 
            title: 'main',        // и автоматически добавляет в него ссылку на бандл.
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "style.css",
        }),
    ],
    devServer: {
        static: './dist',
        watchFiles:['./src/index.html']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
};
