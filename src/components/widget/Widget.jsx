import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import CategoryIcon from '@mui/icons-material/Category';
import {useEffect,useState} from "react";
import {db} from "../../firebase.js"; 
import {collection,query,where,getDocs} from "firebase/firestore";

const Widget = ({ type }) => {
  const [amount,setAmount]= useState(null);
  const[diff,setDiff]=useState(null);
  let data;

  //temporary
  

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        query: "admins",
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "Category":
      data = {
        title: "Category",
        query: "ClassifiedAdshC",
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "SousCategory":
      data = {
        title: "SousCategory",
        query: "ClassifiedAdsSC",
        link: "View net earnings",
        icon: (
          <CategoryIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "UsersData":
      data = {
        title: "UsersData",
        query: "adds",
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  useEffect(() => {
    const fetchData= async ()=>{
      const today=new Date();
      const lastMonth=new Date(new Date().setMonth(today.getMonth()-1));
      const prevMonth=new Date(new Date().setMonth(today.getMonth()-2));
    
      const lastMonthquery=query(collection(db,data.query),/*where("timeStamp","<=",today),where("timeStamp",">",lastMonth)*/);
      const prevtMonthquery=query(collection(db,data.query),/*where("timeStamp","<=",lastMonth),where("timeStamp",">",prevMonth)*/);
      const lastMondayData=await getDocs(lastMonthquery);
      const prevMondayData=await getDocs(prevtMonthquery);
      setAmount(lastMondayData.docs.length);
      setDiff(((lastMondayData.docs.length - prevMondayData.docs.length) / prevMondayData.docs.length)*100);
      
    }
    fetchData();
   
   
  }, []);
  

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
