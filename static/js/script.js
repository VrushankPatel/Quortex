function invokeServices() {
	const urls = [
		"https://quortex.herokuapp.com/",
		"https://quortex-api-gateway.herokuapp.com/",
		"https://quortex-server.herokuapp.com/",
	];
	urls.forEach((element) => {
		console.log(element);
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
			timeStamp = Math.ceil(
				(new Date().getTime() - data[Object.keys(data)[0]]["TimeStamp"]) / 1000
			);
			if (timeStamp <= 1790) {
				$("#seconds").html("now");
				deleteTimeStamp();
				addTimeStamp();
				window.location.href = "https://quortex.herokuapp.com/";
			} else {
				deleteTimeStamp();
				addTimeStamp();
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

function deleteTimeStamp() {
	jQuery.ajax({
		accept: "application/json",
		type: "DELETE",
		async: false,
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: "https://simplerest-cfec7-default-rtdb.firebaseio.com/quortex.json",
	});
}
function addTimeStamp() {
	var data = { TimeStamp: Math.round(new Date().getTime()).toString() };
	jQuery.ajax({
		accept: "application/json",
		type: "POST",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		url: "https://simplerest-cfec7-default-rtdb.firebaseio.com/quortex.json",
		data: JSON.stringify(data),
	});
}
getTimeStamp();
// deleteTimeStamp();
// addTimeStamp();
