const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weather=require('./utils/weather')
// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))
const app=express()

//Defining paths for express config
const viewsPath=path.join(__dirname,'../templates/views')
const publicdir=path.join(__dirname,'../public')
const partialPath=path.join(__dirname,'../templates/partials')

//Setting handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setting static director to serve
app.use(express.static(publicdir))

// const homedir=path.join(__dirname,'../public/help.html')
// app.use(express.static(homedir))

// const aboutdir=path.join(__dirname,'../public/about.html')
// app.use(express.static(aboutdir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sahil'
    })

})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Sahil'
    })

})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help page",
        message:"How can I help you"
    })
})

app.get('/weather',(req,res)=>{
if(!req.query.address){
    return res.send("Please provide an address")
}

geocode(req.query.address,(error,{latitude,longitude}={})=>{

if(error){
 return res.send({error})
}

weather(latitude,longitude,(error,forecast)=>{
 if(error){
     return res.send({error})
 }
res.send({
forecast:forecast,
address:req.query.address


})
})


})
// console.log(req.query.address)
//     res.send({
//         latitude:22.7,
//         longitude:23.2,
//         address:req.query.address
//     })

})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//        return res.send("Provide a search")
//     }
//     console.log(res.query.search)
//     res.send({
//         product:[]
//     })
// })
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        error:"Help article not found"
    })
    })
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        error:"page not found"
    })
    })


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})