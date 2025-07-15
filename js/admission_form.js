// Enhanced Admission Form JavaScript with Progress Steps
$(function () {
  console.log('Enhanced admission form loaded');
  
  // Progress steps functionality
  function updateProgressSteps(currentStep) {
    $('.step').removeClass('active completed');
    for (let i = 0; i < currentStep; i++) {
      $('.step').eq(i).addClass('completed');
    }
    $('.step').eq(currentStep - 1).addClass('active');
  }
  
  // Form validation and progress tracking
  function validateSection(sectionIndex) {
    let isValid = true;
    const sections = [
      ['#childName', '#childDOB', '#gradeLevel', '#session'],
      ['#fatherName', '#motherName', '#phoneNumber', '#emailAddress'],
      ['#address', '#emergencyContact'],
      ['#agreeTerms']
    ];
    
    if (sectionIndex <= sections.length) {
      sections[sectionIndex - 1].forEach(field => {
        const element = $(field);
        if (element.length && element.is(':visible')) {
          if (element.attr('type') === 'checkbox') {
            if (!element.is(':checked')) {
              isValid = false;
              element.closest('.form-check').addClass('is-invalid');
            } else {
              element.closest('.form-check').removeClass('is-invalid');
            }
          } else {
            if (!element.val()) {
              isValid = false;
              element.addClass('is-invalid');
            } else {
              element.removeClass('is-invalid');
            }
          }
        }
      });
    }
    
    return isValid;
  }
  
  // Auto-update progress based on form completion
  function updateProgress() {
    let completedSections = 0;
    
    // Check each section
    if (validateSection(1)) completedSections++;
    if (validateSection(2)) completedSections++;
    if (validateSection(3)) completedSections++;
    if (validateSection(4)) completedSections++;
    
    updateProgressSteps(completedSections);
  }
  
  // Enhanced form submission
  $("#admissionForm").on("submit", function (e) {
    console.log('Enhanced admission form submitted');
    e.preventDefault();
    
    // Validate all sections
    if (!validateSection(1) || !validateSection(2) || !validateSection(3) || !validateSection(4)) {
      alert('Please fill in all required fields marked with *');
      return;
    }
    
    // Show loader with enhanced animation
    $("#admission-submit-btn").hide();
    $("#admission-form-loader").css("display", "flex");
    
    // Get form data
    var formData = {
      childName: $("#childName").val(),
      childDOB: $("#childDOB").val(),
      gradeLevel: $("#gradeLevel").val(),
      session: $("#session").val(),
      fatherName: $("#fatherName").val(),
      motherName: $("#motherName").val(),
      phoneNumber: $("#phoneNumber").val(),
      emailAddress: $("#emailAddress").val(),
      address: $("#address").val(),
      previousSchool: $("#previousSchool").val(),
      emergencyContact: $("#emergencyContact").val(),
      specialNeeds: $("#specialNeeds").val(),
      agreeTerms: $("#agreeTerms").is(":checked"),
      formType: 'admission'
    };
    
    console.log("Enhanced form data:", formData);
    
    // Send AJAX request
    $.ajax({
      url: "mailer.php",
      method: "POST",
      data: formData,
      success: function (response) {
        $("#admission-form-loader").css("display", "none");
        
        // Show enhanced success message
        $('.form-container').html(`
          <div class="success-message">
            <i class="fas fa-check-circle success-checkmark"></i>
            <h4>🎉 Application Submitted Successfully!</h4>
            <p>Thank you for your interest in Abivruthi Kindergarten. We have received your application and will contact you within 24-48 hours with further details.</p>
            <div class="mt-3">
              <small>Application Reference: #${Date.now().toString().slice(-6)}</small>
            </div>
          </div>
        `);
        $('.success-checkmark').show();
        
        // Update progress to show completion
        updateProgressSteps(4);
        $('.step').addClass('completed');
        
        // Reset form after 3 seconds and close modal
        setTimeout(function() {
          $("#admissionForm")[0].reset();
          $("#admissionModal").modal("hide");
          location.reload(); // Reload to reset the form properly
        }, 3000);
      },
      error: function (error) {
        $("#admission-form-loader").css("display", "none");
        $("#admission-submit-btn").show();
        alert("An error occurred. Please try again.");
        console.log("error", error);
      },
    });
  });
  
  // Monitor form changes for progress updates
  $("#admissionForm input, #admissionForm select, #admissionForm textarea").on("input change", function () {
    updateProgress();
    // Clear validation styling on input
    $(this).removeClass('is-invalid');
  });
  
  // Enhanced form field interactions
  $('.form-control').on('focus', function() {
    $(this).closest('.form-section').addClass('focused');
  }).on('blur', function() {
    $(this).closest('.form-section').removeClass('focused');
  });
  
  // Phone number validation with better formatting
  $("#phoneNumber, #emergencyContact").on("input", function () {
    var value = $(this).val().trim();
    // Allow only numbers and limit to 10 digits
    value = value.replace(/\D/g, '').slice(0, 10);
    $(this).val(value);
    
    // Add visual feedback for valid phone numbers
    if (value.length === 10) {
      $(this).addClass('is-valid').removeClass('is-invalid');
    } else if (value.length > 0) {
      $(this).addClass('is-invalid').removeClass('is-valid');
    } else {
      $(this).removeClass('is-valid is-invalid');
    }
  });
  
  // Email validation with real-time feedback
  $("#emailAddress").on("input", function() {
    var email = $(this).val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && emailRegex.test(email)) {
      $(this).addClass('is-valid').removeClass('is-invalid');
    } else if (email) {
      $(this).addClass('is-invalid').removeClass('is-valid');
    } else {
      $(this).removeClass('is-valid is-invalid');
    }
  });
  
  // Date of birth validation
  $("#childDOB").on("change", function() {
    var dob = new Date($(this).val());
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    var monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    if (age < 2 || age > 7) {
      $(this).addClass('is-invalid').removeClass('is-valid');
      alert('Please enter a valid date of birth for a child between 2-7 years old.');
    } else {
      $(this).addClass('is-valid').removeClass('is-invalid');
    }
  });
  
  // Terms checkbox validation
  $("#agreeTerms").on("change", function() {
    if ($(this).is(":checked")) {
      $(this).closest('.form-check').removeClass('is-invalid');
    } else {
      $(this).closest('.form-check').addClass('is-invalid');
    }
  });
  
  // Initialize progress on page load
  updateProgress();
  
  // Add smooth scrolling to form sections
  $('.form-section').each(function(index) {
    $(this).attr('data-section', index + 1);
  });
  
  // Progress step click functionality (optional - for navigation)
  $('.step').on('click', function() {
    var stepIndex = $(this).index() + 1;
    var targetSection = $('.form-section').eq(stepIndex - 1);
    
    if (targetSection.length) {
      $('html, body').animate({
        scrollTop: targetSection.offset().top - 100
      }, 500);
    }
  });
  
  // Add loading animation to submit button
  $("#admission-submit-btn").on('click', function() {
    if ($(this).hasClass('loading')) return;
    
    $(this).addClass('loading');
    $(this).html('<i class="fas fa-spinner fa-spin mr-2"></i>Submitting...');
  });
  
  // Reset button functionality
  $('.btn-secondary').on('click', function() {
    setTimeout(function() {
      $("#admissionForm")[0].reset();
      $('.form-control').removeClass('is-valid is-invalid');
      $('.form-check').removeClass('is-invalid');
      updateProgress();
    }, 300);
  });
}); 