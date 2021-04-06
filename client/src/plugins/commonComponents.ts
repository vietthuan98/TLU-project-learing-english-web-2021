import Vue from 'vue';
import ErrorText from '@/commonComponents/form/ErrorText.vue';
import TextInput from '@/commonComponents/form/TextInput.vue';

const Forms = [
    {
        name: 'ErrorText',
        component: ErrorText,
    },
    {
        name: 'TextInput',
        component: TextInput,
    },
]


const components = [
    ...Forms,
]

components.forEach(item => Vue.component(`Common${item.name}`, item.component));