import { delPlace, setAddreview, setMissatge, setPlace, setPlaces, startLoadingPlaces,setFavourite,setPages,setFiltre } from "./placeSlice"

export const getPlaces = (page, authToken) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingPlaces());
        const filtre = getState().places.filter
        
        console.log(filtre);
        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        let url =  page > 0 ? 
        "https://backend.insjoaquimmir.cat/api/places?paginate=1&page=" + page 
        : 
        "https://backend.insjoaquimmir.cat/api/places" ;


        let interAnd = page > 0 ? "&" : "?" ;

        let filterDescr = filtre.description == "" ? "" : "description="+filtre.description;

        let filterAuth = filtre == "" ? "" : "author="+filtre.author;

        url = url+interAnd+filterDescr+interAnd+filterAuth;
        
        console.log(url);
        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            if (page > 0) {

                dispatch(setPlaces(resposta.data.collection));
                
                dispatch(setPages(resposta.data.links));
                
                console.log(resposta.data.links);
                
            } else {
                
                dispatch(setPlaces(resposta.data));
                
            }
        }
        else {
            dispatch(setMissatge(resposta.message));
        }
    }
}
export const getPlace = ( id, authToken) => {

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
            dispatch(test_favourite(id,authToken));////
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
export const addPlace = (data2,authToken) => {
    let {name,description,upload,latitude,longitude,visibility=1}=data2;
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
        dispatch(setMissatge(resposta.message));
      }
    }
}
export const editPlace = (id,authToken,formulari) => {
    let {name,description,upload,latitude,longitude,visibility}=formulari;
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
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id;

        const data = await fetch(url, headers);
        console.log(data);
        const resposta = await data.json();
        
      if (resposta.success === true){
        console.log(resposta);
        dispatch(setMissatge("Place editat amb exit!!"));
      } 

      else{
        console.log(resposta.message)
        dispatch(setMissatge(resposta.message));
      }
    }
  }
  export const test_favourite = (id,authToken) => {

    return async (dispatch, getState) => {
        //dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id +"/favorites";

        const data = await fetch(url, headers);
        console.log(data);
        const resposta = await data.json();
        
      if (resposta.success === true){
        console.log("He dado favorite de prueva por que no hay ninguno");
        const data = await fetch("https://backend.insjoaquimmir.cat/api/places/" + id +" /favorites", {
              headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + authToken
              },
              method: "DELETE",
          })
          dispatch(setFavourite(false))

      } 

      else{
            dispatch(setFavourite(true));
      }
    }
  }
  export const favPlace = (id,authToken,place) => {

    return async (dispatch, getState) => {
        //dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id +"/favorites";

        const data = await fetch(url, headers);
        console.log(data);
        const resposta = await data.json();
        
      if (resposta.success === true){
            console.log("doy favorito");
            dispatch(setFavourite(true));
            dispatch(setPlace({...place, favorites_count: place.favorites_count+1 }));

      } 

      else{
        console.log("Error al dar favourite");
        console.log(resposta.message)
      }
    }
  }
  export const deleteFav = (id,authToken,place) => {

    return async (dispatch, getState) => {
        //dispatch(startLoadingPlaces());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "DELETE",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id +"/favorites";

        const data = await fetch(url, headers);
        console.log(data);
        const resposta = await data.json();
        
      if (resposta.success === true){
            console.log("quito favorito");
            dispatch(setFavourite(false));
            dispatch(setPlace({...place, favorites_count: place.favorites_count-1 }));

      }  else{
        console.log("Error al dar unfavourite");
      }
    }
  }