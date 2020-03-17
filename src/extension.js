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
  this.items = 0;
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
HashTable.prototype.set = function set(key, value) {
  const hashedKey = hashCode(JSON.stringify(key), this.SIZE);

  // check if adding this item will increase storage beyond 75% of storage size
  if (this.items + 1 / this.SIZE > this.SIZE * 0.75) {
    // console.log('over 75% limit, need to resize storage and rehash');

    // retrieve all of the items from storage
    const items = this.storage;
    // console.log(items);

    // resize the storage limit to double size
    this.SIZE *= 2;
    // console.log(this.SIZE);

    // put all items back into storage
    items.forEach((item) => {
      // console.log(item);
      // console.log(Object.entries(item));
      Object.entries(item).forEach(([k, v]) => {
        // console.log(k, v);
        this.set(key, value);
      });
    });
  }

  // hash already exists, so we have a collision
  // add the key/value pair to existing item storage
  if (this.storage[hashedKey]) {
    const item = this.storage[hashedKey];

    if (!Object.keys(item).includes(JSON.stringify(key))) {
      this.items += 1;
    }

    item[JSON.stringify(key)] = value;

    this.storage[hashedKey] = item;
  } else {
    // create new item storage and add key/value pair to it
    const item = {};
    item[JSON.stringify(key)] = value;

    // store item on hash table
    this.storage[hashedKey] = item;

    // increment number of items in hash table
    this.items += 1;
  }


  // @return {number} The new number of items stored in the hash table
  return this.items;
};

const h = new HashTable();
h.set(1, 'a');
h.set(2, 'a');
h.set(3, 'a');
h.set(4, 'a');
h.set(5, 'a');
h.set(6, 'a');
h.set(7, 'a');
h.set(8, 'a');
h.set(9, 'a');
h.set(10, 'a');
h.set(11, 'a');
h.set(12, 'a');
h.set(13, 'a');
// h.set(14, 'a');
console.log(h, h.storage.length);

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
HashTable.prototype.get = function get(key) {
  const hashedKey = hashCode(JSON.stringify(key), this.SIZE);

  // if hashed key exists, retrieve the value specified by key
  if (this.storage[hashedKey]) {
    return this.storage[hashedKey][JSON.stringify(key)];
  }

  // otherwise return undefined
  return undefined;
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
  const hashedKey = hashCode(JSON.stringify(key), this.SIZE);

  let item;

  // if hashed key exists, retrieve the item specified by key from storage
  // delete the key from the storage
  // return the item
  if (this.storage[hashedKey]) {
    item = this.storage[hashedKey][JSON.stringify(key)];
    delete this.storage[hashedKey][JSON.stringify(key)];
    this.items -= 1;
  }

  // will return undefined if item not found
  return item;
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
