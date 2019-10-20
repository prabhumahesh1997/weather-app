//HandleBars allows to render the dynamic content

var express= require('express')
var path= require('path')
var app = express()
var hbs=require('hbs')
var geocode=require('./utils/geocode')
var forecast=require('./utils/forecast')

//SETTING PAHTS TO CONFIC EXPRESS
//console.log(__dirname) // return current dir path
//console.log(__filename) // return current file path 
var expresspathfile = path.join(__dirname,'../public')
var viewsPath= path.join(__dirname,'../template/views')
var patialPaths =path.join(__dirname,'../template/partials')


//SETTING HANDLEBARS ENIGINES AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views' ,viewsPath)
hbs.registerPartials(patialPaths)


//SETTING STATIC DIRECTORY TO SERVE
app.use(express.static(expresspathfile))  //express.static() Create a new middleware function to serve files from within a given root directory.
// The file to serve will be determined by combining req.url with the provided root directory.
 //When a file is not found, instead of sending a 404 response, 
 //this module will instead call next() to move on to the next middleware,
 // allowing for stacking and fall-backs.

app.get('',function(req,res){     
    res.render('index',{         //render a template 
        title: "Weather Application",
     name : "Mahesh Prabhu"
    })
})
//** By calling res.render express goes and get that view it converts then into html and html get back to reqestor  */


app.get('/about',function(req,res){
    res.render('about',{
        title: "About",
        name : "Mahesh Prabhu"
    })
})

app.get('/help',function(req,res){
    res.render('help',{
        title : "Help",
        body :"Hey there..! I am here to help",
        name : "Mahesh Prabhu" 
    })
})

app.get('/weather',function(req,res){
    if(!req.query.address){
        return res.send({
            error : "please enter a address"
            })
       
    }
    else {

        geocode(req.query.address,function(error,response){
            if(error)
            {
                return res.send({ error })
            }
        
                forecast(response.latitude,response.longitude,function(err,forecastData){
                        if(error){
                            return res.send({
                                err
                            })
                        }
                        else{
                             res.send({ 
                                 forecast: forecastData,
                                 location: response.location,
                                 address : req.query.address
                            })
                        }
                })
            
        })

    }
    
})

app.get('/help/*',function(req,res){
    res.render('error',{
        title : "404",
        msg :"Help article not fond",
        name : "Mahesh Prabhu"
    })
})

app.get('*',function(req,res){
    res.render('error',{
        title : "404",
        msg : "Page not found",
        name : "Mahesh Prabhu"
    })
})





// app.get('',function(req,res)
//     res.send('<h1>Welcome to home page<h1>')
// })
// app.get() to set up a handler for an HTTP GET request. The first argument is the path to set up the handler for. 
//The second argument is the function to run when that path is visited.


// app.get('/help', function(req,res){
//     res.send('HI.how may i help you')
// })

// app.get('/about', function(req,res){
    
//     res.send([{
//         name : "mahesh",
//         age : 22
//     }])
// })


app.listen(3000,function(){
    console.log("Server port is on")
})

