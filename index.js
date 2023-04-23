const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models');
const Role = require('./models/role.model');
// const ROLE = db.role;

// const dbConfig = require('./config/db.config');
const PORT = process.env.PORT || 8080;
const CONNECTION_URL = 
"mongodb+srv://Hemanth1:12345@users.nfj0nqa.mongodb.net/?retryWrites=true&w=majority"
var corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

db.mongoose
.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  console.log('MongoDB Connected');
  app.listen(PORT, () => {
    console.log("BE started on port " + PORT);
  });
  initial();
})
.catch((err)=>{
  console.log(`connection error: ${err.message}`);
  process.exit();
});


//Routes

app.get('/', (req, res) => {
  req.json({message:"Welcome to my API", status:200, message_type:"success"})
})

require('./routes/admin.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);


//creating all roles

const  initial= async() => {
  try{
    const count = await Role.estimatedDocumentCount();
    if(count === 0){
      await Promise.all([
      new Role({name:"admin"}).save(),
      new Role({name:"user"}).save(),
      new Role({name:"moderator"}).save(),
      ]);
      console.log('Roles Created');
  } 
  } catch(err){
    console.error('Error in creating roles', err);
  }
}