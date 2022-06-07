/**
 * Class to represent an Assignment for a Student User in the Grade Calculator
 */
class Assignment {
    assignmentName;                                                                 // the name of this assignment
    maxScore;                                                                       // the maximum possible score for this assignment
    actualScore;                                                                    // the score the student user received for this assignments
    percentage;                                                                     // the percentage score of this assignment

    constructor(assignmentName, maxScore, actualScore) {
        this.assignmentName = assignmentName;
        this.maxScore = maxScore;
        this.actualScore = actualScore;
        this.percentage = this.calcScore();
    }

    /**
     * Calculates and returns the percentage score of this Assignment
     * @returns the calculated percentage score of this Assignment as a decimal
     */
    calcScore() {
        return Number((this.actualScore / this.maxScore));
    }
}