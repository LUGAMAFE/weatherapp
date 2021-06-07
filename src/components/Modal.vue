<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper" @click="$emit('close')">
                <div class="modal-container">
                    <div class="modal-body">
                        <slot name="body">
                            Default modal body text
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: "Modal",
    })
</script>

<style lang="scss" scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s ease;
        .modal-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            .modal-container {
                max-width: 80%;
                border-radius: 1rem;
                width: auto;
                margin: 0px auto;
                padding: min(5vmin, 2rem);
                background-color: #fff;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
                transition: all 0.3s ease;
            }
        }
    }


    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */

    .modal-enter {
        opacity: 0;
    }

    .modal-leave-active {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        transform: scale(1.1);
    }
</style>

