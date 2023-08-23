const {Shop, Item} = require('../src/gilded_rose_refacto.js');

describe("Gilded Rose", function() {

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
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

  /// !!! PENSER A AJOUTER PLUSIEURS ITEMS A CHAQUE TEST //

  //TEST1 REFACTOK
  it("la qualité augmente de 3 quand il reste 5 jours ou moins pour les Backstage passes", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(42);
  });

  //TEST2 REFACTOK
  it("la qualité de sulfuras ne se modifie jamais", function() {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(80);
  });

  //TEST3 REFACTOK
  it("la qualité d'un item normal diminue de 1 tous les jours avant sa date de péremption", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 5, 7)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(6);
  });

  //TEST4 //REFACTOK
  it("la vitesse de dégradation d'un item double après sa date de péremption", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 0, 7)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(5);
  });

  //TEST5 //REFACTOK
  it("la qualité n'est jamais négative", function() {
    const gildedRose = new Shop([new Item("Elixir of the Mongoose", 2, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).not.toBeLessThan(0);
  });

  //TEST6 REFACTOK
  it("la qualité n'est jamais supérieure à 50 sauf pour Sulfura", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).not.toBeGreaterThan(50);
  });

  //TEST7
  it("la qualité augmente de 2 quand il reste entre 10 et 5 jours pour les Backstage passes", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 9, 39)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(41);
  });

  //TEST8
  it("la qualité tombe à zéro après le concert (jour 0) pour Backstage passes", function() {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 39)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(0);
  });

  //TEST9 REFACTOK
  it("Aged Brie augmente sa qualité avec le temps", function() {
    const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(1);
  });

  //TEST10 CONJURED
  it("La qualité des éléments conjured diminuent de 2 points par jour", function() {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 2, 4)]);
    gildedRose.updateQuality();
    expect(gildedRose.items[0].quality).toBe(2);
  });


});
