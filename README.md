# Page reloads counter

The main idea of creating this extension for Chrome is to count how many times localhost gets reloaded during development.

It uses `window.perfromance` API to collect data not only for localhost but for all domains which gets reloaded while surfing Internet.

## Thanks
This project was created with help of [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)

------------
Samuel Simões ~ [@samuelsimoes](https://twitter.com/samuelsimoes) ~ [Blog](http://blog.samuelsimoes.com/)

## Developing
_I'll assume that you already read the [Webpack docs](https://webpack.github.io/docs) and the [Chrome Extension](https://developer.chrome.com/extensions/getstarted) docs._

1. Check if your Node.js version is >= 6.
2. Clone the repository.
3. Install [yarn](https://yarnpkg.com/lang/en/docs/install/).
4. Run `yarn`.
5. Change the package's name and description on `package.json`.
6. Change the name of your extension on `src/manifest.json`.
7. Run `npm run start`
8. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.
8. Have fun.

You can run the dev mode on other port if you want. Just specify the env var `port` like this:

```
$ PORT=6002 yarn run start
```

## Packing
After the development of your extension run the command

```
$ NODE_ENV=production npm run build
```
Now, the content of `build` folder will be the extension ready to be submitted to the Chrome Web Store. Just take a look at the [official guide](https://developer.chrome.com/webstore/publish) to more infos about publishing.

## Secrets
If you are developing an extension that talks with some API you probably are using different keys for testing and production. Is a good practice you not commit your secret keys and expose to anyone that have access to the repository.

To this task this boilerplate import the file `./secrets.<THE-NODE_ENV>.js` on your modules through the module named as `secrets`, so you can do things like this:

_./secrets.development.js_

```js
export default { key: "123" };
```

_./src/popup.js_

```js
import secrets from "secrets";
ApiCall({ key: secrets.key });
```
:point_right: The files with name `secrets.*.js` already are ignored on the repository.