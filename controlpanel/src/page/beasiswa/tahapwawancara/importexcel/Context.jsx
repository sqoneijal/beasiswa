import React, { useLayoutEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import readXlsxFile from "read-excel-file";
import writeXlsxFile from "write-excel-file";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const PreviewHasilImport = React.lazy(() => import("./PreviewHasilImport"));

const Context = ({ setPageTypeButton }) => {
   const { module } = useSelector((e) => e.redux);
   const { daftarJenisBeasiswa } = module;
   const dispatch = useDispatch();

   const [frontState, setFrontState] = useState({
      input: {},
      errors: {},
   });

   useLayoutEffect(() => {
      setPageTypeButton(
         h.buttons("Kembail", false, {
            variant: "danger",
            onClick: () => dispatch(setModule({ ...module, openDetail: false, openFormImport: false, detailContent: {} })),
         })
      );
      return () => {};
   }, []);

   const handleDownloadFormatImport = () => {
      const HEADER_ROW = [
         {
            value: "NIM",
            fontWeight: "bold",
            type: String,
         },
         {
            value: "NAMA",
            fontWeight: "bold",
            type: String,
         },
      ];

      const data = [HEADER_ROW];

      writeXlsxFile(data, {
         fileName: "format_import.xlsx",
      });
   };

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

   const props = { frontState, setFrontState };

   return (
      <Card.Body>
         <a
            href="#"
            onClick={(e) => {
               e.preventDefault();
               handleDownloadFormatImport();
            }}>
            Download Format Import Excel
         </a>
         <Row className="mt-5">
            <Col>
               {h.form_select(
                  "Jenis Beasiswa",
                  "jenis_beasiswa",
                  3,
                  daftarJenisBeasiswa.map((row) => ({ value: row.id_generate_beasiswa, label: row.nama })),
                  { onChange: (e) => setFrontState((prev) => ({ ...prev, jenis_beasiswa: e.target.value })) },
                  frontState.errors
               )}
            </Col>
            <Col>
               {h.form_upload("File Excel", "file_excel", 2, {
                  onChange: (e) => {
                     readXlsxFile(e.target.files[0]).then((rows) => {
                        rows.splice(0, 1);

                        const data = [];
                        rows.forEach((row) => {
                           data.push({
                              checked: false,
                              nim: row[0],
                              nama: row[1],
                              keterangan: "",
                           });
                        });

                        dispatch(setModule({ ...module, daftarPreviewImport: data }));
                     });
                  },
               })}
            </Col>
         </Row>
         <Row>
            <React.Suspense fallback={loader}>
               <PreviewHasilImport {...props} />
            </React.Suspense>
         </Row>
      </Card.Body>
   );
};
export default Context;
