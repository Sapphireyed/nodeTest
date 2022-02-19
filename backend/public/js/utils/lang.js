// SET / GET lang value cookie
export let lang = sessionStorage.getItem("lang");

const langEl = document.querySelector('.lang select');
lang = lang ? lang : langEl.value
langEl.value = lang

langEl.addEventListener('change', () => {
  lang = langEl.value

  sessionStorage.setItem("lang", lang);
  window.location.href = `http://127.0.0.1:3000/jobs/${lang}`
  //document.location.reload(true)
})
 