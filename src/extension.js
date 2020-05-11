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

class HashTable {
  constructor(size=16) {
    this.SIZE = size;
  
    this.storage = new Array(this.SIZE);
    this.numItems = 0;
  }

rehash(newSize) {
  let newTable = new HashTable(newSize);
  for(let i = 0; i < this.SIZE; i++) {
    for (let [k,v] in this.storage[i]) {
      for (let [k2,v2] in v) {
        newTable.set(k, v2, false);
      }
    }
  }

  this.SIZE = newSize;
  this.storage = newTable.storage;
  this.numItems = newTable.numItems;
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

/*
1. set:
- If adding the new item will push the number of stored items to over 75% of
  the hash table's SIZE, then double the hash table's SIZE and rehash everything
*/

//add boolean for deciding when to resize the hash table
set (key, value, doResize=true) {
  // get index for where to store value
  let index = hashCode(key, this.SIZE);
  //store value in object  within storage at index
  if (this.storage[index] === undefined) this.storage[index] = {};
  if (this.storage[index][key] === undefined) this.numItems++;
  this.storage[index][key] = value;
  //this.numItems++;

  if (doResize && this.numItems > 0.75*this.SIZE) {
    this.rehash(this.SIZE*2);
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
get(key) {
  let index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) return undefined;
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

/*
2. remove:
- If the hash table's SIZE is greater than 16 and the result of removing the
  item drops the number of stored items to be less than 25% of the hash table's SIZE
  (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*/

remove(key) {
  let index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined || this.storage[index][key] === undefined) {
    return undefined
  }
  let removedValue = this.storage[index][key];
  delete this.storage[index][key];
  this.numItems--;

  if(this.numItems < Math.floor(0.25*this.SIZE)) {
    this.rehash(this.SIZE / 2);
  }
  return removedValue;
};

}
let table = new HashTable();

table.set('a', 'apple');
table.set('b', 'box');
table.set('c', 'candle')
table.set('a1', 'andy');
table.set('d', 'done');
table.set('e', 'ey')
table.set('f', 'fox');
table.set('g', 'good');
table.set('h1', 'hum');
console.log(table);
table.set('k', 'ey')
table.set('f1', 'fox1');
table.set('g1', 'good1');
table.set('h1', 'hum1')
table.set('e1', 'ey1')
table.set('f2', 'fox1');
table.set('g3', 'good1');
table.set('h20', 'hum1')
console.log(table);
console.log(table.get('d'));
//console.log(table.remove('a'));
//console.log(table.remove('a'));
//console.log(table.remove('e'));
//console.log(table.remove('b'));

console.log(table);

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
