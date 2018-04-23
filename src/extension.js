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
  this.numStored = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.set = function (key, value) {
  // Check if HT is > 75% full, doubles size and rehashes if full
  if (this.numStored/this.SIZE > 0.75) {
    console.log("Resizing");
    // Collect key value pairs in an object
    let stored = {};
    for (let i = 0; i < this.SIZE; i += 1) {
      if (this.storage[i] !== undefined) stored = Object.assign(this.storage[i], stored);
    }
    console.log("stored keys ", Object.keys(stored).length);
    // Reset HashTable
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    this.numStored = 0;
    const newSize = this.SIZE;
    console.log("storage: ",this.storage);
    // Loop through object and rehash pairs
    Object.keys(stored).forEach(function (key) {
      console.log(key);
      console.log(newSize);
      const input = hashCode(key, newSize);
      console.log(input);
      if (this.storage[input] !== undefined) {
        if (!this.storage[input].hasOwnProperty(key)) this.numStored += 1;
        this.storage[input][key] = stored[key];
      } else {
        const obj = {};
        obj[key] = stored[key];
        this.storage[input] = obj;
        this.numStored += 1;
      }
    });
    // Hash the original input
    const input = hashCode(key, this.SIZE);
    if (this.storage[input] !== undefined) {
      if (!this.storage[input].hasOwnProperty(key)) this.numStored += 1;
      this.storage[input][key] = value;
    } else {
      const obj = {};
      obj[key] = value;
      this.storage[input] = obj;
      this.numStored += 1;
    }
  }
  else {
    const input = hashCode(key, this.SIZE);
    if (this.storage[input] !== undefined) {
      if (!this.storage[input].hasOwnProperty(key)) this.numStored += 1;
      this.storage[input][key] = value;
    } else {
      const obj = {};
      obj[key] = value;
      this.storage[input] = obj;
      this.numStored += 1;
    }
    return this.numStored;
  }
};

HashTable.prototype.get = function (key) {
  return typeof this.storage[hashCode(key,this.SIZE)] === 'object' ? this.storage[hashCode(key, this.SIZE)][key] : undefined;
};

HashTable.prototype.remove = function (key) {
  const output = this.get(key);
  if (output === undefined) return undefined;
  this.storage[hashCode(key, this.SIZE)] = undefined;
  this.numStored -= 1;
  // Check if this.SIZE > 16 and less than 25% full, resize and rehash if so
  if (this.SIZE > 16 && this.numStored / this.SIZE < 0.25) {
    // Store all key value pairs currently stored
    let stored = {};
    for (let i = 0; i < this.SIZE; i += 1) {
      if (this.storage[i]) stored = Object.assign(this.storage[i], stored);
    }
    // Reset HashTable
    this.SIZE /= 2;
    this.storage = new Array(this.SIZE);
    this.numStored = 0;
    // Loop through stored pairs and rehash
    Object.keys(stored).forEach(function (key) {
      this.set(key,stored[key]);
    });
  }
  return output;
};

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;
  
  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % size;
}

// Testing
const hash = new HashTable();
hash.set('john',4);
hash.set('kyle', 'hello');
hash.set('will',50);
hash.set('bob','foo');
hash.set('bob','hi');
hash.set('shoe','lace');
hash.set('jay','joe');
hash.set('ron','paul');
hash.set('blah','blargh');
hash.set('hey','hey');
hash.set('ho','ho');
hash.set('bleh','blergh');
hash.set('meh','meh');
hash.set('go','stop');
hash.set('stop','go');
hash.set('hoho','hoho');
// console.log(hash.remove('bob'));
// console.log(hash.get('bob'));
// console.log(hash.get('will'));
console.log(hash.storage);
console.log(hash.numStored);
console.log(hash.SIZE);

// Do not remove!!
module.exports = HashTable;
