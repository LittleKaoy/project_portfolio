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

  $(".project-card").hover(
    function () {
      $(this).find($(".project-card__hover")).addClass("active");
      $(this).find($(".project-card__title")).addClass("active");
    },
    function () {
      $(this).find($(".project-card__hover")).removeClass("active");
      $(this).find($(".project-card__title")).removeClass("active");
    }
  );

  $(".work-plan__task").hover(
    function () {
      $(this).find($(".task__article-title")).addClass("active");
    },
    function () {
      $(this).find($(".task__article-title")).removeClass("active");
    }
  );

  const inputArea = document.querySelectorAll(".input-area");
  const contentInput = document.querySelectorAll(".content-input");

  for (let i = 0; i < inputArea.length; i++) {
    inputArea[i].addEventListener("click", function () {
      const placeholderElement = this.querySelector(".fake-placeholder");
      placeholderElement.classList.add("active");
    });
  }

  for (let i = 0; i < contentInput.length; i++) {
    contentInput[i].addEventListener("blur", function () {
      const thisParent = this.parentElement;
      if (this.value == "") {
        thisParent.querySelector("span").classList.remove("active");
      }
    });
  }

  $("#contacts-form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      theme: {
        required: true,
      },
      message: {
        required: true,
      },
    },
    messages: {
      email: {
        required: "Пожалуйста введите email.",
        email: "Email должен содержать @",
      },
      theme: {
        required: "Введите тему сообщения",
      },
      message: {
        required: "Введите текст сообщения",
      },
    },
    submitHandler: function (form) {
      ajaxFormSubmit();
    },
  });

  function ajaxFormSubmit() {
    let string = $("#contacts-form").serialize();

    $.ajax({
      type: "POST",
      url: "php/mail.php",
      data: string,

      success: function (html) {
        $("#contacts-form").slideUp(800);
        $("#answer").html(html);
      },
    });
    return false;
  }
});
