# migratory-skeleton-app

Use [React Redux](https://react-redux.js.org/) to preserve application's UI state.

- Frontend - [Next.js](https://nextjs.org/) + [React.js](https://reactjs.org/) + [Material-UI](https://material-ui.com/)

## Usage
``` bash
$ git clone https://github.com/teamellipsis/migratory-skeleton-app
$ cd migratory-skeleton-app

# Or clone to different directory name
$ git clone https://github.com/teamellipsis/migratory-skeleton-app <your-project-name>
$ cd <your-project-name>
```
Change remote
``` bash
# Remove current origin
$ git remote remove origin
# Add your project repository as origin
$ git remote add origin <your-project-repo-link>
# Check origin
$ git remote -v
```
Run development
``` bash
$ npm install
$ npm run dev-server
# Open in browser http://localhost:3000
```
``` bash
# If port 3000 busy(Address already in use) run in different port as below
# On UNIX
$ PORT=3001 npm run dev-server
# On Windows
$ set PORT=3001 && npm run dev-server
```
Run production
``` bash
$ npm run build
# On UNIX
$ npm run server
# On Windows
$ npm run server-win
```

## Build
```bash
# Without specifing app name. This will use package.json -> name as the app name.
$ npm run release
# Or specify app name as first argument.
$ npm run release -- "App Name"
```
Build file will put into `build` directory.
