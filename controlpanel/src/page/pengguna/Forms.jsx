import React, { useLayoutEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Forms = ({ setPageTypeButton }) => {
   const { module, init } = useSelector((e) => e.redux);
   const { pageType } = module;
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});
   const [errors, setErrors] = useState({});

   const clearProps = () => {
      dispatch(setModule({ ...module, pageType: "", detailContent: {} }));
      setInput({});
      setErrors({});
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
      const fetch = h.post(`/pengguna/submit`, formData);
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
         <Row>
            <Col>
               {h.form_text("NIP", "nip", 2, { onChange: (e) => setInput({ ...input, nip: e.target.value }), value: h.parse("nip", input) }, errors)}
            </Col>
            <Col>
               {h.form_select(
                  "Role",
                  "role",
                  2,
                  [
                     { value: 1, label: "Admin" },
                     { value: 2, label: "Operator" },
                  ],
                  {
                     onChange: (e) => setInput({ ...input, role: e.target.value }),
                     value: h.parse("role", input),
                  },
                  errors
               )}
            </Col>
         </Row>
         {h.save_button(h.buttons("Simpan", isSubmit))}
      </Form>
   );
};
export default Forms;
