import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";

export const useLogin = () => {

    let { usuari, setUsuari,authToken,setAuthToken,idUser,setIdUser } = useContext(UserContext)
    let [missatge, setMissatge] = useState("");

    const checkAuthToken = async () => {

        let miStorage = localStorage.getItem("authToken") || "" ;

        if ( miStorage.length > 0 ){

            try {
                const data = await fetch("https://backend.insjoaquimmir.cat/api/user", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + miStorage,
                },
                method: "GET"
                })
                const resposta = await data.json();
                if (resposta.success === true) {
                    console.log(resposta);
                    setAuthToken(miStorage)
                    setUsuari(resposta.user.email);
                    setIdUser(resposta.user.id);
                } else {
                    setAuthToken("")
                }
            } catch (err) {
                setAuthToken("")
                console.log(err);
            }
        }else{
            setAuthToken("")
        }

    }

    const sendLogin = async (email,password) => {
        console.log("Comprovant credencials....");

        // Enviam dades a l'aPI i recollim resultat
        try{
            const data = await fetch("https://backend.insjoaquimmir.cat/api/login", {
                headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ email: email, password: password })
            })
            console.log("despues del try");
            const resposta = await data.json();
            console.log(resposta);
            if (resposta.success === true) {
                setAuthToken(resposta.authToken)
                localStorage.setItem("authToken",resposta.authToken);
                setUsuari(email)
                console.log(resposta.authToken,usuari);
            }else{

                setMissatge(resposta.message);
            }

        }catch {
            console.log(data);
            setMissatge(data);
        }
    };

    useEffect(() => {
        checkAuthToken();

    }, []);

    return { sendLogin, checkAuthToken,missatge };
}
export default useLogin;