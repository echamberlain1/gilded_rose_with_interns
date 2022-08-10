class Item 
{
  constructor(name, numberOfDaysToSell, value) 
  {
    this.name = name;
    this.numberOfDaysToSell = numberOfDaysToSell;
    this.value = value;
  }
}

const BASE_VALUE_CHANGE_RATE = -1;

var BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO = 10;
var BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE = 5;
var MAX_ITEM_VALUE = 50;
var MIN_ITEM_VALUE = 0;

class Shop 
{
  constructor(items = []) 
  {
    this.items = items;
  }

  updateItems() 
  {
    for (let i = 0; i < this.items.length; i++) 
    {
    var item = this.items[i];
    this.changeItemValue(item);
    item.numberOfDaysToSell -= 1;
    this.items[i] = item;
    }

    return this.items;
  }


  isLegendaryItem(item) 
  {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }

  isConjuredItem(item) 
  {
    return item.name.toLowerCase().includes("conjured");
  }

  isItemMoreValuableWithAge(item) 
  {
    return (
      item.name == "Aged Brie" ||
      item.name == "Backstage passes to a TAFKAL80ETC concert"
    );
  }

  changeItemValue(item) {
    var changeRate = this.determineValueChangeRate(item);
    item.value += changeRate;

    if (item.value > MAX_ITEM_VALUE && !this.isLegendaryItem(item)) {
      item.value = MAX_ITEM_VALUE;
    }

    if (item.value < MIN_ITEM_VALUE) {
      item.value = MIN_ITEM_VALUE;
    }

    if (item.numberOfDaysToSell < 0 && item.name == "Backstage passes to a TAFKAL80ETC concert") {
      item.value = MIN_ITEM_VALUE;
    }
  }

  determineValueChangeRate(item) {
    var rate = BASE_VALUE_CHANGE_RATE;

    if (this.isConjuredItem(item)){
      rate *= 2;
    }
    if (this.isItemMoreValuableWithAge(item)){
      rate *= -1;
    }
    if (item.numberOfDaysToSell < 0 && !this.isItemMoreValuableWithAge(item)) {
      rate *= 2;
    }

    if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
      if (item.numberOfDaysToSell <= BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO) {
        rate -= BASE_VALUE_CHANGE_RATE;
      }

      if (item.numberOfDaysToSell <= BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE) {
        rate -= BASE_VALUE_CHANGE_RATE;
      }
    }

    if (this.isLegendaryItem(item)){
      rate = 0;
    }

    return rate;
  }


}

module.exports = {
  Item,
  Shop,
  BASE_VALUE_CHANGE_RATE,
};
