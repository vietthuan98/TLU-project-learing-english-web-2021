import Vue from 'vue';
import store, { ROOT_MUTATION } from '../store';

Vue.mixin({
    methods: {
        showPopupMessage(message?: string, isError = false) {
            store.commit(ROOT_MUTATION.SET_POPUP_MESSAGE, {
                message,
                isError
            })
        }
    }
});