$(document).ready(function() {
    var items = ['#about', '#portfolio', '#contact'];
    var scrollSection = getScrollSection(items);

    $(window).scroll(function(){
        var windowScroll = $(window).scrollTop();
        var windowHeight = $(window).height() / 3;
        scrollSection.forEach(function (item, index) {
            if(windowScroll >= item[1] - windowHeight && windowScroll <= item[2] - windowHeight) {
                if(!($(item[0]).hasClass('current-block'))) {
                    items.forEach(function (section) {
                        $(section).removeClass('current-block');
                    })
                    $(item[0]).addClass('current-block');
                }
            }
        })
        if(windowScroll == 0) {
            items.forEach(function (section) {
                $(section).removeClass('current-block');
            })
        }
    })

    $(window).resize(function(){
        scrollSection = getScrollSection(items);
    })
})

function getScrollSection(items) {
    var scrollSection = [];
    items.forEach(function(item, index) {
        scrollSection.push([item, $(item).offset().top, $(item).offset().top + $(item).outerHeight()]);
    })
    return scrollSection;
}