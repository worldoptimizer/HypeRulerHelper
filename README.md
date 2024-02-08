# HypeRulerHelper

## Overview

`HypeRulerHelper` is an advanced JavaScript utility for Tumult Hype projects, offering a comprehensive suite of tools for precision design and alignment within Hype scenes. It enhances the development experience by providing a dynamic, high-resolution ruler, complete with customizable markers and labels, facilitating exact measurements and element placement.

## Features

- **Dynamic Scaling**: Adapts in real-time to the Hype element's dimensions, ensuring accuracy across various screen sizes and orientations.
- **High-Resolution Support**: Crisp, clear ruler markings and labels on Retina and other high DPI screens for precision design work.
- **Customizable Markers**: Place and manage markers with optional labels at specific points on the ruler to denote important measurements or alignment guides. Markers can be styled with custom colors for clear differentiation.
- **Scene-Specific Markers**: In addition to global markers, scene-specific markers can be added, which automatically reset when navigating between scenes, allowing for scene-tailored guidelines.
- **Responsive and Reactive**: Seamlessly updates to reflect changes in the Hype document's layout, maintaining accuracy during dynamic content adjustments.
- **Marker Management**: Offers functions to add, remove, and reset markers, providing full control over the measurement aids displayed on the ruler.

## Installation

1. **Acquire the Script**: Download `HypeRulerHelper.js` from this repository or clone the entire repository for the latest version.
2. **Integrate with Hype**: In your Hype project, go to the 'Resources' panel, click '+', and select 'Add File...' to include `HypeRulerHelper.js`.
3. **Script Activation**: Make sure the script is loaded by including it in your Hype document's head HTML section.

## Usage Instructions

Upon including `HypeRulerHelper.js` in your project, a ruler will automatically appear along the left edge of your Hype scene. It dynamically adjusts its length based on the scene's height and responds to layout changes in real-time.

### Marker Functions

- **Add Document Marker**: `hypeDocument.addMarker(position, label, color)` - Creates a persistent marker across all scenes. Optionally specify a label and color.
- **Add Scene Marker**: `hypeDocument.addSceneMarker(position, label, color)` - Creates a temporary marker for the current scene only, with optional label and color.
- **Remove Marker**: `hypeDocument.removeMarker(label)` - Removes a marker based on its label.
- **Reset Markers**: `hypeDocument.resetMarkers()` - Clears all markers from the document and current scene.

### Customizing the Ruler

Advanced users can modify `HypeRulerHelper.js` for further customization, such as altering the ruler's positioning, style, or functionality to better suit specific project needs.

## Browser Compatibility

Designed to work seamlessly across modern web browsers, `HypeRulerHelper` is optimized for Tumult Hype and leverages web standards for broad compatibility.

## Contributions

We welcome contributions! For enhancements or modifications, please fork this repository, apply your changes, and submit a pull request. For significant changes, kindly open an issue first to discuss your ideas.

## License

`HypeRulerHelper` is distributed under the MIT License. See the LICENSE file for more details.
