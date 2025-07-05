function validateFields(...e) {
  let s = !0;
  return (
    e.forEach((e) => {
      isEmpty(e) && (e.css("border", "1px solid red"), (s = !1));
    }),
    s
  ); 
}
function isEmpty(e) {
  return "" === e.val().trim();
}
$(function () {
  console.log('form')
  $("#contactForm").on("submit", function (e) {
    console.log('here')
    e.preventDefault();
    var s = $("#name"),
      a = $("#email"),
      r = $("#number"),
      n = $("#message");
    console.log(
      "name, email, number, message",
      s.val(),
      a.val(),
      r.val(),
      n.val()
    ),
      validateFields(s, a, r, n)
        ? $.ajax({
            url: "mailer.php",
            method: "POST",
            beforeSend: function () {
              $("#submit-btn").hide(), $("#form-loader").css("display", "flex");
            },
            data: {
              name: s.val(),
              email: a.val(),
              number: r.val(),
              message: n.val(),
            },
            success: function (e) {
              $("#contactForm")[0].reset(),
                $("#form-loader").css("display", "none"),
                $("#submit-btn").show(),
                $(".sent-message").css("display", "block"),
                toastr.success("Form submitted successfully!", "Success");
            },
            error: function (e) {
              alert("error"),
                $("#contactForm")[0].reset(),
                $("#form-loader").css("display", "none"),
                $("#submit-btn").show(),
                $(".sent-message").css("display", "block"),
                console.log("error", e);
            },
          })
        : t.css("border", "1px solid red"),
      e.preventDefault();
  });
}),
  $("#name, #email, #number, #message").on("input", function () {
    $(this).css("border", "");
  }),
  $("#number").on("input", function () {
    var e = $(this).val().trim();
    /^\d{0,10}$/.test(e) || $(this).val(e.slice(0, 10));
  });