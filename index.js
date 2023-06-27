const express = require('express')

const fileUpload = require('express-fileupload')

const fs = require('fs')
const path = require('path')

const app = express()


app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'files')))
app.post('/upload',(req,res) => {
    let EDFile = req.files.archivo
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
        return res.status(200).send({
            message : 'Archivo creado con éxito',
            file: EDFile.name
        })

    })
})
app.get('/', (req, res)=>{
    //fs.writeFileSync(path.join(__dirname, './files' + 'texto-prueba'), 'String.pdf')
    const file = fs.readdirSync(path.join(__dirname, './files'))
    //const file = fs.readFileSync(path.join('./files/pie.png'))
    return res.json({
        message: 'Helloworld'
    })
})

app.listen(3000,() => console.log('Corriendo'))