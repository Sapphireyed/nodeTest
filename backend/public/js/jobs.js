import createTable from './createTable.js'

const resetFilters = () => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  fetch('http://127.0.0.1:3000/api/v1/jobs').then(function(response) {
    return response.json();
  }).then(function(data) {
    const jobs = data.data.jobs
    document.querySelector('tbody').innerHTML = ''
    for (let i=0; i <= limit-1; i++) {
      createTable(jobs, i)
    }
  }).catch(function(err) {
    console.log("Booo", err);
  });
}
const getsmth = async () => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  //let jobsInTable = Array.from(document.querySelectorAll('td.job'))
  fetch(`http://127.0.0.1:3000/api/v1/jobs/search
              ?rarity=${rarity}
              &element=${element}
              &attribute=${attr}
              &type=${type}`)
                  .then(function(response) {
    return response.json();
  }).then(function(data) {
    const jobs = data.data.filteredJobs
    //let filteredJobs = jobsInTable.filter(job => jobs.filter(j => j.job == job.innerText).length == 0)
    document.querySelector('tbody').innerHTML = ''
    for (let i=0; i <= limit; i++) {
      createTable(jobs, i)
      //filteredJobs[i].parentNode.classList.add('d-none')
    }
  }).catch(function(err) {
    console.log("Booo", err);
  });
}

let asc = true;
const sort = (attr) => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  fetch(`http://127.0.0.1:3000/api/v1/jobs?sort=${attr}`).then((response) => {
    return response.json();
  }).then((data) => {
    let jobs = data.data.jobs
    let visibleJobs = Array.from(document.querySelectorAll('tr'))
    let filteredJobs = jobs.filter(job => visibleJobs.some(j => j.children[2].innerText === job.job))
    if (limit > filteredJobs.length) {
      jobs = data.data.jobs
    } else {
      jobs = filteredJobs
    }
    document.querySelector('tbody').innerHTML = ''
    if (!asc) {
      for (let i = limit-1; i >=0; i--) {
        createTable(jobs, i)
      }
    }
    if (asc) {
      for (let i=0; i < limit; i++) {
        createTable(jobs,i)
      }
    }
    asc = !asc
  }).catch(function(err) {
    console.log("Booo", err);
  });
}


// EXECUTE FUNCTIONS
const attrButtons = [
  document.querySelector('th.hp'), 
  document.querySelector('th.str'), 
  document.querySelector('th.agi'), 
  document.querySelector('th.int'),
  document.querySelector('th.id'),
  document.querySelector('th.Rarity')
]

attrButtons[0].addEventListener('click', () => {
    sort('hp')
})
attrButtons[1].addEventListener('click', () => {
  sort('strength')
})
attrButtons[2].addEventListener('click', () => {
  sort('agility')
})
attrButtons[3].addEventListener('click', () => {
  sort('intelligence')
})
attrButtons[4].addEventListener('click', () => {
  sort('0')
})
attrButtons[5].addEventListener('click', () => {
  sort('rarity')
})

let search = document.querySelector('.filters__buttons-filters .search-filters')
search.addEventListener('click', getsmth)

let resetFiltersBtn = document.querySelector('.filters__buttons-filters .reset-filters')
resetFiltersBtn.addEventListener('click', resetFilters)



// slide=img#img_title1
// quest=question1
// ***
// next=img_title2
// ***
// next=vid_title1

// ###
// slide=vid#vid_title1
// quest=question2
// ***
// next=slide title
// ***
// next=slide title

