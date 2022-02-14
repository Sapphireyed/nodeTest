const resetFilters = () => {
  let jobsInTable = Array.from(document.querySelectorAll('tr'))
  jobsInTable.map(j => j.classList.remove('d-none'))
}
const getsmth = async () => {
  let jobsInTable = Array.from(document.querySelectorAll('td.job'))
  fetch('http://127.0.0.1:3000/api/v1/jobs/search').then(function(response) {
    return response.json();
  }).then(function(data) {
    const jobs = data.data.filteredJobs

    let filteredJobs = jobsInTable.filter(job => jobs.filter(j => j.job == job.innerText).length == 0)
    for (let i=0; i < filteredJobs.length; i++) {
      filteredJobs[i].parentNode.classList.add('d-none')
    }
  }).catch(function(err) {
    console.log("Booo", err);
  });
}

const createTd = (name, val) =>{
  let td = document.createElement('td')
  td.className = name
  td.innerHTML = val
  return td
}
const createTable = (jobs, i) => {
  let hiddenJobs = Array.from(document.querySelectorAll('.d-none'))
  let tr = document.createElement('tr')
  if (hiddenJobs.some(j => j.children[1].innerText == jobs[i].job)) {
    tr.classList.add('d-none')
  }
  let index = createTd('#', jobs[i]['0'])
  let icon = createTd('icon', '#')
  let jobName = createTd('job', jobs[i].job)
  let rar = createTd('rarity', jobs[i].rarity)
  let passive = createTd('passive-skill', jobs[i].passive_skill || '')
  let sSkill = createTd('switch-skill', jobs[i].switch_skill || '')
  let abils5 = jobs[i].abilities_5 ? jobs[i].abilities_5 + ' x5<br>' : ''
  let abils3 = jobs[i].abilities_3 ? jobs[i].abilities_3 + ' x5<br>' : ''
  let abils2 = jobs[i].abilities_2 ? jobs[i].abilities_2 + ' x5<br>' : ''
  let abils1 = jobs[i].abilities_1 ? jobs[i].abilities_1 + ' x5<br>' : ''
  let deck = createTd('deck', `${abils5}${abils3}${abils2}${abils1}`)
  let hp = createTd('hp', jobs[i].hp)
  let str = createTd('str', jobs[i].strength)
  let agi = createTd('agi', jobs[i].agility)
  let int = createTd('int', jobs[i].intelligence)
  tr.append(index, icon, jobName, rar, passive, sSkill, deck, hp, str, agi, int)
  document.querySelector('tbody').append(tr)
}

let asc = true;
const sort = (attr) => {
  fetch(`http://127.0.0.1:3000/api/v1/jobs?sort=${attr}`).then((response) => {
    return response.json();
  }).then((data) => {
    let jobs = data.data.jobs

    document.querySelector('tbody').innerHTML = ''
    if (!asc) {
      for (let i = jobs.length-1; i >=0; i--) {
        createTable(jobs, i)
      }
    }
    if (asc) {
      for (let i=0; i < jobs.length; i++) {
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
  document.querySelector('th.id')
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

let search = document.querySelector('.filters__buttons-filters .search-filters')
search.addEventListener('click', getsmth)

let resetFiltersBtn = document.querySelector('.filters__buttons-filters .reset-filters')
resetFiltersBtn.addEventListener('click', resetFilters)

