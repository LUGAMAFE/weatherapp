<template>
    <div class="w-forecast-list">
        <div class="column">
            <ForecastListItemHourly 
                v-for="(item, index) in hoursFromDay.slice(0, 12)" 
                :key="index" 
                :pos="index"
                :item="item" 
                :scale="scale" 
                @click="weatherDay(index)"
            >
            </ForecastListItemHourly>
        </div>
        <div class="column">
            <ForecastListItemHourly 
                v-for="(item, index) in hoursFromDay.slice(12, 24)" 
                :key="index" 
                :pos="index"
                :item="item" 
                :scale="scale" 
                @click="weatherDay(index)"
            >
            </ForecastListItemHourly>
        </div>
    </div> 
</template>

<script lang="ts">
    import ForecastListItemHourly from '@/components/ForecastListItemHourly.vue'
    import { defineComponent } from 'vue'
    import { mapState} from 'vuex'

    export default defineComponent({
        name: 'ForecastListHourly',
        components: {
            ForecastListItemHourly
        },
        computed: {
            ...mapState([
                'scale'
            ]),
        },
        props: ['hoursFromDay'],
    })
</script>


<style lang="scss" scoped>
    .w-forecast-list{
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 1.5rem;
        margin-top: 1.5rem;
        @media only screen and (min-width: 768px) {
            grid-template-columns: repeat(2, 1fr);
        }
        .column{
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 1.5rem;
            grid-auto-rows: 0fr;
        }
    }
</style>