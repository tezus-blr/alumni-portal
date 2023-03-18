 $(document).ready(function ($) {
    var membersapiUrl= "/rest/getall";

    $.ajax({
        type: "GET",
        url: membersapiUrl,
        contentType: "application/json",
        success: function (data) {
            //data.code
            localStorage.setItem('alluser', JSON.stringify(data));
            
            $("#total_member").html('<strong class="funfact-count">'+data.allUser.length+'</strong>');
          //  $("#total_member").html(data.allUser.length);
            $("#member_list_body").html("");
            data.allUser.forEach(function(e) {

              $("#member_list_body").append("<tr><td>"+e.name+"</td><td>"+e.course+"</td><td>"+e.yearofpassing+"</td><td>"+e.curdesignation+"</td></tr>")
            
            });
            //member_list_body
            // $.each( data.allUser, function( key, value ) {
            //        console.log( key + ": " + value );
            //     });
        },
        error: function (data) {

        }
    });
});

