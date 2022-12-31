const express = require('express')
const session = require('express-session')
const nodemailer = require('nodemailer')
const fileStore = require('session-file-store')(session); 
require('dotenv').config();
const app = express();
app.use(session({
    secret: 'secret key',	// 암호화
    resave: false,	
    saveUninitialized: true,	
    cookie: {	
      httpOnly: true,
    },
    store: new fileStore() // 세션 객체에 세션스토어를 적용
  }));
const port = 80

// CLIENT PAGE CODES
app.get('/', (req, res) => {
    if(req.session.is_logined){
        res.send('logined')
    }
    else{
        res.send('not logined')
    }
    
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname+'/public/html/register.html')
})

app.get('/verify', (req, res) => {
    email = req.query.email;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: { // 이메일을 보낼 계정 데이터 입력
          user: process.env.EMAIL_AUTHOR,
          pass: process.env.EMAIL_PW,
        }
    });
    var spawn = require('child_process').spawn;
    const result = spawn('py', ['./python-files/gtk.py', email]);
    token = ""
    result.stdout.on('data', function(data) {
        token = data;
        const emailOptions = { // 옵션값 설정
            from: process.EMAIL_AUTHOR,
            to: email,
            subject: '오더콜 서비스 인증 이메일입니다.',
            html: '이메일 인증을 위해서는 아래의 URL을 클릭하여 주세요. '
                + `http://localhost/emailverify?token=` + token
        };
        transporter.sendMail(emailOptions); //전송
    })
    res.sendFile(__dirname+'/public/html/mailverify.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname+'/public/html/login.html')
})



app.get('/emailverify', (req,res) => {
    tk = req.query.token;
    var spawn = require('child_process').spawn;
    const result = spawn('py', ['./python-files/vem.py', tk]);
    result.stdout.on('data', function(data) {
        if(data == 1){
            res.send('Verify Successful')
        }
        else{
            res.send('Verify Failed')
        }
    })
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
        res.set('Content-Type', 'text/html');
        res.send(data.toString())
    })
})

app.get('/api/login', (req,res) => {
    var uid = req.query.id;
    var upw = req.query.pw;

    var spawn = require('child_process').spawn;
    const result = spawn('py', ['./python-files/cpw.py', uid, upw]);
    result.stdout.on('data', function(data) {
        console.log(1)
        if(data){
            req.session.is_logined=1;
            res.send('1')
        }
        else{
            res.send('0')
        }
    })
}
)

app.get('/api/logout', (req,res) => {
    if(req.session.is_logined){
        req.session.is_logined=0
    }
})

app.get((req, res) => {
    res.status(404).send('not found')
})


app.use(express.static('public'));

app.listen(port, () => {
    console.log(`서버가 시작되었습니다. \nhttp://localhost:${port}`)
})