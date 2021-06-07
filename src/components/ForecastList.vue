<template>
    <ul v-if="daily.length > 0" class="w-forecast-list">
        <ForecastListItem 
            v-for="(item, index) in daily.slice(0, 5)" 
            :key="index" 
            :item="item" 
            :scale="scale" 
            @click="weatherDay(index)"
        >
        </ForecastListItem>
    </ul> 
</template>

<script lang="ts">
    import ForecastListItem from '@/components/ForecastListItem.vue'
    import { defineComponent } from 'vue'
    import { mapState, mapGetters} from 'vuex'


    export default defineComponent({
        name: 'ForecastList',
        components: {
            ForecastListItem
        },
        computed: {
            ...mapState([
                'scale'
            ]),
            ...mapGetters([
                'daily',
            ])
        },
        methods:{
            weatherDay(index: number){
                this.$router.push({ name: 'WeatherDay', params: { id: ++index } })
            }
        }
    })
</script>


<style lang="scss" scoped>
    .w-forecast-list{
        display: grid;
        grid-gap: 1.5rem;
        margin-top: 1.5rem;
        margin-bottom: 0;
        padding: 0;
        @media only screen and (min-width: 768px) {
            display: grid;
            grid-gap: 0;
            grid-template-columns: repeat(5, 1fr);
            @include neumorphism("convex", $base-color, 0.2rem);
        }
    }
</style>