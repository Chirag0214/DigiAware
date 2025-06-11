const express = require('express');
const cors = require('cors');
const UserRouter = require('./routers/userRouter');
const AdminRouter = require('./routers/adminRouter')
const ExpertRouter = require('./routers/expertRouter')
const app = express();

const PORT =5000;

app.use(cors({origin:'*'}))

app.use(express.json());
app.use('/user',UserRouter);
app.use('/admin',AdminRouter);
app.use('/expert',ExpertRouter);

app.get('/getall', (req, res) => { //see all data
    res.send('Response from Express');
});

app.get('/add', (req, res) => { //add data
    res.send('Response from Add Route');
});




app.listen(PORT, () => {
    console.log("Server is running on port - " + PORT);
})
