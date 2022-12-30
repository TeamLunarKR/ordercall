const express = require('express')
const app = express();
const port = 80

// CLIENT PAGE CODES
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/html/home.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname+'/public/html/register.html')
})

app.get('/verify', (req, res) => {
    res.sendFile(__dirname+'/public/html/mailverify.html')
})

// API PAGE CODES 

// CPW == Check PassWord
// url 예제 -> 주소/api/cpw?id=userid&pw=userpw
app.get('/api/cpw', (req, res) => {
    var spawn = require('child_process').spawn;
    const result = spawn('py', ['./python-files/cpu.py', req.query.id, req.query.pw]);
    result.stdout.on('data', function(data) {
        console.log(data.toString())
        res.set('Content-Type', 'text/html');
        res.send(data.toString())
    })
})

// CRU == CReate User
app.get('/api/cru', (req, res) => {
    var spawn = require('child_process').spawn;
    const result = spawn('py', ['./python-files/cru.py', req.query.id, req.query.pw, req.query.email]);
    result.stdout.on('data', function(data) {
        console.log(data.toString())
        res.set('Content-Type', 'text/html');
        res.send(data.toString())
    })
})

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`서버가 시작되었습니다. \nhttp://localhost:${port}`)
})