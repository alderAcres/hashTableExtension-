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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.CONTENTS = 0;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.resize = function(newSize) {
  this.CONTENTS = 0;
  this.SIZE = newSize;
  oldStorage = this.storage;
  this.storage = new Array(this.SIZE);

  oldStorage.forEach(hash => {
    for (let key in hash) {
      //if (hash.hasOwnProperty(key)) {
        this.set(key, hash[key]);
      //}
    }
  })
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/

HashTable.prototype.set = function(key, value) {
  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket]) {
    const hash = {};
    hash[key] = value;
    this.storage[bucket] = hash;
    this.CONTENTS++;
  } else {
    const hash = this.storage[bucket];
    if (!hash.hasOwnProperty(key)) {
      this.CONTENTS++;
    }
    hash[key] = value;
  }
  if (this.CONTENTS / this.SIZE > .75) 
      this.resize(this.SIZE * 2);

  return this.CONTENTS;
};

/**
* get - Retrieves a value stored in the hash table with a specified key
*
* - If more than one value is stored at the key's hashed address, then you must retrieve
*   the correct value that was originally stored with the provided key
*
* @param {string} key - key to lookup in hash table
* @return {string|number|boolean} The value stored with the specifed key in the
* hash table
*/
HashTable.prototype.get = function(key) {
  const bucket = hashCode(key, this.SIZE);
  const hash = this.storage[bucket];
  if (hash === undefined)
    return undefined;
  else {
    return hash[key];
  }
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const bucket = hashCode(key, this.SIZE);
  const hash = this.storage[bucket];
  if (hash === undefined) 
    return undefined;
  else {
    const removed = hash[key];
    if (removed !== undefined) {
      this.CONTENTS--;
    }
    delete hash[key];
    if (this.CONTENTS / this.SIZE < .25 && this.SIZE > 16) 
        this.resize(this.SIZE / 2);
    return removed;
  }
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

// Do not remove!!
module.exports = HashTable;

const myHash = new HashTable();
console.log('set(1, "a")', myHash.set('1', 'a'), 'expect 1');
console.log('set(2, "a")', myHash.set('2', 'a'), 'expect 2');
console.log('set(3, "a")', myHash.set('3', 'a'), 'expect 3');
console.log('set(4, "a")', myHash.set('4', 'a'), 'expect 4');
console.log('set(5, "a")', myHash.set('5', 'a'), 'expect 5');
console.log('set(6, "a")', myHash.set('6', 'a'), 'expect 6');
console.log('set(7, "a")', myHash.set('7', 'a'), 'expect 7');
console.log('set(8, "a")', myHash.set('8', 'b'), 'expect 8');
console.log('set(9, "a")', myHash.set('9', 'a'), 'expect 9');
console.log('set(10, "a")', myHash.set('10', 'a'), 'expect 10');
console.log('set(11, "a")', myHash.set('11', 'a'), 'expect 11');
console.log('set(12, "a")', myHash.set('12', 'a'), 'expect 12');
console.log('set(13, "a")', myHash.set('13', 'a'), 'expect 13');
console.log('SIZE = ', myHash.SIZE, 'CONTENTS = ', myHash.CONTENTS);
console.log('remove(13)', myHash.remove('13'));
console.log('remove(12)', myHash.remove('12'));
console.log('remove(11)', myHash.remove('11'));
console.log('remove(10)', myHash.remove('10'));
console.log('remove(9)', myHash.remove('9'));
console.log('remove(8)', myHash.remove('8'));
console.log('remove(7)', myHash.remove('7'));
console.log('remove(6)', myHash.remove('6'));
console.log('remove(5)', myHash.remove('5'));
console.log('remove(4)', myHash.remove('4'));
console.log('SIZE = ', myHash.SIZE, 'CONTENTS = ', myHash.CONTENTS);
