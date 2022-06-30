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
      if (!this.isItemMoreValuableWithAge(i)) {
        if (this.items[i].value > MIN_ITEM_VALUE) {
          if (this.doesItemDepreciate(i)) {
            this.items[i].value -= 1;
          }
        }
      } else {
        if (this.items[i].value < MAX_ITEM_VALUE) {
          this.items[i].value += 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            this.addUrgencyValueForBackstageDeadlines(i);
          }
        }
      }
      if (this.doesItemDepreciate(i)) {
        this.items[i].numberOfDaysToSell -= 1;
      }
      if (this.items[i].numberOfDaysToSell < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.doesItemStillHaveValue(i) && this.doesItemDepreciate(i)) {
              this.items[i].value -= 1;
            }
          } else {
            this.items[i].value = MIN_ITEM_VALUE;
          }
        } else {
          if (this.items[i].value < MAX_ITEM_VALUE) {
            this.items[i].value += 1;
          }
        }
      }
    }

    return this.items;
  }

  doesItemStillHaveValue(i) {
    return this.items[i].value > MIN_ITEM_VALUE;
  }

  addUrgencyValueForBackstageDeadlines(i) {
    if (
      this.items[i].numberOfDaysToSell <
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO
    ) {
      if (this.items[i].value < MAX_ITEM_VALUE) {
        this.items[i].value += 1;
      }
    }
    if (
      this.items[i].numberOfDaysToSell <
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE
    ) {
      if (this.items[i].value < MAX_ITEM_VALUE) {
        this.items[i].value += 1;
      }
    }
  }

  doesItemDepreciate(i) {
    return this.items[i].name != "Sulfuras, Hand of Ragnaros";
  }

  isItemMoreValuableWithAge(i) {
    return (
      this.items[i].name == "Aged Brie" ||
      this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
    );
  }
}

module.exports = {
  Item,
  Shop,
};
