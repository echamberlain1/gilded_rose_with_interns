const { Shop, Item, BASE_DEGRADATION_RATE } = require("../src/gilded_rose");
var { gildedRose } = require("../test/texttest_fixture");


describe("Gilded Rose", function () {
  it("should degrade items that degrade twice as fast when sell date has passed", function () {
    const initialValue = 10;
    gildedRose.items.unshift(new Item("expired", 0, initialValue));
    const items = gildedRose.updateValue();
    expect(items[0].value).toBe(initialValue - 2 * BASE_DEGRADATION_RATE);
  });

  it("should never update an item to have negative value", function () {
    gildedRose.items.unshift(new Item("never negative", 1, 0));
    const items = gildedRose.updateValue();
    expect(items[0].value).toBe(0);
  });

  it("should increase quality of 'Aged Brie' daily", function () {
    const initialValue = gildedRose.items.at(gildedRose.items.indexOf("Aged Brie")).value;
    console.log(gildedRose.items.at(gildedRose.items.indexOf("Aged Brie")));
    const items = gildedRose.updateValue();
    console.log(items.at(items.indexOf("Aged Brie")));
    console.log(items);
    expect(items.at(items.indexOf("Aged Brie")).value).toBe(initialValue + BASE_DEGRADATION_RATE);
  });

  it("should cap normal items' values at 50", function () {
    const items = gildedRose.updateValue();
    items.forEach((item) => 
    {
      if(!gildedRose.isLegendaryItem(item))
      {
        expect(item.value <= 50).toBe(true);
      }
    })
  });

  it("should update backstage passes to have zero value after the concert date has passed", function () {
    gildedRose.items.unshift(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20));
    const items = gildedRose.updateValue();
    expect(items[0].value).toBe(0);
  });

  it("should decrease the number of days to sell by 1 after each day", function () {
    const initialDaysToSell = 5;
    gildedRose.items.unshift(new Item("+5 Dexterity Vest", initialDaysToSell, 0));
    const items = gildedRose.updateValue();
    expect(items[0].numberOfDaysToSell).toBe(initialDaysToSell - 1);
  });

  it("should decrease the number of days to sell to a negative number", function () {
    const initialDaysToSell = 0;
    gildedRose.items.unshift(new Item("+5 Dexterity Vest", initialDaysToSell, 0));
    const items = gildedRose.updateValue();
    expect(items[0].numberOfDaysToSell < 0).toBe(true);
  });

  it("all items should have quality", function () {
    gildedRose.items.forEach((item) => expect(item.value).not.toBe(null));
  });

  it("should decrease the value of normal items by 1 after each day", function () {
    const items = gildedRose.updateValue();
    
    expect(items[0].value).toBe(4);
  });

  
});

