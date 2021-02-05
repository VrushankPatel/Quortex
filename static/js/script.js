function invokeServices() {
	const urls = [
		"https://quortex.herokuapp.com/",
		"https://quortex-api-gateway.herokuapp.com/",
		"https://quortex-server.herokuapp.com/",
	];
	urls.forEach((element) => {
		$.ajax({
			url: element,
		});
	});
}
async function getTimeStamp() {
	await $.get(
		"https://simplerest-cfec7-default-rtdb.firebaseio.com/quortex.json",
		{ async: false },
		function (data, status) {
			timeStamp = Math.ceil((new Date().getTime() - data["TimeStamp"]) / 1000);
			if (timeStamp <= 1790) {
				$("#seconds").html("now");
				updateTimeStamp();
				window.location.href = "https://quortex.herokuapp.com/";
			} else {
				updateTimeStamp();
				invokeServices();
				var counter = 16;
				var secondsInterval = setInterval(() => {
					$("#seconds").html(" in " + --counter + " seconds");
					if (counter == 0) {
						window.location.href = "https://quortex.herokuapp.com/";
						clearInterval(secondsInterval);
					}
				}, 1000);
				// window.location.href = "https://quortex.herokuapp.com/";
			}
		}
	);
}

function updateTimeStamp() {
	var data = { TimeStamp: Math.round(new Date().getTime()).toString() };
	jQuery.ajax({
		accept: "application/json",
		type: "PUT",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: "https://simplerest-cfec7-default-rtdb.firebaseio.com/quortex.json",
		data: JSON.stringify(data),
	});
}
// getTimeStamp();
window.location.href = "https://quortex-app.web.app";
