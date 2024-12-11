import { Editor } from "@tinymce/tinymce-react";
import decode from `decode-html`;
import React, { useLayoutEffect, useRef, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as h from "~/Helpers";

const Forms = () => {
   const { module,init } = useSelector((e) => e.redux);
   const editorRef = useRef(null);

   // bool
   const [isSubmit, setIsSubmit] = useState(false);

   // object
   const [input, setInput] = useState({});

   const submit = (e) => {
      e.preventDefault();
      const formData = {
         user_modified: init.preferred_username,
         content: editorRef.current.getContent()
      };

      setIsSubmit(true);
      const fetch = h.post(`/tentang/submit`, formData);
      fetch.then((res) => {
         if (typeof res === "undefined") return;

         const { data } = res;
         if (typeof data.code !== "undefined" && h.parse("code", data) !== 200) {
            h.notification(false, h.parse("message", data));
            return;
         }

         h.notification(data.status, data.msg_response);

         if (!data.status) return;
      });
      fetch.finally(() => {
         setIsSubmit(false);
      });
   };

   useLayoutEffect(() => {
      const { content } = module;
      if (h.objLength(content)) setInput({content: decode(h.parse("content", content))});
      return () => {};
   }, [module]);

   return (
      <Form onSubmit={isSubmit ? null : submit}>
         <Row>
            <Col>
               <Editor
                  tinymceScriptSrc="/controlpanel/assets/tinymce/tinymce.min.js"
                  licenseKey="gpl"
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  initialValue={h.parse("content", input)}
                  init={{
                     height: 600,
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
