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

      if (item.numberOfDaysToSell > 0){
          if (this.isItemMoreValuableWithAge(item)) {
              item.value += this.increaseItemValue(item);
          } else {
              item.value -= this.degradeItemValue(item);
          }
      } 
      else {
          if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
              item.value = MIN_ITEM_VALUE;
          }
          else if (item.name == "Aged Brie"){
              item.value += 1;
          }
          else {
              item.value -= this.degradeExpiredItemsTwiceAsFast(item);
          }
      }

      if (!this.isLegendaryItem(item)) {
        item.numberOfDaysToSell -= 1;
      }


      if (item.numberOfDaysToSell < 0) {
        if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
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

  determineBackstagePassValueIncrease(item) {
    var backstagePassValueIncrease = 0;
    if (
      item.numberOfDaysToSell <
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO
    ) {
      if (item.value < MAX_ITEM_VALUE) {
        backstagePassValueIncrease += 1;
      }
    }
    if (
      item.numberOfDaysToSell <
      BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_THREE
    ) {
      if (item.value < MAX_ITEM_VALUE) {
        backstagePassValueIncrease += 1;
      }
    }
    return backstagePassValueIncrease;
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

  increaseItemValue(item) {
    var increaseValueRate = this.determineIncreaseValueRate(item);
    if((item.value + increaseValueRate) < MAX_ITEM_VALUE){
      return increaseValueRate;
    } else {
      return MAX_ITEM_VALUE - (item.value + increaseValueRate)
    }
  }

  degradeItemValue(item) {
    var degradationRate = this.determineDegradationRate(item);
    if(item.value >= degradationRate) {
      return degradationRate;
    } else {
      return item.value
    }
  }

  degradeExpiredItemsTwiceAsFast(item) {
      var degradationRate = 2 * this.degradeItemValue(item);
      if(item.value >= degradationRate) {
          return degradationRate;
      } else {
          return item.value
      }
  }

  determineIncreaseValueRate(item){
    var increasedValueRate = 1;
    if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
      increasedValueRate += this.determineBackstagePassValueIncrease(item);
    }
    return increasedValueRate;
  }

  determineDegradationRate(item) {
    var degradationRate = BASE_DEGRADATION_RATE
    if (this.isLegendaryItem(item)){
      degradationRate = 0;
    }
    else if (this.isConjuredItem(item)){
      degradationRate = 2 * BASE_DEGRADATION_RATE;
    }
    else if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
      degradationRate = item.value - MIN_ITEM_VALUE;
    }
    return degradationRate
  }


}

module.exports = {
  Item,
  Shop,
  BASE_DEGRADATION_RATE,
};
