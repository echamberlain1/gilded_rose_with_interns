class Item {
  constructor(name, numberOfDaysToSell, value) {
    this.name = name;
    this.numberOfDaysToSell = numberOfDaysToSell;
    this.value = value;
  }
}

var BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO = 11;
var BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE = 6;
var MAX_ITEM_VALUE = 50;
var MIN_ITEM_VALUE = 0;

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
            item.value -= 1;
          }
        }
      } else {
        if (item.value < MAX_ITEM_VALUE) {
          item.value += 1;
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
              item.value -= 1;
            }
          } else {
            item.value = MIN_ITEM_VALUE;
          }
        } else {
          if (item.value < MAX_ITEM_VALUE) {
            item.value += 1;
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
      item.numberOfDaysToSell <
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO
    ) {
      if (item.value < MAX_ITEM_VALUE) {
        item.value += 1;
      }
    }
    if (
      item.numberOfDaysToSell <
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE
    ) {
      if (item.value < MAX_ITEM_VALUE) {
        item.value += 1;
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
};
