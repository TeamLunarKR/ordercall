const express = require('express')
const app = express();
const port = 80

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/html/home.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname+'/public/html/register.html')
})

app.get('/verify', (req, res) => {
    res.sendFile(__dirname+'/public/html/mailverify.html')
})

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`서버가 시작되었습니다. \nhttp://localhost:${port}`)
})