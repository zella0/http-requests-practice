const fs = require('fs');
const http = require('http');
const port = process.env.PORT || 8001;

let acc = 0;

let server = http.createServer(function(req, res) {
  // challenge 4
  if (req.method === "POST" & req.url === '/count') {
    res.setHeader('Content-type', 'application/x-www-form-urlencoded');
    res.end(acc.toString());
    acc++;

    // challenge 5
  } else if (req.method === "GET" & req.url === "/getcount") {
    res.setHeader('Content-type', 'text/plain');
    res.end(acc.toString());

    // challenge 6
  } else if (req.method === "GET" & req.url === "/index") {
    fs.readFile("./static/index.html", (err, data) => {
      if (err) throw err;
      res.setHeader('Content-type', 'text/html');
      res.write(data);
      res.end();
    })

    // challenge 7
  } else if (req.method === "GET" & req.url === "/dynamic") {
    fs.readFile("./dynamic/index.html", 'utf-8', (err, data) => {
      if (err) throw err;
      let dataObj = {
        count: acc,
        name: "troy",
        age: 20,
        pet: "dog"
      }
      res.setHeader('Content-type', 'text/html');
      res.write(update(data, dataObj));
      res.end();
    })

    // challenge 1
  } else if (req.method === "GET" & req.url === "/intro") {
    res.setHeader('Content-type', 'text/plain');
    res.end('Welcome to backend!');

    // challenge 2
  } else if (req.method === "GET" & req.url === "/pets") {
    let pets = [{
        animalClass: "Chicken",
        name: "Chicko"
      },
      {
        animalClass: "Dog",
        name: "Poggo"
      },
      {
        animalClass: "Boar",
        name: "Huffer"
      }
    ];
    let petsData = JSON.stringify(pets);
    res.setHeader("Content-Type", 'application/json');
    res.end(petsData);

    // challenge 3
  } else if (req.method === "GET" & req.url === "/getinfo") {
    fs.readFile('./static/info.txt', (err, data) => {
      if (err) throw err;
      res.setHeader('Content-Type', 'text/plain');
      res.end(data);
    })
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world');
  }
});


server.listen(port, function() {
  console.log('Listening on port', port);
});


function update(str, obj) {
  let bracketIndex = str.match('{{');
  if (bracketIndex === null) {
    return str;
  }
  let strBegin = bracketIndex.index + 2;
  let strEnd = strBegin;
  while (str[strEnd] !== '}') {
    strEnd++;
  }
  let bracketContent = str.substring(strBegin, strEnd);

  return str.slice(0, strBegin - 2) + obj[bracketContent] + update(str.slice(strEnd + 2), obj);
}
