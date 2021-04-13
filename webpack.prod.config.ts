import path from "path";
import webpack from "webpack";
import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";

import common from "./webpack.common.config";

const config: webpack.Configuration = merge(common(true), {
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "static/js/[name].[contenthash:8].js",
        chunkFilename: "static/js/[name].[contenthash:8].js",
        publicPath: "",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        comparisons: false,
                    },
                    parse: {},
                    mangle: true,
                    output: {
                        comments: false,
                        ascii_only: true,
                    },
                },
                parallel: true,
            }),
        ],
        sideEffects: true,
        concatenateModules: true,
        // Automatically split vendor and commons
        splitChunks: {
            chunks: "all",
            name: false,
        },
        // Keep the runtime chunk separated to enable long term caching
        runtimeChunk: {
            name: (entryPoint: { name: string }): string =>
                `runtime-${entryPoint.name}`,
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            },
            inject: true,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "static/css/[name].[contenthash:8].css",
            chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
        }),
    ],
});

export default config;
