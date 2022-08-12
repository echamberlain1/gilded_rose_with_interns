const {
  Shop,
  Item,
  BASE_VALUE_CHANGE_RATE,
  MAX_ITEM_VALUE,
  MIN_ITEM_VALUE,
} = require("../src/gilded_rose");
var { testItems } = require("../test/texttest_fixture");

describe("Gilded Rose", function () {
  let shop;
  beforeEach(() => {
    shop = new Shop(testItems());
  });

  it("should let all items have SellIn property", function () {
    shop.items.forEach((item) =>
      expect(item.numberOfDaysToSell).not.toBe(null)
    );
  });

  it("should let all items have quality property", function () {
    shop.items.forEach((item) => expect(item.value).not.toBe(null));
  });

  it("should decrease the number of days to sell by 1 after each day", function () {
    shop.items.forEach((item) => {
      var initialDaysToSell = item.numberOfDaysToSell;
      shop.updateItems();
      expect(item.numberOfDaysToSell).toBe(initialDaysToSell - 1);
    });
  });

  it("should decrease the number of days to sell to a negative number", function () {
    shop.items.forEach((item) => {
      if (item.numberOfDaysToSell == 0) {
        shop.updateItems();
        expect(item.numberOfDaysToSell < 0).toBe(true);
      }
    });
  });

  it("should decrease the value of normal items by 1 after each day", function () {
    shop.items.forEach((item) => {
      if (shop.isNormalItem(item) && !shop.isExpiredItem(item)) {
        var initialValue = item.value;
        shop.updateItems();
        expect(item.value).toBe(initialValue + BASE_VALUE_CHANGE_RATE);
      }
    });
  });

  it("should degrade normal items twice as fast when sell date has passed", function () {
    var initialValues = {};
    shop.items.forEach((item) => {
      if (shop.isNormalItem(item) && shop.isExpiredItem(item)) {
        initialValues[item.name] = item.value;
      }
    });

    shop.updateItems();

    shop.items.forEach((item) => {
      if ([item.name] in initialValues) {
        expect(
          item.value == initialValues[item.name] + 2 * BASE_VALUE_CHANGE_RATE
        ).toBe(true);
      }
    });
  });

  it("should never update an item to below the min value", function () {
    shop.items.forEach((item) => {
      shop.updateItems();
      expect(item.value >= MIN_ITEM_VALUE).toBe(true);
    });
  });

  it("should increase the value of 'Aged Brie' after each day", function () {
    shop.items.forEach((item) => {
      if (item.name == "Aged Brie") {
        initialValue = item.value;
        shop.updateItems();
        expect(
          item.value == initialValue - BASE_VALUE_CHANGE_RATE ||
            item.value == MAX_ITEM_VALUE
        ).toBe(true);
      }
    });
  });

  it("should never let any non-legendary item have value more the maximum value", function () {
    shop.items.forEach((item) => {
      if (!shop.isLegendaryItem(item)) {
        expect(item.value <= MAX_ITEM_VALUE).toBe(true);
      }
    });
  });

  it("should never let legendary item decrease in value", function () {
    shop.items.forEach((item) => {
      if (shop.isLegendaryItem(item)) {
        initialValue = item.value;
        shop.updateItems();
        expect(item.value).toBe(initialValue);
      }
    });
  });

  it("should increase the value of 'Backstage passes' after each day before the concert date", function () {
    shop.items.forEach((item) => {
      if (
        item.name == "Backstage passes to a TAFKAL80ETC concert" &&
        !shop.isExpiredItem(item)
      ) {
        initialValue = item.value;
        shop.updateItems();
        expect(item.value > initialValue).toBe(true);
      }
    });
  });

  it("should increase the value of 'Backstage passes' by 2 when there are 10 days or less but still more than 5 days", function () {
    shop.items.forEach((item) => {
      if (
        item.name == "Backstage passes to a TAFKAL80ETC concert" &&
        item.numberOfDaysToSell <= 10 &&
        item.numberOfDaysToSell > 5
      ) {
        initialValue = item.value;
        shop.updateItems();
        expect(item.value == initialValue + 2 * BASE_VALUE_CHANGE_RATE).toBe(
          true
        );
      }
    });
  });

  it("should increase the value of 'Backstage passes' by 3 when there are 5 days or less but still more than 0", function () {
    shop.items.forEach((item) => {
      if (
        item.name == "Backstage passes to a TAFKAL80ETC concert" &&
        item.numberOfDaysToSell <= 5 &&
        item.numberOfDaysToSell > 0
      ) {
        initialValue = item.value;
        shop.updateItems();
        expect(item.value == initialValue + 3 * BASE_VALUE_CHANGE_RATE).toBe(
          true
        );
      }
    });
  });

  it("should update the value of 'Backstage passes' to minimum value after the concert date has passed", function () {
    shop.items.forEach((item) => {
      if (
        item.name == "Backstage passes to a TAFKAL80ETC concert" &&
        shop.isExpiredItem(item)
      ) {
        shop.updateItems();
        expect(item.value).toBe(MIN_ITEM_VALUE);
      }
    });
  });

  it("should degrade items that are 'conjured' at twice the base rate", function () {
    shop.items.forEach((item) => {
      if (shop.isConjuredItem(item)) {
        initialValue = item.value;
        shop.updateItems();
        expect(
          item.value == initialValue + 2 * BASE_VALUE_CHANGE_RATE ||
            item.value == MIN_ITEM_VALUE
        ).toBe(true);
      }
    });
  });

  it("should degrade items that are 'conjured' and are past the sell by date at four times the base rate", () => {
    shop.items.forEach((item) => {
      if (shop.isConjuredItem(item) && shop.isExpiredItem(item)) {
        initialValue = item.value;
        shop.updateItems();
        expect(
          item.value == initialValue + 4 * BASE_VALUE_CHANGE_RATE ||
            item.value == MIN_ITEM_VALUE
        ).toBe(true);
      }
    });
  });
});
