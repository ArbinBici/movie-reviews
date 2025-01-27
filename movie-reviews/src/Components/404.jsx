import Footer from "./Footer";
import { useEffect, useState } from "react";

const NotFound = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
      fetch("http://localhost:5000/test")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
    },[])
    
    
    
    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-center m-3 mt-5 pt-5">
                    <p className="display-1 text-white mt-5">404 - Page Not Found</p>
                </div>
                <p className="display-1 text-white mt-5">{data.key}</p>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;