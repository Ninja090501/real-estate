(function ($) {
    "use strict";
    
    var $window = $(window);
    var $body = $('body');
    
    function startCounter(element, target) {
        let count = 0;
        let speed = 10;
        let step = Math.ceil(target / 100);

        let interval = setInterval(() => {
            count += step;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.innerText = count;
        }, speed);
    }

    window.onload = function () {
        document.querySelectorAll(".counter").forEach(counter => {
            let targetValue = parseInt(counter.getAttribute("data-target"));
            if (!isNaN(targetValue)) {
                startCounter(counter, targetValue);
            }
        });
    };

    $('.testimonials').slick({
        centerMode: true,
        centerPadding: '15%',
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        speed: 1000,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 767,
                settings: { slidesToShow: 1 }
            }
        ]
    });

    document.addEventListener("DOMContentLoaded", function () {
        const listTypes = document.querySelectorAll(".list-type");

        if (listTypes.length > 0) {  // Added null check
            listTypes.forEach(item => {
                item.addEventListener("click", function (event) {
                    event.preventDefault();
                    listTypes.forEach(el => el.classList.remove("active"));
                    this.classList.add("active");
                });
            });
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const minPrice = document.getElementById('min-price');
        const maxPrice = document.getElementById('max-price');
        const minIndicator = document.getElementById('min-indicator');
        const maxIndicator = document.getElementById('max-indicator');
        const rangeSlider = document.querySelector('.range-slider');

        if (minPrice && maxPrice && minIndicator && maxIndicator && rangeSlider) {
            const minGap = 10;

            function updatePrices() {
                let min = parseInt(minPrice.value);
                let max = parseInt(maxPrice.value);
                if (max - min < minGap) {
                    if (event.target === minPrice) {
                        minPrice.value = max - minGap;
                    } else {
                        maxPrice.value = parseInt(minPrice.value) + minGap;
                    }
                }
                const minPercent = ((minPrice.value - minPrice.min) / (minPrice.max - minPrice.min)) * 100;
                const maxPercent = ((maxPrice.value - maxPrice.min) / (maxPrice.max - maxPrice.min)) * 100;
                rangeSlider.style.setProperty('--min-percent', `${minPercent}`);
                rangeSlider.style.setProperty('--max-percent', `${maxPercent}`);
                minIndicator.textContent = `$${minPrice.value}`;
                maxIndicator.textContent = `$${maxPrice.value}`;
                minIndicator.style.left = `${minPercent}%`;
                maxIndicator.style.left = `${maxPercent}%`;
            }

            minPrice.addEventListener('input', updatePrices);
            maxPrice.addEventListener('input', updatePrices);
            updatePrices();
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const gridBtn = document.getElementById("grid-view");
        const listBtn = document.getElementById("list-view");
        const gridContent = document.querySelector("#grid");
        const listContent = document.querySelector("#list");

        if (gridBtn && listBtn && gridContent && listContent) {  // Added null check
            gridContent.style.display = "flex";
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
        }
    });

    // Details Page Slider JS
    $('.detail-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        prevArrow:'<button type="button" class="slick-prev pull-left"><i class="fa fa-chevron-left"></i></button>',
        nextArrow:'<button type="button" class="slick-next pull-right"><i class="fa fa-chevron-right"></i></button>',
        asNavFor: '.detail-slider-nav'
    });
    $('.detail-slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.detail-slider-for',
        dots: false,
        arrows: false,
        centerMode: false,
        focusOnSelect: true
    });

    // Collapse Boxes of Content in Details Page.
    document.addEventListener("DOMContentLoaded", function () {
        let btn = document.getElementById("toggle-btn");
        let btnFacility = document.getElementById("facilities-toggle-btn");
        let fullText = document.getElementById("full-text");
        let fullTextFacilities = document.getElementById("full-text-facilities");

        if( fullText ){
            fullText.addEventListener("show.bs.collapse", function () {
                btn.innerHTML = "Show less  <i class='fa fa-arrow-up'></i>";
            });

            fullText.addEventListener("hide.bs.collapse", function () {
                btn.innerHTML = "Show more <i class='fa fa-arrow-down'></i>";
            });
        }
        
        if( fullTextFacilities ){
            fullTextFacilities.addEventListener("show.bs.collapse", function () {
                btnFacility.innerHTML = "Show less  <i class='fa fa-arrow-up'></i>";
            });
            
            fullTextFacilities.addEventListener("hide.bs.collapse", function () {
                btnFacility.innerHTML = "Show more <i class='fa fa-arrow-down'></i>";
            });
        }
    });

    $(document).ready(function () {
        var from_$input = $('#input_from').pickadate(),
            from_picker = from_$input.pickadate('picker');
    
        var to_$input = $('#input_to').pickadate(),
            to_picker = to_$input.pickadate('picker');
    
        if (from_picker && to_picker) {  // Added null check
            if (from_picker.get('value')) {
                to_picker.set('min', from_picker.get('select'));
            }
            if (to_picker.get('value')) {
                from_picker.set('max', to_picker.get('select'));
            }

            from_picker.on('set', function (event) {
                if (event.select) {
                    to_picker.set('min', from_picker.get('select'));
                } else if ('clear' in event) {
                    to_picker.set('min', false);
                }
            });
            to_picker.on('set', function (event) {
                if (event.select) {
                    from_picker.set('max', to_picker.get('select'));
                } else if ('clear' in event) {
                    from_picker.set('max', false);
                }
            });

            function toggleIconRotation(input) {
                input.on('open', function () {
                    input.$node.closest('.form-group').addClass('calendar-open');
                });
                input.on('close', function () {
                    input.$node.closest('.form-group').removeClass('calendar-open');
                });
            }

            toggleIconRotation(from_picker);
            toggleIconRotation(to_picker);
        }
    });

    // Header User Dropdown JS.
    document.addEventListener("DOMContentLoaded", function () {
        const userBtn = document.querySelector(".btn-user");
        const userAccountList = document.querySelector(".user-account-list");
        const arrowIcon = userBtn.querySelector(".fa-chevron-down");
        
        userBtn.addEventListener("click", function (event) {
            event.preventDefault();
            userAccountList.classList.toggle("active");
            
            if (userAccountList.classList.contains("active")) {
                arrowIcon.style.transition = "transform 0.3s ease";
                arrowIcon.style.transform = "rotate(180deg)";
            } else {
                arrowIcon.style.transition = "transform 0.3s ease";
                arrowIcon.style.transform = "rotate(360deg)";
            }
        });
        
        // Close the menu if clicked outside
        document.addEventListener("click", function (event) {
            if (!userBtn.contains(event.target) && !userAccountList.contains(event.target)) {
                userAccountList.classList.remove("active");
                arrowIcon.style.transition = "transform 0s";
                arrowIcon.style.transform = "rotate(0deg)";
            }
        });
    });

    // Compare Hide and Show Map or Points Sections.
    document.addEventListener("DOMContentLoaded", function () {
        const boxes = [1, 2, 3]; // Box numbers
    
        boxes.forEach(num => {
            const checkbox = document.querySelector(`#box_${num} .switch input[type='checkbox']`);
            const pointsList = document.querySelector(`#box_${num} .points-list`);
            const mapSection = document.querySelector(`#box_${num} .map`);
        
            if (checkbox && pointsList && mapSection) {
                function toggleSections() {
                    if (checkbox.checked) {
                        pointsList.style.display = "none";
                        mapSection.style.display = "block";
                    } else {
                        pointsList.style.display = "block";
                        mapSection.style.display = "none";
                    }
                }
        
                toggleSections();
                checkbox.addEventListener("change", toggleSections);
            }
        });
    });
    
    // Compare Box Remove JS.
    document.addEventListener("DOMContentLoaded", function () {
        const closeButtons = document.querySelectorAll(".btn-close");
    
        closeButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault(); // Prevent default link behavior
                const box = this.closest(".box");
                if (box) {
                    box.remove(); // Remove the box from DOM
                }
            });
        });
    });
    
    // Applications Lists Table JS Code.
    // Select All functionality
    document.getElementById("selectall").addEventListener("change", function () {
        const checkboxes = document.querySelectorAll(".row-checkbox");
        checkboxes.forEach(cb => cb.checked = this.checked);
    });

    // Toggle row details
    document.querySelectorAll(".toggle-icon").forEach(icon => {
        icon.addEventListener("click", function () {
        const rowId = this.getAttribute("data-bs-toggle");
        const detailRow = document.getElementById(rowId);
        const isVisible = detailRow.style.display === "table-row";
    
        // Hide all detail rows and remove rotations/highlight
        document.querySelectorAll(".details-row").forEach(row => row.style.display = "none");
        document.querySelectorAll(".toggle-icon").forEach(i => i.classList.remove("rotate"));
        document.querySelectorAll("tr").forEach(row => row.classList.remove("active-row"));
    
        if (!isVisible) {
            detailRow.style.display = "table-row";
            this.classList.add("rotate");
    
            // Highlight the parent <tr>
            const parentRow = this.closest("tr");
            if (parentRow) {
            parentRow.classList.add("active-row");
            }
        }
        });
    });
    
    document.addEventListener("DOMContentLoaded", function () {
        // Select all open buttons by their ID prefix
        document.querySelectorAll('[id^="openCanclePopup_"]').forEach(button => {
          button.addEventListener("click", function (e) {
            e.preventDefault();
            const btnId = this.id.split("_")[1]; // get the number after underscore
            const popup = document.getElementById(`canclePopup_${btnId}`);
            if (popup) {
              popup.classList.add("show");
            }
          });
        });
      
        // Close all popups when close icon is clicked
        document.querySelectorAll('[id^="closePopup_"]').forEach(button => {
          button.addEventListener("click", function (e) {
            e.preventDefault();
            const btnId = this.id.split("_")[1];
            const popup = document.getElementById(`canclePopup_${btnId}`);
            if (popup) {
              popup.classList.remove("show");
            }
          });
        });
      });
        

})(jQuery);