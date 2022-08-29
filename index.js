const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')

const PORT = process.env.PORT | 8080
const dbconnect = require('./configs/DbConnection');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors());

dbconnect();

app.use('/api/auth', require('./routes/Auth.routes'));

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(PORT, () => console.log(`Surver app listening on port ${PORT}!`))