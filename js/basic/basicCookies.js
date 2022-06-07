function getCookie(cname) {
    if(checkACookieExists(cname)) {
        cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(cname))
        .split('=')[1];
        return cookieValue;
    }
}

function checkACookieExists(cname) {
    if (document.cookie.split(';').some((item) => item.trim().startsWith(cname))) {
      return true;
    }
}

function setCookies(Category_List) {
    if(Category_List.length>0){
        document.cookie = "cookies="+Category_List.length+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";
        for(i=0; i<Category_List.length;i++)
        {
            document.cookie = "name"+i+"="+Category_List[i].categoryName;+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";
            document.cookie = "weight"+i+"="+Category_List[i].percentageWeight;+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";
            document.cookie = "grade"+i+"="+Category_List[i].earnedGrade;+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; SameSite=None; Secure";  
        }
    }
}

function getCookies() {
    let num=getCookie("cookies");
    let zname, zweight, zgrade;
    let x=1;
    if (num != ""){
        for(i=0;i<num;i++)
        {
            zname=getCookie("name"+i);
            zweight=getCookie("weight"+i);
            zgrade=getCookie("grade"+i);
            autofill(zname, zweight, zgrade,i);
            x++;
        }
        if(num>1)
            $("#category0").remove()
        return x;
    }
    else
        return 1;
}

function autofill(zname, zweight, zgrade,i) {
    let newCategory = $(document.createElement("div"));
    let newCatName = $(document.createElement("input"));
    let newWeight = $(document.createElement("input"));
    let newGrade = $(document.createElement("input"));
    let newButton = $(document.createElement("button"));
    let iTag = $(document.createElement("i"));
    
    /**
     * Set the attributes of the input fields
     */
    $(newCatName).attr({
        type: "text",
        value: zname,
    });

    $(newWeight).attr({
        type: "text",
        value: zweight,
    });

    $(newGrade).attr({
        type: "text",
        value: zgrade,
    });

    /**
     * Modify the CSS to style the input fields
     * This section modifies width and height of input fields
     */
    $(newCategory).css({"padding-top": "5px"});
    $(newCatName).css({"width": "150px", "height": "80px"});
    $(newWeight).css({"width": "150px", "height": "80px"});
    $(newGrade).css({"width": "150px", "height": "80px"});
    
    /**
     * Create the Button for deleting the category
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
    $(newCategory).append(newCatName, " ", newWeight, " ", newGrade, " ", newButton);

    /**
     * Give it a unique id name so that it can be referenced later on (hopefully)
     */
    $(newCategory).attr("id", "category" + i++);

    /**
     * Append the div to the main container, also a div
     */
    $("#inputFields").append(newCategory);

    return true;
}