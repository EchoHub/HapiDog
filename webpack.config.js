const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 按需生成html模版
const CleanWebpackPlugin = require("clean-webpack-plugin"); // 清理文件
module.exports = {
    entry: path.resolve(__dirname, "assets/common.js"),
    output: {
        path: path.resolve(__dirname, "_build"),
        filename: "hapidog.bundle.[hash].js",
        publicPath: "/_build"
    },
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ["./components", "./assets/**/*", "node_modules"]
    },
    devServer: {
        port: 9000,
        openPage: "_build",
        contentBase: "./_build"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: path.resolve(__dirname, "components"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: "file-loader" //加载图片， 混合到css中 
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader", "url-loader"] // 加载字体
            }
        ]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + "/page/index.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new CleanWebpackPlugin('_build/**/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]

}

