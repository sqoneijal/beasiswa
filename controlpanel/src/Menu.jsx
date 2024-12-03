import React, { useContext, useLayoutEffect } from "react";
import { Accordion, AccordionContext, useAccordionButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Each } from "~/Each";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const ParentMenus = ({ children, eventKey, callback }) => {
   const { module } = useSelector((e) => e.redux);
   const { accordionEventKey } = module;

   const { activeEventKey } = useContext(AccordionContext);
   const decoratedOnClick = useAccordionButton(eventKey, () => callback?.(eventKey));

   const isCurrentEventKey = activeEventKey === eventKey || accordionEventKey === eventKey;

   return (
      <li className={`menu-item ${isCurrentEventKey ? "open" : ""}`} onClick={decoratedOnClick}>
         {children}
      </li>
   );
};

const Menu = ({ setPageTypeButton }) => {
   const dispatch = useDispatch();
   const location = useLocation();

   useLayoutEffect(() => {
      const getEventKey = location.pathname.split("/")[1];
      dispatch(setModule({ accordionEventKey: `/${getEventKey}` }));
      return () => {};
   }, [location]);

   const array = [
      { label: "Dashboard", pathname: "/", icon: "menu-icon tf-icons ti ti-smart-home", sub: false },
      {
         label: "Referensi",
         pathname: "/referensi",
         icon: "menu-icon tf-icons ti ti-receipt",
         sub: true,
         child: [
            {
               label: "Kategori Beasiswa",
               pathname: "/referensi/kategoribeasiswa",
            },
            {
               label: "Lampiran Upload",
               pathname: "/referensi/lampiranupload",
            },
         ],
      },
      {
         label: "Tentang",
         pathname: "/tentang",
         icon: "menu-icon tf-icons ti ti-receipt",
         sub: false,
      },
      {
         label: "Informasi",
         pathname: "/informasi",
         icon: "menu-icon tf-icons ti ti-receipt",
         sub: false,
      },
      { label: "Generate Beasiswa", pathname: "/generatebeasiswa", icon: "menu-icon tf-icons ti ti-smart-home", sub: false },
      {
         label: "Beasiswa",
         pathname: "/beasiswa",
         icon: "menu-icon tf-icons ti ti-receipt",
         sub: true,
         child: [
            {
               label: "Pendaftar",
               pathname: "/beasiswa/pendaftar",
            },
            {
               label: "Perbaiki Berkas",
               pathname: "/beasiswa/perbaikiberkas",
            },
            {
               label: "Lulus Berkas",
               pathname: "/beasiswa/lulusberkas",
            },
            {
               label: "Tahap Wawancara",
               pathname: "/beasiswa/tahapwawancara",
            },
         ],
      },
      { label: "Periode", pathname: "/periode", icon: "menu-icon tf-icons ti ti-smart-home", sub: false },
   ];

   const resetRedux = (pathname, parentEventKey) => {
      const prevPath = location.pathname;

      if (prevPath === pathname) {
         return;
      }

      dispatch(setModule({ accordionEventKey: parentEventKey }));
      setPageTypeButton("");
   };

   return (
      <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme" data-bg-class="bg-menu-theme">
         <div className="app-brand demo">
            <Link to="controlpanel" className="app-brand-link">
               <span className="app-brand-logo demo">
                  <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                        fill="#7367F0"
                     />
                     <path
                        opacity="0.06"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                        fill="#161616"
                     />
                     <path
                        opacity="0.06"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                        fill="#161616"
                     />
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                        fill="#7367F0"
                     />
                  </svg>
               </span>
               <span className="app-brand-text demo menu-text fw-bold">Beasiswa</span>
            </Link>
            <a href="#" className="layout-menu-toggle menu-link text-large ms-auto">
               <i className="ti menu-toggle-icon d-none d-xl-block align-middle" />
               <i className="ti ti-x d-block d-xl-none ti-md align-middle" />
            </a>
         </div>
         <div className="menu-inner-shadow" />
         <Accordion as="ul" bsPrefix="menu-inner py-1">
            <Each
               of={array}
               render={(row) =>
                  row.sub ? (
                     <ParentMenus eventKey={h.parse("pathname", row)}>
                        <Link className="menu-link menu-toggle">
                           <i className={h.parse("icon", row)} />
                           <div data-i18n={h.parse("label", row)}>{h.parse("label", row)}</div>
                        </Link>
                        <Accordion.Collapse eventKey={h.parse("pathname", row)} as="ul" bsPrefix="menu-sub">
                           <Each
                              of={row.child}
                              render={(e) => (
                                 <li className={`menu-item ${location.pathname === h.parse("pathname", e) ? "active" : ""}`}>
                                    <Link
                                       to={h.parse("pathname", e)}
                                       className="menu-link"
                                       onClick={() => resetRedux(h.parse("pathname", e), h.parse("pathname", row))}>
                                       <div data-i18n={h.parse("label", e)}>{h.parse("label", e)}</div>
                                    </Link>
                                 </li>
                              )}
                           />
                        </Accordion.Collapse>
                     </ParentMenus>
                  ) : (
                     <li className={`menu-item ${location.pathname === h.parse("pathname", row) ? "active" : ""}`}>
                        <Link className="menu-link" to={h.parse("pathname", row)} onClick={() => resetRedux(h.parse("pathname", row), null)}>
                           <i className={h.parse("icon", row)} />
                           <div data-i18n={h.parse("label", row)}>{h.parse("label", row)}</div>
                        </Link>
                     </li>
                  )
               }
            />
         </Accordion>
      </aside>
   );
};
export default Menu;
