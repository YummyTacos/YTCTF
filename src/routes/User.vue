<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div v-if="user !== null">
        <h1>Профиль пользователя {{ user.username }}</h1>
        <div class="row">
            <div class="profile-column col">
                <h2>Информация о пользователе</h2>
                <div>
                    <label>Имя пользователя</label>
                    <p class="user-info">{{ user.username }}</p>
                </div>
                <div>
                    <label>Имя</label>
                    <p class="user-info">{{ user.first_name }}</p>
                </div>
                <div v-if="user.last_name">
                    <label>Фамилия</label>
                    <p class="user-info">{{ user.last_name }}</p>
                </div>
            </div>
            <div class="profile-column col">
                <h2>Достижения на платформе</h2>
                <p class="points">Баллов заработано: <b><i>{{ user.points }}</i></b></p>
                <details v-if="user.solved_tasks.length">
                    <summary>Решённые таски</summary>
                    <div v-for="task in user.solved_tasks"
                         :key="task.id">
                        <router-link :to="{name: 'task', params: {task_id: task.id}}">
                            {{ task.title }} ({{ task.category.name }}{{ task.points }})
                        </router-link>
                        <abbr v-if="user.first_blood_tasks.find((e) => e.id === task.id)"
                              :title="user.username + ' решил этот таск первым'">
                            (first blood)
                        </abbr>
                    </div>
                    <!--<br/>-->
                </details>
                <details v-if="user.author_of_tasks.length">
                    <summary>Созданные таски</summary>
                    <router-link v-for="task in user.author_of_tasks"
                                 :key="task.id"
                                 :to="{name: 'task', params: {task_id: task.id}}">
                        {{ task.task }} ({{ task.category }}{{ task.points }})
                    </router-link>
                    <!--<br/>-->
                </details>
            </div>
        </div>
    </div>
    <FetchingAnimation v-else :error="failed"/>
</template>

<script>
    import FetchingAnimation from "../components/FetchingAnimation";
    import helpers from "../helpers";
    import api from '../api';

    export default {
        name: "User",
        components: {
            FetchingAnimation
        },
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                user: null,
                failed: false
            }
        },
        methods: {
            fetch(id) {
                this.user = null;
                const vm = this;
                api.get(api.method.user, {
                    data: {
                        id
                    },
                    onSuccess(r) {
                        vm.user = r.user;
                    },
                    onFail(r, status) {
                        const err = helpers.defaultErrorHandler(r, status);
                        vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                        vm.failed = true;
                    }
                })
            }
        },
        watch: {
            '$route'() {
                this.fetch(this.$route.params.id);
            }
        },
        beforeMount() {
            this.fetch(this.id);
        }
    }
</script>

<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap";

    .profile-column {
        width: 100%;
        padding-bottom: 1rem;
    }

    @include media-breakpoint-up(md) {
        .profile-column {
            padding-right: 1rem;
            width: calc(50% - 2rem);
            display: inline-block;
        }
    }

    .points {
        font-size: 1.25rem;
    }

    .user-info {
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        padding: 0.375rem 0.75rem;
    }
</style>