$(function () {
  var getUserManageData = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/user/queryUser',
      data: {
        page: pageNum || 1,
        pageSize: 5
      },
      success: function (data) {
        var userManageList = template('usermanage-template',data);
        $('table tbody').html(userManageList);
        $('.pagination').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          size: 'small',
          currentPage: data.page,
          totalPages: Math.ceil(data.totel / data.size),
          onPageClicked: function (event,originalEvent,type,page) {
            getUserManageData(page);
          }
        });
      }
    })
  }

  getUserManageData();
  $('tbody').on('click','.btn',function () {
    var id = $(this).data('id');
    var name = $(this).data('name');
    var isDelete = $(this).hasClass('btn-danger') ? 1:0;
    if (isDelete == 1) {
      $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要启用' + name + '吗?');
      console.log(1);
    } else {
      $('#manage-modal').find('.alert').html('<i class="glyphicon glyphicon-info-sign"></i>你确定要禁用' + name+ '吗?');
      console.log(0);
    }

    $('#manage-modal').on('click','btn-primary',function () {
      $.ajax({
        type: 'post',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        dataType: 'json',
        success: function () {
          if(data.success == true) {
            $('#manage-modal').modal('hide');
            getUserManageData();
          }
        }
      })
    })
    
  })
})