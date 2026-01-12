import React from 'react'
import {assets} from '../../assets/assets_admin/assets'
import { useState } from 'react'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'

const Add_doctor = () => {
    const [image, setimage] = useState(null)
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [experience, setexperience] = useState('')
    const [fees, setfees] = useState('')
    const [speciality, setspeciality] = useState('')
    const [education, seteducation] = useState('')
    const [address1, setaddress1] = useState('')
    const [address2, setaddress2] = useState('')
    const [about, setabout] = useState('')
    
    const {backendurl,atoken}=React.useContext(AdminContext);
    const onSubmitHandler=async (e)=>{
        e.preventDefault();
        try{
            if(!image){
                toast.error('Image is required');
                return;
            }
            const formdata=new FormData();
            formdata.append('image',image)
            formdata.append('name',name)
            formdata.append('email',email)
            formdata.append('password',password)
            formdata.append('experience',experience)
            formdata.append('fees',Number(fees))
            formdata.append('speciality',speciality)
            formdata.append('degree',education)
            formdata.append('address',JSON.stringify({line1:address1,line2:address2}))
            formdata.append('about',about)
            formdata.forEach((value,key)=>{
                console.log(key+': '+value);
            });
            const {data} = await axios.post(`${backendurl}/api/admin/add-doctor`,formdata,{ withCredentials: true })
           if(data.success){
            toast.success(data.message);
            setimage(null);
            setname('');
            setemail('');
            setpassword('');
            setexperience('');
            setfees('');
            setspeciality('');
            seteducation('');
            setaddress1('');
            setaddress2('');
            setabout('');
           }else{
            toast.error(data.message);
           }
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
        //submit logic here
    }
  return atoken && (
    
   <form onSubmit={onSubmitHandler} className='m-8 text-gray-700'>
    <p className='mb-8 font-medium text-xl'>Add Doctor</p>

    <div className='bg-white border border-gray-200 p-6 rounded-sm pb-10 '>
        <div className='flex items-center gap-4'>
            <label htmlFor="doc_img" className='cursor-pointer'>
                <img className='rounded-full w-32 h-32 object-center object-cover '  src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>{setimage(e.target.files[0])}} type="file" id="doc_img" className='hidden' />
            <p>Upload Doctor<br /> Image</p>
        </div>
        <div className='grid grid-cols-2 gap-6 my-6'>
           <div >
                <div>
                    <p>Doctor Name</p>
                    <input type="text" required onChange={(e)=>setname(e.target.value)} value={name} name="name" placeholder='Name' className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 ' />
                </div>
                <div>
                    <p>Doctor Email</p>
                    <input type="text" required onChange={(e)=>setemail(e.target.value)} value={email} name="email" placeholder='Email' className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 ' />
                </div>
                <div>
                    <p>Doctor Password</p>
                    <input type="password" required onChange={(e)=>setpassword(e.target.value)} value={password} name="password" placeholder='Password' className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 ' />
                </div>
                <div>
                    <p>Experience</p>
                    <select name="experience" required onChange={(e)=>{setexperience(e.target.value)}} value={experience} className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 '>
                    <option value="">Select</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                    <option value="3">3 Years</option>
                    <option value="4">4 Years</option>
                    <option value="5">5 Years</option>
                    <option value="6">6 Years</option>
                    <option value="7">7 Years</option>
                    <option value="8">8 Years</option>
                    <option value="9">9 Years</option>
                    <option value="10">10 Years</option>
                    </select>
                </div>
                <div>
                    <p>Fees</p>
                    <input type="number" required onChange={(e)=>{setfees(e.target.value)}} value={fees} name="fees" placeholder="Your Fees" className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 ' />
                </div>
            </div> 
            <div>
                <div>
                    <p>Specialization</p>
                    <select name="speciality" required onChange={(e)=>{setspeciality(e.target.value)}} value={speciality} className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 ' >
                        <option value="">Select</option>
                        <option value="General physician">General physician</option>
                        <option value="Gynecologist">Gynecologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Neurologist">Neurologist</option>
                    </select>
                </div>
                <div>
                    <p>Education</p>
                    <input type="text" required onChange={(e)=>{seteducation(e.target.value)}} value={education} name="education" placeholder="Education" className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 '/>
                </div>
                <div>
                    <p>Address</p>
                    <input type="text" required onChange={(e)=>{setaddress1(e.target.value)}} value={address1} name="address1" placeholder="Address 1" className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 '/>
                    <input type="text" required onChange={(e)=>{setaddress2(e.target.value)}} value={address2} name="address2" placeholder="Address 2" className='mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 '/>
                </div>

            </div>
        </div>
        <div>
            <p>About Doctor</p>
            <textarea name="about" required onChange={(e)=>{setabout(e.target.value)}} value={about} placeholder="write about yourself" rows={4}  className='no-resize mt-2 mb-3.5 border border-gray-300 rounded-sm w-full p-1.5 '></textarea>
        </div>
        <button className='bg-blue-500 px-7 py-2 text-white rounded-full ' type="submit">Add Doctor</button>
    </div>
   </form> 
  )
}

export default Add_doctor