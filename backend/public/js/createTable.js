const createTd = (name, val) =>{
  let td = document.createElement('td')
  td.className = name
  td.innerHTML = val
  return td
}
export default function createTable(jobs, i){
    let tr = document.createElement('tr')
    let index = createTd('#', i + 1)
    let icon = createTd('icon', '#')
    let jobName = createTd('job', jobs[i].job)
    let rar = document.createElement("td")
    rar.className= 'Rarity'
    for (let ind = 1; ind <= 5; ind++) {
      if (ind <= jobs[i].rarity) {

        let img = document.createElement('img')
        img.className = 'star'
        img.alt = 'star'
        img.src = '../img/events/starColor1.png'
        img.width = 25
        rar.append(img)
      }
    }
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
