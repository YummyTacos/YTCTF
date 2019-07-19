/** YTCTF Platform
 * Copyright © 2019 Evgeniy Filimonov <evgfilim1@gmail.com>
 * See full NOTICE at http://github.com/YummyTacos/YTCTF
 */
import api from "./api";

export default {
    defaultErrorHandler(resp, status) {
        const r = resp || {};
        const errText = status.status !== 0 && status.status !== 502 ?
            `Произошла ошибка ${status.status} ${status.text}: ${r.message}` :
            'Невозможно соединиться с сервером';
        return {
            text: errText,
            color: 'danger'
        };
    },
    objCmp(a, b) {
        for (let key in a) {
            if (!a.hasOwnProperty(key)) {
                continue;
            }
            if (!b.hasOwnProperty(key) || a[key] !== b[key]) {
                return false;
            }
        }
        for (let key in b) {
            if (!b.hasOwnProperty(key)) {
                continue;
            }
            if (!a.hasOwnProperty(key) || a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    },
    transactions: {
        ADD_NOTIFICATION: 'addNotification',
        REMOVE_NOTIFICATION: 'removeNotification',
        AUTH_USER: 'authUser',
        DEAUTH_USER: 'deauthUser',
        UPDATE_USER: 'updateUser'
    },
    getUser(onSuccess, context) {
        const self = this;
        api.get(api.method.user, {
            onSuccess,
            onFail(r, status) {
                if (status.status === 400 && r.error_code === 11) {
                    // Token was revoked or expired
                    api.unloadToken();
                    return;
                }
                const err = self.defaultErrorHandler(r, status);
                context.commit(self.transactions.ADD_NOTIFICATION, err);
            }
        });
    }
};
