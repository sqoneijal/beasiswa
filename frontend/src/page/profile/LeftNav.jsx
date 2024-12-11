import React, { useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const LeftNav = () => {
   const { module } = useSelector((e) => e.redux);
   const dispatch = useDispatch();

   // string
   const [tabActive, setTabActive] = useState("biodata");

   const navArray = [
      { label: "Biodata", path: "biodata" },
      { label: "KHS", path: "khs" },
      { label: "Transkrip", path: "transkrip" },
      { label: "Lampiran Upload", path: "lampiran" },
      { label: "Beasiswa", path: "beasiswa" },
   ];

   const handleChangeTabs = (path) => {
      setTabActive(path);
      dispatch(setModule({ ...module, tabActive: path }));
   };

   return (
      <Col xl={4} lg={4}>
         <div className="course_details-sidebar p-0">
            <div className="course_details-list">
               <ul>
                  <Each
                     of={navArray}
                     render={(row) => (
                        <li onClick={() => handleChangeTabs(h.parse("path", row))}>
                           <span style={{ cursor: "pointer" }} className={`fw-bold ${h.parse("path", row) === tabActive ? "text-primary" : ""}`}>
                              {h.parse("label", row)}
                           </span>
                        </li>
                     )}
                  />
               </ul>
            </div>
         </div>
      </Col>
   );
};
export default LeftNav;
