var { Shop } = require('../src/Shop.js');
var { Item } = require('../src/Item.js');
var { Brie } = require('../src/Brie.js');
var { Backstage } = require('../src/Backstage.js');
var { Sulfuras } = require('../src/Sulfuras.js');



describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisser de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 }
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 1 pour Aged Brie et Backstage passes", function () {
    listItems.push(new Brie("Aged Brie", 20, 30));
    listItems.push(new Backstage("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmenter la qualité de 3 pour Aged Brie et Backstage passes quand il reste 5 jours ou moins", function () {
    listItems.push(new Brie("Aged Brie", 2, 25));
    listItems.push(new Backstage("Backstage passes to a TAFKAL80ETC concert", 4, 4));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: 1, quality: 28 },
      { sellIn: 3, quality: 7 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Sulfuras reste toujours à 80 de qualité", function () {
    listItems.push(new Sulfuras("Sulfuras, Hand of Ragnaros", 4, 80));
    listItems.push(new Sulfuras("Sulfuras, Hand of Ragnaros", 20, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: 4, quality: 80 },
      { sellIn: 20, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Après la date de péremption, qualité baisse de 2", function () {
    listItems.push(new Item("item01", 0, 50));
    listItems.push(new Item("item02", -5, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: -1, quality: 48 },
      { sellIn: -6, quality: 8 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Les objets Conjured se dégradent 2 fois plus vite", function () {
    listItems.push(new Item("Conjured1", 5, 50));
    listItems.push(new Item("Conjured2", -1, 10));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: 4, quality: 49 },
      { sellIn: -2, quality: 8 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité ne pas être négative", function () {
    listItems.push(new Item("item1", -5, 1));
    listItems.push(new Item("item2", 5, 0));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: -6, quality: 0 },
      { sellIn: 4, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("La qualité ne pas supérieur à 50", function () {
    listItems.push(new Brie("item3", 2, 50));
    listItems.push(new Backstage("item4", 5, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: 1, quality: 50 },
      { sellIn: 4, quality: 50 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Après le concert la qualité de Backstage passe à 0", function () {
    listItems.push(new Backstage("backstage", 0, 50));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateAllQuality();

    var expected = [
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
    });
  });
});
