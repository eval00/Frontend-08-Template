module.exports = {
    // entry: "./src/main.js",
    entry: "./src/animation-demo.js",
    module: {
        rules: [
            {
                test: /.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-react-jsx",
                                {
                                    pragma: "createElement"
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    mode: "development"
}