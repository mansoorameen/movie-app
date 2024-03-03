APK file is inside the APK folder

# Setup instructions

Run ```yarn``` or ```npm install```

## Step 1: Start the Metro Server

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application


### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

# Design explanations
App.js file inside the src folder has the navigation and redux setup

- MovieListScreen is loaded first which fetches movies from tmdb(public movie database).
Seearch box option automatically searches as the user enters the movie keywords(using debounce method here so that search api call is made only when user stops typing for 500ms.
This helps in avoids unnecessary multiple calls for each entry.

Reload button on the right would reload the page. In case movie fetch api fails an alert will be shown informing the user, and user can reload the page using this button.
Sort A-Z button would sort the movie list alphabetically using their title.

Movie list is rendered here, and at the end pagination is given to go to next and previous pages.

On pressing on any of the movie tile, the selected movie data is stored in redux and navigates to MovieDetailScreen, where data from redux is displayed
