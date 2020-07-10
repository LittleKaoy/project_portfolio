$(document).ready(function () {
  $(".toggle-menu").click(function (event) {
    event.preventDefault();
    $("body").toggleClass("active");
    $(".toggle-menu").toggleClass("active");
    $(".navigation__menu").toggleClass("active");
  });

  $(".menu-list__item").click(function (event) {
    $("body").removeClass("active");
    $(".toggle-menu").removeClass("active");
    $(".navigation__menu").removeClass("active");
  });

  window.addEventListener("resize", function () {
    $("body").removeClass("active");
    $(".toggle-menu").removeClass("active");
    $(".navigation__menu").removeClass("active");
  });
});
