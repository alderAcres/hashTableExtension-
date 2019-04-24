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

/* eslint-disable func-names */
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

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

HashTable.prototype.increaseSize = function () {
  this.SIZE *= 2;
  for (let i = 0; i < this.SIZE; i++) {
    if (this.storage[i]) {
      let newIndex = hashCode(this.storage[i].key, this.SIZE);
      this.storage[newIndex] = this.storage[i];
      this.storage[i] = undefined;
    }
  }
}

HashTable.prototype.countValues = function () {
  let count = 0;
  this.storage.forEach((value) => {
    if (value !== undefined) {
      count += 1;
      let currentNode = value;
      while (currentNode.next) {
        count += 1;
        currentNode = currentNode.next;
      }
    }
  });
  return count;
};

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
  let count = this.countValues();
  if (count / this.SIZE >= 0.75) this.increaseSize();
  const node = new Node(key, value);
  if (this.storage[index] === undefined) {
    this.storage[index] = node;
    count += 1;
  } else {
    let currentNode = this.storage[index];
    while (currentNode.next) { 
      if (currentNode.key === key) {
        currentNode.value = value;
        break;
      }
      currentNode = currentNode.next; 
    }
    if (currentNode.key === key) {
      currentNode.value = value;
    } else {
      currentNode.next = node;
      count += 1;
    }
  }
  return count;
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
  if (this.storage[index] === undefined) return 'No value found for passed in key';
  let node = this.storage[index];
  while (node) {
    if (node.key === key) return node.value;
    node = node.next;
  }
  return 'No value found for passed in key';
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
  if (this.storage[index] === undefined) return 'No value found for passed in key';
  let node = this.storage[index];
  let previousNode = null;
  while (node) {
    if (node.key === key) {
      const temp = node.value;
      if (previousNode) previousNode.next = node.next;
      else this.storage[index] = undefined;
      return temp;
    }
    previousNode = node;
    node = node.next;
  }
};


// Do not modify
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

// Tests
function assertObjectEquals(expected, actual, testName) {
  if (JSON.stringify(expected) === JSON.stringify(actual)) {
    return console.log(`Passed “${testName}”`);
  }
  return console.log(`Failed ${testName}: Expected “${expected}” to sort of equal “${actual}”`)
}

const table = new HashTable();
table.set('Conor', '{age: 25}');

assertObjectEquals(2, table.set('Nolan', '{age: 24}'), 'set method should return total values stored');
table.set('Conor', '{age: 26}')
assertObjectEquals('{age: 26}', table.get('Conor'), 'should overwrite values with same key');
assertObjectEquals('{age: 24}', table.get('Nolan'), 'should return value for passed in key');
assertObjectEquals('No value found for passed in key', table.get('Shea'), 'should throw error for invalid key');
assertObjectEquals('{age: 26}', table.remove('Conor'), 'should return removed key’s value');
assertObjectEquals('No value found for passed in key', table.get('Conor'), 'should remove node from table index');


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
