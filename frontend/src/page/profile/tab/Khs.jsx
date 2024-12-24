import React, { useLayoutEffect, useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Khs = () => {
   const { init } = useSelector((e) => e.redux);

   const [state, setState] = useState({
      isLoadingSyncron: false,
   });

   // bool
   const [isLoading, setIsLoading] = useState(true);

   // array
   const [daftarPeriode, setDaftarPeriode] = useState([]);

   // object
   const [content, setContent] = useState({});

   // string
   const [total_sks, setTotal_sks] = useState(0);
   const [total_bobot, setTotal_bobot] = useState(0);

   const handleChangePeriode = (periode) => {
      let sks = 0;
      let bobot = 0;

      content[periode].forEach((row) => {
         sks += h.toInt(row.sks);
         bobot += h.toInt(row.nilai_angka) * h.toInt(row.sks);
      });

      setTotal_sks(sks);
      setTotal_bobot(bobot);
   };

   useLayoutEffect(() => {
      if (!isLoading) handleChangePeriode(Math.min(...daftarPeriode));
      return () => {};
   }, [isLoading, daftarPeriode]);

   const getData = (nim) => {
      const formData = { nim };

      setIsLoading(true);
      const fetch = h.post(`/mahasiswa/khs/getdata`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setDaftarPeriode(data.periode);
         setContent(data.content);
      });
      fetch.finally(() => {
         setIsLoading(false);
      });
   };

   useLayoutEffect(() => {
      getData(init.preferred_username);
      return () => {};
   }, [init]);

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

   const syncronKHS = (nim) => {
      setState((prev) => ({ ...prev, isLoadingSyncron: true }));

      const formData = { nim };

      const fetch = h.post(`/mahasiswa/khs/syncronkhs`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         getData(nim);
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingSyncron: false }));
      });
   };

   return isLoading ? (
      loader
   ) : (
      <React.Fragment>
         <p className="text-danger">
            Jika ada perbedaan nilai atau bobot, silahkan{" "}
            <a
               className="theme-btn"
               style={{ height: 30 }}
               onClick={(e) => {
                  e.preventDefault();
                  if (!state.isLoadingSyncron) syncronKHS(init.preferred_username);
               }}>
               {state.isLoadingSyncron ? `Loading...` : `klik disini`}
            </a>{" "}
            untuk melakukan syncron ulang dengan aplikasi sevima!
         </p>
         <Accordion defaultActiveKey={Math.min(...daftarPeriode)}>
            <Each
               of={daftarPeriode}
               render={(row) => (
                  <Accordion.Item eventKey={h.toInt(row)} onClick={() => handleChangePeriode(row)}>
                     <Accordion.Header>{h.periode(row)}</Accordion.Header>
                     <Accordion.Body>
                        <Table size="sm" responsive>
                           <thead>
                              <tr>
                                 <th className="text-center align-middle" rowSpan={2}>
                                    NO
                                 </th>
                                 <th className="text-center align-middle" rowSpan={2}>
                                    KODE
                                 </th>
                                 <th className="text-center align-middle" rowSpan={2}>
                                    NAMA MATAKULIAH
                                 </th>
                                 <th className="text-center align-middle" rowSpan={2}>
                                    SKS
                                 </th>
                                 <th className="text-center align-middle" colSpan={2}>
                                    NILAI
                                 </th>
                                 <th className="text-center align-middle" rowSpan={2}>
                                    TOTAL BOBOT
                                 </th>
                              </tr>
                              <tr>
                                 <th className="text-center">HURUF</th>
                                 <th className="text-center">BOBOT</th>
                              </tr>
                           </thead>
                           <tbody>
                              <Each
                                 of={content[row]}
                                 render={(row, index) => (
                                    <tr>
                                       <td className="text-center">{index + 1}</td>
                                       <td className="text-center">{h.parse("kode_mata_kuliah", row)}</td>
                                       <td>{h.parse("mata_kuliah", row)}</td>
                                       <td className="text-center">{h.parse("sks", row)}</td>
                                       <td className="text-center">{h.parse("nilai_huruf", row)}</td>
                                       <td className="text-center">{h.parse("nilai_angka", row)}</td>
                                       <td className="text-center">{h.toInt(h.parse("nilai_angka", row)) * h.toInt(h.parse("sks", row))}</td>
                                    </tr>
                                 )}
                              />
                           </tbody>
                           <tfoot>
                              <tr>
                                 <th colSpan={3} className="text-end">
                                    Jumlah
                                 </th>
                                 <th className="text-center">{total_sks}</th>
                                 <th colSpan={3} />
                              </tr>
                              <tr>
                                 <th colSpan={3} className="text-end">
                                    IPS
                                 </th>
                                 <th className="text-center">{total_bobot > 0 && (total_bobot / total_sks).toFixed(2)}</th>
                                 <th colSpan={3} />
                              </tr>
                           </tfoot>
                        </Table>
                     </Accordion.Body>
                  </Accordion.Item>
               )}
            />
         </Accordion>
      </React.Fragment>
   );
};
export default Khs;
