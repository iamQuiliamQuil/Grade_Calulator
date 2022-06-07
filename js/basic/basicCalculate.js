/**
 * Implementation of the Basic Grade Calculator
 * Function is called when user clicks "Calculate"
 */
$("#calculate").on("click", function() {
    let basicModeUser = new BasicMode();

    for(let i = 0; i < categoryCount; i++) {
        if($("#category" + i).length) {                                                                 // check if the category by number still exists
            let categoryValues = $("#category" + i).find("input");
            let categoryName = categoryValues[0].value;                                                 // store the user specified category name
            let categoryWeight = parseFloat(categoryValues[1].value);
            let categoryGrade = parseFloat(categoryValues[2].value);

            if(!isValidInput(categoryWeight, "Weight")) return;                                         // verify the category weight input
            if(!isValidInput(categoryGrade, "Grade")) return;                                           // verify the category grade input

            basicModeUser.addCategory(new BasicCategory(categoryName, categoryWeight, categoryGrade));  // add the user defined category
        }
        if(basicModeUser.totalPercentageWeight > 100) {                                             // reject if user inputted more than 100% of category weight's
            alert("Total Category Weight cannot exceed 100%");
            return;
        }
    }
    calculateWeightValue(basicModeUser.categoriesList);
    $("#finalGrade").val(basicModeUser.calcFinalGrade() + "%");
    setCookies(basicModeUser.categoriesList);
    showGradeSummary(basicModeUser);
});

/**
 * Function that calculates the point value of each category
 */
let calculateWeightValue = function(categoriesList) {
    for(let i = 0; i < categoriesList.length; i++) {
        categoriesList[i].calcWeightVal();
    }
}

/**
 * Function that verifies the input of CategoryWeight and CategoryGrade to ensure they are valid numerics
 */
let isValidInput = function(checkValue, valueName) {
    if(isNaN(checkValue)) {
        alert("Value for a Category's " + valueName + " must be a number!");
        return false;
    } else if(checkValue <= 0) {
        alert("Value for a Category's " + valueName + " must be at least 1!");
        return false;
    } else if(checkValue > 100) {
        alert("Value for a Category's " + valueName + " cannot be greater than 100!");
        return false;
    }
    return true;
}

/**
 * Function that displays a summary of the users input after they click "Calculate"
 */
let showGradeSummary = function(user) {
    $("#gradeSummaryText").text("");                                                        // clear any old text that was there from a previous calculation
    for(let i = 0; i < user.categoriesList.length; i++) {                                   // Write a summary for each Category defined by the user
        let currentCategory = user.categoriesList[i];
        let newSummaryLine = $(document.createElement("p"));
        
        newSummaryLine.text("Category \"" + currentCategory.categoryName + "\" is worth " + currentCategory.percentageWeight + "% of your grade. With your inputted category grade of " + currentCategory.earnedGrade + "%, this category makes up for " + currentCategory.categoryWeightVal + " points on your final grade.");
        $("#gradeSummaryText").append(newSummaryLine);
    }

    /**
     * Make the grade summary section visible if is wasn't already
     */
    if(!($("#gradeSummary").is(":visible")))
        $("#gradeSummary").slideToggle();

    /**
     * Hide the Instructions section to make room for grade summary section
     */
    if($("#helpSection").is(":visible")) {
        $("#helpSection").slideToggle();
        $("#helpArrow").removeClass("downArrow").addClass("rightArrow");
    }
}