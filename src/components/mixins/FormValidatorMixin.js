/** YTCTF Platform
 * Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
 * See full NOTICE at http://github.com/YummyTacos/YTCTF
 */

import helpers from "../../helpers";

/** TODO: improve or fix this
 * e.g. `watch` and `data` generator as in Vuex
 */

export default {
    data() {
        return {
            validated: false
        }
    },
    computed: {
        formFields() {
            let fields = {};
            let forms = this.$refs;
            for (let key in forms) {
                fields[key] = forms[key].$refs.input;
            }
            return fields;
        },
        field() {
            return {
                text: '',
                error: null
            }
        }
    },
    methods: {
        resetError(target) {
            this.validated = false;
            this[target].error = null;
            this.formFields[target].setCustomValidity('');
        },
        preValidateForm(target) {
            for (const field in this.formFields) {
                if (!this.formFields.hasOwnProperty(field)) {
                    continue;
                }
                this.resetError(field)
            }
            this.validated = true;
            if (!target.checkValidity()) {
                for (let field in this.formFields) {
                    if (!this.formFields.hasOwnProperty(field)) {
                        continue;
                    }
                    const el = this.formFields[field];
                    if (this[el.id] === undefined || el.validity.valid) {
                        continue;
                    }
                    this[el.id].error = el.validationMessage;
                }
                // return;
            }
        },
        defaultOnFail(r, status) {
            if (status.status === 400 || status.status === 401) {
                const error = r.message;
                this[r.key].error = error;
                const field = this.formFields[r.key];
                if (field !== undefined) {
                    field.setCustomValidity(error);
                }
            } else {
                const err = helpers.defaultErrorHandler(r, status);
                this.$store.commit(helpers.transactions.ADD_NOTIFICATION, err);
            }
        }
    },
};
