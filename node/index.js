// Simple HTTP server to handle few req & responses
const fs = require("fs");
const path = require("path");
const http = require("http");
const EventEmitter = require("events");

const filePath = path.join(__dirname, "dataserver.json");

const server = http.createServer();
const handleRequests = new EventEmitter(); // creating a event emitter instance for "handleRequests"

handleRequests.on("GET:articles", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Error NO ENTry
        fs.writeFile(
          filePath,
          JSON.stringify({
            articles: [],
          }),
          (err) => {
            if (err) {
              console.log(err);
              res.statusCode = 500;
              res.end(JSON.stringify(err));
            } else {
              res.write(JSON.stringify([]));
              res.end();
            }
          }
        );
      } else {
        console.log(err);
        res.statusCode = 500;
        res.end(JSON.stringify(err));
      }
    } else {
      const result = JSON.parse(data);
      res.write(JSON.stringify(result));
      res.end();
    }
  });
});

// registering a custom event using handleRequests eventEmitter Instance
handleRequests.on("POST:articles", (req, res) => {
  const dataFromJsonFile = fs.readFileSync(filePath, "utf8");
  const fileData = JSON.parse(dataFromJsonFile);
  let reqData = {};
  req.on("data", (body) => {
    reqData = JSON.parse(body.toString());
  });

  // this will get triggered once the request is over - we read all the req data
  req.on("end", () => {
    if (Array.isArray(fileData)) {
      fileData.push(reqData);
      fs.writeFile(filePath, JSON.stringify(fileData), (err) => {
        if (err) {
          res.statusCode = 500;
          res.end();
        } else {
          res.write(
            JSON.stringify({
              status: "success",
              message: "Article added successfully",
            })
          );
          res.end();
        }
      });
    }
  });
});

handleRequests.on("GetArticle", (req, res) => {
  console.log(req.url);
  const current_url = new URL(`http://localhost:6000/${req.url}`);
  const search_parameter = current_url.searchParams;
  const id = search_parameter.get("id");
  if (search_parameter.has("id")) {
    data = fs.readFileSync(filePath, "utf8");
    const json_data = JSON.parse(data);
    const article = json_data.articles.filter((X) => X.id == id);
    console.log(article);
    if (article == "") {
      res.statusCode = 404;
      res.write("Requested id is not found");
      res.end();
    } else {
      res.write(JSON.stringify(article));
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.write("Requested id is not found");
    res.end();
  }
});

handleRequests.on("deleteArticle", (req, res) => {
  console.log(req.url);
  const current_url = new URL(`http://localhost:6000/${req.url}`);
  const search_parameter = current_url.searchParams;
  if (search_parameter.has(id)) {
    const id = search_parameter.get("id");
    fs.readFile(filePath, "utf8", (err, data) => {
      const json_data = JSON.parse(data);
      const deleteData = json_data.filter((X) => X.id != id);
      if (deleteData == "") {
        res.statusCode = 404;
        console.log(err);
        res.write("Requested id cannot be deleted");
      } else {
        res.write(
          JSON.stringify({
            status: "success",
            message: "Article added successfully",
          })
        );
        res.end();
      }
    });
  }
});

// using a pre-defined event "request" from server instance (internally uses event-emitter)
server.on("request", (req, res) => {
  let comp_url = `${req.method}:${req.url}`;
  if (req.url.includes("/deleteArticle?id")) {
    console.log("DELETE API");
    handleRequests.emit("deleteArticle", req, res);
  } else if (req.url.includes("/GetArticle?id")) {
    console.log("Get one article API");
    handleRequests.emit("GetArticle", req, res);
  } else if (comp_url === "GET:/articles") {
    console.log("articles GET API");
    handleRequests.emit("GET:articles", req, res);
  } else if (comp_url === "POST:/articles") {
    console.log("articles POST API");
    handleRequests.emit("POST:articles", req, res);
  } else {
    res.statusCode = 404;
    res.end("<h1>Page Not Found: 404</h1>");
  }
});

server.listen(6000, () => {
  console.log("Server is running on port 6000");
});
