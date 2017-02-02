var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var article = {
    one: {
        title: 'Article One | Yogeshwar Bala',
        heading: 'Article One',
        date: 'Jan 1, 2017',
        content: `  
                <p>
                    The content of my first article.
                </p>`
    },
    two: {
        title: 'Article Two | Yogeshwar Bala',
        heading: 'Article Two',
        date: 'Jan 2, 2017',
        content: `  
                <p>
                    The content of my second article.
                </p>`
    },
    three: {
        title: 'Article Three | Yogeshwar Bala',
        heading: 'Article Three',
        date: 'Jan 3, 2017',
        content: `  
                <p>
                    The content of my third article.
                </p>`
    }
};

function createTemplate (obj) {
    var title = obj.title;
    var heading = obj.heading;
    var date = obj.date;
    var content = obj.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>Home</a>
                </div>
                <br/>
                <h3>
                    ${heading}
                </h3>
                <div>${date}</div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:aName', function (req, res) {
    var aName = req.params.aName;
  res.send(createTemplate(article[aName]));    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
