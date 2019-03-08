$( document ).ready(function() {
    $('#verifyfile').change(function(){
        var filename = $(this).val().split('\\').pop();
        $('#textbox').val(filename);
        console.log(filename);
    });
});