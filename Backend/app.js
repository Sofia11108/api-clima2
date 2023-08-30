var express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express()
    .use(cors({
        credentials: true, origin: 'https://api-clima-proy.netlify.app'
    }))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

app.listen(10101, function () {
    console.log('Example app listening on port 10101!');
});

app.get('', (req, res)=> {
    res.send("hola desde el back")
})

app.post('/login', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;

    let token = "askldjaei12y31b2nasd68asdasjdh1ui2y312372jbd2312dasd";

    if (email === "test@gmail.com" && password === "12345") {
        return res.status(200).json({ "Status": "ok", "token": token });
    }

    return res.status(400).json({ "Status": "error" });
});