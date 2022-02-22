import { lang } from './lang.js';

let asc = true;
export const sort = (attr, arr) => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  fetch(`http://127.0.0.1:3000/api/v1/${arr}?sort=${attr}`).then((response) => {
    return response.json();
  }).then((data) => {
    let jobs = data.data[arr]
    let visibleJobs = Array.from(document.querySelectorAll('tbody tr')).filter(row => !row.classList.contains('d-none'))
    document.querySelector('tbody').innerHTML = ''
    if (!asc) {
      for (let i = jobs.length-1; i >=0; i--) {
        let sortedRow = visibleJobs.find(job => job.children[2].textContent === jobs[i].job_id[lang])
          if (sortedRow) document.querySelector('tbody').append(sortedRow)
        }
      }
      if (asc) {
        console.log(jobs[0].job_id[lang], visibleJobs[0].children[2].textContent)
        for (let i=0; i < jobs.length; i++) {
          let sortedRow = visibleJobs.find(job => job.children[2].textContent === jobs[i].job_id[lang])
          if (sortedRow) document.querySelector('tbody').append(sortedRow)
        }
      }
    // limit = visibleJobs.length < limit ? visibleJobs.length-1 : limit
    // let filteredJobs = visibleJobs.filter(job => jobs.some(j => job.children[2].textContent === j.job_id[lang]))
    // filteredJobs = jobs.filter(j=> filteredJobs.some(job=> job.children[2].textContent === j.job_id[lang]))
    // console.log(filteredJobs)
    // document.querySelector('tbody').innerHTML = ''
    // if (!asc) {
    //   for (let i = filteredJobs.length-1; i >=0; i--) {
    //     createTable(filteredJobs, i, lang)
    //   }
    // }
    // if (asc) {
    //   for (let i=0; i < filteredJobs.length; i++) {
    //     createTable(filteredJobs,i, lang)
    //   }
    // }
    asc = !asc
  }).catch(function(err) {
    console.log("Booo", err);
  });
}