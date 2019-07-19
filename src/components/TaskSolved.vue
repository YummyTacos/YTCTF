<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div v-if="task.solved_by.length">
        <h3>Это задание решили</h3>
        <ul class="list-group">
            <li v-for="u in task.solved_by"
                class="list-group-item"
                :class="checkSelfClass(u.id)"
                :key="u.id">
                <router-link :to="{name: 'user', params: {id: u.id}}"
                             class="text-dark">
                    {{ u.username }}
                </router-link>
            </li>
        </ul>
    </div>
    <p v-else>
        <i id="not-solved" class="text-danger">
            Это задание ещё не было никем решёно. Будь первым!
        </i>
    </p>
</template>

<script>
    export default {
        name: "TaskSolved",
        props: {
            task: {
                type: Object,
                required: true
            }
        },
        methods: {
            checkSelfClass(id) {
                const user = this.$store.state.user;
                if (user !== null && user.id === id) {
                    return 'list-group-item-success'
                }
                return 'list-group-item-dark'
            }
        },
    }
</script>

<style scoped>
    #not-solved {
        font-size: 2rem;
    }

</style>