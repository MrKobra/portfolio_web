$(document).ready(function() {
    var items = ['#about', '#portfolio', '#contact'];
    var scrollSection = getScrollSection(items);

    $(window).scroll(function(){
        var windowScroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        var headerHeight = $('.main-header').outerHeight();
        console.log(windowScroll);

        // Анимация при сколе
        scrollSection.forEach(function (item, index) {
            // Анимация в блоке
            if(windowScroll >= item[1] - (windowHeight / 3) && windowScroll <= item[2] - (windowHeight / 3)) {
                if(!($(item[0]).hasClass('current-block'))) {
                    removeScrollSection(items);
                    $(item[0]).addClass('current-block');
                }
            }
            // Анимация активного элемента в меню
            if(windowScroll >= item[1] - headerHeight && windowScroll <= item[2] - headerHeight) {
                removeActiveElem();
                $('.main-header nav li').each(function(){
                    var href = $(this).find('a').attr('href');
                    if(href == item[0]) {
                        $(this).addClass('active');
                    }
                })
            }
        })

        if(windowScroll == 0) {
            removeScrollSection(items);
            removeActiveElem();
        }

        // Фиксация шапки при сколе
        fixMenu(headerHeight);
    })

    $(window).resize(function(){
        scrollSection = getScrollSection(items);
        removeScrollSection(items);
        removeActiveElem();
    })

    // Плавная прокрутка до элемента
    $('.main-header nav a').click(function(e){
        e.preventDefault();
        var href = $(this).attr('href');
        var headerHeight = $('.main-header').outerHeight();
        $('html, body').animate({
            scrollTop: $(href).offset().top - headerHeight
        }, 500);
    })

    // Попап окно
    $('.portfolio-card_link').each(function(){
        var full = $(this).data('full');
        $(this).magnificPopup({
            type: 'inline',
            callbacks: {
                open: function() {
                    $('.popup-portfolio_img-wrapper').append('<img src="'+full+'">');
                },
                close: function() {
                    $('.popup-portfolio_img-wrapper img').remove();
                }
            }
        });
    })
})

function getScrollSection(items) {
    var scrollSection = [];
    items.forEach(function(item, index) {
        scrollSection.push([item, $(item).offset().top, $(item).offset().top + $(item).outerHeight()]);
    })
    return scrollSection;
}

function removeScrollSection(items) {
    items.forEach(function (section) {
        $(section).removeClass('current-block');
    })
}

function removeActiveElem() {
    $('.main-header nav li').removeClass('active');
}

function fixMenu(headerHeight) {
    var windowScroll = $(window).scrollTop();
    if(windowScroll > 0) {
        $('.main-header').addClass('fix');
        $('.wrapper').css('padding-top', headerHeight);
    } else {
        $('.wrapper').css('padding-top', 0);
        $('.main-header').removeClass('fix');
    }
}