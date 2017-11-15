NProgress.configure({ showSpinner: false });

$(window).ajaxStart(function() {
  NProgress.start();
})

$(window).ajaxComplete(function() {
  NProgress.done();
})

$('[data-menu]').on('click',function() {
  $('.lt-aside').toggle();
  $('.lt-section').toggleClass('menu');
})

$('.it-aside .menu').on('click','[href="javascript:;"]',function() {
  var _this = $(this);

  var child = _this.siblings('.child');
  child.slideToggle();
})

$('#logout-model').on('click','.btn-primary',function() {
  $.ajax({
    type: 'get',
    url: '/employee/employeelogout',
    data: {},
    dataType: 'json',
    success:function(data){
      if(data.success == true) {
        $('#logout-modal').modal('hide');
        setTimeout(function() {
          location.href = './login.html';
        },500)
      }
    }
  })
})