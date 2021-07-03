import express from "express";
import path from "path";
import Axios from "axios";
import {stringify} from "querystring";
const app = express();
const port = 8080;

// define a route handler for the default home page
app.get( "*", ( req, res) => {
    res.sendFile(path.join(__dirname,'build/index.html'));
});

// define a responder for get requests
app.get("/api", (req, res) => {
    const myUrl = req.query.url.toString();
    // tslint:disable-next-line:no-console
    console.log(`current url is ${myUrl}`)
    Axios({
        method:"get",
        url: myUrl,
        responseType:"stream"
    }).then((response) => {
        response.data.pipe(res);
    })
})

// start the Express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${ port }`);
});


