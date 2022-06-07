$(document).ready(function() {
    $("#gradeSummary").hide();
});

$("#helpSectionToggle").on("click", function() {
    $("#helpSection").slideToggle();

    // toggle the arrow to change directions onclick
    if($("#helpArrow").hasClass("rightArrow"))
        $("#helpArrow").removeClass("rightArrow").addClass("downArrow");
    else
        $("#helpArrow").removeClass("downArrow").addClass("rightArrow");
});