$(function(){
    $("#output").hide();
    let url = "http://jsonplaceholder.typicode.com";
    let id = undefined;
    let pid = undefined;
    $("#search").click(function(){
       id = $("#userId").val();
       let idUrl = url + "/users/" + id;
        $.get(idUrl).done(success).fail(fail);
    });

    function success(data){
        $("#output").show();
        $("#name").html(data.name);
        $("#email").html(data.email);
        let ad = data.address;
        $("#address").html(ad.street+" "+ad.suite+" "+ad.city+" "+ ad.zipcode);
        
        let postUrl = url+"/posts?userId=" + id;
        $.get(postUrl).done(successForPosts).fail(fail);
   
    }

    function successForPosts(data){

        $("#posts-ul").empty();
        data.forEach(element => {
            $("<li>").appendTo("#posts>ul");
            $("li:last-child").attr("pid", element.id);
            $("<div class=\"post-title\"/>").html(element.title).appendTo($("li:last-child"));
            $("<div class=\"post-body\"/>").html(element.body).appendTo($("li:last-child"));
            $("<input type=\"button\" value=\"Comments\"/>").appendTo($("li:last-child"));
          

        });
    
        $("ul input[type=\"button\"]").addClass("comments");

        $(".comments").click(function(evt){
            pid = $(evt.target).parent().attr("pid");
            let cUrl = url + "/comments?postId="+pid;
            $.get(cUrl).done(successForComments).fail(fail);
        });
    }
      

    function successForComments(data){
        var li = $("li[pid="+pid+"]");
        data.forEach(element => {
            $("<div class=\"commentor\"/>").html("Comment From: " + element.name).appendTo(li);
            $("<div class=\"comment-body\"/>").html(element.body).appendTo(li);
        });
       
    }

    function fail(xhr, status, exception){
        console.log(status + exception);
    }
    
});