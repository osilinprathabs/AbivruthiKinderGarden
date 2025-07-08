(function ($) {
    "use strict";

    //sticky menu
    $(window).on('scroll', function () {
        var window_top = $(window).scrollTop() + 1;
        if (window_top > 50) {
            $('.header').addClass('menu_fixed animated fadeInDown');
        } else {
            $('.header').removeClass('menu_fixed animated fadeInDown');
        }
    });

    //video popup
    var video_popup = $('.video_popup, .popup_youtube');
    if (video_popup.length > 0) {
        video_popup.magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }
    var video_popup = $('.gallery_popup_img');
    if (video_popup.length > 0) {
        video_popup.magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
        });
    }

    //counter js
    var time = $('.counter')
    if (time.length > 0) {
        time.counterUp();
    }

    //parallax ja
    $(function () {
        var $el = $('.parallax_bg');
        $(window).on('scroll', function () {
            var scroll = $(document).scrollTop();
            $el.css({
                'background-position': '50% ' + (+.4 * scroll) + 'px'
            });
        });
    });

    //niceselect select jquery
    var niceSelect = $('.niceSelect');
    if (niceSelect.length > 0) {
        niceSelect.niceSelect();
    }

    //banner slider js
    var bannerSlider = $(".bannerslider");
    if (bannerSlider.length) {
        bannerSlider.owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            navText: ["<i class='ti-angle-left'></i>", "<i class='ti-angle-right'></i>"],
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 800,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    nav: false
                },
                768: {
                    nav: true
                }
            },
        });
    }

    //popular courses js
    var popular_courses = $(".gallery_slider");
    if (popular_courses.length) {
        popular_courses.owlCarousel({
            items: 4,
            loop: true,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            margin: 15,
            smartSpeed: 300,
            dotsSpeed: 300,
            autoplayTimeout: 3000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                767: {
                    items: 3
                },
                1200: {
                    items: 4
                }
            }
        });
    }
    //popular courses js
    var testimonial = $(".testimonial_slider");
    if (testimonial.length) {
        testimonial.owlCarousel({
            items: 2,
            loop: true,
            margin: 30,
            nav: false,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            smartSpeed: 500,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                }
            }
        });
    }

    //time countdow
    $(document).ready(function () {
        function coursesTimer() {
            var endTime = new Date("23 May 2021 9:56:00 GMT+01:00");
            endTime = (Date.parse(endTime) / 1000);
            var now = new Date();
            now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            var days = Math.floor(timeLeft / 86400);
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") {
                hours = "0" + hours;
            }
            if (minutes < "10") {
                minutes = "0" + minutes;
            }
            if (seconds < "10") {
                seconds = "0" + seconds;
            }
            $("#days").html(days + "<span>Days</span>");
            $("#hours").html(hours + "<span>Hours</span>");
            $("#minutes").html(minutes + "<span>Minutes</span>");
            $("#seconds").html(seconds + "<span>Seconds</span>");
        }
        setInterval(function () {
            coursesTimer();
        }, 1000);
    });

    // Preloader js
    $(window).on('load', function () {
        $(".preloder").hide();
        $(".loader").delay(3000).hide("slow");
    });

    // Admission Form Functionality
    $(document).ready(function() {
        // Handle grade selection from the list
        $('.grade-list li a').on('click', function(e) {
            e.preventDefault();
            var selectedGrade = $(this).data('grade');
            $('.admission-form select').val(selectedGrade);
            
            // Highlight selected grade
            $('.grade-list li a').removeClass('active');
            $(this).addClass('active');
        });

        // Handle comprehensive admission form submission
        $('#admissionForm').on('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            var submitBtn = $(this).find('button[type="submit"]');
            var originalText = submitBtn.text();
            submitBtn.html('<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...');
            submitBtn.prop('disabled', true);
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(function() {
                // Show success message
                $('#admissionModal .modal-body').html(`
                    <div class="text-center py-5">
                        <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                        <h4 class="mt-3 text-success">Application Submitted Successfully!</h4>
                        <p class="text-muted">Thank you for your interest in Abivruthi Kindergarten. We will contact you within 24 hours to discuss the next steps.</p>
                        <div class="mt-3">
                            <span class="text-muted">This window will close automatically in <span id="countdown">5</span> seconds...</span>
                        </div>
                    </div>
                `);
                
                // Create party paper effect
                createPartyPaperEffect();
                
                // Start countdown and auto-close
                var countdown = 5;
                var countdownInterval = setInterval(function() {
                    countdown--;
                    $('#countdown').text(countdown);
                    
                    if (countdown <= 0) {
                        clearInterval(countdownInterval);
                        $('#admissionModal').modal('hide');
                    }
                }, 1000);
                
                // Reset form
                $('#admissionForm')[0].reset();
            }, 2000);
        });

        // Reset form when modal is closed
        $('#admissionModal').on('hidden.bs.modal', function() {
            setTimeout(function() {
                location.reload(); // Reload to reset the form
            }, 500);
        });

        // Handle form submission
        $('.admission-form').on('submit', function(e) {
            e.preventDefault();
            
            var formData = {
                childName: $(this).find('input[type="text"]').first().val(),
                grade: $(this).find('select').val(),
                parentName: $(this).find('input[type="text"]').eq(1).val(),
                phone: $(this).find('input[type="tel"]').val(),
                email: $(this).find('input[type="email"]').val()
            };

            // Basic validation
            if (!formData.childName || !formData.grade || !formData.parentName || !formData.phone || !formData.email) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation
            var phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(formData.phone)) {
                alert('Please enter a valid phone number.');
                return;
            }

            // Show success message
            alert('Thank you! Your admission application has been submitted successfully. We will contact you soon.');
            
            // Reset form
            $(this)[0].reset();
            $('.grade-list li a').removeClass('active');
        });

        // Auto-fill grade when dropdown changes
        $('.admission-form select').on('change', function() {
            var selectedGrade = $(this).val();
            $('.grade-list li a').removeClass('active');
            $('.grade-list li a[data-grade="' + selectedGrade + '"]').addClass('active');
        });

        // Comprehensive Admission Form Functionality
        $('#admissionForm').on('submit', function(e) {
            e.preventDefault();
            
            var formData = {
                childName: $('#childName').val(),
                childDOB: $('#childDOB').val(),
                gradeLevel: $('#gradeLevel').val(),
                session: $('#session').val(),
                fatherName: $('#fatherName').val(),
                motherName: $('#motherName').val(),
                phoneNumber: $('#phoneNumber').val(),
                emailAddress: $('#emailAddress').val(),
                address: $('#address').val(),
                previousSchool: $('#previousSchool').val(),
                emergencyContact: $('#emergencyContact').val(),
                specialNeeds: $('#specialNeeds').val(),
                agreeTerms: $('#agreeTerms').is(':checked')
            };

            // Basic validation
            if (!formData.childName || !formData.childDOB || !formData.gradeLevel || 
                !formData.session || !formData.fatherName || !formData.motherName || 
                !formData.phoneNumber || !formData.emailAddress || !formData.address || 
                !formData.emergencyContact || !formData.agreeTerms) {
                alert('Please fill in all required fields marked with *.');
                return;
            }

            // Email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.emailAddress)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Phone validation
            var phoneRegex = /^[0-9+\-\s()]+$/;
            if (!phoneRegex.test(formData.phoneNumber) || !phoneRegex.test(formData.emergencyContact)) {
                alert('Please enter valid phone numbers.');
                return;
            }

            // Age validation based on grade level
            var today = new Date();
            var birthDate = new Date(formData.childDOB);
            var age = today.getFullYear() - birthDate.getFullYear();
            var monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            var expectedAge = {
                'Pre-KG': { min: 2.5, max: 3.5 },
                'Nursery': { min: 3.5, max: 4.5 },
                'LKG': { min: 4.5, max: 5.5 },
                'UKG': { min: 5.5, max: 6.5 }
            };

            var selectedGrade = expectedAge[formData.gradeLevel];
            if (age < selectedGrade.min || age > selectedGrade.max) {
                alert('The child\'s age does not match the selected grade level. Please check the age requirements.');
                return;
            }

            // Show success message
            alert('Thank you! Your admission application has been submitted successfully. We will contact you within 24 hours to schedule an interview and complete the admission process.');
            
            // Reset form
            this.reset();
        });

        // Auto-calculate age and suggest grade level
        $('#childDOB').on('change', function() {
            var birthDate = new Date($(this).val());
            var today = new Date();
            var age = today.getFullYear() - birthDate.getFullYear();
            var monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            var suggestedGrade = '';
            if (age >= 2.5 && age <= 3.5) suggestedGrade = 'Pre-KG';
            else if (age >= 3.5 && age <= 4.5) suggestedGrade = 'Nursery';
            else if (age >= 4.5 && age <= 5.5) suggestedGrade = 'LKG';
            else if (age >= 5.5 && age <= 6.5) suggestedGrade = 'UKG';

            if (suggestedGrade) {
                $('#gradeLevel').val(suggestedGrade);
                alert('Based on the child\'s age, we suggest ' + suggestedGrade + ' grade level.');
            }
        });
    });

    // map js
    if ($('#contactMap').length) {
        var $lat = $('#contactMap').data('lat');
        var $lon = $('#contactMap').data('lon');
        var $zoom = $('#contactMap').data('zoom');
        var $marker = $('#contactMap').data('marker');
        var $info = $('#contactMap').data('info');
        var $markerLat = $('#contactMap').data('mlat');
        var $markerLon = $('#contactMap').data('mlon');
        var map = new GMaps({
            el: '#contactMap',
            lat: $lat,
            lng: $lon,
            scrollwheel: false,
            scaleControl: true,
            streetViewControl: false,
            panControl: true,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            zoom: $zoom,
        });
        map.addMarker({
            lat: $markerLat,
            lng: $markerLon,
            icon: $marker,
            infoWindow: {
                content: $info
            }
        })
    }
    //wow js
    var wow = new WOW({
        animateClass: 'animated',
        offset: 100,
        mobile: false,
        duration: 1000,
    });
    wow.init();


    //audio player
    var audio = $('audio');
    if (audio.length) {
        $('audio').audioPlayer({
            classPrefix: 'audioplayer',
            strPlay: '',
            strPause: '',
            strVolume: ''
        });
    }

    var gallery = $('.gallery_iner');
    if (gallery.length) {
        gallery.imagesLoaded(function () {
            gallery.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer'
                }
            });
        })
    }

    var program = document.getElementById("program_list");

    if (program) {
        $(document).ready(function () {
            var $grid = $('.program_list_filter').isotope({
                itemSelector: '.grid-item',
                layoutMode: 'fitRows',
            });
            var $buttonGroup = $('.filters');
            $buttonGroup.on('click', 'li', function (event) {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                var $button = $(event.currentTarget);
                $button.addClass('is-checked');
                var filterValue = $button.attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
        });
    }

    //scorll animation js
    var $title_overlay_effect = $('.title_overlay_effect');
    var $window = $(window);

    function scroll_addclass() {
        var window_height = $(window).height() - 200;
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($title_overlay_effect, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top;
            var element_bottom_position = (element_top_position + element_height);
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('is_show');
            }
        });
    }

    $window.on('scroll resize', scroll_addclass);
    $window.trigger('scroll');


    $window.on('scroll resize', scroll_addclass);
    $window.trigger('scroll');

    function kidjo_rect_wrap(svg) {
        var width = svg.outerWidth(),
            height = svg.outerHeight(),
            svgRect = svg.find('rect'),
            x_pos_rect = svgRect.attr('x'),
            y_pos_rect = svgRect.attr('y');
        if (x_pos_rect) width = width - (parseInt(x_pos_rect) * 2);
        if (y_pos_rect) height = height - (parseInt(y_pos_rect) * 2);
        if ((width * height) > 0) {
            svgRect.attr('width', width);
            svgRect.attr('height', height);
        }
    }

    function kidjoHover() {
        jQuery('svg.pc-dashes').each(function () {
            var svg = jQuery(this);
            kidjo_rect_wrap(svg);
        });
    }
    $(document).ready(function () {
        kidjoHover();
    });

    // Party Paper Effect Function
    function createPartyPaperEffect() {
        // Create party container if it doesn't exist
        if (!$('.party-container').length) {
            $('body').append('<div class="party-container"></div>');
        }
        
        // Create multiple party papers
        for (var i = 0; i < 50; i++) {
            setTimeout(function() {
                var paper = $('<div class="party-paper"></div>');
                paper.css({
                    left: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 0.5 + 's',
                    animationDuration: (Math.random() * 2 + 2) + 's'
                });
                $('.party-container').append(paper);
                
                // Remove paper after animation
                setTimeout(function() {
                    paper.remove();
                }, 5000);
            }, i * 50);
        }
        
        // Clean up party container after all animations
        setTimeout(function() {
            $('.party-container').remove();
        }, 8000);
    }

}(jQuery));