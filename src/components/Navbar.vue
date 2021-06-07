<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent mb-2">
        <a class="navbar-brand" href="/">Weather App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    5-day forecast
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        
                        <li v-for="(item, index) in daily.slice(0, 5)" :key="index" ><router-link class="dropdown-item" :to="`/day/${index + 1}`" v-text="dayWeek( item.dt, index)"></router-link></li>
     
                    </ul>
                </li>
            </ul>
        </div>
        <form class="d-none d-lg-block">
            <SinglelineTextField placeholder="Not working yet">
                <template v-slot:input-group-text>
                    <span class="input-group-text" id="magnify-icon"> 
                        <svg class="icon"><use xlink:href="@/assets/icons/icon-pack.svg#magnify"></use></svg>
                    </span>
                </template>
            </SinglelineTextField>
        </form>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import SinglelineTextField from './singleline-text-field/SinglelineTextField.vue'
    import { dayWeek } from '@/composables/weatherFunctions'
    import {mapGetters} from 'vuex'

    export default defineComponent({
        components:{
            SinglelineTextField
        },
        setup(){
            return {
                dayWeek
            };
        },
        computed: {
            ...mapGetters([
                'daily',
            ])
        },
    })
</script>

<style lang="scss" scoped>
    #magnify-icon{
        font-size: 1.5rem;
        padding: 0.2em 0 0.2em 0.5em;
    }
    .navbar-brand{
        color: lighten($blue-color, 3%) !important;
    }
    .navbar-toggler{
        border: 0;
        @include neumorphism("convex", $base-color, 0.4rem, null, true, 2px);
        &:focus{
            @include neumorphism-secondary("concave", $blue-color, 0.4rem, true);
        }
    }

    .dropdown-menu{
        @include neumorphism("convex", $base-color, 0.4rem, null, true);
        .dropdown-item{
            color: $gray-color;
            &:hover{
                @include neumorphism("convex", lighten($base-color, 5%), 0.4rem, null, false);
            }
            &:active{
                @include neumorphism-secondary("concave", $blue-color, 0.4rem, true);
                color: $white-color;
            }
        }
    }
</style>

