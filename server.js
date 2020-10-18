const express=require('express')
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Vehicle=require('./app/models/vehicles')

// setup configurasi body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//setup server
const PORT=process.env.PORT || 3000;

//koneksi ke database 
mongoose.connect('mongodb://localhost:27017/firstapiku',{useNewUrlParser:true})

// set up untuk api route
const router=express.Router();

// Middleware
router.use((req,res,next)=>{
    console.log('Posess ditangani oleh middleware..');

    next();
});

// test router untuk vehicls
router.route('/vehicles')
.post((req,res)=>{

    const vehicle=new Vehicle();
    vehicle.make=req.body.make;
    vehicle.model=req.body.model;
    vehicle.color=req.body.color;
    vehicle.save((err)=>{
        if(err){
            res.send(err)
        }
        res.json({message:'berhasil disimpan'})
    }) 

})
.get((req,res)=>{
    Vehicle.find((err)=>{
        if(err){
            res.send(err)
        }
        res.json({message:'berhasil gate data'})
    })
})


// route semua dengan prefix api
app.use('/api',router);

//Test route
app.get('/',(req,res)=>
    res.json({
        message:'Selamat datang belajar node js '
    })
)

// fire up server nya
app.listen(PORT,()=>{
    console.log(`server login pada port ${PORT} `)
})

