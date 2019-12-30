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

  this.storage = new Array(this.SIZE);
}

HashTable.prototype.resize = function() {
  this.SIZE = this.SIZE * 2;
};

HashTable.prototype.set = function(key, value) {
  const position = hashCode(key, this.SIZE);
  const obj = {};
  obj[key] = value;
  if (this.storage[position] === undefined) {
    this.storage[position] = obj;
  } else {
    const obj = this.storage[position];
    const keys = Object.keys(obj);
    const seventyFive = this.SIZE * 0.75;
    if (keys.length > seventyFive) {
      this.SIZE = this.SIZE * 2;
      this.storage.bind(this.SIZE);
      //size property does double, but the amount of places in the hash table does not :/
      // this.SIZE.bind(this);
      // this.SIZE *= 2; //how to resize hash table?
      //bind the new size to the original size with .bind?
      // console.log(this.SIZE);
    }
    this.storage[position][key] = value;
  }
  return this.storage;
};

HashTable.prototype.get = function(key) {
  const position = hashCode(key, this.SIZE);
  if (!this.storage[position])
    return "the key you've entered isn't in this hash table.";
  return this.storage[position][key];
};

HashTable.prototype.remove = function(key) {
  const position = hashCode(key, this.SIZE);
  if (this.storage[position] === undefined) return undefined;
  const toDelete = this.storage[position][key];
  delete this.storage[key];
  this.storage[key] = undefined;
  return toDelete;
};

// Do not remove!!
module.exports = HashTable;

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

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

const table = new HashTable();
table.set('0', 'key is 0');
table.set('1', 'key is 1');
table.set('2', 'key is 2');
table.set('3', 'key is 3');
table.set('4', 'key is 4');
table.set('5', 'key is 5');
table.set('6', 'key is 6');
table.set('7', 'key is 7');
table.set('8', 'key is 8');
table.set('9', 'key is 9');
table.set('10', 'key is 10');
table.set('11', 'key is 11');
table.set('12', 'key is 12');
table.set('13', 'key is 13');
table.set('14', 'key is 14');
table.set('15', 'key is 15');
table.set('16', 'key is 16');
table.set('17', 'key is 17');
table.set('18', 'key is 18');
table.resize();
console.log(table);
