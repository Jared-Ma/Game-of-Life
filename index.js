const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))