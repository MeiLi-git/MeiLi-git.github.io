$(function(){
    $("#hw").change(function(evt){
        
        var url = "./resources/" + $("#hw").val();
        
        $.get(url).done(success).fail(fail);
    })

    function success(data){
        $("#output").val(data);
    }

    function fail(xhr, status, exception){
        console.log(status + exception);
    }
})