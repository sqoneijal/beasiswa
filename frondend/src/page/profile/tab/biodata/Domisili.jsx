import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const Domisili = () => {
   const { module } = useSelector((e) => e.redux);
   const { biodata } = module;

   return (
      <Row>
         <Col>
            <h6 className="text-success">KTP</h6>
            {h.detail_label("Alamat", h.parse("alamat", biodata))}
            {h.detail_label("RT", h.parse("rt", biodata))}
            {h.detail_label("RW", h.parse("rw", biodata))}
            {h.detail_label("Dusun", h.parse("dusun", biodata))}
            {h.detail_label("Desa / Kelurahan", h.parse("desa", biodata))}
            {h.detail_label("Provinsi", h.parse("provinsi", biodata))}
            {h.detail_label("Kota", h.parse("kota", biodata))}
            {h.detail_label("Kecamatan", h.parse("kecamatan", biodata))}
            {h.detail_label("Kode Pos", h.parse("kode_pos", biodata))}
         </Col>
         <Col>
            <h6 className="text-success">Domisili</h6>
            {h.detail_label("Alamat", h.parse("alamat_domisili", biodata))}
            {h.detail_label("RT", h.parse("r_domisilit", biodata))}
            {h.detail_label("RW", h.parse("r_domisiliw", biodata))}
            {h.detail_label("Dusun", h.parse("dusu_domisilin", biodata))}
            {h.detail_label("Desa / Kelurahan", h.parse("des_domisilia", biodata))}
            {h.detail_label("Provinsi", h.parse("provins_domisilii", biodata))}
            {h.detail_label("Kota", h.parse("kot_domisilia", biodata))}
            {h.detail_label("Kecamatan", h.parse("kecamata_domisilin", biodata))}
            {h.detail_label("Kode Pos", h.parse("kode_po_domisilis", biodata))}
         </Col>
      </Row>
   );
};
export default Domisili;
