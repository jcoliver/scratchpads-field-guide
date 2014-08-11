function openElementByClass(elementClass) {
	var elementList = document.getElementsByClassName(elementClass);
	for (var i = 0; i < elementList.length; i++) {
		elementList[i].style.display = "block";
	}
}

function closeElementByClass(elementClass) {
	var elementList = document.getElementsByClassName(elementClass);
	for (var i = 0; i < elementList.length; i++) {
		elementList[i].style.display = "none";
	}
}

/* For new window implementation: */
function openLargeById(elementId) {
	// The div we will open in the new window
	var divToOpen = document.getElementById(elementId).outerHTML;
	// Settings for the new window (size, scrollbars, and menubar)

	// Count the number of images. 
	var numImages = document.getElementById(elementId).getElementsByTagName("img").length;

	if (numImages >= 1) {
		
		var image = document.getElementById(elementId).getElementsByTagName("img")[0];
		var width = image.width;
		var height = image.height;
		var windowHeight = 1200;
		var windowWidth = 1200;
		var maxHeight = -1;
		var reducePercent = 48;

		if (numImages == 1) {
			reducePercent = 100;
		}
		
		var heightMult = reducePercent/100;
		var widthMult = reducePercent/100;

		if (numImages == 2) {
			heightMult = heightMult * 2;
		}
		var maxWidth = Math.ceil(widthMult * windowWidth) - 50;
		if (height < width) { // Landscape
			if (width < maxWidth) { // Window needs to get thinner
				maxWidth = width;
				windowWidth = Math.ceil((1.0/widthMult) * maxWidth) + 50;
			}
			maxHeight = height * maxWidth / width;
			windowHeight = Math.ceil((1.0/heightMult) * maxHeight) + 70;
		} else { // Portrait (or square)
			maxHeight = Math.ceil(heightMult * windowHeight) - 50;
			if (height < maxHeight) { // Window needs to get shorter
				maxHeight = height;
				windowHeight = Math.ceil((1.0/heightMult) * maxHeight) + 50;
			}
			maxWidth = width * maxHeight / height;
			windowWidth = Math.ceil((1.0/widthMult) * maxWidth) + 50;
		}
		
		var theWindow = window.open('', '', 'width=' + windowWidth +' ,height=' + windowHeight + ',scrollbars=1,menubar=1');
	
		// Grab any link elements so we can include stylesheets 
		var linkstring = '';
		var link = document.getElementsByTagName( "link" );
		for (var i = 0; i < link.length; i++) {
			str = link[i].outerHTML; // Stringify and make sure link is a stylesheet
			if (str.lastIndexOf("stylesheet") > 0 && str.lastIndexOf("text/css") > 0 && str.lastIndexOf(".css")) {
				linkstring += "\t" + str + "\n";
			}
		}
		// The document corresponding to this new window
		var doc = theWindow.document;
		// Write the header and div to the new window document (if a stylesheet link was found);
		if (linkstring.length > 0) {
			doc.write("<head>\n" + linkstring + "</head>\n");
		}
		// Write the div to the window
		doc.write(divToOpen);
	
		// Set display so div actually shows up
		doc.getElementById(elementId).style.display = "block";
	
		// Re-class EACH image so they are the right size
		var images = doc.getElementById(elementId).getElementsByTagName('img');
		j = images.length;
		while(j--) {
			images[j].style.width = reducePercent + "%";
		}
		doc.close();
	
	} // End conditional for >= 1 images
}