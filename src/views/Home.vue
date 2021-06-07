<template>
    <div class="home-view card card-main-container">
        <div class="card-body">
            <UbicationBar/>
            
            <div v-if="error" class="text-center">
                Sorry... data not available!
            </div>  
            
            <div v-else-if="weather != null">
                <WeatherInfo @change-scale="setScale" />
                <ForecastList/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import WeatherInfo from '@/components/WeatherInfo.vue'
    import ForecastList from '@/components/ForecastList.vue'
    import UbicationBar from '@/components/UbicationBar.vue'
    import { mapState, mapGetters } from 'vuex'

    export default defineComponent({
        name: 'Home',
        components:{
            WeatherInfo,
            ForecastList,
            UbicationBar
        },
        computed: {
            ...mapState([
                'scale',
            ]),
            ...mapGetters([
                'temp',
                'weather'
            ]), 
            error(): boolean{
                return (this.temp == null)
            }
        },
        methods: {
            setScale(scale: string){
                this.$store.dispatch('SET_SCALE', scale)
            },
        }
    })
</script>
