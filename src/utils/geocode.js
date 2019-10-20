var request=require('request');
var geocode= function(address,callback)
{
        var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +'.json?access_token=pk.eyJ1IjoicHJhYmh1bWFoZXNoMTk5NyIsImEiOiJjazB6aG92dDgwcHo3M2RvN25nb3l4bnZ1In0.SxxPm6TPbKdElFffniAtNA'
        
        request({url : url , json :true}, function (error,response){
            if(error)
            {
                callback("unable to connect to map service",undefined)
            }
            else if(response.body.features.length== 0)
            {
                callback("unable to find location.Please try again",undefined)
            }
            else
            {
                var latitude= response.body.features[0].center[1];
                var longitude=response.body.features[0].center[0];
                var location =response.body.features[0].place_name;
                callback(undefined ,{
                    latitude : latitude,
                    longitude : longitude,
                    location :location
                });
            }
        } )

}

module.exports = geocode 