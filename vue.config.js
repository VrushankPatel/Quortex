// module.exports = {
// 	devServer: {
// 		proxy: "http://questaapp.herokuapp.com/api",
// 		disableHostCheck: true,
// 		port: 8080,
// 		host: "0.0.0.0",
// 		// https: true,
// 	},
// 	// outputDir: "target/dist",
// 	// assetsDir: "static",
// };

module.exports = {
	outputDir: "docs",
	publicPath:
		process.env.NODE_ENV === "production" ? "/Quortex-web-client/" : "/",
};
