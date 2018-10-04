// server.js
// where your node app starts

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MLAB_URI || 'mongodb://localhost/exercise-track' )


const schema = mongoose.Schema;

const exerschema = new schema(
 {
    'Name':String,
   'score':String
})


const user =  mongoose.model('user',exerschema);


app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('views'));
app.use(express.static('node_modules/p5/lib'));
app.use(express.static('node_modules/p5/lib/addons'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});



app.post('/api',function(req,res,next){
  var name = req.body.username
  var score = req.body.score
  console.log(req.body)
  user.find({'Name':name},function(err,docs){
     if (err){
       console.log(err.message)
     }else{
       console.log(docs)
      if (docs.length!=0){
        res.json({'err':"Username is taken!"})
      }else{
        console.log("User successfully created!")
        var newu = new user({'Name':name,'score':score});
        newu.save(function(err){
          if (err){
            console.log(err.message)
          }else{
            user.find().sort({'score':1}).exec(function(err,docs){
          if (err){
            console.log(err.message)
          }else{
            //show ranking result for top 5 player
            res.redirect('/')
          }
        })
          }
        });
        //res.json 
      }
    }
  })
})

app.get("/api/rank/result",function(req,res,err){
  user.find().sort({'score':1}).exec(function(err,docs){
          if (err){
            console.log(err.message)
          }else{
            //show ranking result for top 5 player
            res.send(docs);
          }
        })
          
})

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt').send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})


