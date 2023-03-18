$(document).ready(function ($) {
    
    var contactapiUrl= "/rest/contactus";
    
        class contact {
        constructor(name, email, phoneno, subject,message) {
            this.name = name;
            this.email = email;
            this.phoneno = phoneno;
            this.subject = subject;
            this.message = message;
        }
    }
        var $form = $("#contact-form");
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
            
            subject:{
                required:true
            },

            message: {
                required: true,
                letters: true,
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
            message: {
                required: "Please, Enter a message.",
                letters: "Please, Enter a message."
            },
            subject:{
                required:"Please, Enter the subject."
            }
        },
        submitHandler: function () {

        }
    });
    
     $('#sendButton').click(e => {
         e.preventDefault();
           if (!$("#contact-form").valid()) {
            return;
        }
         var $Name = $('#name').val();
        var $Email = $('#email').val();
        var $phone = $('#phoneno').val();
        var $message = $('#message').val();
         var $subject =$('#subject').val();
         var obj= new contact($Name, $Email,$phone,$subject, $message);
        
          $.ajax({
            type: "POST",
            data: JSON.stringify(obj),
            url: contactapiUrl,
            contentType: "application/json",

            success: function (data) {
                $('#name').val('');
                 $('#email').val('');
                $('#phoneno').val('');
                $('#subject').val('');
                $('#message').val('');
                
                
                   flash('"Thank you for contacting us.We will get back to you soon!"', {
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
                    'vPosition': 'top',
                    'hPosition': 'right',
                     
                });
                
                
                $('#contact_submitbtn').prop('disabled', false);
return;
            }

        });

    
     });

});

