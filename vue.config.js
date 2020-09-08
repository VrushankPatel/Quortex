module.exports = {
    devServer: {
        proxy: 'http://questaapp.herokuapp.com',
        disableHostCheck: true,
        port: 8080,
        host: '0.0.0.0'
    }
}