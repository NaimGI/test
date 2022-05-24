import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import {useParams} from "react-router-dom";
import { useState,useEffect } from "react";
import { collection, getDocs,deleteDoc,doc ,onSnapshot, getDoc} from "firebase/firestore";
import {db} from "../../firebase.js";
const Single = () => {
  const {id}=useParams();
  console.log(id);
  const [data, setData] = useState({});
  useEffect(() => {
  const fectchData=async()=>{
    /*const querySnapshot = await getDocs(collection(db, "ClassifiedAdsSC"));
    const list =[];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if(id===doc.id){
      list.push({id:doc.id,...doc.data()});
      }
    });
    setData(list);
   /* const docRef = doc(db, "ClassifiedAdsSC", id);
const docSnap = await getDoc(docRef);
setData({...docSnap.data(),id:docSnap.id});
if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}*/
  }
    fectchData();
    console.log("The data is "+ data);
  }, []);
  console.log(data);
 

  
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
                <h1 className="itemTitle">{data.field}</h1>
                <div className="detailItem">
                  <span className="itemKey">{data.name}</span>
                  <span className="itemValue">{data.textEnglish}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">{data.textFrench}</span>
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

export default Single;
