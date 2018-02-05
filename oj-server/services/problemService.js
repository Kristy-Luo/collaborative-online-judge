/*
// mock problem data
let problems = [
    {
      "id":1,
      "name":"Two Sum",
      "description":"Given an array of integers, find two numbers such that they add up to a specific target number.\n\nThe function twoSum should return indices of the two numbers such that they add up to the target, where index1 must be less than index2. Please note that your returned answers (both index1 and index2) are NOT zero-based.",
      "difficulty":"easy"
    },
    {
      "id":2,
      "name":"3Sum",
      "description":"Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.",
      "difficulty":"medium"
  },
  {
      "id":3,
      "name":"4Sum",
      "description":"Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target?\n\nFind all unique quadruplets in the array which gives the sum of target.",
      "difficulty":"medium"
  },
  {
      "id":4,
      "name":"Triangle Count",
      "description":"Given an array of integers, how many three numbers can be found in the array, so that we can build an triangle whose three edges length is the three numbers that we find?",
      "difficulty":"hard"},
  {
      "id":5,
      "name":"Sliding Window Maximum",
      "description":"Given an array of n integer with duplicate number, and a moving window(size k), move the window at each iteration from the start of the array, find the maximum number inside the window at each moving.",
      "difficulty":"super"
}];
*/

const ProblemModel = require('../models/problemModel');

// get all problems 
const getProblems = function () {
    /* 
    // work with data stored locally 
    return new Promise((resolve, reject) => {
        // query database for all problems 
        resolve(problems);
    });
    */
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                reject(err);
            }else {
                resolve(problems);
            }
        });
    }); 
}

// get a problem by ID 
const getProblemByID = function (id) {
    /*
    // work with data stored locally 
    return new Promise((resolve, reject) => {
        // find a problem with matched ID 
        resolve(problems.find(problem => problem.id === id));
    });
    */
    return new Promise((resolve, reject) => {
        // query database for a problem with matched ID 
        ProblemModel.findOne({id: id}, (err, problem) => {
            if (err) {
                reject(err);
            }else {
                resolve(problem);
            }
        }); 
    });
}

// add a new problem 
const addProblem = function (newProblem){
    /*
    // work with data stored locally 
    return new Promise((resolve, reject) => {
        console.log("add a new problem");
        // check if the problem already exists
        if (problems.find(problem => problem.name === newProblem.name)) {
            console.log(newProblem.name);
            reject("problem already exists");
        }else {
            console.log("this is a new prolbem");
            newProblem.id = problems.length + 1; 
            problems.push(newProblem);
            resolve(newProblem);
        }
    });
    */

    return new Promise((resolve, reject) => {
        // check if the problem already exists in database
        ProblemModel.findOne({name: newProblem.name}, (err, data) => {
            if (data) { 
                reject("problem already exists");
            }else {
                ProblemModel.count({}, (err, count) => {
                    // set problem id 
                    newProblem.id = count + 1; 
                    // create a new document and save to database
                    const problem = new ProblemModel(newProblem);
                    problem.save(); 
                    resolve(problem);
                });
            }
        });
    });
}

module.exports = {
    getProblems: getProblems,
    getProblemByID: getProblemByID, 
    addProblem: addProblem
}; 