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

    //JS for Change Grid to List
    document.addEventListener("DOMContentLoaded", function () {
        const listTypes = document.querySelectorAll(".list-type");

        listTypes.forEach(item => {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                
                // Remove 'active' class from all items
                listTypes.forEach(el => el.classList.remove("active"));
                
                // Add 'active' class to the clicked item
                this.classList.add("active");
            });
        });
    });

    // Price Range
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    const minIndicator = document.getElementById('min-indicator');
    const maxIndicator = document.getElementById('max-indicator');
    const rangeSlider = document.querySelector('.range-slider');
    
    const minGap = 10; // Minimum gap between sliders
    
    function updatePrices() {
        let min = parseInt(minPrice.value);
        let max = parseInt(maxPrice.value);
    
        // Ensure no overlap
        if (max - min < minGap) {
            if (event.target === minPrice) {
                minPrice.value = max - minGap;
            } else {
                maxPrice.value = parseInt(minPrice.value) + minGap;
            }
        }
    
        // Update percentage variables for CSS
        const minPercent = ((minPrice.value - minPrice.min) / (minPrice.max - minPrice.min)) * 100;
        const maxPercent = ((maxPrice.value - maxPrice.min) / (maxPrice.max - maxPrice.min)) * 100;
    
        rangeSlider.style.setProperty('--min-percent', `${minPercent}`);
        rangeSlider.style.setProperty('--max-percent', `${maxPercent}`);
    
        // Update price indicators
        minIndicator.textContent = `$${minPrice.value}`;
        maxIndicator.textContent = `$${maxPrice.value}`;
    
        // Update indicator positions
        minIndicator.style.left = `${minPercent}%`;
        maxIndicator.style.left = `${maxPercent}%`;
    }
    
    // Event listeners
    minPrice.addEventListener('input', updatePrices);
    maxPrice.addEventListener('input', updatePrices);
    
    // Initial position setup
    updatePrices();

    // List & Grid View JS.
    document.addEventListener("DOMContentLoaded", function () {
        const gridBtn = document.getElementById("grid-view");
        const listBtn = document.getElementById("list-view");
        const gridContent = document.querySelector("#grid"); // Assuming a container for grid
        const listContent = document.querySelector("#list"); // Assuming a container for list
    
        // Show grid by default and hide list
        gridContent.style.display = "flez";
        listContent.style.display = "none";
    
        gridBtn.addEventListener("click", function () {
            gridContent.style.display = "flex";
            listContent.style.display = "none";
            gridBtn.classList.add("active");
            listBtn.classList.remove("active");
        });
    
        listBtn.addEventListener("click", function () {
            listContent.style.display = "block";
            gridContent.style.display = "none";
            listBtn.classList.add("active");
            gridBtn.classList.remove("active");
        });
    });
  
	
})(jQuery);