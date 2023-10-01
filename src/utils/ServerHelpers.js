import {backendUrl} from '../utils/Config.js'


export const makeUnauthenticatedPostRequest = async (route, body)=>{
    const response = await fetch(backendUrl + route, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
}



export const authenticatedGetRequest = async (route, Cookie)=>{
    const response = await fetch(backendUrl + route, {
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${Cookie.userId}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
}

export const authenticatedPatchRequest = async (route, Cookie)=>{
    const response = await fetch(backendUrl + route, {
        method : "PATCH",
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${Cookie.userId}`,
        },
    });
    const formattedResponse = await response.json();
    return formattedResponse;
}




export const authenticatedPostRequest = async (route, Cookie, body)=>{
    const response = await fetch(backendUrl + route, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${Cookie.userId}`,
        },
        body : JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
}



export const authenticatedPostRequestWithFile= async (route, Cookie, body, changePlaylistImg) => {
    const imgFile = changePlaylistImg.updatedPlaylistImg;
    const songFile = '';
    const formdata = new FormData();
    formdata.append('text', JSON.stringify(body));  // Ensure info is stringified here
    if(imgFile){
        formdata.append('image', imgFile);
    }if(songFile){
        formdata.append("song", songFile);
    }
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${Cookie.userId}`,
        },
        body: formdata,
    });

    const formattedResponse = {
        status: response.status,
        data: await response.json()
    };

    return formattedResponse;
}