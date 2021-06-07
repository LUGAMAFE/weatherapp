<template>
    <div class="weather-day-view card card-main-container">
        <div class="card-body">
            <UbicationBar/>

            <div v-if="error" class="text-center">
                Sorry... data not available for this day!
            </div>  
            
            <div v-else>
                <h2> Hourly forecast for {{ nameOfDay }}</h2>
                <p class="title">Forecast Hourly Chart</p>
                <HourlyChart :id="id" :hoursFromDay="hoursFromDay"/>
                <p class="title mt-4">Forecast Hourly Info</p>
                <ForecastListHourly :hoursFromDay="hoursFromDay"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import ForecastListHourly from '@/components/ForecastListHourly.vue'
    import UbicationBar from '@/components/UbicationBar.vue'
    import HourlyChart from '@/components/HourlyChart.vue'
    import { dayWeekFullname } from '@/composables/weatherFunctions'
    import { defineComponent } from 'vue'
    import { mapState, mapGetters} from 'vuex'
    import dayjs from 'dayjs'

    export default defineComponent({
        components: { HourlyChart, UbicationBar, ForecastListHourly },
        name: 'WeatherDay',
        props: ['id'],
        setup(){
            return {
                dayWeekFullname
            };
        },
        computed: {
            ...mapState([
                'scale'
            ]),
            ...mapGetters([
                'hourly',
            ]),
            nameOfDay(): string{
                let dayIndex = this.id - 1;
                return this.dayWeekFullname(this.hoursFromDay[0].dt, dayIndex).toLowerCase();
            },
            hoursFromDay(){
                let dayIndex = this.id - 1;
                let day;
                let startOfDay: number;
                if(this.id == 0){
                    day = dayjs();
                    startOfDay = day.unix();
                }else{
                    day = dayjs().add(dayIndex, 'd');
                    startOfDay = day.startOf('day').unix();
                }
                let endOfDay = day.endOf('day').unix();
                let hours: Array<any> = this.hourly;
                let filter = hours.filter(function(value) {
                    return ( value.dt >= startOfDay && value.dt <= endOfDay);
                });
                return filter;
            },
            error(){
                return this.hoursFromDay.length <= 0;
            }
        },
    })
</script>

<style lang="scss" scoped>
    .title{
        font-size: var(--large-text);
    }
</style>
