function clickHandler(e) {
	getDOMContents();
	//document.getElementById('mainFrame').innerHTML = document.body.innertHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fineMe').addEventListener('click', clickHandler);
});

chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
	// Need to run regex here
	// get the numbers listed and how many times they have been found
	// list closest class if possible
    document.getElementById('mainFrame').innerHTML = request.source;
  }
});

function getDOMContents() {
	chrome.tabs.executeScript(null, {
    	file: "getPagesSource.js"
	}, function() {
    	if (chrome.extension.lastError) {
    	}
	});
}
