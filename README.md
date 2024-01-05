# HypeRulerHelper

## Overview

`HypeRulerHelper` is a JavaScript utility designed for use with [Tumult Hype](https://tumult.com/hype/). It provides a visual ruler on the screen to assist developers and designers in measuring and aligning elements within Hype scenes. The ruler is dynamically adjusted to the height of the element it's attached to and supports high-resolution displays, like Retina screens.

## Features

- **Dynamic Measurement**: Automatically adjusts to the height of the associated Hype element.
- **High DPI Support**: Optimized for high-resolution displays, ensuring clear and sharp ruler markings.
- **Scene-Aware**: Refreshes when navigating between different Hype scenes.
- **Responsive Design**: Updates in real-time to changes in element dimensions.

## Installation

1. **Download the Script**
   - Clone this repository or download the `HypeRulerHelper.js` file.

2. **Include the Script in Your Hype Project**
   - Open your Hype project.
   - Go to the 'Resources' panel.
   - Click the '+' button and choose 'Add File...' to add `HypeRulerHelper.js`.

3. **Initialization**
   - Ensure the script is loaded by adding it to the head HTML of your Hype document.

## Usage

`HypeRulerHelper` automatically initializes a ruler on the left side of the screen. It attaches to the Hype scene element and dynamically adjusts its size based on the element's height. 

### Basic Usage
Simply including the script in your Hype project as described in the installation steps is enough to get started. `HypeRulerHelper` does not require any additional initialization.

### Advanced Customization
For advanced users looking to customize the ruler (e.g., change its position or style), modifications can be made directly in the `HypeRulerHelper.js` file.

## Compatibility

`HypeRulerHelper` is compatible with most modern browsers and has been specifically designed for use with Tumult Hype.

## Contributing

Contributions to `HypeRulerHelper` are welcome. Please feel free to fork the repository, make changes, and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

`HypeRulerHelper` is MIT licensed, as found in the LICENSE file.
