const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateValue();
    expect(items[0].name).toBe("foo");
  });

  it("should degrade items that degrade twice as fast when sell date has passed", function () {
    const initialValue = 10;
    const gildedRose = new Shop([new Item("expired", 0, initialValue)]);
    const BASE_DEGRADATION_RATE = 1;

    var actualItem = gildedRose.updateValue()[0];

    expect(actualItem.value).toBe(initialValue - 2 * BASE_DEGRADATION_RATE);
  });

  it("should never update an item to have negative value", function () {
    const gildedRose = new Shop([new Item("never negative", 1, 0)]);

    const items = gildedRose.updateValue();

    expect(items[0].value).toBe(0);
  });

  it("should update backstage passes to have zero value after the concert date has passed", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);

    const items = gildedRose.updateValue();

    expect(items[0].value).toBe(0);
  });

  it("should decrease the number of days to sell by 1 after each day", function () {
    const initialDaysToSell = 4;
    const gildedRose = new Shop([
      new Item("+5 Dexterity Vest", initialDaysToSell, 0),
    ]);

    const items = gildedRose.updateValue();

    expect(items[0].numberOfDaysToSell).toBe(initialDaysToSell - 1);
  });
});
