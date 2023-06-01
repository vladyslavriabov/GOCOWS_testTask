//variables
const casinosListMutated = [...casinosList]
const bonusCodes = document.querySelectorAll('.casino__bonus-codes button');
const popupBonusCode = document.querySelector('.popup-bonuscode');
const popupCodeCopied = document.querySelector('.popup-codecopied');
const allCasinos = document.querySelector('.all-casinos');
const loadMore = document.querySelector('.load_more');
const firtGenCasinos = casinosListMutated.splice(0, 4)
//casino items generate
const generateCasinoItem = (item) => {
  const casino = document.createElement("casino-card")
  casino.setAttribute ('name',item.name) 
  casino.setAttribute ('country',item.country) 
  casino.setAttribute ('icon',item.icon) 
  casino.setAttribute ('rating',item.rating) 
  casino.setAttribute ('isNew',item.isNew) 
  casino.setAttribute ('bonusCodes',JSON.stringify(item.bonusCodes)) 
  allCasinos.appendChild(casino)
}
firtGenCasinos.forEach((item)=>{
  generateCasinoItem(item)
}) 

const closePopups = () => {
  popupBonusCode.classList.remove('popup-bonuscode_active');
  popupCodeCopied.classList.remove('popup-codecopied_active');
 }

//close popup bonus code
 document.querySelector('.popup__button-close').addEventListener('click',closePopups)

 //function copy bonus code
 const copyContent = async (event) => {
   try {
     await navigator.clipboard.writeText(event.target.innerHTML);
     popupCodeCopied.classList.add('popup-codecopied_active');
   } catch (err) {
    alert('Failed to copy')
    console.error('Failed to copy: ', err);
   }
 }

//open the popup
 document.addEventListener("click",(event)=>{
  const target = event.target
  if(!target.matches(".casino__bonus-codes button")) return
  closePopups() 
  const { width, height,x,y } = target.getBoundingClientRect();
  popupBonusCode.classList.add('popup-bonuscode_active');
  popupBonusCode.style.left = `${x-popupBonusCode.offsetWidth/2+width/2}px`;
  popupBonusCode.style.top = `${y+height+12+ document.documentElement.scrollTop}px`;
  popupBonusCode.querySelector('.popup__name').innerHTML = `${target.dataset.casino}`
  popupBonusCode.querySelector('.popup__button-copycode').innerHTML = `${target.dataset.code}`
});

loadMore.addEventListener("click",(event)=>{
  casinosListMutated.forEach((item)=>{
    generateCasinoItem(item)
  }) 
  loadMore.remove();
})

