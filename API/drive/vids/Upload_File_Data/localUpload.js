const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const cors = require('cors')

const port = 3000;

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(cors())
console.log(__dirname)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('trying to do something')
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        console.log('trying to do something')
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {

    cb(null, true);
    // if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    //     cb(null, true);
    // } else {
    //     cb(null, false);
    // }
}
const upload = multer({ storage, fileFilter });

//Upload route
app.post('/upload', upload.single('image'), (req, res, next) => {
    // console.log(req)
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));