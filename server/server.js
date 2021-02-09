const express = require('express')
const multer  = require('multer')
const path = require('path')
const cors = require('cors')
const app = express()
const PORT = 5501

app.use(express.json())
app.use(cors())


/**
 * @param {Request} req
 * @param {Response} res
 */


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '.', 'uploads'))
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
          }
    })
})

app.post('/images', upload.single("images"), (req, res) => {


    try {

        return res.send('ok')
        
    } catch (error) {

        console.log(error)
        return res.send('An error ocurred')    
    }
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))


