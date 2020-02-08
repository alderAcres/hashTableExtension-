/*
  Complete this extension only AFTER getting the functionality in main.js
  working! Copy-paste your working code from main.js below (being sure to have 1
  module.exports line). Modify the code to reflect to following:

  1. set:
      - If adding the new item will push the number of stored items to over 75%
  of the hash table's SIZE, then double the hash table's SIZE and rehash
  everything

  2. remove:
      - If the hash table's SIZE is greater than 16 and the result of removing
  the item drops the number of stored items to be less than 25% of the hash
  table's SIZE (rounding down), then reduce the hash table's SIZE by 1/2 and
  rehash everything.
*/

// PASTE AND MODIFY YOUR CODE BELOW

function HashTable() {
  this.SIZE = 16;
  this.count = 0;
  this.storage = new Array(this.SIZE);
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

/**
 * set - Adds given value to the hash table with specified key.
 *
 * - If the provided key has already been used to store another value, simply
 * overwrite the existing value with the new value.
 * - If the hashed address already contains another key/value pair, you must
 * handle the collision appropriately.
 *
 * @param {string} key - key to be used to create hashed address
 * @param {string|number|boolean} value - value to be stored in hash table
 * @return {number} The new number of items stored in the hash table
 */
HashTable.prototype.set = function(key, value) {
  const location = hashCode(key, this.SIZE);

  if (!this.storage[location]) {
    this.storage[location] = new Node(key, value);
    this.count++;
  } else {
    let previous = null;
    let current = this.storage[location];

    while (current) {
      if (current.key === key) {
        current.value = value;
        return this.count;
      }
      previous = current;
      current = current.next
    }

    if (!current) {
      previous.next = new Node(key, value);
    } else {
      current.next = new Node(key, value);
    }

    this.count++;
  }

  if (this.count > Math.floor(0.75 * this.SIZE)) {
    // increase SIZE
    const oldSize = this.SIZE;
    this.SIZE = this.SIZE * 2;
    // collect all nodes
    console.dir(this)
    const nodeCollect = [];
    for (let i = 0; i < oldSize; i++) {
      if (this.storage[i]) {
        let current = this.storage[i];

        while (current) {
          nodeCollect.push(current);
          current = current.next;
        }
      }
    }
    for (let i = 0; i < nodeCollect.length; i++) {
      nodeCollect[i].next = null;
    }
    console.table(nodeCollect);
    // reset storage array and count
    this.storage = [];
    this.count = 0;
    // rehash all nodes
    for (let i = 0; i < nodeCollect.length; i++) {
      this.set(nodeCollect[i].key);
    }
  }

  return this.count;
};

/**
 * get - Retrieves a value stored in the hash table with a specified key
 *
 * - If more than one value is stored at the key's hashed address, then you must
 * retrieve the correct value that was originally stored with the provided key
 *
 * @param {string} key - key to lookup in hash table
 * @return {string|number|boolean} The value stored with the specifed key in the
 * hash table
 */
HashTable.prototype.get = function(key) {
  const location = hashCode(key, this.SIZE);

  if (!this.storage[location]) {
    return undefined;
  } else {
    let current = this.storage[location];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return undefined;
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
  const location = hashCode(key, this.SIZE);

  if (!this.storage[location]) {
    return undefined;
  } else {
    let previous = null;
    let current = this.storage[location];

    if (current.key === key) {
      const value = current.value;

      if (current.next) {
        this.storage[location] = current.next;
      } else {
        this.storage[location] = null;
      }

      this.count--;
      return value;
    }

    while (current && current.key !== key) {
      previous = current;
      current = current.next;
    }

    if (current.hasOwnProperty('key') && current.key === key) {
      if (current.hasOwnProperty('next')) {
        const nextNode = current.next;
        const value = current.value;
        previous.next = nextNode;
        this.count--;
        return value;
      }

    } else {
      return undefined;
    }
  }
};

const ht = new HashTable();

ht.set('thisKey', 56);
ht.set('thatKey', 67);
ht.set('themKeys', 68);
ht.set('whatKey', 68);
ht.set('whichKey', 68);
ht.set('blueKey', 68);
ht.set('redKey', 68);
ht.set('blackKey', 68);
ht.set('whiteKey', 68);
ht.set('meKey', 69);
ht.set('youKey', 69);
ht.set('thoseKey', 69);
ht.set('roseKey', 69);
ht.set('poseKey', 69);
ht.set('toesKey', 69);
ht.set('toesKey', 70);

console.dir(ht);
console.log(ht.count)

console.log(ht.get('thisKey'));

console.log(ht.remove('thatKey'));
console.log(ht.remove('whatKey'));


console.dir(ht);

// YOUR CODE ABOVE

function hashCode(string, size) {
  'use strict';

  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash;  // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
