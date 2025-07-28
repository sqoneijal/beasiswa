import lozad from "lozad";
import { useLayoutEffect } from "react";
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
      return src || "/assets/empty-image.webp";
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
