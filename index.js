// Week 02

// Use HTTP Package (shared code) from node.js
const myhttp = require("http");

//load the core mode filesystem (fs) module, using js promises instead of callbacks
const fs = require("fs").promises;

//create a function ro respond to http requests
const requestListener = function( myrequest, myresponse ){
    console.log( myrequest.url );

        if (myrequest.url === '/hey') {
            //check request url, if root, return html file
            fs.readFile(__dirname + "/page.html")
                .then(
                    //function(contents {...}
                    contents => {
                        //set https response header entry
                        myresponse.setHeader("Content-Type", "text/html; charset=UTF-8");
                        //return 200 OK http status code
                        myresponse.writeHEad(200);
                        // send back file contents + close response
                        myresponse.end(contents);
                    }
                );
        } else {
            // if request url not root, return json file
            fs.readFile(__dirname + "/data.json")
                .then(
                    contents => {
                        //set https response header entry
                        myresponse.setHeader("Content-Type", "application/json; charset=UTF-8");
                        //return 200 OK http status code
                        myresponse.writeHEad(200);
                        // send back file contents + close response
                        myresponse.end(contents);
                    }
                )
        }
    }



// use http package createServer()
// command that runs a web server for me !!!
// It will deal with all the low-level request and response activity that a web server negotiates when a browser asks for a file or URL

let myserver = myhttp.createServer(
    // createServer() uses our function to run when a request comes in
    requestListener
);

// ask http to start listening on a tcp port for incoming http receipts
// listen() takes 2 arguments: 1: tcp port #, string of the ip address to listen (0.0.0.0)
myserver.listen( 5500, "127.0.0.1");
