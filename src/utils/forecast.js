var request= require('request')
var forecast = function( latitude,longitude,callback)
{
    var url = 'https://api.darksky.net/forecast/ad6dcb9b1d43d45b1fdb3e057f26fe81/'+latitude+','+longitude
        
    request({url :url , json :true} , function(error,response){
        if(error){
            callback('unable to connect to weather service',undefined)
        }
        else if(response.body.error)
        {
            callback("Invalid data input..Please retry",undefined)
        }
        else
        {
            var jdata = response.body
            var F=jdata.currently.temperature
            var degrees=((F-32)*5/9)
            callback(undefined,"It is currently " + degrees.toFixed(2) +" degrees."+ "There is a " + jdata.currently.precipProbability+ "% chance of rain.")
        }
        
    }) 
}

module.exports=forecast









//forecast(40.7648,-73.9808);


