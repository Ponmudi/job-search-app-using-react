import jobList from '../../resources/jobs.json';

export default function filterJobs(keywordFilters, skillsFilters, checkedValueFilters, jobType, range, sortBy) {
  let searchFilters = keywordFilters || [];
  let keySkillsFilters = skillsFilters || [];
  let availabilityFilters = checkedValueFilters || [];
  let jobTypeFilters = jobType || [];
  let minMaxRange = range || [];
  console.log("Keywords-->",searchFilters)
  console.log("Skills-->",keySkillsFilters)
  console.log("jobType-->",jobTypeFilters)
  console.log("availability-->",availabilityFilters)
  console.log("range-->",minMaxRange)

  let filterStatusCount = 0;
  if(searchFilters.length > 0){
    filterStatusCount = filterStatusCount + 1;
  }
  if(keySkillsFilters.length > 0){
    filterStatusCount = filterStatusCount + 1;
  }
  if(availabilityFilters.length > 0){
    filterStatusCount = filterStatusCount + 1;
  }
  if(jobTypeFilters.length > 0){
    filterStatusCount = filterStatusCount + 1;
  }
  if(minMaxRange.length > 0){
    filterStatusCount = filterStatusCount + 1;
  }

  let finalFilters = [...keySkillsFilters, ...availabilityFilters, ...jobTypeFilters, ...minMaxRange];

  if(searchFilters.length > 0){
    finalFilters = [...finalFilters, ...searchFilters]
  }

  console.log("Before duplicates-->",finalFilters)
  
  let duplicates = 0;
  for ( var i = 0; i < finalFilters.length; i++){
    for (var j = i+1; j< finalFilters.length; j++){
      if (finalFilters[i] === finalFilters[j]){
        duplicates = 1;
      }
    }
  }

  let noDatasFound = 0;
  if( (duplicates === 0 && filterStatusCount > 1)){
    noDatasFound = 1
  }
  
  let resultDuplicates;
  if(keySkillsFilters.length > 0 && availabilityFilters.length > 0 && minMaxRange.length > 0){
    resultDuplicates = keySkillsFilters.filter(value => availabilityFilters.includes(value) && minMaxRange.includes(value));

    if(resultDuplicates.length === 0){
      noDatasFound = 1
    }
  }
  if(keySkillsFilters.length > 0 && availabilityFilters.length > 0 && searchFilters.length > 0){
    resultDuplicates = searchFilters.filter(value => availabilityFilters.includes(value) && keySkillsFilters.includes(value));

    if(resultDuplicates.length === 0){
      noDatasFound = 1
    }
  }

  if(minMaxRange.length > 0 && availabilityFilters.length > 0 && searchFilters.length > 0){
    resultDuplicates = searchFilters.filter(value => availabilityFilters.includes(value) && minMaxRange.includes(value));

    if(resultDuplicates.length === 0){
      noDatasFound = 1
    }
  }

  if(keySkillsFilters.length > 0 && minMaxRange.length > 0 && availabilityFilters.length > 0 && searchFilters.length > 0){
    resultDuplicates = searchFilters.filter(value => availabilityFilters.includes(value) && minMaxRange.includes(value) && keySkillsFilters.includes(value));
    if(resultDuplicates.length === 0){
      noDatasFound = 1
    }
  }

  //console.log("Filter Status Count-->",filterStatusCount)
  if(duplicates === 1 && filterStatusCount > 1){
    //Find duplicate values in an array
    if(filterStatusCount === 2){
      let duplicateFilters = [];
      finalFilters.forEach(function(element, index) {
          // Find if there is a duplicate or not
          if (finalFilters.indexOf(element, index + 1) > -1) {
            // Find if the element is already in the result array or not
            if (duplicateFilters.indexOf(element) === -1) {
              duplicateFilters.push(element);
            }
          }
      });

        finalFilters = duplicateFilters;
    }

    if(filterStatusCount > 2){
      let sortedArr = [];
      sortedArr = finalFilters.sort(function(a, b) {
        return a - b
      });
      
      //create Obj with duplicates count
      var  objWithDuplicates = {};
      sortedArr.forEach(function(i) { objWithDuplicates[i] = (objWithDuplicates[i]||0) + 1;});

      let filteredId = Object.keys(objWithDuplicates).reduce((a, b) => objWithDuplicates[a] > objWithDuplicates[b] ? a : b);
      //Find Max count of identical values which is a key of the above object
      filteredId = Number(filteredId);

      finalFilters = [];

      //Get the corresponding value of the above key(filteredId)
      let matchValue;
      for(let i in objWithDuplicates){
        if(Number(i) === filteredId){
          matchValue = objWithDuplicates[i]
        }
      }

      //Get the corresponding key of the above value(filteredId)
      for(let j in objWithDuplicates){
        if(matchValue === objWithDuplicates[j]){
          finalFilters.push(Number(j))
        }
      }
    }
  
  }

  console.log("Final ids-->",finalFilters)

  let finalJobList = jobList;
  if(finalFilters.length > 0){
    finalJobList = jobList.filter(jobs => finalFilters.some(finalVal => jobs.id === finalVal))
  }
  

  if(sortBy){
    if(sortBy === 'lowtohigh')
      finalJobList = finalJobList.sort(function(a, b){return a.salarymin - b.salarymin});
    if(sortBy === 'hightolow')
      finalJobList = finalJobList.sort(function(a, b){return b.salarymin - a.salarymin});
  }
  
  if(noDatasFound === 1){
    finalJobList = [];
  }
  
  return finalJobList;
}