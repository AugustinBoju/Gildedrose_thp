var { Item } = require('./Item.js');

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateAllQuality() {
    for (var i = 0; i < this.items.length; i++) {
      console.log(this.items[i].name);
      this.items[i].updateQuality()
    }
    return this.items;
  }
}

module.exports = {
  Shop
}
