// /store/error.js

import { defineStore } from 'pinia';
import { ref, reactive, watch } from 'vue';

export const useErrorStore = defineStore('error', () => {

    const errorList = ref([]);
    const idCount = ref(0);

    const defaultError = {
        message: '',
        showError: true,
        autoDelete: true,
        autoClose: 15000,

        txtColor: 'text',
        bgColor: 'error',
        icon: 'mdi-cancel',
        timerPosition: 'bottom',
        btnText: 'Close',
        contained: false,
    };

    
    const addNewError = (ErrOptions = defaultError) => {
        //console.log("Adding error:", ErrOptions);
        errorList.value.push( 
            reactive(
                {
                ...defaultError,
                ...ErrOptions, 
                id: idCount.value++
            }
        ) 
        );
        console.log("Adding error:", ErrOptions);
    }
    
    // Watch for changes in the error list delete expired errors
    watch(errorList, (newList, oldList) => {
        newList.forEach((errorItem,index) => {
            if(errorItem.autoDelete && !errorItem.showError){
                errorList.value.splice(index, 1); 
            }
        })
    }, {deep: true});

    return {
        errorList, 
        addNewError
    };
});