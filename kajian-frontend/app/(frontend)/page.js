import Carousel from "@/components/frontend/Carousel";
import Navbar from "@/components/frontend/Navbar";

export default async function Home() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/kajian/getKajian`, {
    method: "GET",
    cache: "no-store",
  });
  
  const kajian = await res.json();
  
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
    <section id="testimonial">
      <div className="container">
        <div className="row h-100">
          <div className="col-lg-7 mx-auto text-center mb-6">
            <h5 className="fw-bold fs-3 fs-lg-5 lh-sm mb-3">Flash Deals</h5>
          </div>
          <div className="col-12">
            <Carousel kajianData={kajian} />
          </div>
        </div>
      </div>
    </section>
    {/* end kajian */}
  </>
}
