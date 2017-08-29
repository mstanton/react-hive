# BrowserSync Routes

Need to make an ajax call to an external service but it doesn't exist yet?  Create a mock data source route within your project.  

### Create Route

* Within the `src/routes`, create a new folder with the name our your route
* Within your newly created route folder, create the following files: `index.js` and `data.json`
* The `data.json` file should contain a mock JSON object that reperesents the data you need to interact with.
* The `index.js` file `exports` an object to **HIVE** containing the `name` of the route you would like to create and the `handle` function that performs the actual routing.
