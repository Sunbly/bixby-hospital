var console = require('console');

function getDistance(lat1,lon1,lat2,lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  
  return parseInt(d*1000); // Distance in m
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

module.exports.function = function FindHospital_location (currentLocation) {
  var latitude = currentLocation.point.latitude;
  var longitude = currentLocation.point.longitude;
  
  var http = require('http')
  var console = require('console')
  var dates = require('dates')

  console.log("lat : " + latitude);
  console.log("lon : " + longitude);

  var serviceKey= 'yCQMS77xzSC9kPRqglnhpweQ7CUEVG0Sg8qfQcFHRAIqz1P%2BVnbuv6bh%2F2K5OSsKNc4uAsge9aKAUVSAB1Uxmg%3D%3D';
  
  // 진료과목 코드 
  let parts=['','내과','소아청소년과','신경과','정신건강의학과','피부과','외과'
  ,'흉부외과','정형외과','신경외과','성형외과','산부인과','안과','이비인후과','비뇨기과','재활의학과'
  ,'마취통증의학과','영상의학과','치료방사선과','임상병리과','해부병리과','가정의학과','응급의학과','���과','구강악안면외과'];
// D001 ~D034

  var url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire?serviceKey='+serviceKey;

  var response = http.getUrl(url, {format: 'xmljs'});

  var totalCount = response.response.body.totalCount;
  var size = 0;
  //걍 5개출력 만익 5개보다 검색결과가 적은 경우 대체
  if(totalCount <= 3){
    size = totalCount;
  }
  else{
    size = 3;
  }
  var results = new Array;
  
  if(size == 0){
   results.push({'dutyAddr':"none", 
      'dutyDivNam':"none",
      'dutyName':"none",
      'currentLocation':{'point;':{'latitude': latitude, 'longitude' : longitude}},
      'hospitalLocation':{'point':{'latitude':0.0, 'longitude':0.0}},
      'distance': "0",
      'mapAPI': "none"});
  }else{
    for(var i=0; i < size; ++i){
    results.push({'dutyAddr':response.response.body.items.item[i].dutyAddr, 
      'dutyDivNam':response.response.body.items.item[i].dutyDivNam,
      'dutyName':response.response.body.items.item[i].dutyName,
      'currentLocation':{'point':{'latitude': latitude, 'longitude' : longitude}},
      'hospitalLocation':{'point':{'latitude':response.response.body.items.item[i].wgs84Lat, 'longitude':response.response.body.items.item[i].wgs84Lon}},
      'distance': getDistance(latitude,longitude,response.response.body.items.item[i].wgs84Lat,response.response.body.items.item[i].wgs84Lon),
      'mapAPI': "none"});
    }
  }

  results.sort(function(a, b) {
    return a["distance"] - b["distance"];
  });
  
  console.log(results);
  return results;
}