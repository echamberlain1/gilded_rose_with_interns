const { Shop, Item, BASE_VALUE_CHANGE_RATE } = require("../src/gilded_rose");
var { testItems, testShop } = require("../test/texttest_fixture");


describe("Gilded Rose", function () {

  const testShop = new Shop(testItems);
  
  it("should let all items have SellIn property", function () {
    var shop = testShop;
    shop.items.forEach((item) =>
      expect(item.numberOfDaysToSell).not.toBe(null)
    );
  });

  it("should let all items have quality property", function () {
    var shop = testShop;
    shop.items.forEach((item) => expect(item.value).not.toBe(null));
  });

  it("should decrease the number of days to sell by 1 after each day", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      var initialDaysToSell = item.numberOfDaysToSell;
      shop.updateItems();
      expect(item.numberOfDaysToSell).toBe(initialDaysToSell - 1);
    });
  });

  it("should decrease the number of days to sell to a negative number", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      if (item.numberOfDaysToSell == 0) 
      {
        shop.updateItems();
        expect(item.numberOfDaysToSell < 0).toBe(true);
      }
    });
  });

  it("should decrease the value of normal items by 1 after each day", function () {
    var shop = testShop;
     shop.items.forEach((item) => {
      if (shop.isNormalItem(item)) 
      {
        var initialValue = item.value;
        shop.updateItems();
        expect(item.value).toBe(initialValue - 1);
      }
     });
  });

  it("should degrade normal items twice as fast when sell date has passed", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      if (shop.isNormalItem(item) && item.numberOfDaysToSell < 0)
      {
        var initialValue = item.value;
        shop.updateItems();
        expect(item.value).toBe(initialValue - 2);
      }
    });
  });

  it("should never update an item to have negative value", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      shop.updateItems();
      expect(item.value >= 0 ).toBe(true);
    });
  });

  it("should increase the value of 'Aged Brie' after each day", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      if (item.name == "Aged Brie") 
      {
        initialValue = item.value;
        shop.updateItems();
        expect(item.value).toBe(initialValue - BASE_VALUE_CHANGE_RATE);
      }
    });
  });

  it("should never let any non-legendary item have value more than 50", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      if (!shop.isLegendaryItem(item)) 
      {
        expect(item.value <= 50).toBe(true);
      }
    });
  });

  it("should never let legendary item decrease in value", function () { 
    var shop = testShop;
    shop.items.forEach((item) => {
      if (shop.isLegendaryItem(item)) 
      {
        initialValue = item.value;
        shop.updateItems();
        expect(item.value).toBe(initialValue);
      }
    });
  });

//REFACTOR THIS; MAY TAKE A WHILE
  it("should increase the value of 'Backstage passes' after each day before the concert date", function () { 
    const initialValue = 10;
    const gildedRose = new Shop([
      new Item("Backstage passes to a TAFKAL80ETC concert", 4, initialValue),
    ]);
    const items = gildedRose.updateItems();
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

      const items = gildedRose.updateItems();

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

      const items = gildedRose.updateItems();

      expect(items[0].value).toBe(initialValue + expectedChangeInValue);
    }
  );

  it("should update the value of 'Backstage passes' to zero after the concert date has passed", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      if (item.name == "Backstage passes to a TAFKAL80ETC concert" && item.numberOfDaysToSell < 0) 
      {
        shop.updateItems();
        expect(item.value).toBe(0);
      }
    });
  });

  it("should degrade items that are 'conjured' at twice the base rate", function () {
    var shop = testShop;
    shop.items.forEach((item) => {
      if (shop.isConjuredItem(item)) 
      {
        initialValue = item.value;
        shop.updateItems();
        expect((item.value == initialValue + 2*BASE_VALUE_CHANGE_RATE) || item.value == 0).toBe(true);
      }
    });
  });

  it("should degrade normal items that are 'conjured' and are past the sell by date at four times the base rate", () => {
    var shop = testShop;
    shop.items.forEach((item) => {
      if (shop.isNormalItem(item) && shop.isConjuredItem(item) && item.numberOfDaysToSell < 0) 
      {
        initialValue = item.value;
        shop.updateItems();
        expect((item.value == initialValue + 4*BASE_VALUE_CHANGE_RATE) || item.value == 0).toBe(true);
      }
    });
  });

});
