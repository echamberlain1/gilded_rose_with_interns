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
          if (this.itemIsMoreValuableWithAge(item)) {
              item.value += this.increaseItemValue(item);
          } else {
              item.value -= this.decreaseItemValue(item);
          }
      } 
      else {
          if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
              item.value = MIN_ITEM_VALUE;
          }
          else if (item.name == "Aged Brie"){
              item.value += this.increaseItemValue(item);;
          }
          else {
              item.value -= this.decreaseExpiredItemsTwiceAsFast(item);
          }
      }

      // number of days to sell decreases after each day  
      if (!this.itemIsLegendary(item)) {
        item.numberOfDaysToSell -= 1;
      }
    }

    return this.items;
  }

  itemIsLegendary(item) {
    return item.name == "Sulfuras, Hand of Ragnaros";
  }

  itemIsConjured(item) {
    return item.name.toLowerCase().includes("conjured");
  }

  itemIsMoreValuableWithAge(item) {
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

  determineIncreaseValueRate(item){
    var increasedValueRate = 1;
    if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
      increasedValueRate += this.determineBackstagePassValueIncrease(item);
    }
    return increasedValueRate;
  }

  decreaseItemValue(item) {
    var decreaseValueRate = this.determineDecreaseValueRate(item);
    if(item.value >= decreaseValueRate) {
      return decreaseValueRate;
    } else {
      return item.value
    }
  }

  determineDecreaseValueRate(item) {
    var decreaseValueRate = BASE_DEGRADATION_RATE
    if (this.itemIsLegendary(item)){
      decreaseValueRate = 0;
    }
    else if (this.itemIsConjured(item)){
      decreaseValueRate = 2 * BASE_DEGRADATION_RATE;
    }
    else if (item.name == "Backstage passes to a TAFKAL80ETC concert"){
      decreaseValueRate = item.value - MIN_ITEM_VALUE;
    }
    return decreaseValueRate
  }

  decreaseExpiredItemsTwiceAsFast(item) {
    var decreaseValueRate = 2 * this.decreaseItemValue(item);
    if(item.value >= decreaseValueRate) {
        return decreaseValueRate;
    } else {
        return item.value
    }
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
}

module.exports = {
  Item,
  Shop,
  BASE_DEGRADATION_RATE,
};
