var breakpoints = [];
var currSection = 0;
var sectionOffset = ( $(window).width() < 750 ) ? 55 : 120;
var schedAnimation = false;
var puzzAnimation = false;
var idx = 0;

$(function() {
     /* Custom JS */
     setTimeout( function() {
          $("#panorama").addClass("animate");

          // $(window).on("resize", function() {
          //      $("#altmap-layers").css({ height: ( (760/1950) * $(window).width() ) + "px"  });
          //      redrawBreakpoints();
          // }).trigger("resize");

          // $(window).trigger("scroll");
     }, 2);

     /* Alternatives Map */
     $("#altmap-header a, #altmap-footer a").on("click", function() {
          var $this = $(this);
          var $img = $("#altmap-layers img[src*='" + $(this).attr("id") + "']");
          if( $this.hasClass("showing") ) {
               $img.fadeOut(75);
               $this.removeClass("showing");
          } else {
               if($this.parent().is("#altmap-header")) {
                    var $turnoff = $("#altmap-header a.showing");
                    var $turnoffImg = $("#altmap-layers img[src*='" + $turnoff.attr("id")  + "']");
                    $turnoffImg.fadeOut(75);
                    $turnoff.removeClass("showing");
               }

               $img.fadeIn(225);
               $this.addClass("showing");
          }
     });
     $("#altmap-header a:last-of-type").trigger("click");

     /* On Scroll */
     // $(window).on("scroll", function() {
     //      var scrHt = $(window).scrollTop();

     //      // if( !schedAnimation && 
     //      //      ( scrHt > $("#schedule").offset().top - ( 3 * sectionOffset ) ) ) {
     //      //           schedAnimation = true;
     //      //           $("#actual-schedule").addClass("animate");
     //      // }

     //      if( breakpoints.length > 0 ) {
     //           if( scrHt >= $(document).height() - $(window).height() - 15 ) {
     //                $(".menu > li  > a").removeClass("selected").eq( breakpoints.length - 1 ).addClass("selected");
     //                currSection = breakpoints.length - 1;
     //           } else {
     //                var which = 0;
     //                for( var bp = 0; bp < breakpoints.length; bp++ ) {
     //                     if( scrHt > breakpoints[bp] ) {
     //                     which = bp;
     //                     } else {
     //                          bp = breakpoints.length;
     //                     }
     //                }

     //                if( which != currSection ) {
     //                     $(".menu > li > a").removeClass("selected").eq( which ).addClass("selected");
     //                     currSection = which;
     //                }
     //           }
     //      }
     // });

     /* Menu */
     // $(".menu li a").each(function() {
     //      var which = $(this).attr("href").split("#")[1];
     //      $(this).attr("href", "javascript:void(0);").on("click", function() {
     //           var currScr = $(window).scrollTop();
     //           var newScr = $("#" + which).offset().top - sectionOffset;

     //           var spd = ( ( Math.abs( newScr - currScr ) ) / 6 );
     //           if( spd < 900 ) { spd = 900; }

     //           $("body,html").stop().animate({ scrollTop: newScr }, spd );
     //           $(".menu").removeClass("opened");

     //           ga("send", {
     //                hitType: "event",
     //                eventCategory: "Navigation",
     //                eventAction: "clicked",
     //                eventLabel:  which
     //           });
     //      });
     // });

     $(".menu > a").on("click", function() {
          $(".menu").toggleClass("opened");
     });

     /* Accordion */
     var multipleCanBeOpen = false;
     var sliderSpeed = 575;
     if( $(".accordion").length > 0 ) {
          $(".accordion > div").slideUp(1);
          $(".accordion-header").on("click", function() {
               var $accordion = $(this).parent();
               if( $accordion.hasClass("opened") ) {
                    $accordion.removeClass("opened").children("div").slideUp( sliderSpeed );
               } else {
                    if( !multipleCanBeOpen) {
                         $(".accordion.opened").removeClass("opened").children("div").slideUp( sliderSpeed );
                    }
                    $accordion.addClass("opened").children("div").slideDown( sliderSpeed );
               }

               // setTimeout(function() {
               //      redrawBreakpoints();
               // }, sliderSpeed + 1);
          });
     }

     if( $(".testimonials").length > 0 ) {
          // setInterval( function() {
          //      $(".testimonials > div.showing").fadeOut( 600, function() {
          //           var next = idx + 1;
          //           if( next == $(".testimonials > div").length ) { next = 0; }
          //           idx  = next;
          //           $(".testimonials > div").removeClass("showing").eq(next).addClass("showing");
          //           $(".testimonials > div.showing").fadeIn( 450 );
          //      });
          // }, 6500 );

          $(".testimonials > span").on("click", function() {
               var dir = $(this).hasClass("right") ? 1 : -1;
               var $divs = $(".testimonials > div");
               var curr = $divs.index( $(".testimonials > div.showing") );
               var next = curr + dir;
               if( next < 0 ) { next = $divs.length  - 1; }
               if( next > $divs.length - 1 ) { next = 0; }
               $divs.removeClass("showing").eq( next ).addClass("showing");
          });
     }

     if( $("#puzzle").length > 0 ) {
          $(window).on( "scroll", function() {
               scrHt = $(window).scrollTop();

               if( !puzzAnimation && ( scrHt > ( $("#puzzle").offset().top - ( $(window).height() * .4  ) ) ) ) {
                    puzzAnimation = true; 
                    $("body").addClass("animate");
               }

               if( !schedAnimation && 
                    ( scrHt > $("#schedule").offset().top - ( 3 * sectionOffset ) ) ) {
                         schedAnimation = true;
                         $("#actual-schedule").addClass("animate");
               }

               if( schedAnimation && puzzAnimation ) {
                    $(window).off("scroll");
               }
          });
     }
});

// function redrawBreakpoints() {
//      breakpoints = [];
//      $(".breakpoint").each(function() {
//           breakpoints.push( $(this).offset().top - ( sectionOffset + 1 ) );
//      });
// }