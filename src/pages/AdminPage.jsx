import ViewProductAdmin from "../components/ ViewProductAdmin";
import EditProduct from "../components/EditProduct";
import CreateProduct from "../components/CreateProduct";
import { useState, useEffect } from "react";

function AdminPage() {
  const [view, setView] = useState(null);
  const [showList, setShowList] = useState(false);
  const create = () => {
    setView("create product");
    setShowList(false)
  };

  return (
    <div>
      This is Admin Page.
      <button onClick={create}>Create Product</button>
      <button
        onClick={() => {
          setShowList(true);
          setView('view product')
        }}
      >
        View Product
      </button>
      {view  &&  <ViewProductAdmin setShowList={setShowList} setView={setView} view={view} category={view} /> }
      {/* <EditProduct /> */}
      {view === "create product" && <CreateProduct setView={setView} />}
     {showList && <ul>
        <li onClick={()=>{setView('men'); setShowList(false)}}>Men</li>
        <li onClick={()=>{setView('women'); setShowList(false)}}>Women</li>
        <li onClick={()=>{setView('boys'); setShowList(false)}}>Boys</li>
        <li onClick={()=>{setView('girls'); setShowList(false)}}>Girls</li>
      </ul>}
    </div>
  );
}export default AdminPage;