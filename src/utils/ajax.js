"use strict";

//Ruta de la API
const rutaBackend = "http://localhost:3000/api/";

//PETICIONES
async function peticionGET(url, params) {
    //Crear la ruta completa
    let oURL = new URL(rutaBackend);
    oURL.pathname += url;

    //Añadir los datos de los parametros -> FormData
    for (let [clave, valor] of params) {
        oURL.searchParams.append(clave, valor);
    }

    //Hacer la petición AJAX con el método fetch. 
    let serverResponse = await fetch(oURL, { method: "GET" });
    let response;

    //Respuesta ok (200) -> guardar los datos recibidos en JSON
    if (serverResponse.ok) {
        response = await serverResponse.json();

        //Respuesta no ok (!= 200) -> mostrar el error
    } else {
        if (serverResponse.status == 404) {
            response = await serverResponse.json();
            console.warn("Petición: " + oURL.toString() + " Respuesta: " + serverResponse.status);
        } else {
            response = {
                ok: false,
                data: null,
                message: "Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")"
            };
            console.error("Petición: " + oURL.toString() + " Respuesta: " + serverResponse.status);
        }
    }

    return response;
}

async function peticionPOST(url, params) {
    //Crear la ruta completa
    let oURL = new URL(rutaBackend);
    oURL.pathname += url;

    //Hacer la petición AJAX con el método fetch.
    let serverResponse = await fetch(oURL, {
        body: params,
        method: "POST"
    });
    let response;

    //Respuesta ok (200)
    if (serverResponse.ok) {
        response = await serverResponse.json();
        //Respuesta no ok (!= 200)
    } else {

        console.error("Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")");
        response = {
            ok: false,
            data: null,
            message: "Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")"
        };
    }
    return response;
}

async function peticionPUT(url, obj) {
    //Crear la ruta completa 
    let oURL = new URL(rutaBackend);
    oURL.pathname += url;

    //Hacer la petición AJAX con el método fetch.
    let serverResponse = await fetch(oURL, {
        body: JSON.stringify(obj),
        method: "PUT"
    });
    let response;

    //Respuesta ok (200)
    if (serverResponse.ok) {
        response = await serverResponse.json();
    } else {
        console.error("Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")");
        response = {
            ok: false,
            data: null,
            message: "Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")"
        };
    }

    return response;
}

async function peticionDELETE(url) {
    //Crear la ruta completa 
    let oURL = new URL(rutaBackend);
    oURL.pathname += url;

    //Hacer la petición AJAX con el método fetch.
    let serverResponse = await fetch(oURL, { method: "DELETE" });
    let response;

    //Respuesta ok (200)
    if (serverResponse.ok) {
        //No se reciben datos en caso de una petición DELETE, 
        //Construimos la respuesta manualmente
        response = {
            ok: true,
            data: null,
            message: "Borrado correcto"
        };
        //Respuesta no ok (!= 200)
    } else {
        console.error("Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")");
        response = {
            ok: false,
            data: null,
            message: "Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")"
        };
    }
    return response;
}

async function peticionPOSTJSON(url, obj) {
    //Crear la ruta completa 
    let oURL = new URL(rutaBackend);
    oURL.pathname += url;

    //Hacer la petición AJAX con el método fetch.
    let serverResponse = await fetch(oURL, {
        body: JSON.stringify(obj),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let response;

    //Respuesta ok (200)
    if (serverResponse.ok) {
        response = await serverResponse.json();
        //Respuesta no ok (!= 200)
    } else {
        if (serverResponse.status == 404) {
            console.warn("Respuesta: " + serverResponse.status + ", datos no registados en la base de datos");
            response = {
                ok: false,
                data: null,
                message: "Respuesta: " + serverResponse.status + ", datos no registados en la base de datos"
            };

        } else {
            console.error("Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")");
            response = {
                ok: false,
                data: null,
                message: "Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")"
            };

        }
    }
    return response;
}

async function peticionPUTJSON(url, obj) {
    //Crear la ruta completa 
    let oURL = new URL(rutaBackend);
    oURL.pathname += url;

    //Hacer la petición AJAX con el método fetch.
    let serverResponse = await fetch(oURL, {
        body: JSON.stringify(obj),
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let response;

    //Respuesta ok (200)
    if (serverResponse.ok) {
        response = await serverResponse.json();
    } else { //Resuesta no ok (!= 200)
        console.error("Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")");
        response = {
            ok: false,
            data: null,
            message: "Error al acceder al servidor (STATUS != 200..209 " + serverResponse.status + ")"
        };
    }

    return response;
}

export { peticionGET, peticionPOST, peticionDELETE, peticionPOSTJSON, peticionPUT, peticionPUTJSON }

