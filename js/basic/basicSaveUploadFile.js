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
      let headingShouldBe = ["Category Name","Weight","Grade"].join(",");
      //TODO:This warning is in the console, but I would like it to have it's own box that is only visible if there is a warning present
      //I tried to do this, but it was taking too long so I decided to wrap this up and commit
      if (heading !== headingShouldBe){
          console.log("Waring: \dUpload file has heading: "+heading);
          console.log("Upload File heading should look like: "+headingShouldBe)
      }

      //clearing all input fields
      for (let i = 0; i < categoryCount; i++){
          if($("#category"+i).length >0){ // if category exists
              $("#category"+i).find("button").click();
          }
      }

    //filling fields with data from csv
    for(let i =0; i < data.length; i++){
        //create new category for 
        $("#newCategory").click();
        let values = $("#category"+(categoryCount-1)).find("input");
        for(let j = 0; j < values.length; j++){
            //checking for undefined values because some CSV editors save files in such a way 
            //that this step generates a mostly empty row at the bottom of the file.
            //this step prevents that from happening
            if (data[i][j]===undefined){
                //find button to clear row we just made
                $("#category"+(categoryCount-1)).find("button").click();
                break;
            }
            values[j].value = data[i][j];  
        }
    }
}});

  function downloadSheet(){
      let rows = [];
      rows.push(["Category Name","Weight","Grade"]);

      for (let i = 0; i < categoryCount; i++){
          if($("#category"+i).length >0){ // if category exists
              let inputs = $("#category"+i).find("input");
              let values = [];
              for(let j = 0; j < inputs.length; j++){
                  let valueSansCommmas = inputs[j].value.replace(/,/g, ''); //commas break our program so remove them
                  values.push(valueSansCommmas);
              }
              rows.push(values);
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
      //use date and time to give every file a distinct name
      let date = new Date();
      let date_str = date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear()+"_"+date.getHours()+"-"+date.getMinutes();
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "BasicGrade_"+date_str+".csv");
      document.body.appendChild(link); 
      link.click(); // This will download the data file 
      document.body.removeChild(link);
  }