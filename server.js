const express = require('express')
const fs = require('fs')
const multer = require('multer')

// the other resource routes
const app = express()
const upload = multer({ dest: 'images/' })



app.use(express.static("build"))

app.get('/api/images', async (req, res)=> {
    const result = await db.getImages()
    res.send(result)
  })

app.post('/api/images', upload.single('image'), async(req, res) => {
  const imageName = req.file.filename
  const description = req.body.description

  // Save this data to a database probably

 const result = await db.addImage(imageName,description)
  res.send(result)
})

// app.use('/images', express.static('images'))
app.get('/images/:imageName', (req, res) => {
    // do a bunch of if statements to make sure the user is 
    // authorized to view this image, then
  
    const imageName = req.params.imageName
    const readStream = fs.createReadStream(`images/${imageName}`)
    readStream.pipe(res)
  })

 
app.listen(8080, () => console.log("listening on port 8080"))