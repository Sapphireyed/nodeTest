import createTable from "./createTable.js"
import { lang } from './lang.js';

const first = document.querySelector('button.first')
const prev = document.querySelector('button.prev')
const next = document.querySelector('button.next')
const last = document.querySelector('button.last')

const paginationSelect = document.querySelector('.filter.filters__pagination select')
let limit = document.querySelector('.filter.filters__pagination select').value
let page = 1
const firstPage = 1
let lastPage = Math.ceil(Array.from(document.querySelectorAll('tbody tr')).length / limit)

const disableButtons = () => {
  if (page === 1) {
    first.disabled = true
    prev.disabled = true
    last.disabled = false;
    next.disabled = false
  }
  
  if (page >= lastPage-1) {
    last.disabled = true;
    next.disabled = true
    first.disabled = false
    prev.disabled = false
  }

  if (page !== 1 && page <= lastPage-1) {
    last.disabled = false;
    next.disabled = false
    first.disabled = false
    prev.disabled = false
  }
}
first.disabled = true
prev.disabled = true
const getLast = () => {
  let limit = paginationSelect.value
  lastPage = Math.ceil(paginationSelect.children[3].value / limit) 
  fetch(`http://127.0.0.1:3000/api/v1/jobs?limit=${limit*1}&page=${lastPage}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    let jobs = data.data.jobs
    document.querySelector('tbody').innerHTML = ''
    for (let i =0; i<= jobs.length-1; i++) {
      createTable(jobs, i, lang)
    }
    page = lastPage
    disableButtons()
  }).catch(function(err) {
    console.log("Booo", err);
  });
}
const getFirst = () => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  lastPage = Math.ceil(paginationSelect.children[3].value / limit)
  fetch(`http://127.0.0.1:3000/api/v1/jobs?limit=${limit*1}&page=${firstPage}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    let jobs = data.data.jobs
    document.querySelector('tbody').innerHTML = ''
    for (let i = 0; i <= jobs.length -1; i++) {
      createTable(jobs, i, lang)
    }
    page = firstPage
    disableButtons()
  }).catch(function(err) {
    console.log("Booo", err);
  });
}
const getNext = () => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  lastPage = Math.ceil(paginationSelect.children[3].value / limit)
  page++
  disableButtons()
  fetch(`http://127.0.0.1:3000/api/v1/jobs?limit=${limit*1}&page=${page}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    let jobs = data.data.jobs
    document.querySelector('tbody').innerHTML = ''
    for (let i = 0; i <= jobs.length -1; i++) {
      createTable(jobs, i, lang)
    }

  }).catch(function(err) {
    console.log("Booo", err);
  });
}
const getPrev = () => {
  let limit = document.querySelector('.filter.filters__pagination select').value
  lastPage = Math.ceil(paginationSelect.children[3].value / limit)
  page--
  disableButtons()
  fetch(`http://127.0.0.1:3000/api/v1/jobs?limit=${limit*1}&page=${page}`).then(function(response) {
    return response.json();
  }).then(function(data) {
    let jobs = data.data.jobs
    document.querySelector('tbody').innerHTML = ''
    for (let i = 0; i <= jobs.length -1; i++) {
      createTable(jobs, i, lang)
    }

  }).catch(function(err) {
    console.log("Booo", err);
  });
}

last.addEventListener('click', getLast)
first.addEventListener('click', getFirst)
next.addEventListener('click', getNext)
prev.addEventListener('click', getPrev)
paginationSelect.addEventListener('change', () => {
  limit = document.querySelector('.filter.filters__pagination select').value
  page = Math.ceil(parseInt(document.querySelectorAll('tr')[1].children[0].textContent) / limit)
  fetch(`http://127.0.0.1:3000/api/v1/jobs?limit=${limit*1}&page=${page}`).then(function(response) {
    return response.json();
  }).then(function(data) {

    let jobs = data.data.jobs
    document.querySelector('tbody').innerHTML = ''
    for (let i = 0; i <= jobs.length -1; i++) {
      createTable(jobs, i, lang)
    }
    disableButtons()
  })
})