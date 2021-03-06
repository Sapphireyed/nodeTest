import { resetFilters, searchSwitch } from './utils/filtersFunc.js';
import { sort } from './utils/sort.js';

// Set all filters to value All
Array.from(document.querySelectorAll('.filters__filters select')).map(filter => filter.value = 'All')
Array.from(document.querySelectorAll('.filters__filters select'))[6].value = 'Both'

// make only 10 first rows visible on first load
const allRows = Array.from(document.querySelectorAll('tbody tr'))
allRows.map((row, i) => {
  if (i >= 10) {
    row.classList.add('d-none')
  }
})

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
    sort('hp', 'jobs')
})
attrButtons[1].addEventListener('click', () => {
  sort('strength', 'jobs')
})
attrButtons[2].addEventListener('click', () => {
  sort('agility', 'jobs')
})
attrButtons[3].addEventListener('click', () => {
  sort('intelligence', 'jobs')
})
attrButtons[4].addEventListener('click', () => {
  sort('index', 'jobs')
})
attrButtons[5].addEventListener('click', () => {
  sort('rarity', 'jobs')
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
// quest=rawe ucho - vid, lewe - next img
// ***
// next=img_title2
// ***
// next=vid_title1
// ###
// slide=vid#vid_title1
// quest=gora -wroc, dol - next img
// ***
// next=img_title1
// ***
// next=img_title2
// ###
// slide=img#img_title2
// quest=wroc do poczatku
// ***
// next=img_title1

