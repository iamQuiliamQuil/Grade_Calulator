/**
 * Class to represent a grading category when the grade calculator is being used in basic mode
 */
class BasicCategory {
    categoryName;                                                                               // the name of this grading category
    percentageWeight;                                                                           // the weight of this category on the final grade
    earnedGrade;                                                                                // the earned grade for this category
    categoryWeightVal;                                                                          // how many points this category contributes to the final grade

    constructor(categoryName, percentageWeight, earnedGrade) {
        this.categoryName = categoryName;
        this.percentageWeight = percentageWeight;
        this.earnedGrade = earnedGrade;
        this.categoryWeightVal = 0;
    }

    /**
     * Function that calculates and updates the exact number of points this category is worth towards a final grade
     */
    calcWeightVal() {
        this.categoryWeightVal = Number((this.earnedGrade * (this.percentageWeight / 100)).toFixed(2));
    }
}