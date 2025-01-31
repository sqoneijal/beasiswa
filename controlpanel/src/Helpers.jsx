import axios from "axios";
import DataTables from "datatables.net";
import $ from "jquery";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Flatpickr from "react-flatpickr";
import Swal from "sweetalert2";
import toastr from "toastr";
import { uid } from "uid/secure";
import { Each } from "./Each";

let dt;

export const parse = (key, content = {}, type = "text") => {
   if (typeof content[key] === "undefined") {
      return "";
   }
   let text = content[key];
   if (text == null || text == "") {
      return "";
   }
   text = text.toString();
   if (type === "date" && valid_date(text) && text !== "-") return moment(text).format("DD MMMM YYYY");
   if (type === "jam") {
      return moment(text, "HH:mm").format("hh:mm A");
   }
   if (text.slice(0, 1) == "0") {
      return text.replace(/^(?:\s+|\s+)$/gm, "");
   }
   if (text.replace(/\d/gm, "").length > 0) {
      return text;
   }
   return toInt(text) > 0 ? toInt(text) : text.replace(/^(?:\s+|\s+)$/gm, "");
};

export const get = async (url) => {
   try {
      const mutex = {
         locked: false,
         lock() {
            if (this.locked) {
               // Menunggu sampai sumber daya tersedia
               return new Promise((resolve) => {
                  setTimeout(() => {
                     resolve(this.lock());
                  }, 10);
               });
            } else {
               this.locked = true;
               return Promise.resolve();
            }
         },
         unlock() {
            this.locked = false;
         },
      };

      await mutex.lock();

      const send = axios.get(`${window.apiPath}${url}`, {
         signal: abortSignal(100_000),
      });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && parse("code", data) !== 200) {
            notification(false, data.message, error_code_http(data.code));
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            notification(false, "Sistem sedang sibuk, silahkan coba beberapa saat lagi!", e.code);
         } else {
            notification(false, e.message, error_code_http(e.response.status));
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      console.error(error);
   }
};

export const notification = (status, msg_response, title) => {
   toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: true,
      positionClass: "toast-top-center",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
   };

   if (status) {
      toastr.success(msg_response);
   } else {
      toastr.error(msg_response, title);
   }
};

const abortSignal = (timeoutMs) => {
   const abortController = new AbortController();
   setTimeout(() => abortController.abort(), timeoutMs || 0);
   return abortController.signal;
};

export const toInt = (string) => {
   return isNaN(parseFloat(string)) ? 0 : parseFloat(string);
};

export const post = async (url, form = [], config = {}) => {
   try {
      const mutex = {
         locked: false,
         lock() {
            if (this.locked) {
               // Menunggu sampai sumber daya tersedia
               return new Promise((resolve) => {
                  setTimeout(() => {
                     resolve(this.lock());
                  }, 10);
               });
            } else {
               this.locked = true;
               return Promise.resolve();
            }
         },
         unlock() {
            this.locked = false;
         },
      };

      await mutex.lock();
      const formData = new FormData();
      Object.keys(form).forEach((data) => formData.append(data, form[data]));

      const send = axios.post(`${window.apiPath}${url}`, formData, { ...config, signal: abortSignal(200_000) });
      send.then((res) => {
         const { data } = res;
         if (typeof data.code !== "undefined" && parse("code", data) !== 200) {
            notification(false, data.message, error_code_http(data.code));
         }
      });
      send.catch((e) => {
         if (e.code === "ERR_CANCELED") {
            notification(false, "Sistem sedang sibuk, silahkan coba beberapa saat lagi!", e.code);
         } else if (e.code === "ERR_NETWORK") {
            notification(false, `${e.message} [ ${e.config.url} ]`);
         } else {
            notification(false, `${e.message} [ ${e.config.url} ]`, error_code_http(e.response.status));
         }
      });

      mutex.unlock();
      return await send;
   } catch (error) {
      // error
   }
};

export const objLength = (content = {}) => {
   return Object.keys(content).length > 0;
};

export const detail_label = (label, value, span = 0) => {
   return (
      <Row className="mb-2">
         <Col md={span} sm={12} className={`fw-semibold text-muted`} style={{ fontSize: 11 }}>
            {label}
         </Col>
         <Col md={12 - span} sm={12}>
            <span title={value} className={`fw-bold`}>
               {value || "-"}
            </span>
         </Col>
      </Row>
   );
};

