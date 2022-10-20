$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1000,
        // adaptiveHeight: true,
        // autoplay: true,
        // autoplaySpeed: 2000,
        prevArrow:
            '<button type="button" class="slick-prev"><img src="icons/left.png"/></button>',
        nextArrow:
            '<button type="button" class="slick-next"><img src="icons/right.png"/></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    arrows: false,
                },
            },
            // {
            //   breakpoint: 600,
            //   settings: {
            //     slidesToShow: 2,
            //     slidesToScroll: 2
            //   }
            // },
            // {
            //   breakpoint: 480,
            //   settings: {
            //     slidesToShow: 1,
            //     slidesToScroll: 1
            //   }
            // }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    });
    $('ul.catalog__tabs').on(
        'click',
        'li:not(.catalog__tab_active)',
        function () {
            $(this)
                .addClass('catalog__tab_active')
                .siblings()
                .removeClass('catalog__tab_active')
                .closest('div.container')
                .find('div.catalog__content')
                .removeClass('catalog__content_active')
                .eq($(this).index())
                .addClass('catalog__content_active');
        }
    );

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content')
                    .eq(i)
                    .toggleClass('catalog-item__content_active');
                $('.catalog-item__list')
                    .eq(i)
                    .toggleClass('catalog-item__list_active');
            });
        });
    }
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal
    $('[data-madal="consultation"]').on('click', function () {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text(
                $('.catalog-item__subtitle').eq(i).text()
            );
            $('.overlay,  #order').fadeIn();
        });
    });

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                phone: 'required',
                email: { required: true, email: true },
            },
            messages: {
                name: 'Введите Ваше имя',
                phone: 'Введлите номер телефона',
                email: {
                    required: 'Введите вашу почту',
                    email: 'Введите корректный email',
                },
            },
        });
    }
    valideForms('#consultation form');
    valideForms('#order form');
    valideForms('#consultation-form');

    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize(),
        }).done(function () {
            $(this).find('input').val('');
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    // scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $('.pageup').on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== '') {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            const hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate(
                {
                    scrollTop: $(hash).offset().top,
                },
                800,
                function () {
                    // Add hash (#) to URL when done scrolling (default click behavior)
                    window.location.hash = hash;
                }
            );
        } // End if
    });

    new WOW().init();
    
});
