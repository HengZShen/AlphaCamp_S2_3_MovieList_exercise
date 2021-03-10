const express = require('express')
const app = express()
const port = 3000

// Include movie data
const movieList = require('./movies.json')

// Include template engine
const exphbs = require('express-handlebars')


// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'mainHenry' }))
app.set('view engine', 'handlebars')

// static
app.use(express.static('public/staticFiles'))


// route setting
app.get('/', (req, res) => {
  res.render('index', { movie: movieList.results })
})

app.get('/movies/:movie_id', (req, res) => {
  const id = req.params.movie_id
  const movie = movieList.results.find(movie => movie.id.toString() === id)

  res.render('show', { movie })
})

app.get('/search/', (req, res) => {

  const keyword = req.query.keyword.toLowerCase().trim()
  const movies = movieList.results.filter(movie => movie.title.toLowerCase().includes(keyword))

  res.render('index', { movie: movies, keyword })
})

// start and listen server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})


