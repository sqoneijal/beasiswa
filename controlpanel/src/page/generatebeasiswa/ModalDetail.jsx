import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Switch, { Case } from "react-switch-case";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";
moment.locale("id");

const ModalDetail = () => {
   const { module } = useSelector((e) => e.redux);
   const { openDetail, detailContent } = module;
   const dispatch = useDispatch();

   // bool
   const [tabActive, setTabActive] = useState("angkatan");

   // array
   const [angkatan, setAngkatan] = useState([]);
   const [lampiranUpload, setLampiranUpload] = useState([]);

   useLayoutEffect(() => {
      if (openDetail && h.objLength(detailContent)) {
         setAngkatan(JSON.parse(h.parse("angkatan", detailContent)));
         setLampiranUpload(JSON.parse(h.parse("lampiran_upload", detailContent)));
      }
      return () => {};
   }, [openDetail, detailContent]);

   const clearProps = () => {
      dispatch(setModule({ ...module, openDetail: false, detailContent: {} }));
   };

   const apakahWajibIPK = (value) => {
      return value === "t" ? "Iya" : "Tidak";
   };

   const navTabsMenu = [
      { label: "Angkatan", value: "angkatan" },
      { label: "Lampiran Upload", value: "lampiran_upload" },
   ];

   return (
      <Modal show={openDetail} onHide={clearProps} backdrop="static">
         <Modal.Header closeButton>
            <Modal.Title>{h.parse("kategori_beasiswa", detailContent)}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {h.detail_label("Tanggal Mulai", moment(h.parse("tanggal_mulai", detailContent)).format("DD MMMM YYYY"))}
            {h.detail_label("Tanggal Akhir", moment(h.parse("tanggal_akhir", detailContent)).format("DD MMMM YYYY"))}
            <Row>
               <Col>{h.detail_label("Wajib IPK", apakahWajibIPK(h.parse("wajib_ipk", detailContent)))}</Col>
               {h.parse("wajib_ipk", detailContent) === "t" && (
                  <React.Fragment>
                     <Col>{h.detail_label("Minimal IPK", h.parse("minimal_ipk", detailContent))}</Col>
                     <Col>{h.detail_label("Maksimal IPK", h.parse("maksimal_ipk", detailContent))}</Col>
                  </React.Fragment>
               )}
            </Row>
            <div className="nav-align-top mb-0">
               <ul className="nav nav-tabs">
                  <Each
                     of={navTabsMenu}
                     render={(row) => (
                        <li className="nav-item" role="presentation">
                           <button
                              type="button"
                              className={`nav-link waves-effect ${h.parse("value", row) === tabActive ? "active" : ""}`}
                              role="tab"
                              onClick={() => setTabActive(h.parse("value", row))}>
                              {h.parse("label", row)}
                           </button>
                        </li>
                     )}
                  />
               </ul>
               <div className="tab-content">
                  <div className="tab-pane fade active show" role="tabpanel">
                     <Switch condition={tabActive}>
                        <Case value="angkatan">
                           <Each
                              of={angkatan}
                              render={(row) => (
                                 <div className="d-flex flex-column">
                                    <span className="text-heading text-truncate">
                                       <span className="fw-medium">{row}</span>
                                    </span>
                                 </div>
                              )}
                           />
                        </Case>
                        <Case value="lampiran_upload">
                           <Each
                              of={lampiranUpload}
                              render={(row) => (
                                 <div className="d-flex flex-column">
                                    <span className="text-heading text-truncate">
                                       <span className="fw-medium">{h.parse("label", row)}</span>
                                    </span>
                                 </div>
                              )}
                           />
                        </Case>
                     </Switch>
                  </div>
               </div>
            </div>
         </Modal.Body>
      </Modal>
   );
};
export default ModalDetail;
