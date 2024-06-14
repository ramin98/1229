const express = require('express');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'public/')
    },
    filename:function(req,file,cb){
        let date = new Date()
        cb(null, date.getTime().toString() + '.' + file.mimetype.split('/')[1])
    }
})

let upload = multer({storage: storage})
const bodyParser = require('body-parser');

const app = express();

// Обслуживание статических файлов из каталога 'public'
app.use('/static',express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))

app.get('/search', (req, res) => {
    console.log(req.query.position)
    res.send(req.query.position)
})

app.post('/upload-file', upload.single('my-file'), (req, res) => {
    console.log(req.file)
    //  fs.writeFile(`./public/${req.file.originalname}`,
    //  req.file.buffer.toString('base64'),
    //  'base64', 
    //  (err) => {
    //     if(err){
    //         console.log(err)
    //     }
    //  })
    res.send(req.file)
})

app.post('/submit', (req, res) => {
    const username = req.body.username; // предположим, у вас в форме было поле с именем 'username'
    res.send(`Привет, ${username}!`);
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
