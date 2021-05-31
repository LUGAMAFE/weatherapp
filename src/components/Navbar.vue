<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <a class="navbar-brand" href="#">Weather App</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <form class="d-none d-lg-block">
            <SinglelineTextField>
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

    export default defineComponent({
        components:{
            SinglelineTextField
        },
    })
</script>

<style lang="scss" scoped>
    #magnify-icon{
        font-size: 1.5rem;
        padding: 0.2em 0 0.2em 0.5em;
    }
    .navbar-toggler{
        border: 0;
        @include neumorphism("convex", $base-color, 0.4rem, null, true, 2px);
        &:focus{
            @include neumorphism-secondary("concave", #00c0c0, 0.4rem, null, true, 2px);
        }
    }

    .dropdown-menu{
        @include neumorphism("convex", $base-color, 0.4rem, null, true);
        .dropdown-item{
            &:active{
                @include neumorphism-secondary("concave", #00c0c0, 0.4rem, null, true, 2px);
            }
        }
    }
</style>

