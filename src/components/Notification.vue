<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="toast border border-light rounded" role="alert" :id="'notification' + notification.id">
        <div class="toast-header" :class="colorClass">
            <strong class="mr-auto">{{ header }}</strong>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body" :class="colorClass">
            {{ notification.text }}
        </div>
    </div>
</template>

<script>
    import jQuery from 'jquery'
    import helpers from "../helpers";
    export default {
        name: 'Notification',
        props: {
            notification: Object,
        },
        mounted() {
            const toastSel = jQuery(`#notification${this.notification.id}`);
            toastSel.toast({
                delay: 5000
            });
            toastSel.toast('show');
            toastSel.on('hidden.bs.toast', () => {
                this.$store.commit(helpers.transactions.REMOVE_NOTIFICATION, this.notification.id)
            })
        },
        computed: {
            colorClass() {
                let color = this.notification.color;
                let fgColor = 'light';
                if (color === null) {
                    color = 'info';
                    fgColor = 'dark';
                } else if (color === 'warning') {
                    fgColor = 'dark';
                }
                return [`bg-${color}`, `text-${fgColor}`];
            },
            header() {
                const header = this.notification.header;
                if (header !== null) {
                    return header;
                }
                let color = this.notification.color;
                const headerMap = {
                    success: 'Успех',
                    warning: 'Предупреждение',
                    danger: 'Ошибка',
                    info: 'Сообщение'
                };
                if (color === null) {
                    color = 'info';
                }
                return headerMap[color] || headerMap.info;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap";

    .toast {
        min-width: calc(100vw - 2rem);
    }
    @include media-breakpoint-up(md) {
        .toast {
            min-width: 33vw;
        }
    }
    @include media-breakpoint-up(lg) {
        .toast {
            min-width: 25vw;
        }
    }
    
    .text-light {
        text-shadow: $dark 0 0 1rem;
    }

    .text-dark {
        text-shadow: $light 0 0 1rem;
    }
</style>