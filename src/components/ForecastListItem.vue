<template>
    <li :title="'See hourly forecast for ' + dayWeek( item.dt, pos)">
        <div class="fc-date">{{ dayWeek( item.dt, pos) }}</div>
        <div class="fc-icon">
            <span class="icon-container">
                <img :src='icon' :alt='item.weather[0].description' :title='item.weather[0].description'>
            </span>
        </div>

        <div class="fc-maxmin">
            <span><strong>{{ parseInt(tempScale(item.temp.max, scale)) }}&deg;<span class="w-scale">{{ scale }}</span></strong></span> 
            <span>{{ parseInt(tempScale(item.temp.min, scale)) }}&deg;<span class="w-scale">{{ scale }}</span></span>
        </div>
    </li>
</template>

<script lang="ts">
    
    import { tempScale, dayWeek} from '@/composables/weatherFunctions'
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'ForecastListItem',
        setup(){
            return {
                tempScale,
                dayWeek
            };
        },
        props:{
            pos:{
                type: Number
            },
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
    li{
        cursor: pointer;
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
        
        .fc-maxmin{
            span{
                padding: 0 0.2em;
            }
            strong{
                &, *{
                    color: $yellow-color;
                }
            }
        }

        @media only screen and (min-width: 768px) {
            display: flex;
            justify-content: center;
            flex-flow: column wrap;
            border-right: 1px dotted #505d64;
            background: none;
            box-shadow: none;
            padding: 1em 0;
            &:last-child{
                border: none;
            }
            .fc-icon{
                padding: 1rem;
                .icon-container{
                    padding: 1rem;
                }
            }
            .fc-maxmin{
                display: flex;
                flex-direction: column;
            }
        }
        @media only screen and (min-width: 992px) {
            .fc-maxmin{
                flex-direction: row;
            }
        }
    }
</style>