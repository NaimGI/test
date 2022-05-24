import "./singleCat.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import {useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import { doc , getDoc} from "firebase/firestore";
import {db} from "../../firebase.js";
const SingleCat = () => {
  const {id}=useParams();
  console.log(id);
  const [data, setData] = useState({});
  useEffect(() => {
  const GetOneData=async()=>{
      console.log(id);
    const docRef = doc(db, "ClassifiedAdshC", id);
const docSnap = await getDoc(docRef);
setData({...docSnap.data(),id:docSnap.id});
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
  }
    GetOneData();
    console.log("The data is "+ data);
  }, []);
 

  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
         
            <div className="item" key={data.id}>
           
              <img
                src={data.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">{data.nameEn}</span>
                  <span className="itemValue">{data.textFrensh}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{data.time}</span>
                  <span className="itemValue"></span>
                </div>
            
              </div>
            </div>
 
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SingleCat;