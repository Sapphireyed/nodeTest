import createTable from './createTable.js'
import { getImgs, buildImg } from './getImgs.js'

console.log('jobimgs', buildImg() )
Array.from(document.querySelectorAll('.filters__filters select')).map(filter => filter.value = 'All')
Array.from(document.querySelectorAll('.filters__filters select'))[6].value = 'Both'
const resetFilters = () => {
  let limit = 10 //document.querySelector('.filter.filters__pagination select').value
  document.querySelector('.filter.filters__pagination select').value = 10
  Array.from(document.querySelectorAll('.filter.filters__pagination button')).map((b, i) => {
    if (i >= 2) {
      b.disabled = false
    }
  })
  Array.from(document.querySelectorAll('.filters__filters select')).map(filter => filter.value = 'All')
  Array.from(document.querySelectorAll('.filters__filters select'))[6].value = 'Both'
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
const searchSwitch = async (rar, elem, attr, type) => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  fetch(`http://127.0.0.1:3000/api/v1/jobs/searchSwitch?rarity=${rar}&element=${elem}&attribute=${attr}&type=${type}`)
                  .then(function(response) {
    return response.json();
  }).then(function(data) {
    const jobs = data.data.filteredJobs
    document.querySelector('tbody').innerHTML = ''
    for (let i=0; i <= limit; i++) {
      createTable(jobs, i)
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
    limit = visibleJobs.length < limit ? visibleJobs.length-1 : limit
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
search.addEventListener('click', ()=> {
  const paginationSelect = document.querySelector('.filter.filters__pagination select')
  paginationSelect.value = paginationSelect.children[3].value
  Array.from(document.querySelectorAll('.filter.filters__pagination button')).map(b=> b.disabled = true)

  let rar = document.querySelector('.filters--rarity select').value
  let elem = document.querySelector('.filters--element select').value
  let attr = document.querySelector('.filters--attribute select').value
  let type = document.querySelector('.filters--type select').value

  switch(type) {
    case 'Action Buff':
      type = 'InstantBoost';
      break;
    case 'Remove Debuff':
      type = 'RemoveDebuff';
      break;
    default: type = type
  }

  const searchIn = document.querySelector('.filters--search-in select').value
  switch (searchIn) {
    case 'Switch':
      searchSwitch(rar, elem, attr, type)
      break;
  }

})

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

