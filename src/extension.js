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
function HashTable() {
  this.SIZE = 16;
  // adding a counter to keep track of the number of items in the hash table
  this.counter = 0;
  this.storage = new Array(this.SIZE);
}

/**
 * calculate the percentage of items stored in the hashTable
 * if percentage is over 75% -> double the hash table
 * rehash everything
 */
HashTable.prototype.set = function (key, value) {
  // calculate the percentage of items stored in the hashTable if we add one more item
  let percentage = (this.counter + 1 / this.SIZE) * 100;
  //  console.log(percentage)
  // if percentage is over 75%
  if (percentage > 75) {
    // double the hash table
    this.SIZE *= 2;
    //rehash everything else
  }
  //set a var to the evaluated result of the invocation of the hashcode  with the key and this.SIZE
  const index = hashCode(key, this.SIZE);
  //check if this.storage at the index is empty if yes, set it to an empty obj
  if (!this.storage[index]) {
    this.storage[index] = {};
  }
  //add the key value pair in the object at the specific index
  this.storage[index][key] = value;
  //increment the counter by 1
  this.counter++;
  return this.counter;
};

HashTable.prototype.get = function (key) {
  //set a var to the evaluated result of the invocation of the hashcode  with the key and this.SIZE
  const index = hashCode(key, this.SIZE);
  //check if this.storage at the index is empty if yes, return undefined
  if (!this.storage[index]) {
    return undefined;
  }
  // return the value associated to the passed in key when invoking get
  return this.storage[index][key];
};

/**
 * if this.SIZE of hashtable is greater than 16
 *
 * calculate the percentage of items stored in the hashTable with the counter minus 1
 * if percentage is less than 25% -> divide the size of the hash table by 2
 * rehash everything else
 */
HashTable.prototype.remove = function (key) {
  // check size of this.SIZE
  if (this.SIZE > 16) {
    // calculate the percentage of items stored in the hashTable with the counter minus 1
    let percentage = (this.counter - 1 / this.SIZE) * 100;
    // if percentage is less than 25%
    if (percentage < 75) {
      // divide the size of the hash table by 2
      this.SIZE /= 2;
      //rehash everything else
    }
  }
  //set a var to the evaluated result of the invocation of the hashcode  with the key and this.SIZE
  const index = hashCode(key, this.SIZE);
  //check if this.storage at the index or the key in the object at this index is empty if yes, return undefined
  if (!this.storage[index] || !this.storage[index][key]) {
    return undefined;
  }
  //store the key value pair to be removed
  let removed = this.storage[index][key];
  //delete the key value pair
  delete this.storage[index][key];
  //decrement the counter by 1
  this.counter--;
  //return the value that has been removed
  return removed;
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

const hashT = new HashTable();
hashT.set(10, 2);
hashT.set(15, 1);
hashT.set(120, 6);
console.log(hashT.set(120, 6));
hashT.set(125, 3);
hashT.set(2, 4);
hashT.set(121, 5);
hashT.set(122, 7);
hashT.set(124, 8);
hashT.set(125, 9);
hashT.set(1265, 10);
hashT.set(110, 11);
hashT.set(11, 12);
hashT.set(222, 16);
console.log(hashT.set(0, 12));
console.log(hashT);
