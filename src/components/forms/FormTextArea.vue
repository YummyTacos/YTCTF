<!-- YTCTF Platform
  Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
  See full NOTICE at http://github.com/YummyTacos/YTCTF -->
<template>
    <div class="form-group">
        <label :for="id">
            {{ label !== null ? label : placeholder }}
        </label>
        <textarea ref="input"
                  :value="value"
                  :id="id"
                  :required="required"
                  :placeholder="placeholder"
                  :class="validityClass"
                  @change="$emit('change', $event.target.value)"
                  v-bind="$attrs"
                  class="form-control bg-dark text-light"></textarea>
        <div class="invalid-feedback" v-if="error !== null">
            {{ error }}
        </div>
        <slot></slot>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde';
    import VueShowdown from 'vue-showdown'

    export default {
        name: "FormTextArea",
        inheritAttrs: false,
        model: {
            event: 'change'
        },
        props: {
            id: {
                type: String,
                required: true
            },
            required: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: null
            },
            label: {
                type: String,
                default: null
            },
            value: {
                default: null
            },
            error: {
                type: String,
                default: null
            },
            forceValidity: {
                type: String,
                default: null
            },
            mde: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            validityClass() {
                return this.forceValidity ? 'is-' + this.forceValidity : null;
            },

        },
        mounted() {
            if (!this.mde) {
                return;
            }
            let mde = new SimpleMDE({
                autoDownloadFontAwesome: false,
                blockStyles: {
                    italic: '_'
                },
                toolbar: [
                    'bold', 'italic', 'strikethrough', 'code',
                    'heading', 'quote', 'link', 'horizontal-rule',
                    'unordered-list', 'ordered-list', 'image', 'table', '|',
                    'preview', 'guide'
                ],
                previewRender: (md) => (new VueShowdown.showdown.Converter()).makeHtml(md),
                promptURLs: true,
                spellChecker: false,
                shortcuts: {
                    toggleSideBySide: null,
                    toggleFullScreen: null
                },
                element: document.getElementById(this.id)
            });
            if (this.value !== null) {
                mde.value(this.value);
            }
            mde.codemirror.on("change", () => this.$emit('change', mde.value()));
        }
    }
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap";
    @import "~simplemde/dist/simplemde.min.css";
    @import "../../assets/font-awesome-4/css/font-awesome.min.css";

    .CodeMirror, .editor-preview {
        background: $dark;
        color: $light;
    }

    .editor-toolbar {
        a {
            color: $light !important;
        }

        a.active {
            background: $dark;
        }

        i.separator {
            border-left: none;
        }
    }

    .editor-toolbar.disabled-for-preview a:not(.no-disable) {
        background: $gray-600;
    }


</style>
