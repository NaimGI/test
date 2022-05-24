import "./newCat.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { collection, addDoc,setDoc,doc ,serverTimestamp} from "firebase/firestore";
import {db,auth,storage} from "../../firebase.js";

import { getStorage, ref, uploadBytesResumable ,getDownloadURL} from "firebase/storage";

const NewCat = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data,setData]=useState({});
  const [prec,setPrec]=useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const UploadImage= () => {
      const name = new Date().getTime()+file.name;
      console.log(name);
      const storage = getStorage();
const storageRef = ref(storage, 'uploads/'+file.name);
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setPrec(progress);
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
          break;
        
    }
  }, 
  (error) => {
    console.log(error);
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setData((prev)=>({...prev,image:downloadURL}));
    });
  }
);
      
    };
    file && UploadImage();
  }, [file]);
  // Upload image to storage 
const handelInput=(e)=>{
  
  const id=e.target.id;
  const value=e.target.value;
  setData({...data,[id]:value});
  console.log(data); 
}

const handleAdd=async(e)=>{
  e.preventDefault();
  
  try{
   /* await setDoc(doc(db,"ClassifiedAdshC"),{
      ...data,
      timeStamp :serverTimestamp()
    })*/
    await addDoc(collection(db, "ClassifiedAdshC"), {
      ...data,
      timeStamp :serverTimestamp()
    });
    navigate(-1);
      }catch(err){
        console.log(err);
      }
}

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input  type={input.type} id={input.id} placeholder={input.placeholder} onChange={ handelInput}/>
                </div>
              ))}
              <button disabled={prec !== null && prec < 100 } type="submit">Add new Category</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCat;