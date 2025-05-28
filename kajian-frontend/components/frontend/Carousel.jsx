"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

export default function Carousel({ kajianData }) {
    return <Swiper
        slidesPerView={1}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
            delay: 5000,
            disableOnInteraction: false,
        }}
    >
        <SwiperSlide>
            <div class="row h-100 align-items-center g-2">
                <div class="col-md-4 mb-3 mb-md-0 h-100">
                    <div class="card card-span h-100 text-white"><Image class="img-fluid h-100" src="/assets/img/gallery/maldives.png" alt="..." fill />
                        <div class="card-img-overlay ps-0"><span class="badge bg-primary ms-3 me-1 p-2"><i class="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span class="badge bg-secondary p-2"><i class="fas fa-bolt me-1"></i><span>trending</span><i class="fas fa-bolt ms-1"> </i></span></div>
                        <div class="card-body ps-0">
                            <h5 class="fw-bold text-1000 mb-4 text-truncate">Mermaid Beach Resort: The most joyful way to spend your holiday</h5>
                            <div class="d-flex align-items-center justify-content-start"><span class="text-800 fs--1 me-2"><i class="fas fa-map-marker-alt"></i></span><span class="text-900 me-3">Maldives</span><span class="text-800 fs--1 me-2"><i class="fas fa-calendar"></i></span><span class="text-900">4 days</span></div>
                            <p class="text-decoration-line-through text-900 mt-3 mb-0">$200</p>
                            <h1 class="mb-3 text-primary fw-bolder fs-4"><span>$175</span><span class="text-900 fs--1 fw-normal">/Per person</span></h1><span class="badge bg-soft-secondary p-2"><i class="fas fa-tag text-secondary fs--1 me-1"></i><span class="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0 h-100">
                    <div class="card card-span h-100 text-white"><img class="img-fluid h-100" src="assets/img/gallery/maldives.png" alt="..." />
                        <div class="card-img-overlay ps-0"><span class="badge bg-primary ms-3 me-1 p-2"><i class="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span class="badge bg-secondary p-2"><i class="fas fa-bolt me-1"></i><span>trending</span><i class="fas fa-bolt ms-1"> </i></span></div>
                        <div class="card-body ps-0">
                            <h5 class="fw-bold text-1000 mb-4 text-truncate">Mermaid Beach Resort: The most joyful way to spend your holiday</h5>
                            <div class="d-flex align-items-center justify-content-start"><span class="text-800 fs--1 me-2"><i class="fas fa-map-marker-alt"></i></span><span class="text-900 me-3">Maldives</span><span class="text-800 fs--1 me-2"><i class="fas fa-calendar"></i></span><span class="text-900">4 days</span></div>
                            <p class="text-decoration-line-through text-900 mt-3 mb-0">$200</p>
                            <h1 class="mb-3 text-primary fw-bolder fs-4"><span>$175</span><span class="text-900 fs--1 fw-normal">/Per person</span></h1><span class="badge bg-soft-secondary p-2"><i class="fas fa-tag text-secondary fs--1 me-1"></i><span class="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-3 mb-md-0 h-100">
                    <div class="card card-span h-100 text-white"><img class="img-fluid h-100" src="assets/img/gallery/maldives.png" alt="..." />
                        <div class="card-img-overlay ps-0"><span class="badge bg-primary ms-3 me-1 p-2"><i class="fas fa-clock me-1"></i><span>20:04:32:21</span></span><span class="badge bg-secondary p-2"><i class="fas fa-bolt me-1"></i><span>trending</span><i class="fas fa-bolt ms-1"> </i></span></div>
                        <div class="card-body ps-0">
                            <h5 class="fw-bold text-1000 mb-4 text-truncate">Mermaid Beach Resort: The most joyful way to spend your holiday</h5>
                            <div class="d-flex align-items-center justify-content-start"><span class="text-800 fs--1 me-2"><i class="fas fa-map-marker-alt"></i></span><span class="text-900 me-3">Maldives</span><span class="text-800 fs--1 me-2"><i class="fas fa-calendar"></i></span><span class="text-900">4 days</span></div>
                            <p class="text-decoration-line-through text-900 mt-3 mb-0">$200</p>
                            <h1 class="mb-3 text-primary fw-bolder fs-4"><span>$175</span><span class="text-900 fs--1 fw-normal">/Per person</span></h1><span class="badge bg-soft-secondary p-2"><i class="fas fa-tag text-secondary fs--1 me-1"></i><span class="text-secondary fw-normal fs-1">-15%</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </SwiperSlide>
    </Swiper>

}