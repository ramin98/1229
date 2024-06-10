const fs = require('fs')
const http = require('http')


// function myFilter(arr, callback) {
//     let newArray = []
//     for (let index = 0; index < arr.length; index++) {
//         const element = arr[index];
//         if(callback(element)){
//             newArray.push(element)
//         }
//     }
    
//     return newArray
// }
// let arr = [1,2,3,4]

// let filteredArray = myFilter(arr, (item) => item > 2)
// console.log(filteredArray)


// let filtered = arr.filter((item) => item > 4)

// let data = fs.readFileSync('text.txt')
// console.log(data.toString())
// fs.readFile('tex.txt', (err, data) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log(data.toString())
//     }
// })

// let stream = fs.createReadStream('tex.txt', 'utf-8')

// stream.on('data', (data) => {
//     console.log('ACCEPT')
//     console.log(data)
// })

// stream.on('end', () => {
//     console.log('END')
// })

// stream.on('error', (err) => {
//     console.log(err)
// })

const server = http.createServer()

server.on('request', (req,res) => {
    res.end('HELLO')
})

server.listen(3000, (err) => {
    if(err){
        console.log(err)
    }else{
        console.log(3000)
    }
})

