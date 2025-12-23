import { createContext } from "react";
import { assets } from "../assets/assets_admin/assets";
export const AppContext=createContext();

const AppContextProvider=(props)=>{
    const a='apple'
    const value={
a
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider