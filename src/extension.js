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

function HashTable(SIZE = 16) {
  this.SIZE = SIZE;
  this.storage = new Array(this.SIZE);
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

  if(this.storage[bucket] === undefined) {
    this.storage[bucket] = {};
    this.storage[bucket][key] = value;
  }

  this.storage[bucket][key] = value;

  const percent = (this.storage.length / 4) * 3;

  if(this.bucketsUsed() > percent) {
    this.enlarge();
  }
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
  return this.storage[bucket][key]
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
  let target;

  if (this.storage[bucket]) {
    target =  this.storage[bucket][key];
    delete this.storage[bucket][key];
  } 

  //if we have removed the last key / value in a bucket
  if(Object.keys(this.storage[bucket]).length < 1) {
    this.storage[bucket] = undefined;
    const used = this.bucketsUsed();
    const percent = this.SIZE / 4;

    if (this.SIZE > 16 && used < percent) {
      this.enlarge(this.SIZE / 2);
    }
  }

  return target;
};

HashTable.prototype.bucketsUsed = function () {
  return this.storage.filter((x) => x).length;
}

HashTable.prototype.enlarge = function () {
  const newHash = new HashTable(this.SIZE * 2);

  this.storage.forEach(function(target){
    for (let key in target) {
      const value = target[key];
      newHash.set(key, value);
    }
  });

  this.SIZE = newHash.SIZE;
  this.storage = newHash.storage;
}

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

// const hash = new HashTable();
// hash.set('vsale2', 'value');
// hash.set('vahhhlu2', 'value1');
// hash.set('valuads', 'value1');
// hash.set('valuas546dfads', 'value1');
// hash.set('vasadfadfle2', 'value');
// hash.set('vaadalu2', 'value1');
// hash.set('valuads', 'value1');
// hash.set('valu23asdfads', 'value1');
// hash.set('vassle2', 'value');
// hash.set('vad54fffglu2', 'value1');
// hash.set('valuads', 'value1');
// hash.set('asaffasddf', 'value1');
// hash.set('valssuaafsdsdfads', 'value1');
// hash.set('valuaadsaearesdfads', 'value1');
// hash.set('zd', 'value1');
// hash.set('epwqrijaszd', 'value1');

// console.log(hash.bucketsUsed());

// hash.remove('vsale2', 'value');
// hash.remove('vahhhlu2', 'value1');
// hash.remove('valuads', 'value1');
// hash.remove('valuas546dfads', 'value1');
// hash.remove('vasadfadfle2', 'value');
// hash.remove('vaadalu2', 'value1');


// console.log(hash);
// console.log(hash.bucketsUsed());
// console.log(hash.storage.length);



// console.log((32 / 4))