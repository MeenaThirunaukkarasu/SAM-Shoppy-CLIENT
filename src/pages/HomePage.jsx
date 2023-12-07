import { useEffect,useState } from "react";
import { useNavigate  } from "react-router-dom";
import axios from 'axios'

function HomePage(){
    const navigate = useNavigate();
const [products,setProducts] = useState(null)
useEffect(()=>{
axios.get(`${import.meta.env.VITE_BASE_URL_API}/products`)
.then(response=>{
setProducts(response.data)
})
.catch(error=>{
    console.log('error',error)
})
},[])

function singleProduct(id) {
    navigate(`/product/${id}`);
  }

return(
    <div >
   <h2>Home Page</h2>
    <section className="container text-center Men">
      <div className="row row-cols-4">
    {products?.map(product=>{
        return(
            <div className="col d-flex" key={product._id}>  
            
            <div
              className="card card-details"
              key={product._id}
              onClick={() => {
                singleProduct(product._id);
              }}
            >
              <img
                className="card-img-top product-img"
                src={product.img}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
         
          </div>
        )
    })}
    </div>
      </section>
    </div>
)

}


export default HomePage