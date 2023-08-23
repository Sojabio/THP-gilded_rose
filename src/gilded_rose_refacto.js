class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ObjectsInShop {
  constructor() {
    this.objects = [
      {
        category: "regular",
        items: ["+5 Dexterity Vest", "Elixir of the Mongoose"],
        aging: -1,
      },
      {
        category: "brie",
        items: ["Aged Brie"],
        aging: 1,
      },
      {
        category: "pass",
        items: ["Backstage passes to a TAFKAL80ETC concert"],
        aging: 1,
      },
      {
        category: "sulfura",
        items: ["Sulfuras, Hand of Ragnaros"],
        aging: 0,
      },
      {
        category: "conjured",
        items: ["Conjured Dark Blade", "Conjured Magic Stick", "Conjured Mana Cake"],
        aging: -2,
      },
    ]
  }

  identify(itemName) {
    return this.objects.find((element) => element.items.includes(itemName));
  }
}

class Shop {
  constructor(items = [], objectsInShop = new ObjectsInShop()) {
    this.items = items;
    this.maxQuality = 50;
    this.minQuality = 0;
    this.objectsInShop = objectsInShop;
  }

  updateQuality() {
    this.items.forEach((item) => {
      let itemType = this.objectsInShop.identify(item.name);
        if (itemType.category !== "pass") this.decay(item, itemType)
        this.stopMin(item)
        if (itemType.category === "brie") this.dropAfterConcert(item)
        if (itemType.category === "pass") this.handlePass(item, itemType)
        if (itemType.category !== "sulfura") this.stopMax(item)
      });
  }

  decay(item, itemType) {
    if (item.sellIn < 5 && itemType.category === "regular") {
    item.sellIn--;
    item.quality += (itemType.aging)*2;
    } else {
      item.sellIn--;
      item.quality += itemType.aging;
    }
  }

  stopMax(item){
    if (item.quality > this.maxQuality) {
      item.quality = this.maxQuality;
    }
  }

  stopMin(item) {
    if (item.quality < this.minQuality) {
      item.quality = this.minQuality;
    }
  }

  dropAfterConcert(item){
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }

  handlePass(item, itemType){
    item.sellIn--;
    if (item.sellIn > 10 ) item.quality += itemType.aging
    if (item.sellIn > 6 && item.sellIn < 10) item.quality += (itemType.aging) +1
    if (item.sellIn >= 0 && item.sellIn < 6) item.quality += (itemType.aging) + 2
    this.dropAfterConcert(item);
  }
}

module.exports = {
  Item,
  ObjectsInShop,
  Shop
};
