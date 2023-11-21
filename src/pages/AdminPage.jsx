// import ViewProductAdmin from "../components/ ViewProductAdmin";
import EditProduct from "../components/EditProduct";
import CreateProduct from "../components/CreateProduct";
function AdminPage(){
    return(
        <div>
            This is Admin Page.
            <button>Create Product</button>
            <button>View Product</button>

        
        {/* <ViewProductAdmin /> */}
        <EditProduct />
        {/* <CreateProduct /> */}
        </div>
    )
}
export default AdminPage;