import "./datatableCat.scss";
import { DataGrid } from "@mui/x-data-grid";
import { CategoryColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection, getDocs,deleteDoc,doc ,onSnapshot } from "firebase/firestore";
import {db} from "../../firebase.js";
const DatatableCat = ({ type }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    
   
  const fetchData=async ()=>{
      try{
      const querySnapshot = await getDocs(collection(db, "ClassifiedAdshC"));
      const list =[];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        list.push({id:doc.id,...doc.data()});
      });
      setData(list);
    }catch(err){
      console.log(err);
    }
    }
    fetchData();
  
  }, []);


  const handleDelete =async (id) => {
    try{
      await deleteDoc(doc(db, "ClassifiedAdshC", id));
      setData(data.filter((item) => item.id !== id));
    }catch(err){
      console.log(err);
    }
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/Category/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/Category/newCat" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={CategoryColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DatatableCat;