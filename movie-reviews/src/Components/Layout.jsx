import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-light ms-4"><b>Movie Reviews</b></Link>
          <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end ms-4" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link text-light me-3">Home</Link>
              <Link to="/movies" className="nav-link text-light me-3">Movies</Link>
              <Link to="/contact" className="nav-link text-light me-3">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;