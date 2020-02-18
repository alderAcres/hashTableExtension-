// ONLY STARTED WORKING ON GET METHOD

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
  this.number = 0;
  this.storage = new Array(this.SIZE);
}

function List() {
  this.head = null;
}

function Node(key, value) {
  this[key] = value;
  this.next = null;
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

// 1. set:
// - If adding the new item will push the number of stored items to over 75% of
//   the hash table's SIZE, then double the hash table's SIZE and rehash everything
HashTable.prototype.set = function(key, value) {
  // Hash the key to find the index
  // If the index is undefined, create a list, create a new node, and place the new node at the head
  // If there's already a list, traverse it until you find the last node (this.next === null), then set the node

  // OVERWRITE EXISTING VALUES
  // If the key already exists while searching through nodes, simply overwrite the value with the new one (this is the only part that seems to not be working)

  // NEW CHANGES:
  // if a new node will be added, and number + 1 is more than 75% of size:
  // Create a variable for the current size
  // double the size of the hash table
  // Loop through each index, get the key of the first node, rehash it, and move the list to its proper location
  // Add the node:
  // (Call the function again)

  let hashIndex = hashCode(key, this.SIZE);
  let newNode = new Node(key, value);
  if (this.storage[hashIndex] === undefined) {
    let newList = new List();
    this.storage[hashIndex] = newList;
    newList.head = newNode;
  } else {
    let currentNode = this.storage[hashIndex].head;
    while (currentNode.next) {
      if (currentNode[key]) {
        currentNode[key] = value;
      } else currentNode = currentNode.next;
    }
    if (!currentNode[key] && this.number++ > this.SIZE * 0.75) {
      resizeTable();
      this.set(key, value);
    } else if (!currentNode[key]) {
      currentNode.next = newNode;
      this.number++;
    }
  }
  return this.number;
};

function resizeTable() {
  let origSize = this.SIZE;
  this.SIZE *= 2;
  for (let i = 0; i < origSize; i++) {
    if (this.storage[i]) {
      let list = this.storage[i];
      let key = Object.keys(this.storage[i].head)[0];
      let rehashed = hashCode(key, this.SIZE);
      delete list;
      this.storage[rehashed] = list;
    }
  }
}

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
  // hash the key to get the index
  // Access the first node of the index (creating a variable for the current node)
  // Use a while loop to check each node of the list for the key in question
  // Return the value when the matching key is found
  // Otherwise return 'key not found' or something similar
  let hashIndex = hashCode(key, this.SIZE);
  let currentNode = this.storage[hashIndex].head;
  while (currentNode.next) {
    if (currentNode[key]) {
      return currentNode[key];
    } else {
      currentNode = currentNode.next;
    }
  }
  return 'Key not found';
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
  // Get the index by hashing the key
  // Create a variable for the currentNode, equal to the first node (head) for the index
  // Create a variable for the previous node
  // Take care of an edge case: if the key is found in the head node
  // Keep moving (with a while loop) until the key is found
  // update the prevNode variable
  // set the value of previousNode.next to currentNode.next
  // Delete currentNode
  // Return undefined otherwise
  let hashIndex = hashCode(key, this.SIZE);
  let currentNode = this.storage[hashIndex].head;
  let prevNode;
  // If the current node is the head:
  if (currentNode[key] && currentNode === this.storage[hashIndex].head) {
    this.storage[hashIndex].head = currentNode.next;
    delete currentNode;
    this.number--;
    return currentNode[key];
  }
  while (currentNode.next) {
    if (currentNode[key]) {
      prevNode.next = currentNode.next;
      delete currentNode;
      this.number--;
      return currentNode[key];
    }
    prevNode = currentNode;
    currentNode = currentNode.next;
  }
  return undefined;
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
