class Item {
  constructor(name, numberOfDaysToSell, value) {
    this.name = name;
    this.numberOfDaysToSell = numberOfDaysToSell;
    this.value = value;
  }
}

var BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO = 10;
var BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE = 5;
var MAX_ITEM_VALUE = 50;
var MIN_ITEM_VALUE = 0;
const BASE_DEGRADATION_RATE = 1;

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateValue() {
    for (let i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (!this.isItemMoreValuableWithAge(item)) {
        if (item.value > MIN_ITEM_VALUE) {
          if (!this.isLegendaryItem(item)) {
            item.value -= BASE_DEGRADATION_RATE;
          }
        }
      } else {
        if (item.value < MAX_ITEM_VALUE) {
          item.value += BASE_DEGRADATION_RATE;
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            this.addUrgencyValueForBackstageDeadlines(item);
          }
        }
      }
      if (!this.isLegendaryItem(item)) {
        item.numberOfDaysToSell -= 1;
      }
      if (item.numberOfDaysToSell < 0) {
        if (item.name != "Aged Brie") {
          if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
            if (
              this.doesItemStillHaveValue(item) &&
              !this.isLegendaryItem(item)
            ) {
              item.value -= BASE_DEGRADATION_RATE;
            }
          } else {
            item.value = MIN_ITEM_VALUE;
          }
        } else {
          if (item.value < MAX_ITEM_VALUE) {
            item.value += BASE_DEGRADATION_RATE;
          }
        }
      }
    }

    return this.items;
  }

  doesItemStillHaveValue(item) {
    return item.value > MIN_ITEM_VALUE;
  }

  addUrgencyValueForBackstageDeadlines(item) {
    if (
      item.numberOfDaysToSell <=
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO
    ) {
      if (item.value < MAX_ITEM_VALUE) {
        item.value += BASE_DEGRADATION_RATE;
      }
    }
    if (
      item.numberOfDaysToSell <=
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE
    ) {
      if (item.value < MAX_ITEM_VALUE) {
        item.value += BASE_DEGRADATION_RATE;
      }
    }
  }

  isLegendaryItem(item) {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }

  isItemMoreValuableWithAge(item) {
    return (
      item.name == "Aged Brie" ||
      item.name == "Backstage passes to a TAFKAL80ETC concert"
    );
  }
}

module.exports = {
  Item,
  Shop,
  BASE_DEGRADATION_RATE
};
