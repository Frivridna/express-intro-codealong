import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import data from './data.json'

//console.log(data.length) ---> 1390 st filmer

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/nominations', (req, res) => {
  res.json(data)
})

// 2 arguments: req (use to get some data / body etc.) + response object
app.get('/nominations', (req, res) => {
    res.json(data) //send the entire dataset of nominations
})

// : placeholder - same as react router
app.get('/year/:year', (req, res) => {
  const year = req.params.year
  //console.log({ year })
  const showWon = req.query.won // ----> access the query variables
  console.log(showWon)
  let nominationsFromYear = data.filter((item) => item.year_award === +year) //+ turn string into a number

  if (showWon) {
    nominationsFromYear = nominationsFromYear.filter((item) => item.win)
  }

  res.json(nominationsFromYear)
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
