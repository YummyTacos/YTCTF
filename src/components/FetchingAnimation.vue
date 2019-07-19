<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="d-flex fetching-container">
        <svg v-if="!error"
             viewBox="0 0 64 64"
             xmlns="http://www.w3.org/2000/svg"
             stroke="#fff"
             class="fetching">
            <g fill="none" fill-rule="evenodd" stroke-width="2">
                <circle cx="32" cy="32" r="1">
                    <animate attributeName="r"
                             begin="0s" dur="1.8s"
                             values="1; 30"
                             calcMode="spline"
                             keyTimes="0; 1"
                             keySplines="0.165, 0.84, 0.44, 1"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-opacity"
                             begin="0s" dur="1.8s"
                             values="1; 0"
                             calcMode="spline"
                             keyTimes="0; 1"
                             keySplines="0.3, 0.61, 0.355, 1"
                             repeatCount="indefinite"></animate>
                </circle>
                <circle cx="32" cy="32" r="1">
                    <animate attributeName="r"
                             begin="-0.9s" dur="1.8s"
                             values="1; 30"
                             calcMode="spline"
                             keyTimes="0; 1"
                             keySplines="0.165, 0.84, 0.44, 1"
                             repeatCount="indefinite"></animate>
                    <animate attributeName="stroke-opacity"
                             begin="-0.9s" dur="1.8s"
                             values="1; 0"
                             calcMode="spline"
                             keyTimes="0; 1"
                             keySplines="0.3, 0.61, 0.355, 1"
                             repeatCount="indefinite"></animate>
                </circle>
            </g>
        </svg>
        <p v-else class="fetch-failed text-danger">
            Произошла ошибка при загрузке
        </p>
    </div>
</template>

<script>
    export default {
        name: "FetchingAnimation",
        props: {
            error: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~bootstrap/scss/bootstrap.scss";

    .fetching {
        width: 64px;
        height: 64px;
    }

    .fetching-container {
        place-content: center;
        align-items: center;
    }

    .fetch-failed {
        font-size: 2rem;
    }

    @include media-breakpoint-up(md) {
        .fetching {
            width: 96px;
            height: 96px;
        }
    }
</style>