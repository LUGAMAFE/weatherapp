import { createStore } from 'vuex'
import AppServices from '@/services/AppServices'

export default createStore({
    state: {
        coords: {},
        currentWeather: null,
        forecastWeather: null,
        place: '',
        scale: 'C'
    },
    getters:{
        daily: state => (state.forecastWeather != null) ? state.forecastWeather!['daily'] : [],
        hourly: state => (state.forecastWeather != null) ? state.forecastWeather!['hourly'] : [],
        temp: state => (state.currentWeather != null) ? state.currentWeather!['main']['temp'] : null,
        feels: state => (state.currentWeather != null) ? state.currentWeather!['main']['feels_like'] : null,
        datetime: state => (state.currentWeather != null) ? state.currentWeather!['dt'] : '',
        weather: state =>  (state.currentWeather != null) ? state.currentWeather!['weather'][0] : null
    },
    mutations: {
        UPDATE_COORDS(state, coords){
            state.coords = coords
        },
        UPDATE_SCALE (state, scale) {
            state.scale = scale;
        },
        UPDATE_WEATHER (state, { current, forecast, geocoding}) {
            state.currentWeather = current;
            state.forecastWeather = forecast;
        },  
        UPDATE_PLACE(state, place) {
            state.place = place;
        },
    },
    actions: {
        SET_COORDS({ commit }, coords){
            commit('UPDATE_COORDS', coords);
        },
        SET_SCALE({ commit }, scale){
            commit('UPDATE_SCALE', scale);
        },
        async FETCH_WEATHER ({ commit }, value) {
            commit('UPDATE_COORDS', value);
        
            let current = null;
            let forecast = [];
            
            try{
                const currentLocation= await AppServices.getGeocoding({
                    lat: value.lat,
                    long: value.long
                });
            
                commit('UPDATE_PLACE', currentLocation!.data[0]!.name ?? "");
            }
            catch (e){
                commit('UPDATE_PLACE', "")
            }

            try{
                const currentWeather = await AppServices.getCurrentWeather({
                    lat: value.lat,
                    long: value.long
                });
            
                current = currentWeather.data ?? null;
            }
            catch (e){
                current = null
            }
        
            try{    
                const forecastWeather = await AppServices.getForecastWeather({
                    days: 5,
                    lat: value.lat,
                    long: value.long
                });
            
                forecast = forecastWeather.data ?? null;
            }
            catch (e){
                forecast = []
            }
        
            commit('UPDATE_WEATHER', { current, forecast})  
          }
    },
    modules: {
    }
})
