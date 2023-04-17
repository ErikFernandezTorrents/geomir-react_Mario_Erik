import { startLoading,setPosts,setPost,setAdd,setError,setPage,setPages, stopLoading,setLike,setLikesCount,setFilter } from "./postSlice";

export const getPost =  (id, authToken) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())

        try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
            },
            method: "GET",
        })
        const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                dispatch(setPost(resposta.data))
                dispatch(stopLoading())
                dispatch(test_likes(id,authToken))
                console.log(resposta.data);
            }else{
                dispatch(setError(resposta.message));
            }

        }catch {
            console.log(data);
            alert("Estem tenint problemes amb la xarxa");
        }
    }
}

export const getPosts =  (authToken, page) =>{
    return async (dispatch, getState) => {
        dispatch(startLoading());
        const filter = getState().post.filter

        let url = page>0 ? "https://backend.insjoaquimmir.cat/api/posts?paginate=1&page=" + page : "https://backend.insjoaquimmir.cat/api/posts/"
        
        let interrogante = page>0 ? "&" : "?"
        let body = filter.body == ""? "" : "body="+filter.body 
        let author = filter.author == ""? "": "author="+filter.author

        url= url + interrogante+body+"&"+author

        try{
        const data = await fetch(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + authToken
                },
                method: "GET",
        })

        const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                if (page > 0) {
                    dispatch(setPosts(resposta.data.collection));
                    dispatch(setPages(resposta.data.links));
                    console.log(resposta.data.links);
                    dispatch(stopLoading())
                } else {
                dispatch(setPosts(resposta.data));
                dispatch(stopLoading())
                }  
            }else{
                dispatch(setError(resposta.message));
            }

        }catch (e) {
            console.log(e);
            alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
        }
  }
}

export const deletePost =  (postid, authToken) =>{
    return async (dispatch, getState) => {

        try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + postid, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
            },
            method: "DELETE",
        })

        const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                console.log("Post eliminat correctament");
                dispatch(getPosts(authToken))
            }else{
                dispatch(setError(resposta.message));
            }

        }catch (e) {
            console.log(e);
            alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
        }
  }
}

export const addPost = (data2,authToken) => {
    return async (dispatch, getState) => {
        let {body,upload,latitude,longitude,visibility=1}=data2;
        var formData = new FormData();
        formData.append("body", body);
        formData.append("upload", upload);
        formData.append("latitude", latitude);
        formData.append("longitude", longitude);
        formData.append("visibility", visibility);

        try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + authToken
            },
            method: "POST",
            body: formData

        })
        const resposta = await data.json();
        if (resposta.success === true){
            dispatch(setAdd(resposta.data))
            console.log(resposta);
            dispatch(getPosts(authToken))
        } 

        else{
            dispatch(setError(resposta.message));
        } 
            
        }catch{
        console.log("Error");
        alert("catch");
        }
    }
}

export const editPost = (formulari, authToken, id) => {

    return async (dispatch, getState) => {

    let {upload,latitude,longitude,visibility}=formulari;
    console.log(formulari);
    var formData = new FormData();
    formData.append("body", body);
    formData.append("upload", upload);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("visibility", visibility);

    try{
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + authToken
        },
        method: "POST",
        body: formData

      })
      const resposta = await data.json();
      if (resposta.success === true){
        console.log("Post editat amb exit!!");
      } 

      else{
        console.log(resposta.message)
      } 
        
    }catch(e){
      console.log(e);
      alert("catch");
    }
  }
}

export const test_likes = (id,authToken)  =>{
    return async (dispatch, getState) => {
        try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
            },
            method: "post",
        })

        const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
                    headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + authToken
                    },
                    method: "delete",
                })
            }else{
                dispatch(setLike(true));
            }
        }catch {
        console.log(data);
        alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
        }
  }
}

export const likes = (id, authToken, post) =>{
    return async (dispatch, getState) => {
        try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
            },
            method: "post",
        })
        console.log(data);
        const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                console.log("Like fet correctament");
                dispatch(setLike(true));
                dispatch(setPosts({...post, likes_count: post.likes_count+1}));
            }else{
                setMissatge(resposta.message);
            }
        }catch {
        alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
        }
  }
}

export const unlike = (id, authToken, post) =>{
    return async (dispatch, getState) => {
        try{
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id+"/likes", {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + authToken
            },
            method: "delete",
        })

        const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                console.log("Like eliminat correctament");
                dispatch(setLike(false));
                dispatch(setPosts({...post, likes_count: post.likes_count-1}));
            }else{
                setMissatge(resposta.message);
            }
        }catch {
        console.log(data);
        alert("Estem tenint problemes amb la xarxa o amb l'informació a les rutes");
        }
    }
}