import { useForm } from "../../hooks/useForm";
import { setAddreview, setMissatge, setReview, startLoadingReviews } from "./reviewSlice"

export const getReviews = (page = 0, id, authToken, usuari = "") => {

    return async (dispatch, getState) => {

        dispatch(startLoadingReviews());

        const headers = {

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "https://backend.insjoaquimmir.cat/api/places/" + id + "/reviews"

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setReview(resposta.data));
            console.log(resposta)
        }
        else {
            dispatch(setMissatge(resposta.message));
        }
        resposta.data.map((v) => {
            if (v.user.email === usuari) {
                dispatch(setAddreview(false));
                console.log("Te review");
            }
        });
    };
}
export const delReview = (review, authToken) => {

    return async (dispatch, getState) => {
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + review.place.id +
            "/reviews/" +
            review.id,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("OK");
            dispatch(setAddreview(true));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getReviews(0, review.place.id, authToken))
        }
    };
};
export const addReview= (review,id,authToken) => {
    return async (dispatch,getState) => {
        console.log(review);
        console.log(id);
        const data = await fetch(
            "https://backend.insjoaquimmir.cat/api/places/" + id +"/reviews",
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
                body: JSON.stringify({'review':review})
            }
        );
        const resposta = await data.json();
        console.log(resposta);
        if (resposta.success == true) {
            console.log("Review creat amb exit!!");
            dispatch(setAddreview(false));
            // usuari no l'indiquem i per defecta estarà a ""
            dispatch(getReviews(0,id,authToken))
        }else{
            console.log(resposta.message);
        }
    };
};