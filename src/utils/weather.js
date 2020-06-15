const request=require('request')
const weather=(latitude,longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=6f34593accfc2c2f1da080230de3b507&query="+latitude+","+longitude
  
    request({url,json:true},(error,{body}={})=>{
       if(error){
           callback("Unable to connect to network",undefined)
       }
       else if(body.error){
           callback("Unable to fetch results",undefined)
       }
       else{
        const msg=body.current.weather_descriptions[0]+".It is current " +body.current.temperature+" degree celsius but it feels like "
             +body.current.feelslike+" degree celsius outside. The wind speed is "+body.current.wind_speed
        callback(undefined,msg)
       }
    })
}
module.exports=weather