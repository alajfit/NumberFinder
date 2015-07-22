function clickHandler(e) {
	getDOMContents();
	//document.getElementById('mainFrame').innerHTML = document.body.innertHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fineMe').addEventListener('click', clickHandler);
});

chrome.extension.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
	// list closest class if possible
	// slice string by regex and find closest class
	var countryC = 'uk';
	var country;

	var caughtDom = request.source;
	switch (countryC) {
		case 'es': // Spain
			country = new RegExp("([0-9]{2}( |-|\\.)?[0-9]{3}( |-|\\.)?[0-9]{2}( |-|\\.)?[0-9]{2})\\b|([0-9]{2,}( |-|\\.)?[0-9]{3,}( |-|\\.)?[0-9]{2,})\\b","g");
			break;
		case 'uk': // United Kingdom
			country = new RegExp("\\b(([0-9]{3,6})( |-|\\.|)([0-9]{3,4})( |-|\\.|)([0-9]{3,6}))\\b|\\b(([0-9]{5,6})( |-|\\.|)([0-9]{4,6}))\\b", "g");
			break;
		case 'be': // Belgium
			country = new RegExp("", "g");
			break;
		default: // No Selection
			countryC = false;
			break;
	}

	// Find all elements with this regular expression
	var allElements = caughtDom.match(country);

	// Check all the found numbers and add a count for each
	var numbers = [];
	for(var x=0;x<allElements.length;x++){
		var check = true;
		if(Object.getOwnPropertyNames(numbers).length === 0){
			numbers.push({ 'found': allElements[x], 'count': 1});
		} else {
			Object.keys(numbers).forEach(function(key) {
				if(numbers[key].found == allElements[x]) {
					numbers[key].count += 1;
					check = false;
				}
			});
			if(check === true) {
				numbers.push({'found': allElements[x], 'count': 1});
			}
		}
	}

	var text = "";
	for(var x=0;x<numbers.length;x++){
		text+= "<li>"+numbers[x].found+" ["+numbers[x].count+"]</li>";
	}

    document.getElementById('mainFrame').innerHTML = "<h2>Found "+numbers.length+" Numbers</h2><ol>"+text+"</ol>";
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
