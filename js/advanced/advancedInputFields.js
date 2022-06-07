var categoryCount = 1;                          // store the category count to be used when creating dynamic input fields for unique id names

/**
 * Add functionality to the default loaded Category and Assignment
 */
$(document).ready(function() {
    /**
     * Add removal to the default loaded category line
     */
    $("#delCategory0").on("click", function() {
        $("#category0").remove();
    });

    /**
     * Add removal to the default loaded assignment line
     */
    $("#delAssignment0").on("click", function() {
        $("#assignment0").remove();
    })

    /**
     * Dynamic creation of assignment fields for default loaded category
     */
    $("#newAssignment0").on("click", function() {
        addNewAssignment($("#category0-assignments"));
    });
});

/**
 * Click event to add a new Category to the main container of the website
 */
$("#newCategory").on("click", function() {
    /**
     * Create the new HTML elements for the Category
     */
    let newCategory = $(document.createElement("div"));                                     // div for the new Category - has unique ID
    let newCatName = $(document.createElement("input"));                                    // input for Category name
    let newWeight = $(document.createElement("input"));                                     // input for Category Weight
    let newButton = $(document.createElement("button"));                                    // Button to delete this Category
    let iTag = $(document.createElement("i"));                                              // iTag for delete button 

    /**
     * Create the Assignments container for this Category
     */
    let newAssignmentsDiv = $(document.createElement("div"));
    $(newAssignmentsDiv).attr({"id": "category" + categoryCount + "-assignments"});         // give the container a unique ID
    addNewAssignment(newAssignmentsDiv);                                                    // add a default created Assignment line

    /**
     * Create the "Add Assignment" button for this Category
     */
    let newAssignmentButton = $(document.createElement("button"));
    let iTagAssignment = $(document.createElement("i"));
    $(iTagAssignment).text("Add Assignment");
    $(iTagAssignment).css({
        "position": "relative",
        "font-style": "normal",
        "font-size": "1.2em",
        "text-transform": "uppercase",
    }); 
    $(newAssignmentButton).append(iTagAssignment);
    $(newAssignmentButton).addClass("btn_add_assignment")
    $(newAssignmentButton).on("click", function() {
        addNewAssignment($(newAssignmentsDiv));
    });
    $(newAssignmentButton).css({"margin": "5px 0px 0px 25px"});

    /**
     * Set the attributes of the input fields
     */
    $(newCatName).attr({
        type: "text",
        placeholder: "Category",
    });
    $(newWeight).attr({
        type: "text",
        placeholder: "Weight",
    });

    /**
     * Modify the CSS to style the Category input fields (Category Name, Category Weight) and the container itself
     */
    $(newCategory).css({"margin-top": "5px"});
    $(newCatName).css({
        "width": "150px",
        "height": "80px",
    });
    $(newWeight).css({
        "width": "150px",
        "height": "80px",
    });
    
    /**
     * Create the Button for deleting this Category
     */
    iTag.text("Delete");
    iTag.css({
         "position": "relative",
         "font-style": "normal",
         "font-size": "1.2em",
         "text-transform": "uppercase"});
    $(newButton).append(iTag);
    $(newButton).addClass("btn_delete");    
    $(newButton).on("click", function() {
        $(newCategory).remove();
    });

    /**
     * Append the newly created category to the HTML page
     */
    $(newCategory).append(newCatName, " ", newWeight, " ", newButton, " ", newAssignmentsDiv, " ", newAssignmentButton);

    /**
     * Give it a unique id name so that it can be referenced later on
     */
    $(newCategory).attr("id", "category" + categoryCount);

    /**
     * Append the newly created Category to the main container that holds all the Category's on this website
     */
    $("#inputFields").append(newCategory);

    /**
     * Increment the count so the number is always unique for each new category created
     */
    categoryCount++;
    return categoryCount;
});

/**
 * Function that creates a new Assignment within a div given as a parameter
 * @param AssignmentsDiv the div to append the new Assignment to
 */
let addNewAssignment = function(AssignmentsDiv) {
    let newAssignment = $(document.createElement("div"));                                   // div to store new assignment. Has class "assignment"
    let newAssignmentName = $(document.createElement("input"));                             // input for assignment name
    let newMaxScore = $(document.createElement("input"));                                   // input for max score
    let newEarnedScore = $(document.createElement("input"));                                // input for earned score
    let newDeleteButton = $(document.createElement("button"));                              // delete button for this assignment
    let iTagNewDeleteButton = $(document.createElement("i"));                               // iTag for delete button for this assignment 

    /**
     * Set attributes of new input fields
     */
    $(newAssignmentName).attr({
        type: "text",
        placeholder: "Assignment",
    });
    $(newMaxScore).attr({
        type: "number",
        placeholder: "Max Score",
        min: "0",
        max: "100",
        required: true,
    });
    $(newEarnedScore).attr({
        type: "number",
        placeholder: "Earned Score",
        min: "0",
        max: "100",
        required: true,
    });

    /**
     * Set the CSS of each element
     */
    $(newAssignment).css({"margin": "5px 0px 0px 25px"});
    $(newAssignmentName).css({
        "width": "150px",
        "height": "80px",
    });
    $(newMaxScore).css({
        "width": "150px",
        "height": "80px",
    });
    $(newEarnedScore).css({
        "width": "150px",
        "height": "80px",
    });

    /**
     * Add functionality to the Button that can delete this Assignment
     */
    $(iTagNewDeleteButton).text("Delete"); 
    $(iTagNewDeleteButton).css({
        "position": "relative",
        "font-style": "normal",
        "font-size": "1.2em",
        "text-transform": "uppercase",
        "font-weight": "bold",
        "color": "black",
    }); 
    $(newDeleteButton).append(iTagNewDeleteButton);  
    $(newDeleteButton).addClass("btn_delete");  
    $(newDeleteButton).on("click", function() {
        $(newAssignment).remove();
    });

    /**
     * Give newAssignment a class name of "assignment"
     */
    $(newAssignment).addClass("assignment");

    /**
     * Append the new Assignment fields and Button to the container
     */
    $(newAssignment).append(newAssignmentName, " ", newMaxScore, " ", newEarnedScore, " ", newDeleteButton);

    /**
     * Append the new Assignment container to the AssignmentDiv given as a parameter
     */
    AssignmentsDiv.append(newAssignment);
}