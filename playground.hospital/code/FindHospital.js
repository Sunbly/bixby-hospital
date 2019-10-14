module.exports.function = function findHospital (city,part) {
  //city는 도
  //part 는 내과,이빈후과 등 병원 부서를 말한다.

  var http = require('http')
  var console = require('console')
  var dates = require('dates')

  var serviceKey= 'yCQMS77xzSC9kPRqglnhpweQ7CUEVG0Sg8qfQcFHRAIqz1P%2BVnbuv6bh%2F2K5OSsKNc4uAsge9aKAUVSAB1Uxmg%3D%3D';
  
  // 진료과목 코드 
  let parts=['','내과','소아청소년과','신경과','정신건강의학과','피부과','외과'
  ,'흉부외과','정형외과','신경외과','성형외과','산부인과','안과','이비인후과','비뇨기과','재활의학과'
  ,'마취통증의학과','영상의학과','치료방사선과','임상병리과','해부병리과','가정의학과','응급의학과','치과','구강악안면외과'];
// D001 ~D034

var lat ='36.3344';
var lon = '127.4373';

var searchPart='';
// 진료과목이 input으로 값이 들어왔을 때
if(part!= null){

  for(var i=0; i<parts.length; i++){
    if(parts[i].includes(part)){
      if(i>=10){
        searchPart='D0'+i;
      }else{
        searchPart='D00'+i;
      }
    }
  }
}
//use encodeURI -> it works!(한글->API용으로 변환)
 var url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire?serviceKey='+serviceKey+'&Q0='+encodeURI(city);
 // 진료과목이 발화에 있으면
 if(searchPart!=''){
   url+='&QD='+encodeURI(searchPart)
 }
 //call by lon & lat;
 //위도 & 경도찾기하면 병원분류명이 dutyDivNam이 아니고 dutyDivName이라서 값을 못불러옴 ㅡㅡ
   //var url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire?serviceKey='+serviceKey+'&WGS84_LON='+lon+'&WGS84_LAT='+lat;


  //var ttt = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire?serviceKey=yCQMS77xzSC9kPRqglnhpweQ7CUEVG0Sg8qfQcFHRAIqz1P%2BVnbuv6bh%2F2K5OSsKNc4uAsge9aKAUVSAB1Uxmg%3D%3D&Q0=%EC%84%9C%EC%9A%B8';
  var response = http.getUrl(url, {format: 'xmljs'});
  
  console.log("city is "+city);


  //var numOfRows = response.response.body.numOfRows; // rows per page
  var totalCount = response.response.body.totalCount;
  var size = 0;
//걍 5개출력 만익 5개보다 검색결과가 적은 경우 대체
  if(totalCount < 5){
    size = totalCount;
  }
  else{
    size = 5;
  }
 
 //눈물의 노가다 현장
 // json알겠는데 그거를 배열로 저장하려고 result[0], result+= 별 다해도 다깨짐 그래서 걍 하나하나 노가다로 때려넣기
  //눈물의 노가다 현장
 // json알겠는데 그거를 배열로 저장하려고 result[0], result+= 별 다해도 다깨짐 그래서 걍 하나하나 노가다로 때려넣기
  var results = [];
 for(var i = 0; i< 8; i++){
   results[i] = {'dutyAddr':response.response.body.items.item[i].dutyAddr, 'dutyDivNam':response.response.body.items.item[i].dutyDivNam,'dutyName':response.response.body.items.item[i].dutyName};
   
 }

  console.log(results);
  return results;
}
