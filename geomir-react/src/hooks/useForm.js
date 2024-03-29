import { useState } from "react";
export const useForm = (initialForm = {}) => {
    let [formState, setFormState] = useState(initialForm);

    const handleChange = ({ target }) => {
    
        // amb { target } desestructurem e
        
        // enlloc d'escriure e.target , escriurem target
        
        // Desestructurem ara target
        
        const { name, value } = target;
    

            setFormState({
                ...formState,
                [name]: value,
    
            })
        
    }
    const OnResetForm = () =>{
        setFormState(initialForm);
    }
    
    // Si no haguéssim desestrcuturat res...
    
    // [e.target.name] : e.target.value


// ………………………

// Podem afegir més mètodes

// I s’hauran de retornar a continuació

return { ...formState, formState,handleChange,OnResetForm };

};
