<template>
    <div class="home">
        <div class="card">
            <div class="card-body">
                card contenido
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Home',
    })
</script>

<style lang="scss" scoped>
    .card{
        @include neumorphism("bordered", $base-color, 0.4rem, null, true, 2px);
    }
</style>

