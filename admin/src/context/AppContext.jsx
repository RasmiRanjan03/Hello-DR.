import { createContext } from "react";
import { assets } from "../assets/assets_admin/assets";
export const AppContext = createContext();

const AppContextProvider = (props) => {
    const a = 'apple'
    const calculateage = (dob) => {


        const [day, month, year] = dob.split("/");

        const date = new Date(year, month - 1, day);


        const birthDate = new Date(date);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }
    const value = {
        assets,
        calculateage
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider