import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const DetailModal = () => {
   const { module } = useSelector((e) => e.redux);
   const { openDetail, detailContent } = module;
   const dispatch = useDispatch();

   const clearProps = () => {
      dispatch(setModule({ ...module, openDetail: false, detailContent: {} }));
   };

   return (
      <Modal show={openDetail} onHide={clearProps} backdrop="static">
         <Modal.Header closeButton>
            <Modal.Title>{h.parse("nama", detailContent)}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{h.parse("keterangan", detailContent)}</Modal.Body>
      </Modal>
   );
};
export default DetailModal;
