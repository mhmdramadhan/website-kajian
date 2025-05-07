import Navbar from "@/components/frontend/Navbar";

export default function Home() {
  return <>
    <Navbar />
    {/* search bar */}
    <section className="mt-7 py-0">
      <div className="bg-holder w-50 bg-right d-none d-lg-block" style={{ backgroundImage: "url(/img/gallery/hero-section-1.png)" }}>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 py-5 py-xl-5 py-xxl-7">
            <h1 className="display-3 text-1000 fw-normal">Let’s make a tour</h1>
            <h1 className="display-3 text-primary fw-bold">Discover the beauty</h1>
            <div className="pt-5">
              <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <form className="row g-4 mt-5">
                  <div className="col-sm-6 col-md-6 col-xl-5">
                    <div className="input-group-icon">
                      <label className="form-label visually-hidden" htmlFor="inputAddress1">Address 1</label>
                      <input className="form-control input-box form-voyage-control" id="inputAddress1" type="text" placeholder="From where" /><span className="nav-link-icon text-800 fs--1 input-box-icon"><i className="fas fa-map-marker-alt"></i></span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xl-5">
                    <div className="input-group-icon">
                      <label className="form-label visually-hidden" htmlFor="inputAddress2">Address 2</label>
                      <input className="form-control input-box form-voyage-control" id="inputAddress2" type="text" placeholder="To where" /><span className="nav-link-icon text-800 fs--1 input-box-icon"><i className="fas fa-map-marker-alt"> </i></span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xl-5">
                    <div className="input-group-icon">
                      <input className="form-control input-box form-voyage-control" id="inputdateOne" type="date" /><span className="nav-link-icon text-800 fs--1 input-box-icon"><i className="fas fa-calendar"></i></span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xl-5">
                    <div className="input-group-icon">
                      <input className="form-control input-box form-voyage-control" id="inputDateTwo" type="date" /><span className="nav-link-icon text-800 fs--1 input-box-icon"><i className="fas fa-calendar"></i></span>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-xl-5">
                    <div className="input-group-icon">
                      <label className="form-label visually-hidden" htmlFor="inputPersonOne">Person</label>
                      <select className="form-select form-voyage-select input-box" id="inputPersonOne">
                        <option value="">2 Adults</option>
                      </select><span className="nav-link-icon text-800 fs--1 input-box-icon"><i className="fas fa-user"> </i></span>
                    </div>
                  </div>
                  <div className="col-12 col-xl-10 col-lg-12 d-grid mt-6">
                    <button className="btn btn-secondary" type="submit">Search Packages</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* end search */}

    {/* kajian */}
    <section id="lagiRame" className="mt-3">
      <div className="container">
        <div className="row h-100">
          <div className="col-lg-7 mx-auto text-center mb-6">
            <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">Flash Deals</h5>
          </div>
          <div className="col-12">
            <div className="carousel slide" id="carouselTestimonials" data-bs-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <div className="row h-100 align-items-center g-2">
                    <div className="col-md-4 mb-3 mb-md-0 h-100">
                      <div className="card card-span h-100 text-white"><img className="img-fluid h-100" src="assets/img/gallery/maldives.png" alt="..." />
                        <div className="card-img-overlay ps-0"><span className="badge bg-primary ms-3 me-1 p-2"><i className="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span className="badge bg-secondary p-2"><i className="fas fa-bolt me-1"></i><span>trending</span><i className="fas fa-bolt ms-1"> </i></span></div>
                        <div className="card-body ps-0">
                          <h5 className="fw-bold text-1000 mb-4 text-truncate">Mermaid Beach Resort: The most joyful way to spend your holiday</h5>
                          <div className="d-flex align-items-center justify-content-start"><span className="text-800 fs--1 me-2"><i className="fas fa-map-marker-alt"></i></span><span className="text-900 me-3">Maldives</span><span className="text-800 fs--1 me-2"><i className="fas fa-calendar"></i></span><span className="text-900">4 days</span></div>
                          <p className="text-decoration-line-through text-900 mt-3 mb-0">$200</p>
                          <h1 className="mb-3 text-primary fw-bolder fs-4"><span>$175</span><span className="text-900 fs--1 fw-normal">/Per person</span></h1><span className="badge bg-soft-secondary p-2"><i className="fas fa-tag text-secondary fs--1 me-1"></i><span className="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0 h-100">
                      <div className="card card-span h-100 text-white"><img className="img-fluid h-100" src="assets/img/gallery/cinnamon.png" alt="..." />
                        <div className="card-img-overlay ps-0"><span className="badge bg-primary ms-3 me-1 p-2"><i className="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span className="badge bg-secondary p-2"><i className="fas fa-bolt me-1"></i><span>trending</span><i className="fas fa-bolt ms-1"> </i></span></div>
                        <div className="card-body ps-0">
                          <h5 className="fw-bold text-1000 mb-4 text-truncate">Bora Bora: Enjoy a romantic cruise tour of at the sunny side of life</h5>
                          <div className="d-flex align-items-center justify-content-start"><span className="text-800 fs--1 me-2"><i className="fas fa-map-marker-alt"></i></span><span className="text-900 me-3">Maldives</span><span className="text-800 fs--1 me-2"><i className="fas fa-calendar"></i></span><span className="text-900">4 days</span></div>
                          <p className="text-decoration-line-through text-900 mt-3 mb-0">$300</p>
                          <h1 className="mb-3 text-primary fw-bolder fs-4"><span>$250</span><span className="text-900 fs--1 fw-normal">/Per person</span></h1><span className="badge bg-soft-secondary p-2"><i className="fas fa-tag text-secondary fs--1 me-1"></i><span className="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0 h-100">
                      <div className="card card-span h-100 text-white"><img className="img-fluid h-100" src="assets/img/gallery/dhigu.png" alt="..." />
                        <div className="card-img-overlay ps-0"><span className="badge bg-primary ms-3 me-1 p-2"><i className="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span className="badge bg-secondary p-2"><i className="fas fa-bolt me-1"></i><span>trending</span><i className="fas fa-bolt ms-1"> </i></span></div>
                        <div className="card-body ps-0">
                          <h5 className="fw-bold text-1000 mb-4 text-truncate">Fihalhohi Island Resort: Luxury destination without compromise</h5>
                          <div className="d-flex align-items-center justify-content-start"><span className="text-800 fs--1 me-2"><i className="fas fa-map-marker-alt"></i></span><span className="text-900 me-3">Maldives</span><span className="text-800 fs--1 me-2"><i className="fas fa-calendar"></i></span><span className="text-900">4 days</span></div>
                          <p className="text-decoration-line-through text-900 mt-3 mb-0">$375</p>
                          <h1 className="mb-3 text-primary fw-bolder fs-4"><span>$300</span><span className="text-900 fs--1 fw-normal">/Per person</span></h1><span className="badge bg-soft-secondary p-2"><i className="fas fa-tag text-secondary fs--1 me-1"></i><span className="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-item" data-bs-interval="5000">
                  <div className="row h-100 align-items-center g-2">
                    <div className="col-md-4 mb-3 mb-md-0 h-100">
                      <div className="card card-span h-100 text-white"><img className="img-fluid h-100" src="assets/img/gallery/maldives.png" alt="..." />
                        <div className="card-img-overlay ps-0"><span className="badge bg-primary ms-3 me-1 p-2"><i className="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span className="badge bg-secondary p-2"><i className="fas fa-bolt me-1"></i><span>trending</span><i className="fas fa-bolt ms-1"> </i></span></div>
                        <div className="card-body ps-0">
                          <h5 className="fw-bold text-1000 mb-4 text-truncate">Mermaid Beach Resort: The most joyful way to spend your holiday</h5>
                          <div className="d-flex align-items-center justify-content-start"><span className="text-800 fs--1 me-2"><i className="fas fa-map-marker-alt"></i></span><span className="text-900 me-3">Maldives</span><span className="text-800 fs--1 me-2"><i className="fas fa-calendar"></i></span><span className="text-900">4 days</span></div>
                          <p className="text-decoration-line-through text-900 mt-3 mb-0">$200</p>
                          <h1 className="mb-3 text-primary fw-bolder fs-4"><span>$175</span><span className="text-900 fs--1 fw-normal">/Per person</span></h1><span className="badge bg-soft-secondary p-2"><i className="fas fa-tag text-secondary fs--1 me-1"></i><span className="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0 h-100">
                      <div className="card card-span h-100 text-white"><img className="img-fluid h-100" src="assets/img/gallery/cinnamon.png" alt="..." />
                        <div className="card-img-overlay ps-0"><span className="badge bg-primary ms-3 me-1 p-2"><i className="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span className="badge bg-secondary p-2"><i className="fas fa-bolt me-1"></i><span>trending</span><i className="fas fa-bolt ms-1"> </i></span></div>
                        <div className="card-body ps-0">
                          <h5 className="fw-bold text-1000 mb-4 text-truncate">Bora Bora: Enjoy a romantic cruise tour of at the sunny side of life</h5>
                          <div className="d-flex align-items-center justify-content-start"><span className="text-800 fs--1 me-2"><i className="fas fa-map-marker-alt"></i></span><span className="text-900 me-3">Maldives</span><span className="text-800 fs--1 me-2"><i className="fas fa-calendar"></i></span><span className="text-900">4 days</span></div>
                          <p className="text-decoration-line-through text-900 mt-3 mb-0">$300</p>
                          <h1 className="mb-3 text-primary fw-bolder fs-4"><span>$250</span><span className="text-900 fs--1 fw-normal">/Per person</span></h1><span className="badge bg-soft-secondary p-2"><i className="fas fa-tag text-secondary fs--1 me-1"></i><span className="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0 h-100">
                      <div className="card card-span h-100 text-white"><img className="img-fluid h-100" src="assets/img/gallery/dhigu.png" alt="..." />
                        <div className="card-img-overlay ps-0"><span className="badge bg-primary ms-3 me-1 p-2"><i className="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span className="badge bg-secondary p-2"><i className="fas fa-bolt me-1"></i><span>trending</span><i className="fas fa-bolt ms-1"> </i></span></div>
                        <div className="card-body ps-0">
                          <h5 className="fw-bold text-1000 mb-4 text-truncate">Fihalhohi Island Resort: Luxury destination without compromise</h5>
                          <div className="d-flex align-items-center justify-content-start"><span className="text-800 fs--1 me-2"><i className="fas fa-map-marker-alt"></i></span><span className="text-900 me-3">Maldives</span><span className="text-800 fs--1 me-2"><i className="fas fa-calendar"></i></span><span className="text-900">4 days</span></div>
                          <p className="text-decoration-line-through text-900 mt-3 mb-0">$375</p>
                          <h1 className="mb-3 text-primary fw-bolder fs-4"><span>$300</span><span className="text-900 fs--1 fw-normal">/Per person</span></h1><span className="badge bg-soft-secondary p-2"><i className="fas fa-tag text-secondary fs--1 me-1"></i><span className="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="prev"><span className="carousel-control-prev-icon" aria-hidden="true"></span><span className="visually-hidden">Previous</span></button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="next"><span className="carousel-control-next-icon" aria-hidden="true"></span><span className="visually-hidden">Next                                    </span></button>
                </div>
              </div>
              <div className="row flex-center">
                <div className="col-auto position-relative z-index-2">
                  <ol className="carousel-indicators me-xxl-7 me-xl-4 me-lg-7">
                    <li className="active" data-bs-target="#carouselTestimonials" data-bs-slide-to="0"></li>
                    <li data-bs-target="#carouselTestimonials" data-bs-slide-to="1"></li>
                    <li data-bs-target="#carouselTestimonials" data-bs-slide-to="2"></li>
                    <li data-bs-target="#carouselTestimonials" data-bs-slide-to="3"></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* end kajian */}
  </>
}
