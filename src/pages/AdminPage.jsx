import ViewProductAdmin from "../components/ ViewProductAdmin";
import EditProduct from "../components/EditProduct";
import CreateProduct from "../components/CreateProduct";
import { useState, useEffect } from "react";
import UsersList from "../components/UsersList";
import ViewAdmin from "../components/ViewAdmin";
import ViewOrders from "../components/ViewOrders";
import { Link } from "react-router-dom";

function AdminPage() {
  const [view, setView] = useState(null);
  const [showList, setShowList] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  const [viewAdmin, setViewAdmin] = useState(null);
  const [category, setCategory] = useState(null);
  function userView() {
    setViewUser(true);
    setShowList(false);
    setViewAdmin(false);
  }
  function AdminView() {
    setViewAdmin(true);
    setShowList(false);
    setViewUser(false);
  }
  return (
    <div className="container text-center ">
      <h1>Admin Page</h1>
      <div className="row">
        <Link
          to="/createProduct"
          className="col-3  admin-button btn btn-info btn-blue"
        >
          Create Product
        </Link>

        <Link
          className=" btn  col-3 admin-button  btn-blue"
          onClick={() => {
            setShowList(true);
          }}
        >
          View Product
        </Link>

        <Link className="btn col-3 admin-button btn-blue" onClick={userView}>
          View Users
        </Link>

        <Link className="btn col-3 admin-button  btn-blue" onClick={AdminView}>
          View Admin
        </Link>

        <Link
          className="btn col-3  admin-button btn-blue"
          to="/createAdminCredentials"
        >
          Create Admin Credentials
        </Link>
        <Link className="btn col-3  admin-button btn-blue" to="/vieworders">
          View All Orders
        </Link>
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
    </div>
  );
}
export default AdminPage;
