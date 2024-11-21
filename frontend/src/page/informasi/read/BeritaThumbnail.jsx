import lozad from "lozad";
import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const BeritaThumbnail = () => {
   const { module } = useSelector((e) => e.redux);
   const { detailBerita } = module;

   useLayoutEffect(() => {
      lozad().observe();
      return () => {};
   }, []);

   const renderThumbnail = (src) => {
      return src ? `https://lh3.googleusercontent.com/d/${src}=w1290?authuser=1/view` : "/assets/empty-image.webp";
   };

   return (
      <div className="blog_details-img">
         <img
            src={renderThumbnail(h.parse("thumbnail", detailBerita))}
            alt={h.parse("judul", detailBerita)}
            className="lozad"
            style={{ height: 570 }}
         />
      </div>
   );
};
export default BeritaThumbnail;
