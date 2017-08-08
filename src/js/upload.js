   // 文件上传js
   // 初始化
   cancelClick();
   var fileInput = document.getElementById('uploaderInput');
   fileInput.onchange = function() {
       var files = fileInput.files;
       for (var i = 0; i < files.length; i++) {
           // 接受 jpeg, jpg, png 类型的图片
           if (!/\/(?:jpeg|jpg|png)/i.test(files[i].type)) {
               return alert("上传的图片格式不正确，请重新选择")　　　
           }
           // 添加图片预览
           readFile(files[i]);
       }
   }

   function readFile(file) {
       var reader = new FileReader();
       reader.readAsDataURL(file);
       var cancelIconHtml = '<div class="weui-uploader__file-content"><i class="weui-icon-cancel"></i></div>'
       reader.onload = function(arg) {
           var imgHtml = '<img src="' + this.result + '" alt="preview"/>';
           var $li = $('<li class="weui-uploader__file weui-uploader__file_status"></li>');
           $li.append(imgHtml + cancelIconHtml);
           $('#uploaderFiles').append($li);
           cancelClick();
       }
   }
   // 点击删除
   function cancelClick() {
       $('.weui-icon-cancel').click(function() {
           var $that = $(this);
           $.confirm("您确定要删除该图片吗?", "确认删除?", function() {
               $that.parents('.weui-uploader__file').remove();
               $.toast("图片已经删除!");
           }, function() {
               //取消操作
           });
       })
   }