import { Editor } from "@tinymce/tinymce-react";
import decode from `decode-html`;
import React, { useLayoutEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import * as h from "~/Helpers";
import { setModule } from "~/redux";

const OtherTags = React.lazy(() => import("./OtherTags"));

const Forms = ({ setPageTypeButton }) => {
   const { init, module } = useSelector((e) => e.redux);
   const { pageType, detailContent } = module;
   const editorRef = useRef(null);
   const dispatch = useDispatch();

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [errors, setErrors] = useState({});
   const [input, setInput] = useState({});

   // array
   const [selectedLampiranUpload, setSelectedLampiranUpload] = useState([]);

   useLayoutEffect(() => {
      if (pageType === "update" && h.objLength(detailContent)) {
         setInput({
            id: h.parse("id", detailContent),
            judul: h.parse("judul", detailContent),
            id_jenis_beasiswa: h.parse("id_jenis_beasiswa", detailContent),
            content: decode(h.parse("content", detailContent)),
         });
         setSelectedLampiranUpload(JSON.parse(detailContent.lampiran_upload));
      }
      return () => {};
   }, [pageType, detailContent]);

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
      const formData = {
         pageType,
         user_modified: init.preferred_username,
         content: editorRef.current.getContent(),
         lampiran: h.arrLength(selectedLampiranUpload) ? JSON.stringify(selectedLampiranUpload) : "",
      };
      Object.keys(input).forEach((key) => (formData[key] = input[key]));

      setIsSubmit(true);
      const fetch = h.post(`/informasi/submit`, formData);
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

   const props = { input, setInput, selectedLampiranUpload, setSelectedLampiranUpload };

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
         wrapperClass="page-loader flex-column justify-content-center"
      />
   );

   return (
      <React.Suspense fallback={loader}>
         <Form onSubmit={isSubmit ? null : submit}>
            <Row>
               <Col lg={8} md={8} sm={12}>
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
                     tinymceScriptSrc="/controlpanel/assets/tinymce/tinymce.min.js"
                     licenseKey="gpl"
                     onInit={(_evt, editor) => (editorRef.current = editor)}
                     initialValue={h.parse("content", input)}
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
               <OtherTags {...props} />
            </Row>
         </Form>
      </React.Suspense>
   );
};
export default Forms;
