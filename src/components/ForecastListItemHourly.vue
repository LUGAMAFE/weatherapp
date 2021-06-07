<template>
    <div class="forecast-list-item-hourly">
        <div class="fc-hour">{{ hourFromDayTime( item.dt ) }}</div>

        <div class="fc-temp"> 
            {{ parseInt(tempScale(item.temp, scale)) }}&deg;<span class="w-scale">{{ scale }}</span>
        </div>

        <div class="fc-icon">
            <span class="icon-container">
                <img :src='icon' :alt='item.weather[0].description' :title='item.weather[0].description'>
            </span>
        </div>

        <div class="fc-description"> 
            {{item.weather[0].description}}
        </div>
    </div>
</template>

<script lang="ts">
    import { tempScale, hourFromDayTime} from '@/composables/weatherFunctions'
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'ForecastListItemHourly',
        setup(){
            return {
                tempScale,
                hourFromDayTime
            };
        },
        props:{
            item:{
                type: Object
            },
            scale:{
                type: String
            }
        },
        data () {
            return {
                publicPath: process.env.BASE_URL
            }
        },
        computed: {
            icon(): string{
                return `${this.publicPath}icons/weather-icons/${this.item!.weather[0].icon}.svg`
            },
        }
    })
</script>

<style lang="scss" scoped>
    .forecast-list-item-hourly{
        margin: 0;
        text-align: center;
        font-size: .9rem;
        display: grid;
        align-items: center;
        grid-template-columns: repeat(3, 1fr);
        padding: 0.6rem 3vmin;
        @include neumorphism("flat", $base-color, 0.2rem);
        &:hover{
            @include neumorphism("pressed", $base-color, 0.2rem);
        }
        .fc-icon{
            display: flex;
            justify-content: center;
            align-items: center;
            .icon-container{
                padding: 0.6rem;
                display: block;
                border-radius: 50%;
                @include neumorphism("bordered", darken($base-color, 3%), 0.2rem);
                img{
                    width: max(2vmin, 2rem);
                    height: max(2vmin, 2rem);
                }
            }
        }
        
        .fc-temp{
            font-weight: 600;
            font-size: 1.2rem;
        }

        .fc-description{
            display: none;
        }

        @media only screen and (min-width: $mobile-l) {
            grid-template-columns: repeat(4, 1fr);
            .fc-description{
                display: block;
            }
        }
    }
</style>