const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const saltrounds = 10;
const port = 3000
const data = require('./data.js');
const { render } = require('ejs');



app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  //console.log(data)
  //res.send('Welcome to our schedule website.')

  res.render('pages/index', {
    documentTitle: "Homepage",
    name: 'Samresh Pendkar',
    day: "Saturday",
    firstname: data.users[0].firstname,
    lastname: data.users[0].lastname,
    email: data.users[0].email,
    users: data.users
    // usersLength: data.users.length
  
  })

})

app.get('/users', (req, res) => {
    console.log(data.users)
  })

app.get('/schedules', (req, res) => {
    console.log(data.schedules)
  })
  
app.get('/test/', (req, res) => {
    res.send(users[i])
  })

app.get('/users/:id', (req,res) => {
    if(req.params.id > data.users.length)
    res.send("invalid ID")
    res.send(data.users[req.params.id])
})

app.get('/users/:id/schedules', (req,res) => {
    var output = []
    var j=0
    for(var i=0; i<data.schedules.length; i++) {
        if(data.schedules[i].user_id == req.params.id){
            output[j] = data.schedules[i]
            j++
        }
    }

    if(output.length > 0)
    res.send(output)
    else
    res.send('no schedules for the requested id: ' + req.params.id)
})

//step 4


app.post('/schedules', (req,res) => {
    data.schedules.push(req.body)
    console.log(data.schedules)
    res.send(req.body)
})

app.post('/users', (req,res) => {

  const plainTextPassword = req.body.password
  //console.log(plainTextPassword)

  const hash = bcrypt.hashSync(plainTextPassword,saltrounds);    //SYNC
  
    const userData = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash
    }
    //console.log(userData)
    res.send(userData)
    // console.log(err)
    // console.log(hash)
  

  // const hash = bcrypt.hashSync(plainTextPassword,saltrounds)  #SYNC
  // console.log(hash)

//  console.log(userData)
 
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})