$(function () {
  var getProductData = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: pageNum || 1,
        pageSize: 5
      },
      success: function (data) {
        var productResult = template('product-templte',data);
        $('tbody').html(productResult);
      }
    })
  }
  getProductData();
  initUpload();

  $('#productform').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      proName: {
        validators: {
          notEmpty: {
            message: '商品名称不能为空'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '商品描述不能为空'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '商品库存不能为空'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '商品价格不能为空'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '商品原价不能为空'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '商品尺码不能为空'
          }
        }
      }
    }
  }).on('success.form.bv',function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var data = $form.serialize();
    $.each(picList,function(i,item){
      data += '&picName' +(i+1)+'=' + item.picName+'&picAddr'+(i+1)+'='+item.picAddr;
    })

    data = data + '&brandId=4';
    $.ajax({
      type: 'post',
      url:'/product/addProduct',
      data: data,
      success:function(data){
        console.log(data);

        $('#product-model').model('hide');
        getProductData();
      }
    })
  });
})

var picList = [];
var initUpload = function () {
  $("#pic").fileupload({
    url: "/product/addProductPic",
    done: function (e,data) {
      $('.fileupload').append('<img width="50" height="auto" src="'+data.result.picAddr+'" alt="">');

      picList.push(data,result);
    }
  })
}