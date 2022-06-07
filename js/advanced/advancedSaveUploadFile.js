//courtesy of: https://www.js-tutorials.com/javascript-tutorial/reading-csv-file-using-javascript-html5/
$(document).ready(function(){
    $('#header').load('../header-ads.html');
    $('#footer').load('../footer-ads.html');
    
    $('#submit-file').on("click",function(e){
        e.preventDefault();
        $('#files').parse({
            config: {
                header: false,
                delimiter: "",
                complete: fillInputFields,
            },
            before: function(file, inputElem)
            {
                console.log("Parsing file...", file);
            },
            error: function(err, file)
            {
                console.log("ERROR:", err, file);
            },
            complete: function()
            {
                console.log("Done with all files");
            }
        });
    });
      
    function fillInputFields(results){
        let data = results.data;
        let heading = data.shift().join(",");  //remove the row that is just column names
        let headingShouldBe = "Category Name,Weight,Assignment Name,Max Score,Earned Score";
        //TODO:This warning is in the console, but I would like it to have it's own box that is only visible if there is a warning present
        //I tried to do this, but it was taking too long so I decided to wrap this up and commit
        if (heading !== headingShouldBe){ 
            console.log("Waring: \dUpload file has heading: "+heading);
            console.log("Upload File heading should look like: "+headingShouldBe)
        }

        //clearing all input fields
        for (let i = 0; i < categoryCount; i++){
            if($("#category"+i).length){ // if category exists
                $("#category"+i+" .btn_delete").click(); //finds and presses delete button 
            }
        }
        //reset category count for simplicity
        categoryCount = 0;
        //filling fields with data from csv
        let prevCategoryName = ""; 
        let currentCategory;
        let currentAssignmentFields;
        for(let i =0; i < data.length; i++){
            //assumes that all data in csv is grouped by category - could be refactored
            //also assumes that first weight associated with category is true weight
            if (data[i][0]!==prevCategoryName){  
                prevCategoryName = data[i][0];
                $("#newCategory").click(); //create new category
                currentCategory = $("#category"+(categoryCount-1));
                categoryValues = currentCategory.find("input");
                for (let j = 0; j < 2; j++){ //categories only have two fields
                    categoryValues[j].value = data[i][j]; 
                    if (data[i][j]===undefined){
                        //find button to clear row we just made
                        currentCategory.find(".btn_delete").click(); //finds and presses delete button
                        break;
                    }
                }
                currentAssignmentFields = currentCategory.find(".assignment").find("input"); //only one element right now
            }  else {
                //make new assignment
                currentCategory.find(".btn_add_assignment").click();
                let assignments = currentCategory.find(".assignment");
                console.log(assignments[assignments.length - 1]);
                currentAssignmentFields = assignments[assignments.length - 1].getElementsByTagName("input"); //find last assignment
            }
            for(let j = 2; j < data[0].length; j++){ //first two fields are specific to category, not assignment
                currentAssignmentFields[j-2].value = data[i][j];
            }   
        }
    }
});


function downloadSheet(){
    let rows = [];
    rows.push(["Category Name","Weight","Assignment Name","Max Score","Earned Score"]);

    for (let i = 0; i < categoryCount; i++){
        if($("#category"+i).length >0){ // if category exists
            let categoryValues = $("#category" + i).find("input");  
            //value.replace(/,/g, '') removes commas, that can break our csv                                      
            let categoryName = categoryValues[0].value.replace(/,/g, ''); 
            let categoryWeight = categoryValues[1].value.replace(/,/g, '');

            let categoryAssignments = $("#category" + i + "-assignments").find("div");                                
            for(let j = 0; j < categoryAssignments.length; j++) {
                let currentAssignment = $(categoryAssignments[j]).find("input");
                let row = [categoryName, categoryWeight];
                for (let k = 0; k < 3; k++){
                    row.push(currentAssignment[k].value.replace(/,/g, ''));
                }                                       
                rows.push(row);
            }
            //if there is an empty category, we still want to save it
            if (categoryAssignments.length == 0){
                rows.push([categoryName, categoryWeight,"","",""]);
            } 
        }
    }

    //courtesy of https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
    //-some adjustments made
    let csvContent = "data:text/csv;charset=utf-8,";
    for (let i = 0; i < rows.length-1; i++){
        let row = rows[i].join(",");
        csvContent += row + "\r\n";
    }
    //don't add carriage return to final line
    let row = rows[rows.length-1].join(",");
    csvContent += row;

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    let date = new Date();
    let date_str = date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear()+"_"+date.getHours()+"-"+date.getMinutes();
    link.setAttribute("download", "AdvancedGrade_"+date_str+".csv");
    document.body.appendChild(link); 
    link.click(); // This will download the data file 
    document.body.removeChild(link);
}