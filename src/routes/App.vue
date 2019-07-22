<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div id="app">
        <NavBar/>
        <div class="notification-overlay">
            <div class="notification-container">
                <Notification v-for="notification in notifications"
                              :key="notification.id"
                              :notification="notification"/>
            </div>
        </div>
        <div class="container pt-3">
            <RouterView/>
        </div>
        <LoginModal v-if="user === null"/>
    </div>
</template>

<script>
    import Notification from "../components/Notification";
    import NavBar from "../components/NavBar";
    import LoginModal from "../components/modals/LoginModal";
    import helpers from '../helpers';
    import api from '../api';

    export default {
        name: 'App',
        components: {
            LoginModal,
            NavBar,
            Notification
        },
        computed: {
            notifications() {
                return this.$store.state.notifications
            },
            user() {
                return this.$store.state.user
            }
        },
        beforeMount() {
            const token = api.loadToken();
            if (token) {
                this.$store.dispatch(helpers.transactions.AUTH_USER, token);
            }
        }
    }
</script>

<style lang="scss">
    @import '~bootstrap/scss/bootstrap'; /* FIXME: multiple imports */
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    body {
        padding-bottom: 1rem;
        font-family: 'Roboto', sans-serif !important;
    }

    a {
        outline: none;
    }

    .notification-overlay {
        position: fixed;
        bottom: 2rem;
        right: 1rem;
        z-index: $zindex-popover;
    }

    .notification-container {
        position: absolute;
        bottom: 0;
        right: 0;
        width: auto;
    }

    blockquote {
        border-left: .25em solid $gray-700;
        padding: 0 1em;
    }
</style>
