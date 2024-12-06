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
            <h4>KTP</h4>
            {h.detail_label("Alamat", h.parse("alamat", biodata))}
            {h.detail_label("RT", h.parse("rt"))}
            {h.detail_label("RW", h.parse("rw", biodata))}
            {h.detail_label("Dusun", h.parse("dusun", biodata))}
            {h.detail_label("Desa / Kelurahan", h.parse("desa", biodata))}
            {h.detail_label("Provinsi", h.parse("provinsi", biodata))}
            {h.detail_label("Kota", h.parse("kota", biodata))}
            {h.detail_label("Kecamatan", h.parse("kecamatan", biodata))}
            {h.detail_label("Kode Pos", h.parse("kode_pos", biodata))}
         </Col>
         <Col>
            <h4>Domisili</h4>
            {h.detail_label("Alamat", h.parse("alamat_domisili", biodata))}
            {h.detail_label("RT", h.parse("rt_domisili"))}
            {h.detail_label("RW", h.parse("rw_domisili", biodata))}
            {h.detail_label("Dusun", h.parse("dusun_domisili", biodata))}
            {h.detail_label("Desa / Kelurahan", h.parse("desa_domisili", biodata))}
            {h.detail_label("Provinsi", h.parse("provinsi_domisili", biodata))}
            {h.detail_label("Kota", h.parse("kota_domisili", biodata))}
            {h.detail_label("Kecamatan", h.parse("kecamatan_domisili", biodata))}
            {h.detail_label("Kode Pos", h.parse("kode_pos_domisili", biodata))}
            {h.detail_label("Status Tinggal", "-")}
         </Col>
      </Row>
   );
};
export default Domisili;
