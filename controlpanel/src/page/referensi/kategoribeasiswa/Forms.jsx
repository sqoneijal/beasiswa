import React, { useLayoutEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Forms = ({ setPageTypeButton }) => {
   const { module, init } = useSelector((e) => e.redux);
   const { pageType, detailContent } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   useLayoutEffect(() => {
      if (pageType === "update" && h.objLength(detailContent)) {
         setInput({ ...detailContent });
      }
      return () => {};
   }, [pageType, detailContent]);

   const clearProps = () => {
      setInput({});
      setErrors({});
      setIsSubmit(false);
      dispatch(setModule({ ...module, pageType: "", detailContent: {} }));
   };

   useLayoutEffect(() => {
      setPageTypeButton(
         h.buttons("Batal", false, {
            variant: "danger",
            onClick: () => clearProps(),
         })
      );
      return () => {};
   }, []);

   const submit = (e) => {
      e.preventDefault();
      const formData = { pageType, user_modified: init.preferred_username };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/referensi/kategoribeasiswa/submit`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         setErrors(data.errors);
         h.notification(data.status, data.msg_response);

         if (!data.status) return;

         clearProps();
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         {h.form_text(
            "Nama Kategori Beasiswa",
            "nama",
            2,
            {
               onChange: (e) => setInput((prev) => ({ ...prev, nama: e.target.value })),
               value: h.parse("nama", input),
            },
            errors
         )}
         {h.form_textarea(
            "Keterangan",
            "keterangan",
            2,
            {
               onChange: (e) => setInput((prev) => ({ ...prev, keterangan: e.target.value })),
               value: h.parse("keterangan", input),
            },
            errors
         )}
         {h.save_button(h.buttons("Simpan", isSubmit))}
      </Form>
   );
};
export default Forms;
