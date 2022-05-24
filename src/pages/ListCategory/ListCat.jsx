import "./listCat.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DatatableCat from "../../components/datatableCat/DatatableCat"

const ListCat = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DatatableCat/>
      </div>
    </div>
  )
}

export default ListCat