export const error_code_http = (code) => {
   const config = {
      100: "Continue",
      101: "Switching Protocols",
      102: "Processing",
      103: "Early Hints",
      122: "Request-URI too long",
      127: "Network Authentication Required",
      150: "Continue",
      151: "Switching Protocols",
      152: "Processing",
      153: "Early Hints",
      158: "Request-URI too long",
      159: "Network Authentication Required",
      180: "Continue",
      181: "Switching Protocols",
      182: "Processing",
      183: "Early Hints",
      188: "Request-URI too long",
      189: "Network Authentication Required",
      199: "Network Authentication Required",
      200: "OK",
      201: "Created",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      207: "Multi-Status",
      208: "Already Reported",
      226: "IM Used",
      250: "Continue",
      251: "Switching Protocols",
      252: "Processing",
      253: "Early Hints",
      258: "Request-URI too long",
      259: "Network Authentication Required",
      299: "Network Authentication Required",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      310: "Too many Redirect",
      399: "Client Closed Request",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      421: "Misdirected Request",
      422: "Unprocessable Entity",
      423: "Locked",
      424: "Failed Dependency",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      499: "Client Closed Request",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      510: "Not Extended",
      511: "Network Authentication Required",
      599: "Network Authentication Required",
   };

   return typeof config[code] === "undefined" ? "Terjadi sesuatu kesalahan" : config[code];
};

export const periode = (semester) => {
   const tahun_ajaran = semester.toString().slice(0, -1);
   const id_semester = semester.toString().slice(4);

   const genap_ganjil_pendek = {
      1: "Ganjil",
      2: "Genap",
      3: "Pendek",
   };

   if (tahun_ajaran && id_semester) return `${tahun_ajaran}/${toInt(tahun_ajaran) + 1} ${genap_ganjil_pendek[id_semester]}`;
};

export const serialize = (obj) => {
   const str = [];
   for (const p in obj) {
      if (Object.hasOwn(obj, p)) {
         str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
      }
   }
   return str.join("&");
};

export const table_loading = (colSpan = 0) => {
   return (
      <tr>
         <td colSpan={colSpan} className="text-center">
            <span className="spinner-border w-15px h-15px text-muted align-middle me-2" />
            <span className="text-gray-600">Loading...</span>
         </td>
      </tr>
   );
};

export const buttons = (label, isLoading = false, init = {}) => {
   // Menghapus semua spasi dalam string
   const tanpaSpasi = label.replace(/\s+/g, "");

   // Mengubah huruf menjadi huruf kecil (lowercase)
   const hurufKecil = tanpaSpasi.toLowerCase();

   window.Waves.init();

   return (
      <Button
         type="submit"
         id={hurufKecil}
         name={hurufKecil}
         disabled={isLoading}
         size="sm"
         className={`fw-bold border-0 waves-effect waves-light ${parse("className", init)}`}
         {...init}>
         {isLoading ? (
            <span className="indicator-label">
               Loading... <span className="spinner-border spinner-border-sm align-middle ms-2" />
            </span>
         ) : (
            <span className="indicator-label">{label}</span>
         )}
      </Button>
   );
};

export const form_text = (label, name, labelSize = 2, config = {}, errors = {}) => {
   const uniqueID = `${uid(32)}`;

   return (
      <Row className="mb-6">
         <label className={`col-sm-${labelSize} col-form-label`} htmlFor={uniqueID}>
            {label}
         </label>
         <Col sm={12 - labelSize}>
            <Form.Control type="text" id={uniqueID} placeholder={label} {...config} isInvalid={is_invalid(name, errors)} />
            {msg_response(name, errors)}
         </Col>
      </Row>
   );
};

export const form_upload = (label, name, labelSize = 2, config = {}, errors = {}) => {
   const uniqueID = `${uid(32)}`;

   return (
      <Row className="mb-6">
         <label className={`col-sm-${labelSize} col-form-label`} htmlFor={uniqueID}>
            {label}
         </label>
         <Col sm={12 - labelSize}>
            <Form.Control type="file" id={uniqueID} placeholder={label} {...config} isInvalid={is_invalid(name, errors)} />
            {msg_response(name, errors)}
         </Col>
      </Row>
   );
};

