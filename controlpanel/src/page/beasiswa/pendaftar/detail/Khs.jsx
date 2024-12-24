import React, { useState } from "react";
import { Accordion, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Khs = () => {
   const { module } = useSelector((e) => e.redux);
   const { khs } = module;
   const { periode, content } = khs;

   const [state, setState] = useState({
      ips: 0,
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
      }
   };

   return (
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
   );
};
export default Khs;
