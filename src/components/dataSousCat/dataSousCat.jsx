import "./dataSousCat.scss";
import { DataGrid } from "@mui/x-data-grid";
import { CategoryColumns, userRows ,CategorySousColumns} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { collection, getDocs,deleteDoc,doc ,onSnapshot } from "firebase/firestore";
import {db} from "../../firebase.js";
const DataSousCat = ({ type }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
  const fectchData=async()=>{
    try{
      const querySnapshot = await getDocs(collection(db, "ClassifiedAdsSC"));
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
    fectchData();
    
  }, []);


  const handleDelete =async (id) => {
    try{
      await deleteDoc(doc(db, "ClassifiedAdsSC", id));
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
            <Link to={`/SousCategory/${params.row.id}`}style={{ textDecoration: "none" }}>
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
        <Link to="/SousCategory/newSousCat" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={CategorySousColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default DataSousCat;