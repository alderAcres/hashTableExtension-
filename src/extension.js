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
  this.occupied = 0;
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
  const index = hashCode(key, this.SIZE);
  if (typeof this.storage[index] === 'undefined') {
    this.occupied++;
    if (this.occupied/this.SIZE > .75) {
      this.SIZE *= 2;
      this.occupied = 0;
      const currentItems = this.storage;
      this.storage = new Array(this.size);
      const keyVals = gatherKeyVals(currentItems);
      keyVals.forEach((item) => {
        this.set(item[0], item[1])
      })
    } else {
      this.storage[index] = new Node(key, value)
    }
  } else {
    let currentNode = this.storage[index];

    while(currentNode.next && currentNode.key !== key) currentNode = currentNode.next;

    if (currentNode.key === key) currentNode.value = value
    else currentNode.next = new Node(key, value)
  }
  return this.occupied;
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
  const index = hashCode(key, this.SIZE);
  let currentNode = this.storage[index];

  if (typeof currentNode === 'undefined') return undefined;

  while(currentNode.next && currentNode.key !== key) currentNode = currentNode.next

  if(currentNode.key === key) return currentNode.value
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
  const index = hashCode(key, this.SIZE);
  let previousNode = null;
  let currentNode = this.storage[index]

  if (typeof currentNode === 'undefined') return undefined;

  while(currentNode.next && currentNode.key !== key) {
    previousNode = currentNode;
    currentNode = currentNode.next;
  }

  if (currentNode.key === key) {
    const removedVal = currentNode.value;

    if (previousNode === null) {
      this.storage[index] = currentNode.next === null ? undefined : currentNode.next;
      if (this.storage[index] === undefined) this.occupied--;

      if (this.SIZE > 16 && this.occupied/this.SIZE < .25) {
        this.SIZE /= 2;
        this.occupied = 0;
        const currentItems = this.storage;
        this.storage = new Array(this.size);
        const keyVals = gatherKeyVals(currentItems);
        keyVals.forEach((item) => {
          this.set(item[0], item[1])
        })
      }
    }
    else previousNode.next = currentNode.next;
    return removedVal
  }
  return undefined;
};

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

// YOUR CODE ABOVE
function gatherKeyVals(array) {
  const output = [];
  array.forEach((bucket) => {
    while(bucket) {
      output.push([bucket.key, bucket.value])
      bucket = bucket.next;
    }
  })
  return output;
}

const table = new HashTable;
console.log(table.set('bananas', 0.23))
console.log(table.set('b', 0.50))
console.log(table.set('apples', 0.50))
console.log(table.set('oranges', 0.50))
console.log(table.set('pineapple', 0.50))
console.log(table.set('kiwi', 0.50))
console.log(table.set('dragon fruit', 0.50))
console.log(table.set('pear', 0.50))
console.log(table.set('cantaloupe', 0.50))
console.log(table.set('limes', 0.50))
console.log(table.set('lemons', 0.50))
console.log(table.set('strawberries', 0.50))
console.log(table.set('passion fruit', 0.50))
console.log(table.set('black berries', 0.50))
console.log(table.set('avocado', 0.50))
console.log(table.set('pomegranate', 0.50))
console.log(table.set('mangos', 0.50))
console.log(table.set('grapefruit', 0.50))
console.log(table.set('coconut', 0.50))
console.log(table.set('watermelon', 0.50))
console.log(table.set('grapes', 0.50))
console.log(table.SIZE)
// console.log(table.)
console.log(table.get('grapes'))
console.log(table.remove('oranges', 0.50))
console.log(table.remove('pineapple', 0.50))
console.log(table.remove('kiwi', 0.50))
console.log(table.remove('dragon fruit', 0.50))
console.log(table.remove('pear', 0.50))
console.log(table.remove('cantaloupe', 0.50))
console.log(table.remove('limes', 0.50))
console.log(table.remove('lemons', 0.50))
console.log(table.remove('strawberries', 0.50))
console.log(table.remove('passion fruit', 0.50))
console.log(table.remove('black berries', 0.50))
console.log(table.remove('avocado', 0.50))
console.log(table.remove('pomegranate', 0.50))
console.log(table.remove('mangos', 0.50))
console.log(table.remove('grapefruit', 0.50))
console.log(table.remove('coconut', 0.50))
console.log(table.remove('watermelon', 0.50))
console.log(table.SIZE, table.occupied)
console.log(table.storage)

// console.log(table.SIZE)
// console.log(table.storage, table.occupied)
// console.log(table.set('blac berries', 0.50))
// console.log(table.storage[2])
// console.log(gatherKeyVals([undefined, undefined, table.storage[2]]))

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
