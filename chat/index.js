const cors = require('cors')
const express = require('express')
const fs = require('fs')
const multer = require('multer');

const bodyParser = require('body-parser')
let app = express()
let HOST = 3000
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/static', express.static('public'));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/') // здесь файлы будут сохраняться в папке 'uploads'
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname) // сохраняет файл с его оригинальным именем
    }
});
const upload = multer({ storage: storage }); 


app.post('/save-photo', upload.single('files'), (req, res) => {
    console.log(req.file)
    if (req.file) {
        res.json({info:'Файл загружен'});
    } else {
        res.send({info:'Файл загружен'});
    }
});

app.post('/create-or-choose-chat', (req, res) => {
   
    if(req.body){
        console.log(req.body)
        files = fs.readdirSync('./chatFiles')
        console.log(files)
        if (files.includes(req.body.chat + '.json')) {
            files.forEach((item) => {
                if (req.body.chat + '.json' === item) {
                    console.log(item)
                    fs.readFile(`./chatFiles/${item}`, 'utf-8', (err, data) => {
                        if (err) {
                            console.log(err)
                        } else {
                            let array = JSON.parse(data)
                            res.json({array:array})
                        }
                    })
    
                }
            })
    
        } else {
            let chatArray = JSON.stringify([])
            fs.writeFile(`./chatFiles/${req.body.chat}.json`, chatArray, 'utf-8', (err) => {
                if (err) {
                    console.log(err)
                } else {
                    res.json({text:`Chat ${req.body.chat} was created`})
                }
            })
        }
    }
    
})

app.post('/letter-sending', (req,res) => {
      if(req.body){
        console.log(req.body)
        let letter = req.body
        fs.readFile(`./chatFiles/${letter.chat}.json`, 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
            } else {
                let array = JSON.parse(data)
                if(array.length === 0){
                    letter.id = 1
                }else{
                    letter.id = array.length + 1
                }
    
                array.push(req.body)
                stringifyedArray = JSON.stringify(array)
                fs.writeFile(`./chatFiles/${letter.chat}.json`, stringifyedArray, 'utf-8', (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        res.json(array)
                    }
                })
            }
        })
      }
      
})

app.listen(HOST, () => {
    console.log(`http://localhost:${HOST}`)
})