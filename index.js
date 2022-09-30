const themeOptions = document.getElementsByClassName('themeOption')
const toggleBtn = document.getElementById('toggleBtn')
const s = document.getElementById('calc__screen')
const keys = document.getElementsByClassName('calc__key')
const arr =['*','/','+','-']
s.value = 0
let sign
let res 

for(const option of themeOptions){
    option.addEventListener('click', toggleTheme)
}

toggleBtn.addEventListener('click', btnToggleTheme)

for(const key of keys){
    key.addEventListener('click', getKey)
}

function setTheme(themeOption){
    localStorage.setItem('theme', themeOption)
    document.documentElement.className = themeOption
}

function btnToggleTheme(){
    document.documentElement.className == 'theme1' ? setTheme('theme2') 
    :document.documentElement.className == 'theme2' ? setTheme('theme3')
    :document.documentElement.className == 'theme3' && setTheme('theme1')
}


function toggleTheme(){
    const theme = `theme${this.innerHTML}`
    localStorage.getItem('theme') != theme && setTheme(theme)                           
}

function getKey(){ 
    
     this.innerHTML == 'DEL' ? s.value = (s.value.length == 1 ? 0 : s.value.slice(0, s.value.length-1))
    :this.innerHTML == 'RESET' ? s.value = 0
    :this.innerHTML == '.' ? (s.value.includes('.') ? s.value.slice(s.value.lastIndexOf('.')).search(/[-+*/]/) > -1 && s.value.slice(-1).search(/[-+*/]/) < 0 && (s.value += this.innerHTML ) : s.value.split('')[0] != void(0) && s.value.slice(-1) !='.' && s.value.slice(-1).search(/[-+*/]/) < 0 && s.value != res  && (s.value += this.innerHTML))
    :this.innerHTML == '=' ? s.value =  res = s.value.split(sign).map(Number).reduce((a,c)=> sign == '+' ? a+= c
    : sign == '-' ? a -= c
    : sign == '*' ? a *= c
    : a /= c)
    :!arr.includes(this.innerHTML) ? (s.value.length == 1 && s.value.split('')[0] == '0' || s.value == res ? (res = 0, s.value = this.innerHTML) : s.value += this.innerHTML)
    :s.value.length < 1 ? s.value 
    :arr.includes(s.value.charAt(s.value.length-1)) ? s.value = s.value.slice(0, s.value.length-1)+(sign = this.innerHTML)
    :s.value.search(/[+,-,*,/]/) ? s.value =  s.value.split(sign).map(Number).reduce((a,c)=> sign == '+' ? a += c
    : sign == '-' ? a -= c
    : sign == '*' ? a *= c
    : a /= c)+''.concat(sign = this.innerHTML)
    :s.value += sign = this.innerHTML  
     
}




