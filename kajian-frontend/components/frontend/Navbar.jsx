export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3 d-block" data-navbar-on-scroll="data-navbar-on-scroll">
            <div className="container"><a className="navbar-brand" href="index.html"><img className="d-inline-block" src="/img/gallery/logo.png" width="50" alt="logo" /><span className="fw-bold text-primary ms-2">NgajiKuy</span></a>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto pt-2 pt-lg-0 font-base">
                        <li className="nav-item px-2"><a className="nav-link fw-medium active" aria-current="page" href="#lagiRame"><span className="nav-link-icon text-800 me-1 fas fa-map-marker-alt"></span><span className="nav-link-text">Lagi Rame </span></a></li>
                        <li className="nav-item px-2"><a className="nav-link" href="#flights"> <span className="nav-link-icon text-800 me-1 fas fa-plane"></span><span className="nav-link-text">Kajian</span></a></li>
                        <li className="nav-item px-2"><a className="nav-link" href="#hotels"> <span className="nav-link-icon text-800 me-1 fas fa-hotel"></span><span className="nav-link-text">Blog</span></a></li>
                    </ul>
                    <form>
                        <button className="btn text-800 order-1 order-lg-0 me-2" type="button">Support</button>
                        <button className="btn btn-voyage-outline order-0" type="submit"><span className="text-primary">Sign in</span></button>
                    </form>
                </div>
            </div>
        </nav>
    );
}