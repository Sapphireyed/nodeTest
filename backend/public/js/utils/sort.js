import createTable from './createTable.js';
import { lang } from './lang.js';

let asc = true;
export const sort = (attr) => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  fetch(`http://127.0.0.1:3000/api/v1/jobs?sort=${attr}`).then((response) => {
    return response.json();
  }).then((data) => {
    let jobs = data.data.jobs
    console.log(jobs, jobs.filter(j => !j.job_id))
    let visibleJobs = Array.from(document.querySelectorAll('tr'))
    limit = visibleJobs.length < limit ? visibleJobs.length-1 : limit
    let filteredJobs = visibleJobs.filter(job => jobs.some(j => job.children[2].textContent === j.job_id[lang]))
    filteredJobs = jobs.filter(j=> filteredJobs.some(job=> job.children[2].textContent === j.job_id[lang]))
    console.log(filteredJobs)
    document.querySelector('tbody').innerHTML = ''
    if (!asc) {
      for (let i = filteredJobs.length-1; i >=0; i--) {
        createTable(filteredJobs, i, lang)
      }
    }
    if (asc) {
      for (let i=0; i < filteredJobs.length; i++) {
        createTable(filteredJobs,i, lang)
      }
    }
    asc = !asc
  }).catch(function(err) {
    console.log("Booo", err);
  });
}