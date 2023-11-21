import ViewProductAdmin from "../components/ ViewProductAdmin";
import EditProduct from "../components/EditProduct";
import CreateProduct from "../components/CreateProduct";
import { useState, useEffect } from "react";

function AdminPage() {
  const [view, setView] = useState(null);
  const [showList, setShowList] = useState(false);
  const create = () => {
    setView("create product");
  };

  return (
    <div>
      This is Admin Page.
      <button onClick={create}>Create Product</button>
      <button
        onClick={() => {
          setShowList(true);
        }}
      >
        View Product
      </button>
      {view &&  <ViewProductAdmin setShowList={setShowList} setView={setView} category={view} /> }
      {/* <EditProduct /> */}
      {view === "create product" && <CreateProduct setView={setView} />}
     {showList && <ul>
        <li onClick={()=>{setView('men')}}>Men</li>
        <li onClick={()=>{setView('women')}}>Women</li>
        <li onClick={()=>{setView('boys')}}>Boys</li>
        <li onClick={()=>{setView('girls')}}>Girls</li>
      </ul>}
    </div>
  );
}
export default AdminPage;
