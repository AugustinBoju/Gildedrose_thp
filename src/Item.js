class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  qualityCalcul(number){
    this.sellIn --
    if(this.quality < 1 ){
    }else if(this.sellIn < 1 && this.quality > 1){
      this.quality -= (2*number)
    }else{
      this.quality -= (1*number)
    }
  }
  updateQuality(){
    if(this.name.split(' ')[0] === "Conjured"){
      this.qualityCalcul(2)
    }else{
      this.qualityCalcul(1)
    }
  }
}

module.exports = {
  Item
}
