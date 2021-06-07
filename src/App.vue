<template>
    <div class="container p-2">
        <Navbar></Navbar>
        <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Navbar from '@/components/Navbar.vue'
    import { initCoords } from '@/config'

    export default defineComponent({
        components:{
            Navbar
        },
        data(){
            return{
                gettingLocation: false,
                errorStr: "",
                init: initCoords,
                loading: true,
            }
        },
        methods: {
            async getData(valueSelected: typeof initCoords){
                this.loading = true
                await this.$store.dispatch('FETCH_WEATHER', valueSelected)
                this.loading = false
            },
        },
        created() {
            //do we support geolocation
            if(!("geolocation" in navigator)) {
                this.errorStr = 'Geolocation is not available.';
                return;
            }
            this.gettingLocation = true;
            // get position
            navigator.geolocation.getCurrentPosition(async pos => {
                this.gettingLocation = false;
                const coords = {
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                }
                this.getData(coords);
            }, err => {
                this.gettingLocation = false;
                this.getData(this.init);
            })
        }
    })
</script>

<style lang="scss">
    body{
        @include neumorphism("convex", $base-color, 0.4rem, null, false);
        min-height: 100vh;
    }  

    .fade-enter-active,
    .fade-leave-active {
        transition-duration: 0.3s;
        transition-property: opacity;
        transition-timing-function: ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }

</style>
