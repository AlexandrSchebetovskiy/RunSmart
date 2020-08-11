$(document).ready(function(){

// SLIDER
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $('.carousel__inner').slick({
        infinite:true,
        adaptieHeight:true,
        prevArrow:'<button type="button" class="slick-prev"><img src="../img/icons/chevron-left-solid.svg"> </button>',
        nextArrow:'<button type="button" class="slick-next"><img src="../img/icons/chevron-right-solid.svg"> </button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                  dots:true,
                  arrows:false
              }
            },
          ]
    });
    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab-acive)', function() {
      $(this)
        .addClass('catalog__tab-acive').siblings().removeClass('catalog__tab-acive')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
    });

//TABS
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function toggleSlide(item){
      $(item).each(function(i){
        $(this).on('click',function(e){
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list-active');
        });
      });
    };
    
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

//MODAL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('[data-modal=consultation]').on('click',function(){
  $('.overlay , #consultation').fadeIn();
});

$('.modal__close').on('click',function(){
  $('.overlay , #consultation ,#order, #tanks').fadeOut();
});

$('.button-mini').on('click',function(){
  $('.overlay , #order').fadeIn();
});
$('.button-mini').each(function(i){
  $(this).on('click',function(){
    $('#order .modal__descr').text($('.catalog-item__subtittle').eq(i).text());
  });

});
//VALIDATE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function validForm(i){
  $(i).validate({
    rules:{
      name:{
        required:true
      },
      phone:"required",
      email:{
        required:true,
        email:true
      }
    },
    messages: {
      name: {
        required:"Пожалуйста, введите свое имя !"
    },
      phone:"Пожалуйста, введите свой номер телефона !",
      email: {
          required: "Пожалуйста, введите свой E-mail !",
          email: "Неверно введен E-mail !"
        }
      }
    });
  };
  validForm('#consultation form');
  validForm('#consultation-form');
  validForm('#order form');

  //MASK
  $('input[name = phone]').mask("+7 (999) 999-99-99");


  //MAILER
  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url:"mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay,#thanks').fadeIn();

      $('form').trigger('reset');
    });
    return false;

  });

  $(window).scroll(function(){
    if($(this).scrollTop() > 1250){
      $('.back-to-top').fadeIn();
      }else{
        $('.back-to-top').fadeOut(); 
      }
      $("a[href^='#']").click(function(){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
  });
});
  