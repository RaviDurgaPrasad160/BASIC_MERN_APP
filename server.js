const exp = require('express')
const app = exp()
const mclient = require('mongodb').MongoClient

// importing dotenv
require('dotenv').config()

// import path module
const path = require('path')

//connect react of build with nodejs
app.use(exp.static(path.join(__dirname,'./build')))

// importing userApi
const userApp = require('./APIS/userApi')
// importing productApi
const productApp = require('./APIS/productApi')

//Database connection url
const DBurl = process.env.DBURL

// connect with mongodb server
mclient.connect(DBurl)
.then((client)=>{

// get DB object
    let dbObj = client.db("ravi2024")

    // create collection object
    let userCollectionObj = dbObj.collection('userCollection')
    let productCollectionObj = dbObj.collection('productCollection')

    // sharing collection objects to apis
    app.set("userCollectionObj", userCollectionObj)
    app.set("productCollectionObj", productCollectionObj)

    
    console.log("DB connection is succuss")
})
.catch(err=>console.log(`error in databsae collection ${err}`))

//middleware to handle user-api path
app.use('/user-api', userApp)

//middleware to handle product-api path
app.use('/product-api', productApp)





// middleware to handle invalid paths
app.use((req, res, next)=>{
    res.send({message:`path ${req.url} is invalid`})
})

// middleware to handle errors
app.use((error,req,res,next)=>{
    res.send({message:error.message})
})

 let port = process.env.PORT
app.listen(port,()=>{
    console.log(`server has started on port ${port}`)
})


