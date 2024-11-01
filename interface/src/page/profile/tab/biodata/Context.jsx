import React, { useState } from "react";
import { Bars } from "react-loader-spinner";
import Switch, { Case, Default } from "react-switch-case";
import { Each } from "~/Each";
import * as h from "~/Helpers";

const Biodata = React.lazy(() => import("./Biodata"));
const InformasiUmum = React.lazy(() => import("./InformasiUmum"));
const Domisili = React.lazy(() => import("./Domisili"));
const OrangTua = React.lazy(() => import("./OrangTua"));
const Wali = React.lazy(() => import("./Wali"));
const Sekolah = React.lazy(() => import("./Sekolah"));

const Context = () => {
   // string
   const [tabActive, setTabActive] = useState("info_umum");

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
         wrapperclassName="page-loader flex-column justify-content-center"
      />
   );

   const tabArray = [
      { label: "Informasi Umum", path: "info_umum" },
      { label: "Domisili", path: "domisili" },
      { label: "Orang Tua", path: "ortu" },
      { label: "Wali", path: "wali" },
      { label: "Sekolah", path: "sekolah" },
   ];

   return (
      <React.Suspense fallback={loader}>
         <Biodata />
         <div className="course_details-tab-button">
            <ul className="nav nav-pills">
               <Each
                  of={tabArray}
                  render={(row) => (
                     <li className="nav-item" role="presentation">
                        <button
                           className={`nav-link ${tabActive === h.parse("path", row) ? "active" : ""}`}
                           type="button"
                           role="tab"
                           onClick={() => setTabActive(h.parse("path", row))}>
                           <span>{h.parse("label", row)}</span>
                        </button>
                     </li>
                  )}
               />
            </ul>
         </div>
         <div className="course_details-tab-content">
            <div className="tab-content">
               <Switch condition={tabActive}>
                  <Case value="domisili">
                     <Domisili />
                  </Case>
                  <Case value="ortu">
                     <OrangTua />
                  </Case>
                  <Case value="wali">
                     <Wali />
                  </Case>
                  <Case value="sekolah">
                     <Sekolah />
                  </Case>
                  <Default>
                     <InformasiUmum />
                  </Default>
               </Switch>
            </div>
         </div>
      </React.Suspense>
   );
};
export default Context;
