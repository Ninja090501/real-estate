(function ($) {
    "use strict";
	
	var $window = $(window); 
	var $body = $('body'); 
	
	function startCounter(element, target) {
        let count = 0;
        let speed = 10; // Speed in milliseconds
        let step = Math.ceil(target / 100); // Increment step

        let interval = setInterval(() => {
            count += step;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.innerText = count;
        }, speed);
    }

    // Automatically start all counters on page load
    window.onload = function () {
        document.querySelectorAll(".counter").forEach(counter => {
            let targetValue = parseInt(counter.getAttribute("data-target"));
            startCounter(counter, targetValue);
        });
    };

    // Testimonial JS
    $('.testimonials').slick({
      centerMode: true,
      centerPadding: '15%',  // Adjust as needed
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: true,  // Corrected typo
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 1000,
      dots: false,
      arrows: false,
      responsive: [
          {
              breakpoint: 991,
              settings: {
                  slidesToShow: 2
              }
          },
          {
              breakpoint: 767,
              settings: {
                  slidesToShow: 1
              }
          }
      ]
  });
  
	
})(jQuery);