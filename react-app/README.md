# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run dev:link`

Link development dependencies like an updated copy of romcal.

If your `romcal-examples` checkout is a sibling to romcal, stored at...
- `romcal-examples`
- `romcal`
then this will work for you by default.

If you store your `romcal` checkout in a different folder, like `lib`, as an example, you'd need to run:
```shell
ROMCAL_ALIAS=lib npm run dev:link
```

So the name you provide to the `ROMCAL_ALIAS` environment var needs to be what it's called in relation to the parent folder of `romcal-examples`.

### More fun testing bits

If you run the app with `VITE_DAY_VARIANT` set to `developer` or `simple`, the app will appear differently.

`developer` gives additional information about the date and the liturgical day.

`simple` gives the standard, compact view of the day.

```bash
$ VITE_DAY_VARIANT=developer npm start
```

```bash
$ VITE_DAY_VARIANT=simple npm start
```

### Changing ports

You can specify the port this is deployed on by setting `ROMCAL_APP_PORT` in your environment, such as `ROMCAL_APP_PORT=8080 npm start`.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
