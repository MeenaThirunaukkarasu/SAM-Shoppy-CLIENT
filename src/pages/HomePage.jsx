import { useNavigate  } from "react-router-dom";


function HomePage(){
    const navigate = useNavigate();
return(
    <div className="back-button">
    {/* <button onClick={() => navigate(-1)}>Back</button> */}
    </div>
)

}


export default HomePage