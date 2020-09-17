module.exports = {
    devServer: {
        // proxy: 'http://localhost:9090',
        proxy: 'http://questaapp.herokuapp.com',
        disableHostCheck: true,
        port: 5000,
        host: '0.0.0.0'
    }
}