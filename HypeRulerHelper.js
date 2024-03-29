/*!
 * Hype RulerHelper 1.0.3
 * Copyright (c) 2024 Max Ziebell, (https://maxziebell.de). MIT-license
 */

/*
 * Version-History
 * 1.0.0 Initial release under MIT-license
 * 1.0.1 Added marker feature with labels
 * 1.0.2 Added customizable marker colors and global marker indicators
 * 1.0.3 Rewritten to store markers in an object and allow marker management
 */

if ("HypeRulerHelper" in window === false) window['HypeRulerHelper'] = (function() {
    let markers = {
        document: {},
        scene: {}
    };
    let resizeObserver = null;

    /**
     * @function debounceByRequestFrame
     * @param {function} fn - the function to be debounced
     * @returns {function} - the debounced function
     */
    function debounceByRequestFrame(fn) {
        return function() {
            if (fn.timeout) return;
            var args = arguments;
            fn.timeout = requestAnimationFrame(function() {
                fn.apply(this, args);
                fn.timeout = null;
            }.bind(this));
        };
    }

    function createHiPPICanvas(width, height) {
        const ratio = window.devicePixelRatio;
        const canvas = document.createElement("canvas");
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.style.zIndex = 9999;
        canvas.style.pointerEvents = 'none';
        canvas.style.backgroundColor = 'transparent';
        canvas.getContext("2d").scale(ratio, ratio);
        return canvas;
    }

    function drawLabel(ctx, text, x, y, color = 'grey') {
        ctx.save();

        ctx.fillStyle = color;

        const padding = 2;
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const boxWidth = textWidth + padding * 4; 
        const boxHeight = 10 + padding * 2;

        ctx.beginPath();
        ctx.moveTo(x + 2, y - boxHeight / 2);
        ctx.lineTo(x + boxWidth - 2, y - boxHeight / 2);
        ctx.quadraticCurveTo(x + boxWidth, y - boxHeight / 2, x + boxWidth, y - boxHeight / 2 + 2);
        ctx.lineTo(x + boxWidth, y + boxHeight / 2 - 2);
        ctx.quadraticCurveTo(x + boxWidth, y + boxHeight / 2, x + boxWidth - 2, y + boxHeight / 2);
        ctx.lineTo(x + 2, y + boxHeight / 2);
        ctx.quadraticCurveTo(x, y + boxHeight / 2, x, y + boxHeight / 2 - 2);
        ctx.lineTo(x, y - boxHeight / 2 + 2);
        ctx.quadraticCurveTo(x, y - boxHeight / 2, x + 2, y - boxHeight / 2);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.fillText(text, x + padding * 2, y + 4);

        ctx.restore();
    }

    function refreshCanvas(element) {
        const existingCanvas = document.getElementById('HypeRulerHelper');
        if (existingCanvas) {
            existingCanvas.parentNode.removeChild(existingCanvas);
        }

        const canvas = createHiPPICanvas(200, element.offsetHeight);
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
            const padding = 2;

            for (let y = 0; y <= totalHeight; y += 10) {
                let markLength;
                if (y % 100 === 0) {
                    markLength = largeMarkLength;
                    ctx.fillText(`${y}px`, markStartX + largeMarkLength + padding, y + 3);
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

            // Draw document and scene markers
            Object.values(markers.document).concat(Object.values(markers.scene)).forEach(marker => {
                const { position, color = 'green' } = marker;
                ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(0, position);
                ctx.lineTo(60, position);
                ctx.stroke();
                if (marker.label) {
                    drawLabel(ctx, marker.label, 60, position, color);
                }
            });
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

    function HypeDocumentLoad(hypeDocument, element, event) {
        hypeDocument.addMarker = function(position, label, color = 'green') {
            markers.document[label] = { position, label, color };
            refreshCanvas(element);
        };

        hypeDocument.addSceneMarker = function(position, label, color = 'orange') {
            markers.scene[label] = { position, label, color };
            refreshCanvas(element);
        };

        hypeDocument.resetMarkers = function() {
            markers.document = {};
            markers.scene = {};
            refreshCanvas(element);
        };
        
        hypeDocument.removeMarker = function(label) {
            delete markers.document[label];
            refreshCanvas(element);
        };

        hypeDocument.refreshMarkers = debounceByRequestFrame(function() {
            refreshCanvas(element);
        });
    }

    function HypeScenePrepareForDisplay(hypeDocument, element, event) {
        markers.scene = {};

        if (resizeObserver) {
            resizeObserver.disconnect();
        }

        resizeObserver = new ResizeObserver(entries => {
            refreshCanvas(element);
        });

        resizeObserver.observe(element);
    }

    if("HYPE_eventListeners" in window === false) { window.HYPE_eventListeners = Array(); }
    window.HYPE_eventListeners.push({type: "HypeDocumentLoad", callback: HypeDocumentLoad});
    window.HYPE_eventListeners.push({type: "HypeScenePrepareForDisplay", callback: HypeScenePrepareForDisplay});

    const HypeRulerHelper = {
        version: '1.0.3',
    };

    return HypeRulerHelper;
})();
