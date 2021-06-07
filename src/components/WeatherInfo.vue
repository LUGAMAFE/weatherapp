<template>
    <div class="w-info">
        <div class="w-location">
            <p class="fs-2 mb-0">Today</p>
            <p class="w-date mb-1">{{ lastUpdated }}</p>
        </div>
     
        <div class="w-ui-weather"> 
            <!-- <div class="ui mini buttons w-scale">
                <button class="ui mini compact button" :class="{ positive: (scale == 'C') }" @click="changeScale('C')">&deg;C</button>
                <button class="ui mini compact button" :class="{ positive: (scale == 'F') }" @click="changeScale('F')">&deg;F</button>
            </div>          -->

            <span class="w-icon-container">
                <img :src='icon' class="w-icon" :alt='description' >
            </span>
            <span class="w-temp">{{ parseInt(tempScale(temp, scale)) }}&deg; <span class="w-scale">{{ scale }}</span> </span>
            <span class="w-feels">Feels like {{ parseInt(tempScale(feels, scale)) }}&deg; <span class="w-scale">{{ scale }}</span> </span>
            <span class="w-condition">{{ description }}</span>
        </div>
    </div>
</template>


<script lang="ts">
    import dayjs from "dayjs";
    import { tempScale } from '@/composables/weatherFunctions'
    import relativeTime from "dayjs/plugin/relativeTime"
    import { defineComponent } from 'vue'
    import { mapState, mapGetters } from 'vuex'

    dayjs.extend(relativeTime);

    export default defineComponent({
        name: 'WeatherInfo',
        setup(){
            return {
                tempScale
            };
        },
        data () {
            return {
                publicPath: process.env.BASE_URL,
                lastUpdated: ""
            }
        },
        computed: {
            ...mapState([
                'scale'
            ]), 
            ...mapGetters([
                'temp',
                'feels',
                'datetime',
                'weather'
            ]),       
            icon(): string{
                return (this.weather != null) ? `${this.publicPath}icons/weather-icons/${this.weather.icon}.svg` : '#';
            },
            description(): string {
                return (this.weather != null) ? this.weather.description : '';
            },
        },
        methods: {
            changeScale(scale: string){
                this.$emit('change-scale', scale)
            },
            formatTimestamp(value: string) {
                this.lastUpdated =  (value) ? dayjs.unix(+value).fromNow() : '';
            }
        },
        mounted() {
            setInterval(() => {
                this.formatTimestamp(this.datetime);
            }, 1000)
        }
    })
</script>

<style lang="scss" scoped>
    .w-info{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .w-location{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .w-ui-weather{
            display: flex;
            flex-direction: column;
            align-items: center;
            .w-icon-container{
                margin: 1rem 0;
                padding: max(2.5vmin, 1rem);
                display: block;
                border-radius: 50%;
                @include neumorphism("bordered", darken($base-color, 2%), 0.2rem);
                .w-icon{
                    width: max(12vmin, 6rem);
                    height: auto;
                }
            }
            .w-temp{
                font-weight: 600;
                font-size: var(--huge-text);
                line-height: 1.2;
                margin-bottom: 0.5rem;
                .w-scale{
                    font-weight: 600;
                    font-size: var(--huge-text);
                }
            }
            .w-feels{
                font-size: var(--medium-text);
                line-height: 1.2;
                margin-bottom: 0.5rem;
                .w-scale{
                    font-size: var(--medium-text);
                }
            }
            .w-condition{
                font-size: var(--large-text);
                line-height: 1;
                color: $blue-color;
            }
        }
    }
</style>	