const express = require('express');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');
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
})
.catch((err)=>{
  console.log(`connection error: ${err.message}`);
  process.exit();
});


//Routes

app.get('/', (req, res) => {
  req.json({message:"Welcome to my API", status:200, message_type:"success"})
})

// require('./routes/admin.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const newAdmin = new db.user({
  firstName: "dishant",
  lastName: "patil",
  email: "patildishant@gmail.com",
  password: bcrypt.hashSync("sp2114", 8),
  profilePic: "",
  roles: "moderator",
});

newAdmin.save(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("New admin saved to database.");
  }
});
