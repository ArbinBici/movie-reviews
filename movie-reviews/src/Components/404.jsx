import Footer from "./Footer";

const NotFound = () => {

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex justify-content-center m-3 mt-5 pt-5">
                    <p className="display-1 text-white mt-5">404 - Page Not Found</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NotFound;