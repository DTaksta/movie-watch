/**
 * Handles the auth-navbar toggle on small screens
 * keeping styles and layout coherent.
 */

angular.module('app')
    .directive('openedToggle', function() {
        return {
            restrict: 'A',
            link: function($scope, $element) {
                $('button.navbar-toggle').click(function() {
                    if ($element.hasClass('opened')) {
                        setTimeout(function(){
                            $element.removeClass('opened');
                        }, 200);
                    } else {
                        setTimeout(function(){
                            $('.dropdown').addClass('open');
                        }, 1);
                        $element.addClass('opened');
                    }
                });
            }
        }
    });