<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-info sticky-top" id="navbar">
        <router-link class="navbar-brand" to="/">
            <!--<img src="../../public/static/favicon-32x32.png" class="d-inline-block align-top"
                 alt="YTCTF logo"/>-->
            <img src="/svg/taco.svg"
                 width="32"
                 height="32"
                 class="d-inline-block align-top"
                 alt="logo">
            YTCTF
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
                data-target="#navbar-content">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-content">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'articles'}">
                        Статьи
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'tasks'}">
                        Задания
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'scoreboard'}">
                        Результаты
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{name: 'about'}">
                        О платформе
                    </router-link>
                </li>
                <!--<template v-if="user !== null && user.is_admin">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                            Админка
                        </a>
                        <div class="dropdown-menu bg-info">
                            <router-link class="dropdown-item bg-info text-light"
                                         :to="{name: 'addTask'}">
                                Добавить таск
                            </router-link>
                            <router-link class="dropdown-item bg-info text-light"
                                         :to="{name: 'recalculate'}">
                                Пересчитать баллы
                            </router-link>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
                            Платформа
                        </a>
                        <div class="dropdown-menu bg-info">
                            <router-link class="dropdown-item bg-info text-light"
                                         :to="{name: 'submits'}">
                                Посылки
                            </router-link>
                            <router-link class="dropdown-item bg-info text-light"
                                         :to="{name: 'exceptions'}">
                                Логи падений
                            </router-link>
                        </div>
                    </li>
                </template>-->
            </ul>
            <div>
                <template v-if="user !== null">
                    <p class="d-md-inline mr-md-2">
                        Привет,
                        <router-link :to="{name: 'user', params: {'id': user.id}}"
                                     class="text-light">
                            <b>{{ user.username }}</b>
                        </router-link>
                        ({{ user.is_admin ? 'admin' : user.points }})
                    </p>
                    <button class="btn btn-danger" @click="deauth">Выйти</button>
                </template>
                <ModalTrigger v-else
                              for-modal="loginModal"
                              btn-color="success">
                    Войти
                </ModalTrigger>
            </div>
        </div>
    </nav>
</template>

<script>
    import ModalTrigger from "./modals/ModalTrigger";
    import helpers from "../helpers";

    export default {
        name: 'NavBar',
        components: {
            ModalTrigger
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
        methods: {
            deauth() {
                this.$store.dispatch(helpers.transactions.DEAUTH_USER);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import '~bootstrap/scss/bootstrap';

    .nav-link {
        &.router-link-exact-active {
            @extend .active;
        }

        outline: none;
    }

    .navbar-brand {
        outline: none;
    }
</style>