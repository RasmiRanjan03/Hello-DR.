



const addDoctor=async(req,res)=>{
    const{name,email,password,speciality,experience,degree,about,available,fees,address}=req.body;
    const image=req.file;
    console.log(name,email,password,speciality,experience,degree,about,available,fees,address)
    res.send(name,email,password,speciality,experience,degree,about,available,fees,address)
}
export{addDoctor};