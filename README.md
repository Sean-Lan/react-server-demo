# React Server Example

A demo for server side rendering with [React Server](https://github.com/redfin/react-server). The page includes three parts: head, body and footer, and each has its own color. The server will send each part when its data is ready and make it interactive in the frontend.

## Start

	npm install
	
	npm start

## Structure

### pages/HomePage.js
Fetch the initial data and send each part to the client when its data is ready.

### apis/ColorAPI.js
Randomly return a color after specified delay according to the part name.

### components
All essential components.

## License

No license, you can use it anywhere you like.

