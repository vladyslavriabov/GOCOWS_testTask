class casinoCard extends HTMLElement {
    constructor() {
      super()
      this.name = ''
      this.isNew = false
      this.country = ''
      this.rating = 0
      this.ratingStars=''
      this.icon = ''
      this.bonusCodes = ''
    } 
    connectedCallback() { 
      this.name = this.getAttribute("name")
      this.country = this.getAttribute("country")
      this.rating = this.getAttribute("rating")
      for ( let i=1;i<=5;i++){
        if(i<this.rating) { this.ratingStars+='<img src="/img/rating_star-enabled.svg" alt="star"></img>'}
        else{this.ratingStars+='<img src="/img/rating_star-unable.svg" alt="star">'}
      } 
      JSON.parse(this.getAttribute('bonusCodes')).forEach(item => {       
        this.bonusCodes+=`<button data-code='${item.code}' data-casino='${this.name}'>${item.name}</button>`
      })
      this.isNew = /^true$/i.test(this.getAttribute("isNew") )
      this.icon = this.getAttribute("icon")
      this.render() 
    }
    render() {
      this.innerHTML = `
      <div class="casino">
      <img src="/img/casino/${this.icon}" alt="ac_casino" class="casino__image">
     <div class="casino__content">
      <div class="casino__info">
      ${this.isNew ? '<span class="casino__tag-new">NEW</span>':''}
          <a href="#" class="casino__name">${this.name} Review</a>
          
          <div class="casino__rating">
              <div class="casino__flag">
                  <img src="/img/countries/${this.country}.png">
              </div>
              <span>${this.rating}</span>
              <div class="casino__rating-stars">             
              ${this.ratingStars}
              </div>
          </div>
      </div>
      <div class="casino__bonus-codes">
          ${this.bonusCodes}
      </div>
      </div>
      <a href="#" class="casino__link">VISIT</a>
  </div>
        `
    }}
 window.customElements.define("casino-card", casinoCard)