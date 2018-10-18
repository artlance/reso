$(document).ready(function() {

    //ready

    //nojs
    $('body').removeClass('no-js');

    //------------------------------------------------------------------------//

    //fakelink
    $('a[href="#"]').on('click', function(event) {
        event.preventDefault();
    });

    //------------------------------------------------------------------------//

    //placeholder
    $('input[placeholder], textarea[placeholder]').placeholder();

    //------------------------------------------------------------------------//

    //navigation
    $('.navigation-toggle, .clinics-filter-toggle').on('click', function(event) {
        event.preventDefault();
        $('body').toggleClass('navigation-open');
    });

    //------------------------------------------------------------------------//

    //header fixed
    function ifScrollTop() {
        if( $(window).scrollTop() > 1 ) {
            $('.header-global').addClass('header-fixed');
        } else {
            $('.header-global').removeClass('header-fixed');
        }
    }
    $(window).scroll(function() {
        ifScrollTop();
    });
    ifScrollTop();

    //------------------------------------------------------------------------//

    //scroll link
    $('a.scroll-link, .menu a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            if ( $(this).parents('.menu').length ) {
                $('body').removeClass('navigation-open');
            }
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 50
                }, 400);
                return false;
            }
        }
    });

    //------------------------------------------------------------------------//

    //centerModal
    function centerModal() {
        var modalName = $('.modal-center');
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        modalName.each(function() {
            var modalOuterWidth = $(this).outerWidth();
            var modalOuterHeight = $(this).outerHeight();
            $(this).css({
                margin: 0
            });
            if (windowHeight > modalOuterHeight) {
                $(this).css({
                    top: (windowHeight - modalOuterHeight) /2
                });
            } else {
               $(this).css({
                    top: 0
                });
            }
            if (windowWidth > modalOuterWidth) {
                $(this).css({
                    left: (windowWidth - modalOuterWidth) /2
                });
            } else {
               $(this).css({
                    left: 0
                });
            }
        });
    }
    $('[data-toggle="modal"]').on('click', function() {
        centerModal();
    });
    $(window).resize(function(){
        centerModal();
    });
    centerModal();

    //------------------------------------------------------------------------//

    //features slider
    $('.features-slider').slick({
        dots: true,
        arrows: false,
        draggable: true,
        infinite: false,
        centerMode: false,
        centerPadding: '0px',
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 500,
        pauseOnHover: false,
        pauseOnDotsHover: false,
        slide: '.features-slide',
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    });

    //------------------------------------------------------------------------//

    //faq
    $('.faq-item-question').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active').parents('.faq-item').find('.faq-item-answer').toggle();
    });

    //------------------------------------------------------------------------//

    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: 'Предыдущий',
        nextText: 'Следующий',
        currentText: 'Сегодня',
        monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        monthNamesShort: ['Январь','Февраль','Март','Апрель','Май','Июнь',
        'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
        dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
        dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
        dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
        weekHeader: 'Не',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''};
    $.datepicker.setDefaults($.datepicker.regional['ru']);

    $('.datepicker').datepicker({
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        showOn: "button",
        buttonImage: '../upload/datepicker.svg',
        buttonImageOnly: false,
        buttonText: '',
        beforeShow: function (input, inst) {
            setTimeout(function () {
                var offsets = $(input).offset();
                var top = offsets.top + 68;
                inst.dpDiv.css({
                    top: top,
                    left: offsets.left,
                });
            }, 0);
        }
    });

    $(window).resize(function() {

        //resize
        $('.datepicker').datepicker('hide');

    });//window resize



    //------------------------------------------------------------------------//

    $('.phone-mask').mask('+7 (999) 999 99 99',{autoclear: false});

    //------------------------------------------------------------------------//

    $('.calculate-label-list a').on('click', function(event) {
        event.preventDefault();
        var thisCity = $(this).data('city');
        $('#calcCity').val(thisCity);
    });

    //------------------------------------------------------------------------//

    $(document).on('click', '.input-text-plus', function(event) {
        event.preventDefault();
        var thisInput = $(this).next('.input-text-num');
        var thisVal = thisInput.val();
        thisVal++;
        thisInput.val(thisVal);
        thisInput.next('.input-text-minus').removeClass('disabled');
    });

    $(document).on('click', '.input-text-minus', function(event) {
        event.preventDefault();
        var thisInput = $(this).prev('.input-text-num');
        var thisVal = thisInput.val();
        if ( thisVal > 1 ) {
            thisVal--;
            thisInput.val(thisVal);
        } else {
            $(this).addClass('disabled');
        }
    });

    //------------------------------------------------------------------------//

    var select = $( "#variation" );
    if (select.length) {
        var slider = $( "<div id='variation-slider'></div>" ).insertAfter( select ).slider({
          min: 1,
          max: 8,
          range: "min",
          value: select[ 0 ].selectedIndex + 1,
          slide: function( event, ui ) {
            select[ 0 ].selectedIndex = ui.value - 1;
            variation();
          }
        });

        function variation() {
            var sliderVal = $("#variation").val();
            $('.variation-column li').removeClass('li-disabled');
            $("[data-no]").each(function(index, el) {
                var thisDataNo = $(this).data('no');
                thisDataNo = thisDataNo + '';
                var thisConst = thisDataNo.indexOf(sliderVal);
                if ( thisConst != -1 ) {
                    $(this).addClass('li-disabled');
                }
            });
            $('.variation-header-item').each(function(index, el) {
                $(this).addClass('hidden');
                if (index+1 == sliderVal) {
                    $(this).removeClass('hidden');
                }
            });
        }
        variation();
        $("#variation").on( "change", function() {
            slider.slider( "value", this.selectedIndex + 1 );
            variation();
        });
    }

    //------------------------------------------------------------------------//

    $('.radio-pay').on('change', function(event) {
        $('.pay-radio').removeClass('active');
        $(this).parents('.pay-radio').addClass('active');
    });

    //------------------------------------------------------------------------//

    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#calcAddr" ).autocomplete({
      source: availableTags
    });
    $( ".clAddr" ).autocomplete({
      source: availableTags
    });

    //------------------------------------------------------------------------//

    //filer input
    $("#filer_input").filer({
        limit: null,
        maxSize: null,
        extensions: null,
        addMore: true,
        extensions: ['doc', 'docs', 'txt', 'xls', 'xlsx'],
        changeInput: '<div class="jFiler-input-dragDrop"><div class="jFiler-input-inner"><div class="jFiler-input-icon"></div><div class="jFiler-input-text">Перетащите сюда файлы или загрузите вручную</div></div></div>',
        showThumbs: true,
        theme: "dragdropbox",
        templates: {
            box: '<ul class="jFiler-items-list jFiler-items-grid"></ul>',
            item: '<li class="jFiler-item">\
                        <div class="jFiler-item-container">\
                            <div class="jFiler-item-inner">\
                                <div class="jFiler-item-assets jFiler-row">\
                                    <ul class="list-inline pull-left">\
                                        <li>{{fi-progressBar}}<span class="fi-name">{{fi-name | limitTo: 25}}</span> <span class="fi-size">{{fi-size2}}</span></li>\
                                    </ul>\
                                    <ul class="list-inline pull-right">\
                                        <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>\
                    </li>',
            itemAppend: '<li class="jFiler-item">\
                            <div class="jFiler-item-container">\
                                <div class="jFiler-item-inner">\
                                    <div class="jFiler-item-assets jFiler-row">\
                                        <ul class="list-inline pull-left">\
                                            <li><span class="jFiler-item-others">{{fi-icon}}</span></li>\
                                        </ul>\
                                        <ul class="list-inline pull-right">\
                                            <li><a class="icon-jfi-trash jFiler-item-trash-action"></a></li>\
                                        </ul>\
                                    </div>\
                                </div>\
                            </div>\
                        </li>',
            progressBar: '<div class="bar"></div>',
            itemAppendToEnd: false,
            removeConfirmation: true,
            _selectors: {
                list: '.jFiler-items-list',
                item: '.jFiler-item',
                progressBar: '.bar',
                remove: '.jFiler-item-trash-action'
            }
        },
        dragDrop: {
            dragEnter: null,
            dragLeave: null,
            drop: null,
        },
        uploadFile: {
            url: "./php/upload.php",
            data: null,
            type: 'POST',
            enctype: 'multipart/form-data',
            beforeSend: function(){},
            success: function(data, el){
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                    $("<div class=\"jFiler-item-others text-success\"><i class=\"icon-jfi-check-circle\"></i> Success</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            error: function(el){
                var parent = el.find(".jFiler-jProgressBar").parent();
                el.find(".jFiler-jProgressBar").fadeOut("slow", function(){
                    $("<div class=\"jFiler-item-others text-error\"><i class=\"icon-jfi-minus-circle\"></i> Error</div>").hide().appendTo(parent).fadeIn("slow");
                });
            },
            statusCode: null,
            onProgress: null,
            onComplete: null
        },
        files: null,
        addMore: false,
        clipBoardPaste: true,
        excludeName: null,
        beforeRender: null,
        afterRender: null,
        beforeShow: null,
        beforeSelect: null,
        onSelect: null,
        afterShow: null,
        onRemove: function(itemEl, file, id, listEl, boxEl, newInputEl, inputEl){
            var file = file.name;
            $.post('./php/remove_file.php', {file: file});
        },
        onEmpty: null,
        options: null,
        captions: {
            button: "Choose Files",
            feedback: "Choose files To Upload",
            feedback2: "files were chosen",
            drop: "Drop file here to Upload",
            removeConfirmation: "Are you sure you want to remove this file?",
            errors: {
                filesLimit: "Only {{fi-limit}} files are allowed to be uploaded.",
                filesType: "Only Images are allowed to be uploaded.",
                filesSize: "{{fi-name}} is too large! Please upload file up to {{fi-maxSize}} MB.",
                filesSizeAll: "Files you've choosed are too large! Please upload files up to {{fi-maxSize}} MB."
            }
        }
    });

    //------------------------------------------------------------------------//

    $("#stick-sidebar").stick_in_parent({offset_top: 60});

    //------------------------------------------------------------------------//

    $('.calc-add-file').on('click', function(event) {
        event.preventDefault();
        $(this).hide();
        $(this).next('.calc-file').fadeIn('150');
    });

    //------------------------------------------------------------------------//

    //program
    $('.program-subcategory-title').on('click', function(event) {
        event.preventDefault();
        $(this).toggleClass('active').parents('.program-subcategory').find('.program-subcategory-info').slideToggle(200);
    });

    //------------------------------------------------------------------------//

    //full screen
    $('#map').fullScreen({
        minus: $('.clinics-header').innerHeight() + $('.footer-global').innerHeight()
    });

    $('.clinics-list').fullScreen({
        minus: $('.clinics-header').innerHeight() + $('.footer-global').innerHeight() + $('.clinics-search-wrapper').innerHeight()
    });

    $(window).resize(function() {

        //resize
        $('#map').fullScreen({
            minus: $('.clinics-header').innerHeight() + $('.footer-global').innerHeight()
        });

        $('.clinics-list').fullScreen({
            minus: $('.clinics-header').innerHeight() + $('.footer-global').innerHeight() + $('.clinics-search-wrapper').innerHeight()
        });

    });//window resize

    //------------------------------------------------------------------------//

    //clinics mobile
    $('.clinics-navigation-list').on('click', function(event) {
        event.preventDefault();
        $('body').addClass('clinics-list-active').removeClass('clinics-map-active');
    });

    $('.clinics-navigation-on-map').on('click', function(event) {
        event.preventDefault();
        $('body').addClass('clinics-map-active').removeClass('clinics-list-active');
    });

    //------------------------------------------------------------------------//

    $('.services-more a').on('click', function(event) {
        event.preventDefault();
        $('.row-hidden').removeClass('row-hidden');
    });

}); //document ready

//*********************************************************************//

$(window).load(function() {

    //load

});//window load

//*********************************************************************//

$(window).resize(function() {

    //resize

});//window resize