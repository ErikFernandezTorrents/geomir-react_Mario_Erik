import { delPlace, setAddreview, setMissatge, setPlace, setPlaces, startLoadingPlaces } from "./placeSlice"

export const getPlaces = (page = 0, authToken) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places";

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            console.log(resposta.data);
            dispatch(setPlaces(resposta.data));
        }
        else {
            dispatch(setMissatge(resposta.message));
        }
    }
}
export const getPlace = (page = 0, id, authToken) => {

    return async (dispatch, getState) => {

        dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id;

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            console.log(resposta.data);
            dispatch(setPlace(resposta.data));
        }
        else {
            dispatch(setMissatge(resposta.message));
        }
    };

}

export const deletePlace = (id, authToken) => {

    return async (dispatch, getState) => {
        dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "DELETE",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id;

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            console.log(resposta.data);
            console.log("Place eliminat correctament");
            dispatch(getPlaces(0, authToken));
        }
        else {
            dispatch(setMissatge(resposta.message));
        }
    }
}
export const addPlace = (authToken,formulari) => {
    let {name,description,upload,latitude,longitude,visibility=1}=formulari;
    console.log('formulari');
    var formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    return async (dispatch, getState) => {
        dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: formData
        };
        const url = "https://backend.insjoaquimmir.cat/api/places";

        const data = await fetch(url, headers);
        const resposta = await data.json();

      if (resposta.success === true){
        console.log(resposta);
        dispatch(setMissatge("Place creat amb exit!!"));
        dispatch(getPlaces(0,authToken));
      } 

      else{
        console.log(formulari)
        dispatch(setMissatge(resposta.message));
      }
      navigate("/places/list");
    }
  }