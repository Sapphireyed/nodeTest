import createTable from './createTable.js';
import { lang } from './lang.js';

export const resetFilters = () => {
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
      createTable(jobs, i, lang)
    }
  }).catch(function(err) {
    console.log("Booo", err);
  });
}

export const searchSwitch = async (rar, elem, attr, type) => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  fetch(`http://127.0.0.1:3000/api/v1/jobs/searchSwitch?rarity=${rar}&element=${elem}&attribute=${attr}&type=${type}`)
    .then(function(response) {
      return response.json();
    }).then(function(data) {
      const jobs = data.data.filteredJobs
      document.querySelector('tbody').innerHTML = ''
      for (let i=0; i <= limit; i++) {
        createTable(jobs, i, lang)
      }
    }).catch(function(err) {
      console.log("Booo", err);
    });
}