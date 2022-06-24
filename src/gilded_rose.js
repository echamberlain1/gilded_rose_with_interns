class Item {
  constructor(name, numberOfDaysToSell, value) {
    this.name = name;
    this.numberOfDaysToSell = numberOfDaysToSell;
    this.value = value;
  }
}

var BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO = 11;

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateValue() {
    for (let i = 0; i < this.items.length; i++) {
      if (
        this.items[i].name != "Aged Brie" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (this.items[i].value > 0) {
          if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
            this.items[i].value -= 1;
          }
        }
      } else {
        if (this.items[i].value < 50) {
          this.items[i].value = this.items[i].value + 1;
          if (
            this.items[i].name == "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (
              this.items[i].numberOfDaysToSell <
              BACKSTAGE_PASS_DEADLINE_BEFORE_VALUE_INCREASE_BY_TWO
            ) {
              if (this.items[i].value < 50) {
                this.items[i].value = this.items[i].value + 1;
              }
            }
            if (this.items[i].numberOfDaysToSell < 6) {
              if (this.items[i].value < 50) {
                this.items[i].value = this.items[i].value + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
        this.items[i].numberOfDaysToSell = this.items[i].numberOfDaysToSell - 1;
      }
      if (this.items[i].numberOfDaysToSell < 0) {
        if (this.items[i].name != "Aged Brie") {
          if (
            this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (this.items[i].value > 0) {
              if (this.items[i].name != "Sulfuras, Hand of Ragnaros") {
                this.items[i].value = this.items[i].value - 1;
              }
            }
          } else {
            this.items[i].value = this.items[i].value - this.items[i].value;
          }
        } else {
          if (this.items[i].value < 50) {
            this.items[i].value = this.items[i].value + 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
