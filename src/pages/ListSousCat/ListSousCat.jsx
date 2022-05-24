import "./listSousCat.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableSousCat from "../../components/dataSousCat/dataSousCat"

const ListSousCat = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableSousCat/>
      </div>
    </div>
  )
}

export default ListSousCat;