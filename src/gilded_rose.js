class Item {
  constructor(name, numberOfDaysToSell, value) {
    this.name = name;
    this.numberOfDaysToSell = numberOfDaysToSell;
    this.value = value;
  }
}

const BASE_DEGRADATION_RATE = 1;

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
      if (this.isItemMoreValuableWithAge(item)) {
        if (item.value < MAX_ITEM_VALUE) {
          item.value += 1;
          if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
            this.addUrgencyValueForBackstageDeadlines(item);
          }
        }
      } else {
        this.degradeItemValue(item)
      }
      if (!this.isLegendaryItem(item)) {
        item.numberOfDaysToSell -= 1;
      }
      if (item.numberOfDaysToSell < 0) {
        if (item.name == "Aged Brie") {
          if (item.value < MAX_ITEM_VALUE) {
            item.value += 1;
          }
        } 
        else if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
          item.value = MIN_ITEM_VALUE;
        }
        else {
          this.degradeItemValue(item)
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

  isConjuredItem(item) {
    return item.name.toLowerCase().includes("conjured");
  }

  isItemMoreValuableWithAge(item) {
    return (
      item.name == "Aged Brie" ||
      item.name == "Backstage passes to a TAFKAL80ETC concert"
    );
  }

  degradeItemValue(item) {
    var degradationRate = this.determineDegradationRate(item);
    if(item.value >= degradationRate) {
      item.value -= degradationRate;
    } else {
      item.value = 0;
    }
  }

  determineDegradationRate(item) {
    var degradationRate = BASE_DEGRADATION_RATE
    if (this.isLegendaryItem(item)){
      degradationRate = 0;
    }
    else if (this.isConjuredItem(item)){
      degradationRate = 2 * BASE_DEGRADATION_RATE;
    }
    return degradationRate
  }




}

module.exports = {
  Item,
  Shop,
  BASE_DEGRADATION_RATE,
};
