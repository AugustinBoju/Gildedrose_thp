var { Item } = require('./Item.js');

class Brie extends Item {
  constructor(name, sellIn, quality){
    super(name, sellIn, quality)
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
  updateQuality(){
    this.sellIn --
    if(this.quality > 49 ){
    }else if(this.sellIn < 6){
      this.quality += 3
    }else if(this.sellIn < 11){
      this.quality += 2
    }else{
      this.quality += 1
    }
    this.quality > 49 && (this.quality = 50)
  }
}

module.exports = {
  Brie
}
