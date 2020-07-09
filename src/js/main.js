$(document).ready(function () {

  $(".toggle-menu").click(function (event) {
    event.preventDefault();
    $(".header").toggleClass("active");
    $(".toggle-menu").toggleClass("active");
    // $(".navigation__menu").toggleClass("active");

  });

  $(".navigation__nav-item").click(function (event) {
    $(".header").removeClass("active");
    $(".toggle-menu").removeClass("active");
    // $(".navigation__menu").removeClass("active");
  });
});
