const express = require('express');
const cors = require('cors');

const connectToMongo = require('./db');
const authRoutes = require('./routes/authRoutes')
const userVerification = require('./middlewares/authMiddleware');


const app = express();

// Middlewares
app.use(express.json()); 
app.use(cors());


// connect to database
connectToMongo();


// Routes
app.use('/api/auth', authRoutes);
app.get('/api/getuser', userVerification ,(req, res)=> {
    res.json({success:true, username:req.user.username})
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running on the PORT', PORT);
})