export const form_select = (label, name, labelSize = 2, options = [], config = {}, errors = {}) => {
   const uniqueID = `${uid(32)}`;

   return (
      <Row className="mb-6">
         <label className={`col-sm-${labelSize} col-form-label`} htmlFor={uniqueID}>
            {label}
         </label>
         <Col sm={12 - labelSize}>
            <Form.Control as="select" id={uniqueID} placeholder={label} {...config} isInvalid={is_invalid(name, errors)}>
               <option value="">--pilih--</option>
               {arrLength(options) > 0 && <Each of={options} render={(row) => <option value={parse("value", row)}>{parse("label", row)}</option>} />}
            </Form.Control>
            {msg_response(name, errors)}
         </Col>
      </Row>
   );
};

export const form_multiple = (label, name, labelSize = 2, config = {}, errors = {}) => {
   const uniqueID = `${name}_${uid(32)}`;

   return (
      <Row className="mb-6">
         <label className={`col-sm-${labelSize} col-form-label`} htmlFor={uniqueID}>
            {label}
         </label>
         <Col sm={12 - labelSize}>
            <Typeahead id={uniqueID} labelKey={name} multiple placeholder={label} {...config} isInvalid={is_invalid(name, errors)} />
            {msg_response(name, errors)}
         </Col>
      </Row>
   );
};

export const date_picker = (label, name, labelSize = 2, config = {}, errors = {}) => {
   const uniqueID = `${name}_${uid(32)}`;

   return (
      <Row className="mb-6">
         <label className={`col-sm-${labelSize} col-form-label`} htmlFor={uniqueID}>
            {label}
         </label>
         <Col sm={12 - labelSize}>
            <Flatpickr className={`form-control ${is_invalid(name, errors) ? "is-invalid" : ""}`} placeholder={label} id={uniqueID} {...config} />
            {msg_response(name, errors)}
         </Col>
      </Row>
   );
};

export const form_textarea = (label, name, labelSize = 2, config = {}, errors = {}) => {
   const uniqueID = `${uid(32)}`;

   return (
      <Row className="mb-6">
         <label className={`col-sm-${labelSize} col-form-label`} htmlFor={uniqueID}>
            {label}
         </label>
         <Col sm={12 - labelSize}>
            <Form.Control as="textarea" id={uniqueID} placeholder={label} {...config} isInvalid={is_invalid(name, errors)} />
            {msg_response(name, errors)}
         </Col>
      </Row>
   );
};

export const save_button = (button, col = 12, mt = 0) => {
   return (
      <Row className={`justify-content-end mt-${mt}`}>
         <div className={`col-sm-${col}`}>{button}</div>
      </Row>
   );
};

export const msg_response = (key, object = {}) => {
   if (parse(key, object)) {
      return <Form.Control.Feedback type="invalid">{parse(key, object)}</Form.Control.Feedback>;
   }
};

export const is_invalid = (key, object = {}) => {
   return !!parse(key, object);
};

export const confirmDelete = async ({ ...content }) => {
   const res = await Swal.fire({
      text: parse("message", content) ? content.message : "Apakah anda yakin ingin menghapus data ini?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Iya, hapus!",
      cancelButtonText: "Tidak, batal",
      customClass: {
         confirmButton: "btn btn-sm fw-bold btn-danger waves-effect waves-light",
         cancelButton: "btn btn-sm fw-bold btn-primary waves-effect waves-light",
      },
   });
   return res.isConfirmed ? hapus(content.url, content.id, content.custom) : { data: { status: false, msg_response: "Data batal dihapus." } };
};

export const confirm = async (message) => {
   return await Swal.fire({
      text: message,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
      customClass: {
         confirmButton: "btn btn-sm fw-bold btn-primary",
         cancelButton: "btn btn-sm fw-bold btn-danger",
      },
   });
};

const hapus = async (url, id, custom = {}) => {
   const formData = {
      id,
      ...custom,
   };

   try {
      return await post(url, formData);
   } catch (e) {
      notification(false, e.code, e.message);
   }
};

