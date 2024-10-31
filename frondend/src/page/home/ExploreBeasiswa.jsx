import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const ExploreBeasiswa = () => {
   const { module } = useSelector((e) => e.redux);
   const { daftarMasterBeasiswa } = module;

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   return (
      <section className="h2_category-area pb-100">
         <Container>
            <Row>
               <Col xs={12}>
                  <div className="section-area-2 small-section-area-2 text-center">
                     <h2 className="section-title mb-50">
                        Explore{" "}
                        <span>
                           <Link to="/beasiswa">Beasiswa</Link> <img data-src="assets/line.png" alt="" className="lozad" />
                        </span>
                     </h2>
                  </div>
               </Col>
            </Row>
            <Row>
               <Each
                  of={daftarMasterBeasiswa}
                  render={(row) => (
                     <Col xl={3} lg={4} sm={6}>
                        <div className="h2_category-item mb-30">
                           <div className="h2_category-img">
                              <img data-src={`assets/${h.parse("icon", row)}`} alt={h.parse("nama", row)} className="lozad" />
                           </div>
                           <div className="h2_category-content">
                              <h5>
                                 <Link to={`/beasiswa/${h.parse("id", row)}`}>{h.parse("nama", row)}</Link>
                              </h5>
                              <p>{h.parse("keterangan", row)}</p>
                           </div>
                        </div>
                     </Col>
                  )}
               />
            </Row>
         </Container>
      </section>
   );
};
export default ExploreBeasiswa;
