<template>
    <div :class="classesContainer" class="singleline-text-field input-group">
        <slot name="input-group-text"></slot>
        <input v-model="value" :class="classesInput" class="singlline-text-field form-control" type="text" :placeholder="placeholder"/>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: "SinglelineTextField",
        props: {
            placeholder: {
                type: String,
            },
            value: {
                type: String,
            },
            classesContainer:{
                type: String,
            },
            classesInput:{
                type: String,
            },
        },
        data() {
            return {
                value: ""
            }
        }
    });
</script>

<style lang="scss" scoped>
    .singleline-text-field{
        background-color: $base-color;
        @include neumorphism-secondary("concave", $base-color, 0.4rem, null, true, 2px);
        >*{
            background: transparent;
            border: 0;
        }
    }
</style>
