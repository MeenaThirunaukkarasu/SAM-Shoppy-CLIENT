import ViewProductAdmin from "../components/ ViewProductAdmin";
import EditProduct from "../components/EditProduct";
import CreateProduct from "../components/CreateProduct";
import { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import ViewAdmin from "../components/ViewAdmin";

function AdminPage() {
  const [view, setView] = useState(null);
  const [showList, setShowList] = useState(false);
  const [viewUser,setViewUser]=useState(null)
  const [viewAdmin,setViewAdmin]=useState(null)
  const create = () => {
    setView("create product");
    setShowList(false)
  };

  function userView(){
    console.log('view  user clicked')
    setViewUser(true)
  }
  function AdminView(){
    console.log('view  user clicked')
    setViewAdmin(true)
  }
console.log('view',view)
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
      <button onClick={userView}>View Users</button>
      <button onClick={AdminView}>View Admin</button>
      <button onClick={userView}>Create Admin Credentials</button>
      
      {view  &&  <ViewProductAdmin setShowList={setShowList} setView={setView} view={view} category={view} /> }
      {/* <EditProduct /> */}
      {view === "create product" && <CreateProduct setView={setView} />}
     {showList && <ul>
        <li onClick={()=>{setView('men'); setShowList(false)}}>Men</li>
        <li onClick={()=>{setView('women'); setShowList(false)}}>Women</li>
        <li onClick={()=>{setView('boys'); setShowList(false)}}>Boys</li>
        <li onClick={()=>{setView('girls'); setShowList(false)}}>Girls</li>
      </ul>}
      {viewUser && <UsersList setViewUser={setViewUser}/>}
      {viewAdmin && <ViewAdmin setViewAdmin={setViewAdmin}/>}
    </div>
  );
}export default AdminPage;