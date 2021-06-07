<template>
    <div :class="classesContainer" class="singleline-text-field input-group">
        <slot name="input-group-text"></slot>
        <input v-model="value" :class="classesInput" class="form-control" type="text" :placeholder="placeholder"/>
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
        @include neumorphism("pressed", $base-color, 0.4rem, null);
        >*, ::v-slotted(*){
            background: transparent !important;
            border: 0 !important;
        }
        input{
            color: $gray-color;
            &:focus{
                box-shadow: none;
            }
        }
    }
</style>
