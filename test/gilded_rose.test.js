const { Shop, Item, BASE_DEGRADATION_RATE } = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  it("should let all items have SellIn property", function () {
    const gildedRose = new Shop([new Item("whatever", 3, 5)]);

    gildedRose.items.forEach((item) =>
      expect(item.numberOfDaysToSell).not.toBe(null)
    );
  });

  it("should let all items have quality property", function () {
    const gildedRose = new Shop([new Item("whatever", 3, 5)]);

    gildedRose.items.forEach((item) => expect(item.value).not.toBe(null));
  });

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

  it("should degrade items that degrade twice as fast when sell date has passed", function () {
    const initialValue = 10;
    const gildedRose = new Shop([new Item("expired", 0, initialValue)]);

    var actualItem = gildedRose.updateValue()[0];

    expect(actualItem.value).toBe(initialValue - 2 * BASE_DEGRADATION_RATE);
  });

  it("should never update an item to have negative value", function () {
    const gildedRose = new Shop([new Item("conjured negative", 0, 3)]);

    const items = gildedRose.updateValue();

    expect(items[0].value).toBe(0);
  });

  it("should increase the value of 'Aged Brie' after each day", function () {
    const initialValue = 4;
    const gildedRose = new Shop([new Item("Aged Brie", 4, initialValue)]);
    const items = gildedRose.updateValue();
    expect(items[0].value > initialValue).toBe(true);
  });

  it("should never let any non-legendary item have value more than 50", function () {
    const maxValueOfNormalItem = 50;
    const gildedRose = new Shop([
      new Item("Aged Brie", 4, maxValueOfNormalItem),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value <= maxValueOfNormalItem).toBe(true);
  });

  it("should never let legendary item decrease in value", function () {
    const valueOfLegendaryItem = 80;
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 4, valueOfLegendaryItem),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value < valueOfLegendaryItem).toBe(false);
  });

  it("should increase the value of 'Backstage passes' after each day before the concert date", function () {
    const initialValue = 10;
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, initialValue),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value > initialValue).toBe(true);
  });

  test.each([
    [6, 2],
    [8, 2],
    [10, 2],
  ])(
    "should increase the value of 'Backstage passes' by 2 when there are 10 days or less but still more than 5 days",
    (numberOfDaysToSell, expectedChangeInValue) => {
      const initialValue = 20;
      const gildedRose = new Shop([
        new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          numberOfDaysToSell,
          initialValue
        ),
      ]);

      const items = gildedRose.updateValue();

      expect(items[0].value).toBe(initialValue + expectedChangeInValue);
    }
  );

  test.each([
    [1, 3],
    [3, 3],
    [5, 3],
  ])(
    "should increase the value of 'Backstage passes' by 3 when there are 5 days or less but still more than 0",
    function (numberOfDaysToSell, expectedChangeInValue) {
      const initialValue = 20;
      const gildedRose = new Shop([
        new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          numberOfDaysToSell,
          initialValue
        ),
      ]);

      const items = gildedRose.updateValue();

      expect(items[0].value).toBe(initialValue + expectedChangeInValue);
    }
  );

  it("should update the value of 'Backstage passes' to zero after the concert date has passed", function () {
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ]);
    const items = gildedRose.updateValue();
    expect(items[0].value).toBe(0);
  });

  it("should degrade items that are 'conjured' at twice the base rate", function () {
    const initialValue = 10;
    const gildedRose = new Shop([new Item("conjured items", 10, initialValue)]);
    var actualItem = gildedRose.updateValue()[0];
    expect(actualItem.value).toBe(initialValue - 2 * BASE_DEGRADATION_RATE);
  });

  it("should degrade normal items that are 'conjured' and are past the sell by date at four times the base rate", () => {
    const initialValue = 10;
    const gildedRose = new Shop([
      new Item("normal expired conjured item", -1, initialValue),
    ]);

    var actualItem = gildedRose.updateValue()[0];

    expect(actualItem.value).toBe(initialValue - 4 * BASE_DEGRADATION_RATE);
  });
});
