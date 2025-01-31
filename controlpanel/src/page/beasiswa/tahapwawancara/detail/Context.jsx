import moment from "moment";
import React, { useLayoutEffect, useState } from "react";
import { ButtonGroup, Card, Col, Nav, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import Switch, { Case } from "react-switch-case";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";
moment.locale("id");

const InformasiUmum = React.lazy(() => import("./InformasiUmum"));
const Domisili = React.lazy(() => import("./Domisili"));
const OrangTua = React.lazy(() => import("./OrangTua"));
const Wali = React.lazy(() => import("./Wali"));
const Sekolah = React.lazy(() => import("./Sekolah"));
const InformasiPendaftaran = React.lazy(() => import("./InformasiPendaftaran"));
const CatatanPerbaikan = React.lazy(() => import("./CatatanPerbaikan"));
const ModalPerbaiki = React.lazy(() => import("./ModalPerbaiki"));
const Khs = React.lazy(() => import("./Khs"));
const Tagihan = React.lazy(() => import("./Tagihan"));
const Transkrip = React.lazy(() => import("./Transkrip"));

const Context = ({ setPageTypeButton }) => {
   const { module, init } = useSelector((e) => e.redux);
   const { openDetail, detailContent, biodata, tabActive } = module;
   const dispatch = useDispatch();

   // bool
   const [isLoading, setIsLoading] = useState(true);
   const [isSubmit, setIsSubmit] = useState(false);

   const kebutuhanKhusus = (value) => {
      return value === 1 ? "Iya" : "Tidak";
   };

   const getData = (nim, periode) => {
      const formData = { nim, periode };

      const fetch = h.post(`/beasiswa/tahapwawancara/getdetail`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, ...data, tabActive: "informasi-umum" }));
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      if (openDetail && h.objLength(detailContent)) {
         setPageTypeButton(
            h.buttons("Kembail", false, {
               variant: "danger",
               onClick: () => dispatch(setModule({ ...module, openDetail: false, detailContent: {} })),
            })
         );
         getData(detailContent.nim, detailContent.periode);
      }
      return () => {};
   }, [openDetail, detailContent]);

   const loader = (
      <Bars
         visible={true}
         color="#4fa94d"
         radius="9"
         wrapperStyle={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
         }}
         wrapperClass="page-loader flex-column justify-content-center"
      />
   );

   const tabsArray = [
      { label: "Informasi Umum", value: "informasi-umum" },
      { label: "Domisili", value: "domisili" },
      { label: "Orang Tua", value: "orang-tua" },
      { label: "Wali", value: "wali" },
      { label: "Sekolah", value: "sekolah" },
      { label: "Transkrip", value: "transkrip" },
      { label: "KHS", value: "khs" },
      { label: "Tagihan", value: "tagihan" },
      { label: "Informasi Pendaftaran", value: "informasi-pendaftaran" },
      { label: "Catatan Perbaikan", value: "catatan-perbaikan" },
   ];

   const handleTerima = () => {
      const formData = {
         id_pendaftar: h.parse("id", detailContent),
         user_modified: init.preferred_username,
      };

      setIsSubmit(true);
      const fetch = h.post(`/beasiswa/tahapwawancara/submitterima`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         dispatch(setModule({ ...module, openDetail: false, detailContent: {} }));
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return isLoading ? (
      loader
   ) : (
      <Card.Body>
         <Row>
            <Col>
               {h.detail_label("NIM", h.parse("nim", biodata))}
               {h.detail_label("Nama Mahasiswa", h.parse("nama", biodata))}
               {h.detail_label("Program Studi", h.parse("program_studi", biodata))}
               {h.detail_label("Konsentrasi", "-")}
               {h.detail_label("Periode Masuk", h.periode(h.parse("id_periode", biodata)))}
               {h.detail_label("Tahun Kurikulum", h.parse("id_kurikulum", biodata))}
               {h.detail_label("Sistem Kuliah", h.parse("sistem_kuliah", biodata))}
               {h.detail_label("Kelas / Kelompok", "-")}
            </Col>
            <Col>
               {h.detail_label("Jenis Pendaftaran", "-")}
               {h.detail_label("Jalur Pendaftaran", h.parse("jalur_pendaftaran", biodata))}
               {h.detail_label("Gelombang", h.parse("gelombang", biodata))}
               {h.detail_label("Tanggal Masuk", moment(h.parse("tanggal_daftar", biodata)).format("DD MMMM YYYY"))}
               {h.detail_label("Kebutuhan Khusus", kebutuhanKhusus(h.parse("is_disabilitas", biodata)))}
               {h.detail_label("Status Mahasiswa", h.parse("status_mahasiswa", biodata))}
               {h.detail_label("Periode Keluar", "-")}
               {h.detail_label("Biodata Valid", "-")}
            </Col>
         </Row>
         <Row className="mt-10">
            <Col className="nav-align-top nav-tabs-shadow mb-6">
               <Nav variant="tabs" as="ul" onSelect={(e) => dispatch(setModule({ ...module, tabActive: e }))}>
                  <Each
                     of={tabsArray}
                     render={(row) => (
                        <Nav.Item as={"li"}>
                           <Nav.Link
                              active={h.parse("value", row) === tabActive}
                              as="button"
                              eventKey={h.parse("value", row)}
                              className="waves-effect">
                              {h.parse("label", row)}
                           </Nav.Link>
                        </Nav.Item>
                     )}
                  />
               </Nav>
               <div className="tab-content">
                  <React.Suspense fallback={loader}>
                     <div className="tab-pane fade show active">
                        <Switch condition={tabActive}>
                           <Case value="informasi-umum">
                              <InformasiUmum />
                           </Case>
                           <Case value="domisili">
                              <Domisili />
                           </Case>
                           <Case value="orang-tua">
                              <OrangTua />
                           </Case>
                           <Case value="wali">
                              <Wali />
                           </Case>
                           <Case value="sekolah">
                              <Sekolah />
                           </Case>
                           <Case value="informasi-pendaftaran">
                              <InformasiPendaftaran />
                           </Case>
                           <Case value="catatan-perbaikan">
                              <CatatanPerbaikan />
                           </Case>
                           <Case value="khs">
                              <Khs />
                           </Case>
                           <Case value="tagihan">
                              <Tagihan />
                           </Case>
                           <Case value="transkrip">
                              <Transkrip />
                           </Case>
                        </Switch>
                     </div>
                  </React.Suspense>
                  <ButtonGroup className="mt-10">
                     <ModalPerbaiki />
                     {h.buttons("Terima", isSubmit, {
                        onClick: () => {
                           const confirm = h.confirm("Apakah anda yakin ingin menyetujui?");
                           confirm.then((res) => {
                              const { isConfirmed } = res;
                              if (!isConfirmed) return;
                              handleTerima();
                           });
                        },
                     })}
                     {h.buttons("Perbaiki", false, {
                        variant: "warning",
                        onClick: () => dispatch(setModule({ ...module, openModalPerbaiki: true })),
                     })}
                  </ButtonGroup>
               </div>
            </Col>
         </Row>
      </Card.Body>
   );
};
export default Context;
