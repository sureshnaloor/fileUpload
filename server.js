const express = require('express');
const fileUpload = require('express-fileupload');
// const cors = require('cors');

const app = express();

// middle ware
// app.use(express.static('public')); //to access the files in public folder
// app.use(cors()); // it enables all cors requests
app.use(fileUpload());

// upload end point
app.post('/upload', (req, res) => {
	if (!req.files) {
		return res.status(400).json({ msg: 'no file uploaded' });
	}

	const file = req.files.file;
	// console.log(file);
	file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
		console.log(err);
		res.status(500).send(err);
	});

	res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
});

app.listen(5000, () => console.log('server started'));
