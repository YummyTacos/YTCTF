<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="scoreboard-row" :class="{self: user.id === currentUserId}">
        <div class="scoreboard-info">
            <router-link class="scoreboard-user" :to="{name: 'user', params: {id: user.id}}">
                {{ user.username }}
            </router-link>
            <div class="scoreboard-extra">{{ full_name }}</div>
        </div>
        <div class="scoreboard-points">{{ user.points }}</div>
    </div>
</template>

<script>
    export default {
        name: 'ScoreboardRow',
        props: {
            user: Object,
            default: null
        },
        computed: {
            currentUserId() {
                const u = this.$store.state.user;
                return u !== null ? u.id : -1;
            },
            full_name() {
                let n = this.user.first_name;
                if (this.user.last_name !== null) {
                    n += ` ${this.user.last_name}`
                }
                return n;
            }
        }
    }
</script>

<style scoped lang="scss">
    .scoreboard-row {
        padding: 0.5rem;
        display: grid;
        grid-template-columns: 70fr 25fr;
        grid-column-gap: 1rem;
        align-items: start;

        &.self {
            background: #254b25 !important;
        }

        &:nth-child(even) {
            background: #4a5055;
        }
    }

    .scoreboard-info {
        overflow-x: auto;
        overflow-y: hidden;
    }

    .scoreboard-user {
        font-weight: bold;
    }

    .scoreboard-extra {
        font-size: 0.75rem;
        font-weight: normal;
        display: block;
        margin-top: 0.25rem;
    }

    .scoreboard-points {
        font-size: 2rem;
        justify-self: end;
    }
</style>