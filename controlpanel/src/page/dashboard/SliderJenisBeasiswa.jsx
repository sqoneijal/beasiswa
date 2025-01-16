import React, { useLayoutEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "swiper/css/autoplay";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "~/assets/css/16-cards-advance.css";
import * as h from "~/Helpers";

const SliderJenisBeasiswa = () => {
   const { module } = useSelector((e) => e.redux);
   const { daftarJenisBeasiswa, jumlahPendaftarPerJenisBeasiswa } = module;

   useLayoutEffect(() => {
      return () => {};
   }, []);

   const jumlahPendaftar = (id_jenis, daftar_jenis) => {
      if (typeof daftar_jenis[id_jenis] !== "undefined") {
         return daftar_jenis[id_jenis].jumlah;
      }
      return 0;
   };

   return (
      <Col lg={6}>
         <Swiper
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            slidesPerView={1}
            modules={[Autoplay, Pagination, Navigation]}
            className="swiper-container swiper-container-horizontal swiper swiper-card-advance-bg">
            {daftarJenisBeasiswa.map((row) => {
               return (
                  <SwiperSlide style={{ color: "#fff" }} key={row.id}>
                     <Row>
                        <Col xs={12}>
                           <h5 className="text-white mb-0">{h.parse("nama", row)}</h5>
                           <small>Total {jumlahPendaftar(row.id, jumlahPendaftarPerJenisBeasiswa)}</small>
                        </Col>
                        <Row>
                           <Col lg={12} md={12} xs={12} className="order-2 order-md-1 pt-md-9">
                              <h6 className="text-white mt-0 mt-md-3 mb-4">Traffic</h6>
                              <div className="row">
                                 <div className="col-6">
                                    <ul className="list-unstyled mb-0">
                                       <li className="d-flex mb-4 align-items-center">
                                          <p className="mb-0 fw-medium me-2 website-analytics-text-bg">28%</p>
                                          <p className="mb-0">Sessions</p>
                                       </li>
                                       <li className="d-flex align-items-center">
                                          <p className="mb-0 fw-medium me-2 website-analytics-text-bg">1.2k</p>
                                          <p className="mb-0">Leads</p>
                                       </li>
                                    </ul>
                                 </div>
                                 <div className="col-6">
                                    <ul className="list-unstyled mb-0">
                                       <li className="d-flex mb-4 align-items-center">
                                          <p className="mb-0 fw-medium me-2 website-analytics-text-bg">3.1k</p>
                                          <p className="mb-0">Page Views</p>
                                       </li>
                                       <li className="d-flex align-items-center">
                                          <p className="mb-0 fw-medium me-2 website-analytics-text-bg">12%</p>
                                          <p className="mb-0">Conversions</p>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </Col>
                        </Row>
                     </Row>
                  </SwiperSlide>
               );
            })}
         </Swiper>
      </Col>
   );
};
export default SliderJenisBeasiswa;
