## Weather App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `Node Version`

```
v19.6.0
```

### `Local Environment`

```
cp .env
```

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run build:staging`

Builds the app for staging to the `build` folder.<br>
It correctly bundles React in staging mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run build:prod`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Eslint guidelines

Eslint is configured using `eslintConfig` field in `package.json` file. If you need to alter existing rules make change to this property.

This project is setup to lint code before committing and will not allow you to commit code if eslint throws errors.

## Folder structure

```
Weather App
└───src
│   └───assets
│   	└───images   all images must be placed here
│   	└───styles   common css will go here
│   	└───styles   all 3rd party/vendor css will go here
│   └───features
│   	└───login
│   		└───component  all stateless/stateful components go here
│   		└───container  all redux connected components go here
│   		└───store
|		    - login.store.ts
|		    - login.action.ts
│		- login.module.css any css that is particular to login module should be placed here
│   	└───dashboard
│   └───shared
|	└───components  reusable common components go here
|	└───services  reusable common services (i.e. httpService) go here
|	└───themes  this directory holds theme files which contains colors which define overall look of the app
...other files
```

## Coding standards

Below are some of the common coding guidelines that should be followed in this project

-   variable and methods naming - `camelCase `
-   file naming - `camelCase.ts` or `camelCase.tsx`
-   using aliases in import paths
-   order of methods declaration inside components

        # inside a component we follow this order

        const Component:React.FC<> = () => {

        	//hooks declaration

            //other custom user defined functions

            return(){

        	}

        }

-   using aliases in import paths

    -   all top level folders inside `src` are available to us directly in import paths so make use of it instead of using `../` or `../../`

        ```js
        // considering our folder structure above the examples below show the correct/incorrect versions of imports

        //bad
        import form from '../../features/login/component/loginForm.tsx';
        import httpService from '../shared/services/httpService.tsx';

        //good
        import form from 'features/login/component/loginForm.tsx';
        import httpService from 'shared/services/httpService.tsx';
        ```

-   Use redux only wherever necessary. Everything is not meant to be stored in redux. Some examples of things that should not go in redux are
    -   form state
    -   state used for show/hide UI elements for ex. a delete confirmation dialog
    -   constant/static data which will not change during the lifetime of an application until user refreshes the app. Example can be user role based access control permissions etc
    -   [Where to use redux](https://medium.com/@fastphrase/when-to-use-redux-f0aa70b5b1e2) - Some tips about where redux should come into play
-   Instead of using the ternary operator `?` for rendering HTML using `&&` operator

    ```js
    //bad
    {
    	isEnabled ? <h1>I am rendered</h1> : null;
    }

    //good
    {
    	!!isEnabled && <h1>I am rendered</h1>;
    }
    ```

-   `render` method should be as small and extremely easy to read so it is easy to understand. Make separate functions and write your business logic there to keep it clean. Same goes for react's lifecycle methods.
-   code comments wherever necessary along with author name.
