module.exports = {
    entry:  __dirname + '/app/index.js',    // 已多次提及的唯一入口文件
    // entry:  __dirname + '/publicJS/index.js',    // 已多次提及的唯一入口文件
    output: {
        path: __dirname + '/public',    // 打包后的文件存放的地方
        filename: 'mygdmap.js'  // 打包后输出文件的文件名
        // filename: 'myPublic.js'  // 打包后输出文件的文件名
    },
    devServer: {
        publicPath: '/',
        contentBase: './public',    // 本地服务器所加载的页面所在的目录
        historyApiFallback: true,   // 不跳转
        inline: true,    // 实时刷新
        proxy: {
            // 请求到 '/device' 下 的请求都会被代理到 target： http://debug.xxx.com 中
            '/mapApi/*': {
                target: 'http://localhost',
                secure: false, // 接受 运行在 https 上的服务
                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            }
        ]
    }
}
