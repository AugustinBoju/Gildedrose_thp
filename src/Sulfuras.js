var { Item } = require('./Item.js');

class Sulfuras extends Item {
  constructor(name, sellIn, quality){
    super(name, sellIn, quality)
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
    }
  updateQuality(){
    return
  }
}

module.exports = {
  Sulfuras
}
