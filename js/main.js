    function tologin(){
        $(".main").css("display","none");
        $(".main").eq(0).css("display","block");

        if(checkLogin()==1){
            $(".main").eq(0).html('<h2>已登录</h2>');
        }
        
    }
    function userManage(){
        $(".main").css("display","none");
        $(".main").eq(1).css("display","block");
        //查看所有用户信息
        $.ajax({
            url:'http://localhost:8083/manage/userlist',
            type:'POST',
            async: false,
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    var str = '<li href="#" class="list-group-item active">所有用户信息</li>';
                    var list = callback.data;
                    for(var i=0;i<list.length;i++){
                        str += '<li href="#" class="list-group-item">'+ 
                        '昵称：'+list[i].nickname+' | '+
                        '用户名：'+list[i].username+' | '+
                        '邮箱：'+list[i].email+' | '+
                        '电话号码：'+list[i].phone+' | ';
                        if(list[i].state==1){
                            str+= '状态：可用|<a onclick="userStop('+list[i].id+');">禁用</a>';
                        } else{
                            str+= '状态：用|<a onclick="userStart('+list[i].id+');">可用</a>';
                        }

                        str += '头像：<img src="http://118.25.102.29:8084/img'+ list[i].headPic+ '"width="30px"/>'
                        '</li>'
                        $("#userContent").html(str);
                    }
                } else {
                    
                }
            }
        });

    }
    function articleManage(){
        var flag = checkLogin();
        if(flag==0){
            tologin();
        }else{

            $(".main").css("display","none");
            $(".main").eq(2).css("display","block");

            var pageNum = 4;
            var totalPage = 3;

            $.ajax({
                url:'http://localhost:8083/manage/getArticles',
                type:'POST',
                async: false,
                data:{'page':1,'pageSize':pageNum},
                dataType:'JSON',
                success:function (callback) {
                    var list = callback.data.list;
                    var str = '';
                    for(var i=0;i<list.length;i++){
                        str += '<div class="panel panel-default"><div class="panel-heading">'+ list[i].title+'作者：'+list[i].nickname+'时间'+ list[i].createTime +'<a style="float:right;" onclick="delArticle('+ list[i].id +');">删除</a></div><div class="panel-body">'+list[i].content+'</div></div>';
                    }
                    $('#content').html(str);
                    totalPage = callback.data.totalPage;
                    $('#last_page').text(totalPage);
                }
            });
            $('#pageLimit').bootstrapPaginator({
                currentPage: 1,
                totalPages: totalPage,
                size:"normal",
                bootstrapMajorVersion: 3,
                alignment:"right",
                itemTexts: function (type, page, current) {
                    switch (type) {
                    case "first": return "首页";
                    case "prev": return "上一页";
                    case "next": return "下一页";
                    case "last": return "末页";
                    case "page": return page;
                    }//默认显示的是第一页。
                },
                onPageClicked: function (event, originalEvent, type, page){//给每个页眉绑定一个事件，其实就是ajax请求，其中page变量为当前点击的页上的数字。
                    $.ajax({
                        url:'http://localhost:8083/manage/getArticles',
                        type:'POST',
                        data:{'page':page,'pageSize':pageNum},
                        dataType:'JSON',
                        success:function (callback) {
                                var list = callback.data.list;
                                var str = '';
                                for(var i=0;i<list.length;i++){
                                    str += '<div class="panel panel-default"><div class="panel-heading">'+ list[i].title+'作者：'+list[i].nickname+'时间'+ list[i].createTime +'<a style="float:right;" onclick="delArticle('+ list[i].id +');">删除</a></div><div class="panel-body">'+list[i].content+'</div></div>';
                                }
                                $('#content').html(str);
                                totalPage = callback.data.totalPage;
                                $('#last_page').text(totalPage);
                            }
                    })
                }
            });

        }
    }
    function commentManage(){
        $(".main").css("display","none");
        $(".main").eq(3).css("display","block");

        $.ajax({
            url:'http://localhost:8083/manage/commentList',
            type:'POST',
            async: false,
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    var list = callback.data;
                    var str = '';
                    for(var i=0;i<list.length;i++){
                        var timestamp3 = list[i].time;
                        var newDate = new Date();
                        newDate.setTime(timestamp3);
                        str += '<div class="panel panel-default"><div class="panel-heading">'+'用户：'+list[i].nickname+'时间'+ newDate.toLocaleDateString() +'<a style="float:right;" onclick="delComment('+ list[i].id +');">删除</a></div><div class="panel-body">'+list[i].content+'</div></div>';
                    }
                    $("#commentContent").html(str);

                } else {
                    
                }
            }
        });
    }
    function ipManage(){
        $(".main").css("display","none");
        $(".main").eq(4).css("display","block");

        $.ajax({
            url:'http://localhost:8083/manage/loginIpinfo',
            type:'POST',
            async: false,
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    var str = '<li href="#" class="list-group-item active">所有用户登陆IP</li>';
                    var list = callback.data;
                    for(var i=0;i<list.length;i++){
                        var timestamp3 = list[i].time;
                        var newDate = new Date();
                        newDate.setTime(timestamp3);

                        str += '<li href="#" class="list-group-item">'+ 
                        '用户Id：'+list[i].userId+' | '+
                        '用户昵称：'+list[i].nickname+' | '+
                        '登陆IP：'+list[i].ipAddr+' | '+
                        '登陆时间：'+newDate.toLocaleDateString()+'</li>'
                        
                        $("#ipContent").html(str);
                    }
                } else {
                    
                }
            }
        });
    }
    function chatManage(){
        $(".main").css("display","none");
        $(".main").eq(5).css("display","block");

        $.ajax({
            url:'http://localhost:8083/manage/chatInfolist',
            type:'POST',
            async: false,
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    var str = '<li href="#" class="list-group-item active">为保护隐私，聊天记录打乱状态，若有违规记录，到user-manage栏停用此账户</li>';
                    var list = callback.data;
                    for(var i=0;i<list.length;i++){
                        str += '<li href="#" class="list-group-item">'+ 
                        '用户Id：'+list[i].fromId+' | '+
                        '用户昵称：'+list[i].fromnick+' | '+
                        '发送内容：'+list[i].content+' | '+
                        '发送时间：'+list[i].sendTime+'</li>'
                        
                        $("#chatlogContent").html(str);
                    }
                } else {
                    
                }
            }
        });
    }


    function login(){
        var username = $("#username").val();
        var password = $("#password").val();
        $.ajax({
            url:'http://localhost:8083/manage/login',
            type:'POST',
            async: false,
            data:{
                'username':username,
                'password':password
            },
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    $(".main").eq(0).html('<h2>已登录</h2>');
                } else {
                    alert("用户名或密码错误，请重新登录");
                }
            }
        });
    }
    function checkLogin(){
        var loginFlag = 0;
        $.ajax({
            url:'http://localhost:8083/manage/checkLogin',
            type:'POST',
            async: false,
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    if(callback.data=="1"){
                        loginFlag = 1;
                    }
                } else {
                    
                }
            }
        });
        return loginFlag;
    }

    function delArticle(id){
        var articleId = id+'';
        $.ajax({
            url:'http://localhost:8083/deleteArticle',
            type:'POST',
            async: false,
            data:{
                'articleId': articleId
            },
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    
                } else {
                    
                }
            }
        });
        articleManage();
    }

    function delComment(id){
        var commentId = id+'';
        $.ajax({
            url:'http://localhost:8083/deleteComment',
            type:'POST',
            async: false,
            data:{
                'commentId': commentId
            },
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    
                } else {
                    alert("删除失败");
                }
            }
        });
        commentManage();
    }

    function userStop(id){
        $.ajax({
            url:'http://localhost:8083/manage/stopUser',
            type:'POST',
            async: false,
            data:{
                'userId': id
            },
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    
                } else {
                    alert("删除失败");
                }
            }
        });
        userManage();
    }

    function userStart(id){
        $.ajax({
            url:'http://localhost:8083/manage/startUser',
            type:'POST',
            async: false,
            data:{
                'userId': id
            },
            dataType:'JSON',
            success:function (callback) {
                if(callback.code=="200"){
                    
                } else {
                    alert("删除失败");
                }
            }
        });
        userManage();

    }