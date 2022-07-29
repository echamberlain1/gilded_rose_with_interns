const { Shop, Item } = require("../src/gilded_rose");

describe("Gilded Rose", function () {

  // - All items have a SellIn value which denotes the number of days we have to sell the item
  it("should let all items have SellIn property", function () {
    const gildedRose = new Shop([new Item("whatever", 3, 5)]);

    gildedRose.items.forEach((item) => expect(item.numberOfDaysToSell).not.toBe(null));
  });

  // - All items have a Quality value which denotes how valuable the item is
  it("should let all items have quality property", function () {
    const gildedRose = new Shop([new Item("whatever", 3, 5)]);

    gildedRose.items.forEach((item) => expect(item.value).not.toBe(null));
  });

  // - At the end of each day our system lowers both values for every item
  it("should decrease the number of days to sell by 1 after each day", function () {
    const initialDaysToSell = 4;
    const gildedRose = new Shop([
      new Item("+5 Dexterity Vest", initialDaysToSell, 0),
    ]);

    const items = gildedRose.updateValue();

    expect(items[0].numberOfDaysToSell).toBe(initialDaysToSell - 1);
  });

  it("should decrease the number of days to sell to a negative number", function () {
    const initialDaysToSell = 1;
    const gildedRose = new Shop([
      new Item("+5 Dexterity Vest", initialDaysToSell, 0),
    ]);

    var items = gildedRose.updateValue();
    items = gildedRose.updateValue();

    expect(items[0].numberOfDaysToSell < 0).toBe(true);
  });

  it("should decrease the value of normal items by 1 after each day", function () {
    const gildedRose = new Shop([new Item("foo", 5, 5)]);

    const items = gildedRose.updateValue();

    expect(items[0].value).toBe(4);
  });

  // - Once the sell by date has passed, Quality degrades twice as fast
  it("should degrade items that degrade twice as fast when sell date has passed", function () {
    const initialValue = 10;
    const gildedRose = new Shop([new Item("expired", 0, initialValue)]);
    const BASE_DEGRADATION_RATE = 1;

    var actualItem = gildedRose.updateValue()[0];

    expect(actualItem.value).toBe(initialValue - 2 * BASE_DEGRADATION_RATE);
  });

  // - The Quality of an item is never negative
  it("should never update an item to have negative value", function () {
    const gildedRose = new Shop([new Item("never negative", 1, 0)]);

    const items = gildedRose.updateValue();

    expect(items[0].value).toBe(0);
  });

  // - "Aged Brie" actually increases in Quality the older it gets
  // Creator: Sanchez
  it("should increase the value of 'Aged Brie' after each day", function () {
    const initialValue = 4;
    const gildedRose = new Shop([
      new Item("Aged Brie", 4, initialValue),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value > initialValue).toBe(true);
  });

  // - The Quality of an item is never more than 50
  // creator: Sanchez
  it("should never let any non-legendary item have value more than 50", function () {
    const maxValueOfNormalItem = 50;
    const currentValue = 50;
    const gildedRose = new Shop([
      new Item("Aged Brie", 4, currentValue),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value <= maxValueOfNormalItem).toBe(true);
  });

  // - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
  // Creator: Sanchez
  it("should never let legendary item decrease in Quality", function () {
    const valueOfLegendaryItem = 80;
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 4, valueOfLegendaryItem),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value < valueOfLegendaryItem).toBe(false);
  });

  /*  - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
	    Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
      Quality drops to 0 after the concert */
  // Creator: Sanchez
  it("should increase the value of 'Backstage passes' after each day before the concert date", function () {
    const initialValue = 10;
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, initialValue),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value > initialValue).toBe(true);
  });

  // Creator: Sanchez
  it("should increase the value of 'Backstage passes' by 2 when there are 10 days or less but still more than 5 days", function () {
    const initialValue = 20;
    // for testing boundary condition
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, initialValue),
      new Item("Backstage passes to a TAFKAL80ETC concert", 8, initialValue),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, initialValue),
    ]);
    const items = gildedRose.updateValue();
    gildedRose.items.forEach((item) => expect(item.value).toBe(initialValue + 2));
  });

  // Creator: Sanchez
  it("should increase the value of 'Backstage passes' by 3 when there are 5 days or less but still more than 0", function () {
    const initialValue = 20;
    // for testing boundary condition
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 1, initialValue),
      new Item("Backstage passes to a TAFKAL80ETC concert", 3, initialValue),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, initialValue),
    ]);
    const items = gildedRose.updateValue();
    gildedRose.items.forEach((item) => expect(item.value).toBe(initialValue + 3));
  });

  it("should update the value of 'Backstage passes' to zero after the concert date has passed", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value).toBe(0);
  });

  /*
  // - "Conjured" items degrade in Quality twice as fast as normal items
  // Creator: Sanchez
  // HAVEN'T IMPLEMENTED, SHOULD FAIL DON'T RUN
  it("should degrade items that degrade twice as fast when items are 'conjured'", function () {
    const initialValue = 10;
    const gildedRose = new Shop([new Item("conjured items", 10, initialValue)]);
    const BASE_DEGRADATION_RATE = 1;
    var actualItem = gildedRose.updateValue()[0];
    expect(actualItem.value).toBe(initialValue - 2 * BASE_DEGRADATION_RATE);
  });
  */

});
