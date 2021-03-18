
const form = document.querySelector('form')

function regxpText(e) {
    e.preventDefault()
    let str = document.querySelector('textarea').value;
    let regexpAllPoints = new RegExp('\'', 'gm');
    let regexpReturnApostroph = /\b\"\b/gm;
    let newstr = str.replace(regexpAllPoints, '"');
    newstr = newstr.replace(regexpReturnApostroph, '\'');
    document.getElementById('output').innerHTML = newstr;

}
form.addEventListener("submit", regxpText);

