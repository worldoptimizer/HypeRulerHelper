/*!
Hype RulerHelper 1.0.0
copyright (c) 2024 Max Ziebell, (https://maxziebell.de). MIT-license
*/

/*
* Version-History
* 1.0.0  Initial release under MIT-license
*/

if ("HypeRulerHelper" in window === false) window['HypeRulerHelper'] = (function() {
	let resizeObserver = null; // Reference to the ResizeObserver

	function createHiPPICanvas(width, height) {
		const ratio = window.devicePixelRatio;
		const canvas = document.createElement("canvas");
		canvas.width = width * ratio;
		canvas.height = height * ratio;
		canvas.style.width = width + "px";
		canvas.style.height = height + "px";
		canvas.getContext("2d").scale(ratio, ratio);
		return canvas;
	}

	function refreshCanvas(element) {
		const existingCanvas = document.getElementById('HypeRulerHelper');
		if (existingCanvas) {
			existingCanvas.parentNode.removeChild(existingCanvas);
		}

		const canvas = createHiPPICanvas(60, element.offsetHeight);
		canvas.id = 'HypeRulerHelper';
		document.body.appendChild(canvas);
		
		canvas.style.position = "absolute";
		canvas.style.top = "0px";
		canvas.style.left = "0px";
		
		const ctx = canvas.getContext('2d');

		function drawMarks() {
			const totalHeight = canvas.height / window.devicePixelRatio;
			const smallMarkLength = 10; 
			const mediumMarkLength = 15;
			const largeMarkLength = 20; 
			const markStartX = 0; 

			for (let y = 0; y <= totalHeight; y += 10) {
				let markLength;
				if (y % 100 === 0) {
					markLength = largeMarkLength;
					ctx.fillText(`${y}px`, 25, y + 3);
				} else if (y % 50 === 0) {
					markLength = mediumMarkLength;
				} else {
					markLength = smallMarkLength;
				}

				ctx.beginPath();
				ctx.moveTo(markStartX, y);
				ctx.lineTo(markStartX + markLength, y);
				ctx.stroke();
			}
		}

		function setupCanvas() {
			ctx.fillStyle = 'grey';
			ctx.strokeStyle = 'grey';
			ctx.lineWidth = 1;
			ctx.font = '10px Arial';

			drawMarks();
		}

		setupCanvas();
	}

	function HypeSceneLoad(hypeDocument, element, event) {
		// Disconnect existing ResizeObserver if it exists
		if (resizeObserver) {
			resizeObserver.disconnect();
		}

		refreshCanvas(element);

		// Re-initialize the ResizeObserver
		resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				refreshCanvas(entry.target);
			}
		});

		// Start observing the element
		resizeObserver.observe(element);
	}

	if("HYPE_eventListeners" in window === false) { window.HYPE_eventListeners = Array(); }
	window.HYPE_eventListeners.push({type: "HypeSceneLoad", callback: HypeSceneLoad});

	const HypeRulerHelper = {
		version: '1.0.0',
	};

	return HypeRulerHelper;
})();
