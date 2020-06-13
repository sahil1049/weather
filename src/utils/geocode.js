const request=require('request')
const geocode=(address,callback)=>{
    const geourl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2FoaWwxMDQ5IiwiYSI6ImNrYjR2OThuMjB6cHkycHBsYXY4Nmt3Z2wifQ.Ro_07ry2-qd5-BubtaI15w"
    request({url:geourl,json:true},(error,{body}={})=>{
            
          if(error){
           callback('Unable to connect to network',undefined)
          }
          else if(body.features.length===0){
            callback('Unable to fetch results',undefined)
          }
          else{
              callback(undefined,{
                  latitude:body.features[0].center[1],
                  longitude:body.features[0].center[0]
              })

          }
        })
        
}
module.exports=geocode