
export const placeMarkReducer = (initialState,action) => {

    switch (action.type) {
    
        case "Add Mark":
        
        console.log("Add Mark" + action.payload )

        return [ ...initialState, action.payload]
        
        case "Del Mark":
        
        console.log("Delete Mark" + action.payload )

        return initialState.filter( mark => mark.id !== action.payload)

        default:
    
        return [...initialState]
    }

};