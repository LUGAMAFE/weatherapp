<template>
    <div class="container">
        <Navbar></Navbar>
        <router-view/>
    </div>

</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import Navbar from './components/Navbar.vue'

    export default defineComponent({
        components:{
            Navbar
        },
    })
</script>

<style lang="scss">
    body{
        @include neumorphism("convex", $base-color, 0.4rem, null, false);
        min-height: 100vh;
    }
</style>
