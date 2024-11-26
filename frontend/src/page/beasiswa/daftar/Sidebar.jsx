import moment from "moment";
import React from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
moment.locale("id");

const Sidebar = () => {
   const { module } = useSelector((e) => e.redux);
   const { generateBeasiswa } = module;

   return (
      <Col xl={4} lg={4}>
         <div className="blog_details-sidebar mb-60">
            <div className="blog_details-widget widget-category">
               <h4 className="blog_details-widget-title">Keterangan</h4>
               <div className="course_details-list">
                  <ul>
                     <li style={{ paddingLeft: 0 }}>
                        <span>
                           <i className="fa-thin fa-clock" />
                           Tanggal Mulai
                        </span>
                        <span>{moment(h.parse("tanggal_mulai", generateBeasiswa)).format("DD MMMM YYYY")}</span>
                     </li>
                     <li style={{ paddingLeft: 0 }}>
                        <span>
                           <i className="fa-thin fa-clock" />
                           Tanggal Akhir
                        </span>
                        <span>{moment(h.parse("tanggal_akhir", generateBeasiswa)).format("DD MMMM YYYY")}</span>
                     </li>
                     {h.parse("wajib_ipk", generateBeasiswa) === "t" && (
                        <React.Fragment>
                           <li style={{ paddingLeft: 0 }}>
                              <span>
                                 <i className="fa-thin fa-percent" />
                                 Minimal IPK
                              </span>
                              <span>{h.parse("minimal_ipk", generateBeasiswa)}</span>
                           </li>
                           <li style={{ paddingLeft: 0 }}>
                              <span>
                                 <i className="fa-thin fa-percent" />
                                 Maksimal IPK
                              </span>
                              <span>{h.parse("maksimal_ipk", generateBeasiswa)}</span>
                           </li>
                        </React.Fragment>
                     )}
                  </ul>
               </div>
            </div>
            <div className="blog_details-widget widget-category">
               <h4 className="blog_details-widget-title">Untuk Angkatan</h4>
               <div className="blog_details-widget-category">
                  <ul>
                     <Each of={generateBeasiswa.angkatan} render={(row) => <li className="fw-bold">{row}</li>} />
                  </ul>
               </div>
            </div>
         </div>
      </Col>
   );
};
export default Sidebar;
