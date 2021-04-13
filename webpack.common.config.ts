import webpack from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import svgToMiniDataURI from "mini-svg-data-uri";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Dotenv from "dotenv-webpack";
import path from "path";

const config = (isEnvProduction: boolean): webpack.Configuration => {
    const getStyleLoaders = (preProcessor?: string) => {
        // never change order push loader
        const loaders = [];
        if (!isEnvProduction) {
            loaders.push("style-loader");
        }
        if (isEnvProduction) {
            loaders.push({
                loader: MiniCssExtractPlugin.loader,
                // css is located in `static/css`, use '../../' to locate index.html folder
                options: { publicPath: "../../" },
            });
        }
        loaders.push("css-loader");
        if (preProcessor) {
            loaders.push(preProcessor);
        }
        return loaders;
    };
    return {
        entry: "./src/index.tsx",
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: getStyleLoaders(),
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: getStyleLoaders("sass-loader"),
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: "asset",
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.svg/,
                    type: "asset/inline",
                    generator: {
                        dataUrl: (content: string | Buffer): string => {
                            if (typeof content !== "string") {
                                content = content.toString();
                            }
                            return svgToMiniDataURI(content);
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
            alias: {
                "@Reducers": path.resolve(__dirname, "src/Reducers"),
                "@Reducers/*": path.resolve(__dirname, "src/Reducers/*"),
                "@Sagas": path.resolve(__dirname, "src/Sagas"),
                "@Sagas/*": path.resolve(__dirname, "src/Sagas/*"),
                "@Interfaces": path.resolve(__dirname, "src/Interfaces"),
                "@Interfaces/*": path.resolve(__dirname, "src/Interfaces/*"),
            },
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                async: false,
            }),
            new ESLintPlugin({
                extensions: ["js", "jsx", "ts", "tsx"],
            }),
            new Dotenv({
                path: `./.env.${process.env.NODE_ENV}`, // load this now instead of the ones in '.env'
                safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
                allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
                systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
                silent: true, // hide any errors
                defaults: true, // load '.env.defaults' as the default values if empty.
            }),
        ],
    };
};

export default config;
