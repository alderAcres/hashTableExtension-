/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW
HashTable.prototype.set = function (key, value) {
  //check current hash size
  if (this.items + 1 === 0.75 * this.SIZE) {
    this.SIZE *= 2;
    this.items = 0;

    //create a temporary object to store the key value pairs
    const temp = {};
    for (let i in this.storage) {
      if (this.storage[i] !== undefined) {
        for (let j in this.storage[i]) {
          temp[j] = this.storage[i][j];
          delete this.storage[i][j];
        }
      }
    }

    //iterate through the object and add each key value pair again
    for (let i in temp) {
      let index = hashCode(i, this.SIZE);

      if (this.storage[index] === undefined) {
        this.storage[index] = {};
      }
      this.storage[index][i] = temp[i];
      return ++this.items;
    }
  } else {
    let index = hashCode(key, this.SIZE);
    //check if that spot is undefined
    if (this.storage[index] === undefined) {
      //create a new object storing that key value pair
      this.storage[index] = {};
    }
    //check if that specific key already exists
    if (this.storage[index][key]) {
      //decrement this.item
      --this.items;
    }
    //simply add a new key value pair to the object
    this.storage[index][key] = value;
    return ++this.items;

    //get the index of the key
  }
};

HashTable.prototype.remove = function (key) {
  if (this.SIZE > 16 && this.items - 1 === 0.25 * this.SIZE) {
    this.SIZE /= 2;
    this.items = 0;

    const temp = {};
    for (let i in this.storage) {
      if (this.storage[i] !== undefined) {
        for (let j in this.storage[i]) {
          temp[j] = this.storage[i][j];
          delete this.storage[i][j];
        }
      }
    }

    for (let i in temp) {
      let index = hashCode(i, this.SIZE);

      if (this.storage[index] === undefined) {
        this.storage[index] = {};
      }
      this.storage[index][i] = temp[i];
      return ++this.items;
    }
  }

  //after rehasing everything, go into the remove function
  let index = hashCode(key, this.SIZE);

  //create a temporary variable to store the value
  let temp = this.storage[index][key];
  //if it is not undefined
  if (temp !== undefined) {
    //delete the value
    delete this.storage[index][key];
    //decrement items
    --this.items;
  }
  return temp;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  "use strict";

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = (hash << 5) - hash + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
