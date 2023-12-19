
import http from '@ohos.net.http';

/**
 * Initiates an HTTP request to a given URL.
 *
 * @param url URL for initiating an HTTP request.
 * @returns the result of HTTPS.
 */

export async function httpWeatherGet(url: string) {
  if (!url) {
    return undefined;
  }
  let testhost = 'https://ali-weather.showapi.com'
  let testpath = '/area-to-weather-date'
  let request = http.createHttp();
  let appcode = 'your_app_code'
  let querys = "areaCode=500101&needMoreDay=1&needIndex=0&need3HourForcast=0&needAlarm=0&needHourData=needHourData"
  let options = {
    method: http.RequestMethod.GET,
    header: {
      'Content-Type': 'application/json',
      'Authorization': 'APPCODE ' + appcode,
    },
    expectDataType: http.HttpDataType.OBJECT, // 可选，指定返回数据的类型
  } as http.HttpRequestOptions;
  let result = await request.request(testhost + testpath + "?" + querys, options);
  return result;
}

export async function httpNewsGet(url: string){
  if (!url) {
    return undefined;
  }
  let testhost = 'https://ali-weather.showapi.com'
  let testpath = '/area-to-weather-date'
  let request = http.createHttp();
  let appcode = 'd05915f2d9bf4f58a8e264679418af74'
  let querys = 'channelId=5572a108b3cdc86cf39001cd&page=1&maxResult=20'
  let options = {
    method: http.RequestMethod.GET,
    header: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'APPCODE ' + appcode,
    },
    expectDataType: http.HttpDataType.OBJECT, // 可选，指定返回数据的类型
  } as http.HttpRequestOptions;
  url = url + "?" + querys;
  let result = await request.request(testhost + testpath + "?" + querys, options);

  return result;
}
