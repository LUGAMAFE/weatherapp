import {API, key} from '@/services/api';

export default {
    getGeocoding(params: any){
        return API.get(`geo/1.0/reverse?lat=${params.lat}&lon=${params.long}&limit=4&appid=${key}`);
    },
    getCurrentWeather (params: any) {
        return API.get(`data/2.5/weather?lat=${params.lat}&lon=${params.long}&units=metric&appid=${key}`);
    },
    getForecastWeather (params: any) {
        return API.get(`data/2.5/onecall?lat=${params.lat}&lon=${params.long}&exclude=minutely&units=metric&appid=e86fefc4aa520c74b95bdff4b82ca68b`);
    }
}