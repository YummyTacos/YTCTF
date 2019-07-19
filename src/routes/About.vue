<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div>
        <h1>Платформа YTCTF</h1>
        <h2>Веб-интерфейс</h2>
        <p>
            Распространяется по лицензии
            <a href="//spdx.org/licenses/AGPL-3.0-or-later.html">AGPL-3.0-or-later</a>
            <br/>
            Репозиторий: <a href="//github.com/YummyTacos/YTCTF" target="_blank">GitHub</a>
            <br/>
            Разработка и техническое сопровождение:
            <a href="//evgfilim1.me" target="_blank">Евгений Филимонов</a>
        </p>
        <h2 v-if="uptime !== null">Работает на основе <i>YTCTF API v{{ version }}</i>.</h2>
        <p v-if="uptime !== null">
            <router-link :to="{name: 'apiDoc'}">Документация (на английском)</router-link>
            <br/>
            Запущено в течение {{ uptimeStr }}
            <br/>
            Распространяется по лицензии
            <a :href="license.url">{{ license.name }}</a>
            <br/>
            <a :href="repo" target="_blank">Репозиторий</a>
            <br/>
            Разработка и техническое сопровждение:
            <a :href="contact.url">{{ contact.name }}</a>
        </p>
        <hr/>
        <p class="text-muted">Copyright &copy; Евгений Филимонов, 2019</p>
    </div>
</template>

<script>
    import api from "../api";

    export default {
        name: "About",
        data() {
            return {
                repo: null,
                contact: null,
                uptime: null,
                version: null,
                license: null
            }
        },
        computed: {
            uptimeStr() {
                if (this.uptime === null) {
                    return '';
                }
                let up = this.uptime;
                let time = {
                    s: up % 60,
                    m: Math.floor(up / 60) % 60,
                    h: Math.floor(up / 3600) % 60,
                    d: Math.floor(up / 86400)
                };
                if (time.h < 10) {
                    time.h = '0' + time.h;
                }
                if (time.m < 10) {
                    time.m = '0' + time.m;
                }
                if (time.s < 10) {
                    time.s = '0' + time.s;
                }
                return `${time.d}:${time.h}:${time.m}:${time.s}`
            }
        },
        beforeMount() {
            const vm = this;
            api.get(api.method.about, {
                onSuccess(r) {
                    vm.version = r.version;
                    vm.uptime = r.uptime;
                    vm.repo = r.repository;
                    vm.contact = {url: r.contact_url, name: r.contact};
                    vm.license = {url: r.license_url, name: r.license};
                }
            })
        }
    }
</script>

<style scoped>

</style>