const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js"
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {

                test: /\.css$/,
                use:["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "envVariable": JSON.stringify(process.env.REACT_APP_SOME_ENV_VARIABLE)
        })
    ],
    devtool: "eval-cheap-module-source-map",
    devServer: {
        historyApiFallback: true,
        hot: true,
        static: path.join(__dirname, "public"),
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-cookie"
        }
    }
}