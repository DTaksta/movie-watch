angular.module('app')
    .factory('toastrService', function(toastr) {
       return {
           success: function(desc, msg) {
               toastr.success(desc, msg, {
                   closeButton: true,
                   toastClass: 'success-toast-brand'
               });
           },
           error: function(desc, msg) {
               toastr.error(desc, msg, {
                   closeButton: true,
                   toastClass: 'error-toast-brand'
               });
           }
       }
    });