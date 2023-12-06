import ViewProductAdmin from "../components/ ViewProductAdmin";
import EditProduct from "../components/EditProduct";
import CreateProduct from "../components/CreateProduct";
import { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import ViewAdmin from "../components/ViewAdmin";
import ViewOrders from  '../components/ViewOrders'
import { Link } from "react-router-dom";

function AdminPage() {
  const [view, setView] = useState(null);
  const [showList, setShowList] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [viewAdmin, setViewAdmin] = useState(null);
  const [category, setCategory] = useState(null);
  function userView() {
    console.log("view  user clicked");
    setViewUser(true);
    setShowList(false);
    setViewAdmin(false);

  }
  function AdminView() {
    console.log("view  user clicked");
    setViewAdmin(true);
    setShowList(false);
    setViewUser(false);

  }
  console.log("view", view);
  return (
    <div>
      <h1>This is Admin Page.</h1>
      <button>
        <Link to="/createProduct">Create Product</Link>
      </button>
      <button
        onClick={() => {
          setShowList(true);
        }}
      >
        View Product
      </button>
      <button onClick={userView}>View Users</button>
      <button onClick={AdminView}>View Admin</button>
      <button ><Link to='/createAdminCredentials'>Create Admin Credentials</Link></button>
      <button ><Link to='/vieworders'>View All Orders</Link></button>
      {view && (
        <ViewProductAdmin
          setShowList={setShowList}
          setView={setView}
          view={view}
          category={category}
        />
      )}

      {showList && (
        <div>
          <button
            onClick={() => {
              setShowList(false);
            }}
          >
            back
          </button>
          <ul>
            <li
              onClick={() => {
                setView("men");
                setShowList(false);
                setCategory("men");
              }}
            >
              Men
            </li>
            <li
              onClick={() => {
                setView("women");
                setShowList(false);
                setCategory("women");
              }}
            >
              Women
            </li>
            <li
              onClick={() => {
                setView("boys");
                setShowList(false);
                setCategory("boys");
              }}
            >
              Boys
            </li>
            <li
              onClick={() => {
                setView("girls");
                setShowList(false);
                setCategory("girls");
              }}
            >
              Girls
            </li>
          </ul>
        </div>
      )}
      {viewUser && <UsersList setViewUser={setViewUser} />}
      {viewAdmin && <ViewAdmin setViewAdmin={setViewAdmin} />}
    </div>
  );
}
export default AdminPage;
