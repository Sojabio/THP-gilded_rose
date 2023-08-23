const { Shop, Item, ObjectsInShop } = require('../src/gilded_rose_refacto.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Elixir of the Mongoose", 5, 7),
      // This Conjured item does not work properly yet
      // new Item("Conjured Mana Cake", 3, 6),
    ];


    const days = Number(process.argv[2]) || 2;;
    const gildedRose = new Shop(items);

    for (let day = 0; day < days; day++) {
      console.log(`\n-------- day ${day} --------`);
      console.log("name, sellIn, quality");
      items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
      gildedRose.updateQuality();
    }
  });

  //TEST3
  it("la qualité d'un item normal diminue de 1 tous les jours avant sa date de péremption", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 7)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(6);
  });


});
