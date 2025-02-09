# Instagram Stories App Assignment

## Owner - Nikhil Katiyar

### Assignment Details

1. PR LINK -> "https://github.com/nikhil-katiyar/Nikhil-Katiyar-instagram-stories-assignment/pull/1"

2. Deployed Code link -> "https://instagram-stories-assignment-nikhil-katiyars-projects.vercel.app/"

### Tech stack -

- React
- TypeScript

### Important Points

- Have created the boilerplate setup of project using Vite (https://vite.dev/guide/)

- All data is static and stored within the repo and is fetched from vite dev server in development mode

- Features

  - Preload of assets on home page for first load
  - Swipe and click gestures
  - Story viewed/ not viewed UI
  - Story Progress bar
  - Auto change of story on completion of progress bar
  - Multiple stories viewing capability and multiple progress bar completion based on number of stories

- <b>For performance -> </b> I have implemented preloading of assets(images) on home page because otherwise they were taking a very long time to load from server when opening any story
- A loader is added for stories when clicking on them, if preload is not finished.

- Have build the gestures from code. No external library used

### Running app on local

```js

1. git clone git@github.com:nikhil-katiyar/Nikhil-Katiyar-instagram-stories-assignment.git
2. npm install (node v20+)
3. npm run dev
4. Navigate to "http://localhost:5173/"

// For prod build with typescript checking
1. npm run build
2. Navigate to "http://localhost:4173/"

// For prod build without typescript checking
1. npm run build:app
2. Navigate to "http://localhost:4173/"

// Preview the prod build
1. npm run preview
(This step will both build and preview the app)

```

### Deployment Steps

1. Have deployed the project using vercel
2. Link of Documentation-> https://vercel.com/docs/deployments/git
