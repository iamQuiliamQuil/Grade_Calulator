/**
 * Class to represent a grading category when the grade calculator is being used as a student user
 */
class AdvancedCategory {
    categoryName;                                                                               // the name of this grading category
    assignmentsList;                                                                            // list of assignments under this category
    percentageWeight;                                                                           // the weight of this category on the final grade
    categoryWeightVal;                                                                          // how many points this category contributes to the final grade

    constructor(categoryName, percentageWeight) {
        this.categoryName = categoryName;
        this.assignmentsList = [];
        this.percentageWeight = percentageWeight;
        this.categoryWeightVal = 0;
    }

    /**
     * Function that calculates the average of this grading category at the time the function was called
     * @returns the average of this grading category
     */
    calcCategoryAvg() {
        var sum = 0;

        for(var i = 0; i < this.assignmentsList.length; i++)
            sum += (this.assignmentsList[i].calcScore() * 100);
        return Number((sum / this.assignmentsList.length).toFixed(2));
    }

    /**
     * Function that calculates and updates the exact number of points this category is worth towards a students final grade
     */
    calcWeightVal() {
        this.categoryWeightVal = Number((this.calcCategoryAvg() * (this.percentageWeight / 100)).toFixed(2));
    }

    /**
     * Function to push the newly created user assignment to the list of assignments and updates the weight value of this category
     * @param {Assignment} assignment - an assignment created by the student user within this category
     */
    addAssignment(assignment) {
        this.assignmentsList.push(assignment);
        this.calcWeightVal();
    }
}