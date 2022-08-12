const { Shop, Item } = require("../src/gilded_rose");

var testItems = () => [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Aged Brie", 0, 50),
  new Item("Aged Brie", -5, 10),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
  new Item("Conjured Mana Cake", 3, 6),
  new Item("Conjured expired item", -2, 30),
  new Item("normal unexpired item", 5, 5),
  new Item("normal nearly expired item", 0, 5),
  new Item("normal expired item", -3, 5),
  new Item("worthless item", 4, 0),
];

const testShop = new Shop(testItems);
module.exports = { testItems, testShop };
