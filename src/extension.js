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

//const { delete } = require("request");

// PASTE AND MODIFY YOUR CODE BELOW
// const { delete } = require("request");

/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
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
  /* 1. set:
      - If adding the new item will push the number of stored items to over 75% of
        the hash table's SIZE, then double the hash table's SIZE and rehash everything
  */ 
 const storedItemsAmount = () => {
   let amount = 0;
   this.storage.forEach(el => {
     el ? amount += 1 : amount += 0;
    });
   return amount;
  }
  
  const hashItem = (index, key, value) => {
    if (this.storage[index]) {
      this.storage[index][key] = value
    } else this.storage[index] = { [key] : value }
  }

  const reHash = () => {
    // extract all KV pairs from hash and store inside new hash table
    let array = JSON.parse(JSON.stringify(this.storage));
    array.forEach(el => {
      if (el) {
        Object.entries(el).forEach(([key, value])=>{
          const newIndex = hashCode(key, this.SIZE);
          hashItem(newIndex, key, value);
        })
      }
    });
    array = [];
    // run set on each KV pair 
  }


  // check stored items amount
  // if stored items amount  / SIZE > 0.75 ..
  if (storedItemsAmount() / this.SIZE > 0.75) {
    // double SIZE
    this.SIZE *= 2;
    // rehash everything 
    reHash();
  } else {
    const INDEX = hashCode(key, this.SIZE);
    hashItem(INDEX, key, value)
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
  const INDEX = hashCode(key, this.SIZE);
  if (!this.storage[INDEX]) return undefined;
  else return this.storage[INDEX][key];
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
  /* 2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing the
        item drops the number of stored items to be less than 25% of the hash table's SIZE
        (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
  */
  const INDEX = hashCode(key, this.SIZE);   
  if (!this.storage[INDEX]) return;
  else {
    delete this.storage[INDEX][key];
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



// *** TESTS ***

const test = new HashTable();
//console.log(test);
test.set('a', 'Diego');
test.set('b', 'Vazquez');
test.set('c', 'teacher');
test.set('d', 'Wife');
test.set('e', 'alligator');
test.set('f', 'Diego');
test.set('g', 'Vazquez');
test.set('h', 'teacher');
test.set('i', 'Wife');
test.set('j', 'alligator');
test.set('k', 'Diego');
test.set('l', 'Vazquez');
test.set('m', 'teacher');
test.set('n', 'Wife');
test.set('o', 'alligator');
test.set('p', 'Diego');
test.set('q', 'Vazquez');
test.set('r', 'teacher');
test.set('s', 'Wife');
test.set('t', 'alligator');
//console.log('testing get => ', test.get('name'));
// test.remove('name');
// console.log('testing get => ', test.get('name'));
//console.log(test);
