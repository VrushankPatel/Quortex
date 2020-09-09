module.exports = {
    devServer: {
        proxy: 'http://localhost:9090/',
        disableHostCheck: true,
        port: 8080,
        host: '0.0.0.0'
    }
}