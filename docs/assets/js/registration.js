

$(document).ready(function ($) {
    
    var registerapiUrl= "/rest/adduser";
    var verifyemail="/rest/verify";
    
        class register {
        constructor(name, email, phoneno,yearofpassing,department,course,curcountry,curcity,curorg,curdesignation) {
            this.name = name;
            this.email = email;
            this.phoneno = phoneno;
            this.yearofpassing = yearofpassing;
            this.department=department;
            this.course= course;
            this.curcountry = curcountry;
            this.curcity=curcity;
            this.curorg=curorg;
            this.curdesignation=curdesignation;
        }
    }
        var $form = $("#register_form");
    $.validator.addMethod("letters", function (value, element) {
        return this.optional(element) || value == value.match(/.*\S+.*/);
    });
    $.validator.addMethod("customemail",
        function (value, element) {
            return this.optional(element) || value == value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/);
        }
    );

    $form.validate({
        rules: {
            name: {
                required: true,
                letters: true
            },
            email: {
                required: true,
                email: true,
                customemail: true
            },
            phoneno: {
                    required: true,
                    digits: true,
                },
            yearofpassing:{
                required:true,
            },
            department:{
                required: true,
            }


        },
        messages: {
            name: {
               required:"Please, Enter your Full Name.",
               letters: "Please, Enter your Full Name."
            },
            email: {
                required: "Please, Enter your Email ID.",
                email: "Please, Enter valid Email ID.",
                customemail: "Please, Enter valid Email ID."
            },
               phoneno: {
                    required: "Please, Enter your Contact Number.",
                    digits: "Enter valid Contact Number."
                },
            yearofpassing:{
                required:"Please, Enter your Year Of Passing."
            },
            department:{
                required:"Please, Enter your Department."
            },
        
        },
        submitHandler: function () {

        }
    });
    
     $('#Registr_btn').click(e => {
         e.preventDefault();
           if (!$("#register_form").valid()) {
            return;
        }
         var $Name = $('#name').val();
        var $Email = $('#email').val();
        var $phone = $('#phoneno').val();
        var $yop=$('#yearofpassing').val();
         var $department= $('#department').val();
         var $course = $('#course').val();
         var $country=$('#curcountry').val();
         var $city=$('#curcity').val();
         var $org=$('#curorg').val();
         var $designation=$('#curdesignation').val();
         
         var obj= new register($Name, $Email,$phone,$yop, $department, $course,$country,$city,$org,$designation);
         console.log( obj);
         
                 $.ajax({
            type: "GET",
            data:{"email":$Email} ,
            url: verifyemail,
            contentType: "application/json",

            success: function (data) {
                var test=data
                console.log(data);
               if( test.registered == true){
                   console.log('already registered');
                    flash('"Already registered"', {
                    'bgColor': '#C0392B',
                    'vPosition': 'bottom',
                    'hPosition': 'right',
                     
                });
                   return;
               }
            else{
                     $.ajax({
            type: "POST",
            data: JSON.stringify(obj),
            url: registerapiUrl,
            contentType: "application/json",

            success: function (data) {
                
                 $('#name').val('');
                 $('#email').val('');
                $('#phoneno').val('');
                $('#yearofpassing').val('');
                $('#department').val("");
        $('#department').niceSelect('update');
                  $('#course').val("");
        $('#course').niceSelect('update');
                 $('#curcountry').val('');
                 $('#curcity').val('');
                 $('#curorg').val('');
                 $('#curdesignation').val('');
         
                console.log('submitted successfully');
                flash('"Thank you for registering. Have a wondeful evening!"', {
                    'bgColor': 'green',
                    'vPosition': 'bottom',
                    'hPosition': 'right',
                     
                });
                
                
                $('#sendButton').prop('disabled', false);
                return;
            },
            error: function (data) {
                flash('"Oops! Something went wrong. Please try after sometime."', {
                    'bgColor': '#C0392B',
                    'vPosition': 'bottom',
                    'hPosition': 'right',
                     
                });
                
                
                $('#contact_submitbtn').prop('disabled', false);
                return;
            }

            });
            
            }
                
                
            },
            error: function (data) {
                
                flash('"Oops! Something went wrong. Please try after sometime."', {
                    'bgColor': '#C0392B',
                    'vPosition': 'bottom',
                    'hPosition': 'right',
                     
                });
                
                $('#contact_submitbtn').prop('disabled', false);
                return;

            }

      });
      

    
     });
    
  
       
    

});

