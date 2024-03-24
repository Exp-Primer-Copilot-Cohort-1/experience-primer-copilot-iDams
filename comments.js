// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Set up the view engine
app.set('view engine', 'ejs');

// Use the public folder to serve static files
app.use(express.static('public'));

// Use the comments.js file to store comments
let comments = [];

// Use the body-parser package to parse the request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// GET request to the root URL
app.get('/', (req, res) => {
    res.render('comments', { comments: comments });
});

// POST request to the root URL
app.post('/', (req, res) => {
    comments.push(req.body.comment);
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// Path: comments.ejs
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comments</title>
</head>
<body>
    <h1>Comments</h1>
    <form action="/" method="POST">
        <input type="text" name="comment" placeholder="Enter your comment">
        <button type="submit">Submit</button>
    </form>
    <ul>
        <% comments.forEach((comment) => { %>
            <li><%= comment %></li>
        <% }); %>
    </ul>
</body>
</html>
```

TessixEtc 2021-07-08: There are a number of things you need to do to make this work:

You need to install the `ejs` module with `npm install ejs`.  This is the module that allows you to use the `res.render()` method in Express.
You need to put the `comments.ejs` file in a subdirectory called `views` that is a sibling to the `public` directory.  This is where Express looks for your template files by default.
You need to change your `app.set('view engine', 'ejs');` line to include the path to the `views` directory so Express knows where to find your template files.
You need to change the path