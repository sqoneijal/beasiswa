import React, { useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Khs = () => {
   const { module } = useSelector((e) => e.redux);
   const { khs, detailContent } = module;
   const { periode, content } = khs;
   const dispatch = useDispatch();

   const [state, setState] = useState({
      ips: 0,
      isLoadingSyncron: false,
   });

   const hitungIPS = (data) => {
      let total_sks = 0;
      let total_bobot = 0;

      data.forEach((row) => {
         total_sks += h.parse("sks", row);
         total_bobot += h.parse("sks", row) * h.parse("nilai_angka", row);
      });

      if (total_bobot > 0) {
         setState((prevState) => ({ ...prevState, ips: (total_bobot / total_sks).toFixed(2) }));
      } else {
         setState((prevState) => ({ ...prevState, ips: 0 }));
      }
   };

   const handleSyncronTranskrip = (e) => {
      e.preventDefault();
      if (state.isLoadingSyncron) return;

      const formData = { nim: detailContent.nim };

      setState((prev) => ({ ...prev, isLoadingSyncron: true }));
      const fetch = h.post(`/beasiswa/penerima/syncronkhs`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         dispatch(setModule({ ...module, khs: data }));
      });
      fetch.finally(() => {
         setState((prev) => ({ ...prev, isLoadingSyncron: false }));
      });
   };

   return (
      <React.Fragment>
         <a href="#" onClick={handleSyncronTranskrip}>
            {state.isLoadingSyncron ? "Loading..." : "Klik untuk syncron KHS dari aplikasi sevima"}
         </a>
         <Accordion className="mt-4">
            <Each
               of={periode}
               render={(row, index) => (
                  <Accordion.Item className="card" eventKey={index}>
                     <Accordion.Header onClick={() => hitungIPS(content[row])}>{h.periode(row)}</Accordion.Header>
                     <Accordion.Body>
                        <Table responsive hover size="sm">
                           <thead>
                              <tr>
                                 <th className="text-center">NO</th>
                                 <th>KODE MK</th>
                                 <th>NAMA MK</th>
                                 <th className="text-center">SKS</th>
                                 <th className="text-center">ANGKA</th>
                                 <th className="text-center">NUMERIK</th>
                                 <th className="text-center">HURUF</th>
                              </tr>
                           </thead>
                           <tbody>
                              <Each
                                 of={content[row]}
                                 render={(item, i) => (
                                    <tr>
                                       <td className="text-center">{i + 1}</td>
                                       <td>{h.parse("kode_mata_kuliah", item)}</td>
                                       <td>{h.parse("mata_kuliah", item)}</td>
                                       <td className="text-center">{h.parse("sks", item)}</td>
                                       <td className="text-center">{h.parse("nilai_angka", item)}</td>
                                       <td className="text-center">{h.parse("nilai_numerik", item)}</td>
                                       <td className="text-center">{h.parse("nilai_huruf", item)}</td>
                                    </tr>
                                 )}
                              />
                           </tbody>
                           <tfoot>
                              <tr>
                                 <th colSpan={6} className="text-end">
                                    IPS
                                 </th>
                                 <th className="text-center">{state.ips}</th>
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
