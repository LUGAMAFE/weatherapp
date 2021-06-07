<template>
    <div class="w-100 d-flex flex-wrap justify-content-center justify-content-md-between align-items-center mb-3">
        <button id="get-location-btn" @click="showModal = true" type="button" class="btn fs-5" data-tippy-content="Select Location"><span><svg class="icon fs-4"><use xlink:href="@/assets/icons/icon-pack.svg#map-marker"></use></svg></span>Select Ubication</button>
        <div class="location fs-6">{{ place }}</div>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
        <template v-slot:body>
            <span class="fs-5">
                By default the application detects the location of your browser, in case of not being able to access the location of the browser, the data of the city of Cancun will be loaded, in the future it will be possible to search the location with google maps
            </span>  
        </template>  
    </Modal> 
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Modal from '@/components/Modal.vue'
    import tippy from 'tippy.js'
    import { mapState } from 'vuex'

    export default defineComponent({
        name: 'UbicationBar',
        components:{
            Modal
        },
        mounted: function(){
            tippy('[data-tippy-content]', {
                theme: 'light',
                placement: 'right',
            });
        },
        computed: {
            ...mapState([
                'place'
            ]),
        },
        data () {
            return {
                showModal: false,
            }
        },
    })
</script>


<style lang="scss" scoped>
    #get-location-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        color: $gray-color;
        span{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            @include neumorphism("pressed", $lighten-blue-color, 0.2rem, null, true, 2px);
            padding: 0.2rem;
            margin-right: 0.5rem;
        }
        .icon{
            fill: $blue-color;
        }
        &:focus{
            box-shadow: none;
        }
        &:active{
            @include neumorphism("pressed", $base-color, 0.2rem, null, true, 2px);
        }
    }
</style>
