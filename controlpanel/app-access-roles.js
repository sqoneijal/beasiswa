"use strict";
$(function () {
   var e,
      a = $(".datatables-permissions"),
      d = "app-user-list.html";
   a.length &&
      (e = a.DataTable({
         ajax: assetsPath + "json/permissions-list.json",
         columns: [{ data: "" }, { data: "id" }, { data: "name" }, { data: "assigned_to" }, { data: "created_date" }, { data: "" }],
         columnDefs: [
            {
               className: "control",
               orderable: !1,
               searchable: !1,
               responsivePriority: 2,
               targets: 0,
               render: function (e, a, t, s) {
                  return "";
               },
            },
            { targets: 1, searchable: !1, visible: !1 },
            {
               targets: 2,
               render: function (e, a, t, s) {
                  return '<span class="text-nowrap text-heading">' + t.name + "</span>";
               },
            },
            {
               targets: 3,
               orderable: !1,
               render: function (e, a, t, s) {
                  for (
                     var n = t.assigned_to,
                        r = "",
                        o = {
                           Admin: '<a href="' + d + '"><span class="badge me-4 bg-label-primary">Administrator</span></a>',
                           Manager: '<a href="' + d + '"><span class="badge me-4 bg-label-warning">Manager</span></a>',
                           Users: '<a href="' + d + '"><span class="badge me-4 bg-label-success">Users</span></a>',
                           Support: '<a href="' + d + '"><span class="badge me-4 bg-label-info">Support</span></a>',
                           Restricted: '<a href="' + d + '"><span class="badge me-4 bg-label-danger">Restricted User</span></a>',
                        },
                        i = 0;
                     i < n.length;
                     i++
                  )
                     r += o[n[i]];
                  return '<span class="text-nowrap">' + r + "</span>";
               },
            },
            {
               targets: 4,
               orderable: !1,
               render: function (e, a, t, s) {
                  return '<span class="text-nowrap">' + t.created_date + "</span>";
               },
            },
            {
               targets: -1,
               searchable: !1,
               title: "Actions",
               orderable: !1,
               render: function (e, a, t, s) {
                  return '<div class="d-flex align-items-center"><span class="text-nowrap"><button class="btn btn-icon btn-text-secondary waves-effect waves-light rounded-pill me-1" data-bs-target="#editPermissionModal" data-bs-toggle="modal" data-bs-dismiss="modal"><i class="ti ti-edit ti-md"></i></button><a href="javascript:;" class="btn btn-icon btn-text-secondary waves-effect waves-light rounded-pill dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical ti-md mx-1"></i></a><div class="dropdown-menu dropdown-menu-end m-0"><a href="javascript:;"" class="dropdown-item">Edit</a><a href="javascript:;" class="dropdown-item">Suspend</a></div></div>';
               },
            },
         ],
         order: [[1, "asc"]],
         dom: '<"row mx-1"<"col-sm-12 col-md-3" l><"col-sm-12 col-md-9"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center flex-wrap"<"me-4 mt-n6 mt-md-0"f>B>>>t<"row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',
         language: {
            sLengthMenu: "Show _MENU_",
            search: "",
            searchPlaceholder: "Search Permissions",
            paginate: { next: '<i class="ti ti-chevron-right ti-sm"></i>', previous: '<i class="ti ti-chevron-left ti-sm"></i>' },
         },
         buttons: [
            {
               text: '<i class="ti ti-plus ti-xs me-0 me-sm-2"></i><span class="d-none d-sm-inline-block">Add Permission</span>',
               className: "add-new btn btn-primary mb-6 mb-md-0 waves-effect waves-light",
               attr: { "data-bs-toggle": "modal", "data-bs-target": "#addPermissionModal" },
               init: function (e, a, t) {
                  $(a).removeClass("btn-secondary");
               },
            },
         ],
         responsive: {
            details: {
               display: $.fn.dataTable.Responsive.display.modal({
                  header: function (e) {
                     return "Details of " + e.data().name;
                  },
               }),
               type: "column",
               renderer: function (e, a, t) {
                  t = $.map(t, function (e, a) {
                     return "" !== e.title
                        ? '<tr data-dt-row="' +
                             e.rowIndex +
                             '" data-dt-column="' +
                             e.columnIndex +
                             '"><td>' +
                             e.title +
                             ":</td> <td>" +
                             e.data +
                             "</td></tr>"
                        : "";
                  }).join("");
                  return !!t && $('<table class="table"/><tbody />').append(t);
               },
            },
         },
         initComplete: function () {
            this.api()
               .columns(3)
               .every(function () {
                  var a = this,
                     t = $('<select id="UserRole" class="form-select text-capitalize"><option value=""> Select Role </option></select>')
                        .appendTo(".user_role")
                        .on("change", function () {
                           var e = $.fn.dataTable.util.escapeRegex($(this).val());
                           a.search(e ? "^" + e + "$" : "", !0, !1).draw();
                        });
                  a.data()
                     .unique()
                     .sort()
                     .each(function (e, a) {
                        t.append('<option value="' + e + '" class="text-capitalize">' + e + "</option>");
                     });
               });
         },
      })),
      $(".datatables-permissions tbody").on("click", ".delete-record", function () {
         e.row($(this).parents("tr")).remove().draw();
      }),
      setTimeout(() => {
         $(".dataTables_filter .form-control").removeClass("form-control-sm"),
            $(".dataTables_length .form-select").removeClass("form-select-sm"),
            $(".dataTables_info").addClass("ms-n1"),
            $(".dataTables_paginate").addClass("me-n1");
      }, 300);
});
