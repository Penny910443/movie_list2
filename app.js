const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const movieList = require('./movieList.json')
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/movies/:id', (req, res) => {
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.id
  )
  res.render('show', { movie })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const movies = movieList.results.filter(movies => movies.title.toLowerCase().includes(keyword.toLowerCase())
  )
  res.render('index', { movies, keyword })
})

app.listen(port, () => {
  console.log(`This app is running on http://localhost:${port}`)
})