<template>
    <div class="chartContainer">
        <apexchart ref="chart" type="area" height="100%" :options="chartOptions" :series="series"></apexchart>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { tempScale } from '@/composables/weatherFunctions'
    import dayjs from 'dayjs'
    import { mapState, mapGetters} from 'vuex'

    export default defineComponent({
        name: 'HourlyChart',
        props: ['id', 'hoursFromDay'],
        setup(){
            return {
                tempScale
            };
        },
        data () {
            return {
                chartOptions: {},
                mediaQuery: window.matchMedia('(min-width: 1000px)')
            }
        },
        mounted: function(){
            const that = this;

            this.chartOptions = {
                ...{
                    colors:['#FFCC00'],
                    fill: {
                        colors: ['#FFCC00']
                    },
                    chart: {
                        type: 'area',
                        id: 'vuechart-example',
                        redrawOnParentResize: true,
                        redrawOnWindowResize: true,
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            blur: 3,
                            color: '#FBE07A',
                            opacity: 0.35
                        },
                        zoom: {
                            enabled: true
                        },
                        toolbar: {
                            tools: {
                                selection: false,
                                zoom: false,
                                zoomin: false,
                                zoomout: false,
                                pan: true,
                                reset: false
                            },
                            autoSelected: 'pan' 
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function(value: string) {
                            return value + "°" + that.scale;
                        }
                    },
                    stroke: {
                        curve: 'smooth'
                    },
                    grid: {
                        row: {
                            colors: ['#e8e8e8', 'transparent'],
                            opacity: 0.5
                        }, 
                        column: {
                            colors: ['#f8f8f8', 'transparent'],
                        }, 
                        xaxis: {
                            lines: {
                            show: true
                            }
                        },
                        padding: {
                            left: 30, // or whatever value that works
                            right: 30 // or whatever value that works
                        }
                    },
                    yaxis: {
                        labels: {
                            formatter: function (value: string) {
                                return value + "°" + that.scale;
                            }
                        },
                        lines: {
                            show: true,
                        }
                    },
                    tooltip: {
                        x: {
                            format: 'dd/MM/yy HH:mm'
                        },
                    },
                },
                ...that.getXaxisConfig(7)
            }
            // Initialize the media query
            // Add a listen event
            this.mediaQuery.addEventListener('change', this.changeXasis);
            // On load
            setTimeout(() => {
                this.changeXasis(this.mediaQuery);
            }, 500);
        },
        methods: {
            updateChartOptions(options: any) {
                this.chartOptions = {...this.chartOptions, ...options}
            },
            getXaxisConfig(hours: number){
                const dayIndex = this.id - 1;
                let day;
                if(dayIndex == 0){
                    day = dayjs();
                }else{
                    day = dayjs().add(dayIndex, 'd').startOf('day');
                }
                let minValue = day.unix() * 1000;
                let maxValue = day.add(hours, 'h').unix() * 1000;
                return {
                    xaxis: {
                        type: 'datetime',
                        lines: {
                            show: true,
                        },
                        labels: {
                            datetimeUTC: false,
                        },
                        min: minValue,
                        max: maxValue,
                    }
                };
            },
            changeXasis(event: any) {    
                if (event.matches) {
                    this.updateChartOptions(this.getXaxisConfig(7));
                } else {
                    this.updateChartOptions(this.getXaxisConfig(4));
                }
            }
        },
        watch: {
            id() {
                this.changeXasis(this.mediaQuery);
            }
        },
        computed: {
            ...mapState([
                'scale',
                'place'
            ]),
            ...mapGetters([
                'hourly'
            ]),
            series(){
                let hoursFromDay: Array<any> = this.hoursFromDay;
                let data = hoursFromDay.map(function(value) {
                    return {
                        x: new Date(value.dt * 1000).getTime(),
                        y: parseInt(value.temp)
                    }
                });
                return [
                    {
                        name: 'Temperature',
                        data
                    }
                ];
            }
        }
    })
</script>

<style lang="scss" scoped>
    .chartContainer{
        height: max(30vmin, 10rem)
    }
</style>
