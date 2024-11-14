import { Editor } from "@tinymce/tinymce-react";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const Forms = ({ setPageTypeButton }) => {
   const { init, module } = useSelector((e) => e.redux);
   const { pageType } = module;
   const editorRef = useRef(null);
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   useLayoutEffect(() => {
      setPageTypeButton(h.buttons("Batal", false, { onClick: () => clearProps(), variant: "danger" }));
      return () => {};
   }, []);

   const clearProps = () => {
      setIsSubmit(false);
      setInput({});
      setErrors({});
      dispatch(setModule({ ...module, pageType: "", detailContent: {} }));
   };

   const submit = (e) => {
      e.preventDefault();
      const formData = { pageType, user_modified: init.preferred_username };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/berita/submit`, formData);
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
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <Row>
            <Col md={8} sm={12}>
               {h.form_text(
                  "Judul",
                  "judul",
                  2,
                  {
                     value: h.parse("judul", input),
                     onChange: (e) => setInput((prev) => ({ ...prev, judul: e.target.value })),
                  },
                  errors
               )}
               <Editor
                  tinymceScriptSrc="/assets/tinymce/tinymce.min.js"
                  licenseKey="gpl"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue="<p>This is the initial content of the editor.</p>"
                  init={{
                     height: 500,
                     menubar: false,
                     plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "preview",
                        "help",
                        "wordcount",
                        "table",
                     ],
                     toolbar:
                        "undo redo | blocks | " +
                        "bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "table |" +
                        "removeformat | help",
                     content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
               />
               {h.save_button(h.buttons("Simpan", isSubmit), 12, 5)}
            </Col>
         </Row>
      </Form>
   );
};
export default Forms;
