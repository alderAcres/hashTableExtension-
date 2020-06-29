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
  this.itemsStored = 0;
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
HashTable.prototype.set = function (key, value) {
  //invoke helper function that will determine load factor (current items stored / SIZE)
  const loadFactor = this.loadFactor();
  // console.log(loadFactor);

  if (loadFactor > 0.75) {
    //create newStorage object with rehashed keys
    //and reset this.storage and this.SIZE
    const newStorage = new Array(this.SIZE * 2);
    this.SIZE = this.SIZE * 2;
    //iterate over old storage and reset all key/values
    this.storage.forEach((obj) => {
      for (const key in obj) {
        const newIndex = hashCode(key, this.SIZE);
        if (newStorage[newIndex] === undefined) newStorage[newIndex] = {};
        newStorage[newIndex][key] = obj[key];
      }
    });
    this.storage = newStorage;
  }

  //no matter if we reset the hash storage or not,
  // we still need to add in the new key/value pair
  const index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) this.storage[index] = {};
  this.storage[index][key] = value;

  this.itemsStored++;
  return this.itemsStored;
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
HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);
  //first check if key even exists
  if (this.storage[index][key] === undefined) return undefined;
  else {
    const deleted = this.storage[index][key];
    delete this.storage[index][key];

    //can also add logic here where if the element in this.storage is just an empty
    //object, we can reset the element to be null or undefined

    //after deleting item, check if pro forma load factor <0.25
    const loadFactor = this.loadFactor();
    // console.log(loadFactor);
    if (loadFactor < 0.25 && this.SIZE > 16) {
      const newStorage = new Array(this.SIZE / 2);
      this.SIZE = this.SIZE / 2;
      //iterate over old storage and reset all key/values
      this.storage.forEach((obj) => {
        for (const key in obj) {
          const newIndex = hashCode(key, this.SIZE);
          if (newStorage[newIndex] === undefined) newStorage[newIndex] = {};
          newStorage[newIndex][key] = obj[key];
        }
      });
      this.storage = newStorage;
    }

    this.itemsStored--;
    return deleted;
  }
};

HashTable.prototype.loadFactor = function () {
  return this.itemsStored / this.SIZE;
};

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

let hash = new HashTable();
hash.set('meow', 'cat');
hash.set('woof', 'dog');
console.log(hash.set('woof1112', 'dog2')); //will hash to same index as meow, cat
console.log(hash.storage);
console.log(hash.get('meow'));
console.log(hash.remove('meow'));
console.log(hash.storage);
console.log(hash.get('meow'));

//testing >75% load
hash.set('cheep', 'bird');
hash.set('chorp', 'bird2');
hash.set('bork', 'dog3');
hash.set('filler', 'fillerValue');
hash.set('filler2', 'fillerValue');
hash.set('filler3', 'fillerValue');
hash.set('filler4', 'fillerValue');
hash.set('filler5', 'fillerValue');
hash.set('filler6', 'fillerValue');
hash.set('filler7', 'fillerValue');
hash.set('filler8', 'fillerValue');
console.log(hash.storage);
hash.set('filler9', 'fillerValue');
hash.set('filler10', 'fillerValue');
console.log(hash.storage);

//testing <25% load
hash.remove('filler');
hash.remove('filler2');
hash.remove('filler3');
hash.remove('filler4');
hash.remove('filler5');
hash.remove('filler6');
hash.remove('filler7');
console.log(hash.storage.length);
console.log(hash.storage);
hash.remove('filler8');
console.log(hash.storage.length);
console.log(hash.storage);
hash.remove('filler9');
hash.remove('filler10');
hash.remove('woof');
hash.remove('chorp');
hash.remove('bork');
hash.remove('cheep');
// hash.remove('woof1112');
console.log(hash.storage.length);
console.log(hash.storage);
