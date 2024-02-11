# E-Z Paste

E-Z Paste is an Visual Studio Code extension made for https://e-z.host/ It allows you to upload your entire file or selected code to a paste.

## Features

* Custom description support
* Ability to upload entire file or a highlighted portion
* Automatic language marking

## Extension Settings

* `e-z-paste.apiKey`: Your E-Z host api key. This can be found by going to your account on the dashboard.
* `e-z-paste.description`: A custom upload description, this appears below the file's title.
* `e-z-paste.priority`: Adjusts the location of the upload button.
* `e-z-paste.side`: right/left/disabled - Changes the location of the upload button or disables it entirely.

## Usage

* Simply press the upload button that appears at the bottom, configurable in the settings. (Option 1)
* Click `CTRL + SHIFT + P` and choose `E-Z Paste: Create Paste`. (Option 2)
* To upload only a certain part of your code, simply highlight it with your cursor. Otherwise, click the button to have your whole document uploaded.
* Upon being uploaded, you will receive a notification in the bottom right. The link will be automatically copied to your clipboard for easy sharing.

## Known Issues

None, if you encounter any open an issue on the github repo.

## Release Notes

### 1.0.2
Fixed issue with buttons 

### 1.0.1
Added extension image

### 1.0.0

Initial release of E-Z Paste
