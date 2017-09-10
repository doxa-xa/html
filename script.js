function getLocation()
{
  var t = document.getElementById('time');

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var lat = Math.round(position.coords.latitude*100)/100;
      var lon = Math.round(position.coords.longitude*100)/100;
      weather(lat,lon);
    });
  }
}
function weather(lat,lon){
  var apiKey="392efa5aa3c1e0972cd1c199b10703d5";
  var city="Burgas";
  var url=String.format("http://api.openweathermap.org/data/2.5/weather?lat={0}&lon={1}&APPID={2}",lat,lon,apiKey);
  var ci = document.getElementById('city');
  var temp = document.getElementById('temp');
  var img = document.getElementById('icon');
  startTime();
  var http = new XMLHttpRequest();
  var obj = new Object();
  var k = -273.15;
  http.open("GET",url,true);
  http.onreadystatechange=function(){
    if(http.readyState===XMLHttpRequest.DONE&&http.status===200)
    {
      //test.textContent=http.responseText;
      obj=JSON.parse(http.responseText);
      ci.textContent=obj.name;
      temp.textContent=Math.round(obj.main.temp+k)+" °C";
      img.src=String.format("http://openweathermap.org/img/w/{0}.png",obj.weather[0].icon);
    }
  };
  http.send(null);
}
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    var time = document.getElementById('time');
    time.innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