function handleError(xhr) {
   if (xhr) notification(false, xhr.statusText);
}

const DatatableServerSide = ({ ...content }) => {
   const renderColumnDefs = [
      {
         targets: -1,
         data: null,
         orderable: false,
         className: "text-end",
         width: "5%",
         render: () => renderDTActionButtons(content),
      },
   ];

   DataTables.defaults = {
      ...DataTables.defaults,
      renderer: "bootstrap",
   };

   DataTables.ext.classes = {
      ...DataTables.ext.classes,
      container: "dataTables_wrapper dt-bootstrap5 no-footer",
      length: {
         container: "dataTables_length",
         select: "form-select",
      },
      search: {
         container: "dataTables_filter",
         input: "form-control",
      },
      info: {
         container: "dataTables_info ms-n1",
      },
      empty: {
         row: "dataTables_empty",
      },
      paging: {
         container: "dataTables_paginate paging_simple_numbers me-n1",
      },
   };

   DataTables.ext.renderer.pagingButton.bootstrap = (settings, buttonType, content, active, disabled) => {
      const btnClasses = ["paginate_button", "page-item"];

      if (active) {
         btnClasses.push("active");
      }

      if (disabled) {
         btnClasses.push("disabled");
      }

      const li = $("<li>").addClass(btnClasses.join(" "));
      const a = $("<a>", {
         class: "page-link",
         role: "link",
         type: "button",
      })
         .html(content)
         .appendTo(li);

      return {
         display: li,
         clicker: a,
      };
   };

   const contentOrder = arrLength(content.orders) ? content.orders : [[0, "asc"]];
   const checkOrderVariable = typeof content.orders === "undefined" ? [[0, "asc"]] : contentOrder;

   dt = new DataTables("#datatable", {
      ...content,
      processing: true,
      serverSide: true,
      pageLength: 10,
      ajax: {
         url: `${window.apiPath}${content.url}`,
         data: (e) => {
            return $.extend({}, e, content.filter);
         },
         type: "post",
         error: handleError,
      },
      order: checkOrderVariable,
      columnDefs: content.columnDefs ? renderColumnDefs : [],
      dom: getDom(),
      language: {
         sLengthMenu: "Show _MENU_",
         search: "",
         searchPlaceholder: "Cari...",
         paginate: {
            next: '<i class="ti ti-chevron-right ti-sm"></i>',
            previous: '<i class="ti ti-chevron-left ti-sm"></i>',
            last: '<i class="ti ti-chevrons-right ti-sm"></i>',
            first: '<i class="ti ti-chevrons-left ti-sm"></i>',
         },
      },
      createdRow: content.createdRow,
   });
};

const getDom = () => {
   return '<"row mx-1"<"col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start gap-2"l<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start"B>><"col-12 col-md-6 d-flex align-items-center justify-content-end flex-column flex-md-row pe-5 gap-md-4 mt-n6 mt-md-0"f<"custom_filter mb-6 mb-md-0">>>t<"row mx-1"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>';
};

const renderDTActionButtons = (content) => {
   let html = `<div class="d-flex align-items-center">`;
   html += `<a href="#" id="view" class="btn btn-icon btn-text-secondary waves-effect waves-light rounded-pill"><i class="ti ti-eye ti-md"></i></a>`;
   if (content.show_edit_button)
      html += `<a href="#" id="edit" class="btn btn-icon btn-text-secondary waves-effect waves-light rounded-pill"><i class="ti ti-edit ti-md"></i></a>`;
   if (content.show_delete_button)
      html += `<a href="#" id="delete" class="btn btn-icon btn-text-secondary waves-effect waves-light rounded-pill"><i class="ti ti-trash ti-md"></i></a>`;
   html += `</div>`;
   return html;
};

export const handleFilterDatatable = (url, content = {}) => {
   dt.ajax.url(`${window.apiPath}/${url}?${serialize(content)}`).load();
};

export const initDatatable = ({ ...content }) => {
   return {
      reload: () => {
         dt.ajax.reload(null, false);
      },
      init: () => {
         DatatableServerSide(content);
      },
   };
};

export const arrLength = (content = []) => {
   return content.length > 0;
};
