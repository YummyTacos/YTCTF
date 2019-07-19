<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div>
        <div class="custom-control custom-checkbox my-1">
            <input type="checkbox" class="custom-control-input" id="show-all" v-model="full">
            <label for="show-all" class="custom-control-label">Показать всех</label>
        </div>
        <template v-if="loaded">
            <div v-if="board.length" id="scoreboard">
                <ScoreboardRow v-for="user in board"
                               :user="user"
                               :key="user.id"/>
            </div>
            <p v-else>
                <i>Список пуст</i>
            </p>
        </template>
        <FetchingAnimation v-else/>
    </div>
</template>

<script>
    import ScoreboardRow from "../components/ScoreboardRow";
    import FetchingAnimation from "../components/FetchingAnimation";
    import helpers from '../helpers';
    import api from '../api';

    export default {
        name: 'Scoreboard',
        components: {
            FetchingAnimation,
            ScoreboardRow
        },
        data() {
            return {
                board: [],
                full: false,
                loaded: false,
                error: null,
                interval: null
            }
        },
        watch: {
            full() {
                this.loaded = false;
                this.fetch();
            }
        },
        methods: {
            fetch() {
                const vm = this;
                api.get(api.method.users, {
                    onSuccess(r) {
                        const filterFn = vm.full ?
                            (e) => !(e.is_admin || e.author_of_tasks.length) :
                            (e) => !(e.is_admin || e.points <= 0 || e.author_of_tasks.length);
                        vm.board = r.users.filter(filterFn);
                        vm.board.sort((a, b) => b.points - a.points);
                        vm.loaded = true;
                        vm.error = null;
                    },
                    onFail(r, status) {
                        vm.loaded = false;
                        const err = helpers.defaultErrorHandler(r, status);
                        if (vm.error === null || helpers.objCmp(vm.error, err)) {
                            vm.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
                            vm.error = err;
                        }
                    }
                });
            }
        },
        beforeMount() {
            setTimeout(() => this.fetch(), 0);
            this.interval = setInterval(this.fetch, 5000);
        },
        beforeDestroy() {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
</script>

<style scoped>
    #scoreboard {
    background: #212529;
}
</style>