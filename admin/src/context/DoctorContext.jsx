import { createContext ,useState,useEffect} from "react";
import { toast } from "react-toastify";
import { doctors } from "../../../Frontend/src/assets/assets_frontend/assets";
import axios from "axios";
export const DoctorContext=createContext();

const DoctorContextProvider=(props)=>{
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [dtoken, setdtoken] = useState(null)
    const authuser=async()=>{
        try{
            const {data}=await axios.get(backendurl+'/api/doctor/authdoc',{withCredentials:true})
            console.log(data)
            if(!data.success){
                setdtoken(false)
            }
            else{
                setdtoken(true)
            }
        }
        catch(err){
            console.log(err);
            toast.error(err)
        }
    }
    const logoutdoc=async()=>{
        try{
            const {data}=await axios.post(backendurl+"/api/doctor/logout-doc",{},{withCredentials:true})
            if(data.success){
                setdtoken(false);
                toast.success(data.message)
            }
            else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error);
            console.log(error)
        }
    }
        useEffect(() => {
            authuser()
        }, [dtoken])
    
    const value={dtoken,setdtoken,logoutdoc
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider