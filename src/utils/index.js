
export const getFormBody = (params) => {
    let formBody = [];

    for(let property in params){
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(params[property]);

        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&');
};

export const setItemInLocalStorage = (key,value) => {
    if(!key && !value){
        console.log("Can not store in Local storage");
        return;
    }

    const valueToStore = typeof(value) !== "string" ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
}

export const getItemFromLocalStorage = (key) => {
    if(!key){
        console.log("Can not get the value in local storage");
        return null;
    }
    return localStorage.getItem(key);
}

export const removeItemFromLocalStorage = (key) => {
    if(!key){
        console.log("Can not get the value in local storage");
        return;
    }
    localStorage.removeItem(key);
}