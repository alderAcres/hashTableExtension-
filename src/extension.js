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

  this.storage = new Array(this.SIZE);
  this.stored = 0;
}
function Node(key, value) {
  this.key = key;
  this.value = value;
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

// using a linkedlist implementation to handle collisions
HashTable.prototype.set = function (key, value) {
  const index = hashCode(key, this.SIZE);
  // if nothing stored in this index, then create a new node
  if (!this.storage[index]) this.storage[index] = new Node(key, value);
  else {
    // there is already something here, so find the end of the linked list
    // and a new node to the end of the linked list
    let node = this.storage[index];
    while (node.next) node = node.next;
    node.next = new Node(key, value);
  }
  // if stored !>75%, just return ++stored
  // otherwise double the size then rehash everything (hard in a linked list?)
  this.stored++;
  this.checksize();
  return this.stored;
};

HashTable.prototype.checksize = function () {
  if (this.stored > Math.ceil(this.SIZE * 0.75)) {
    // make a new storage, caching the old storage for now
    // this could all be a new helper function
    const oldStorage = JSON.parse(JSON.stringify(this.storage));
    this.size *= 2;
    this.storage = new Array(this.size);
    // go through every index of the old storage, rehashing the keys and adding them to the newStorage with the set function
    oldStorage.foreEach((node) => {
      while (node) {
        this.set(node.key, node.value);
        node = node.next;
      }
    });
  } else if (this.stored < Math.ceil(this.SIZE * 0.25) && this.size > 16) {
    const oldStorage = JSON.parse(JSON.stringify(this.storage));
    this.size /= 2;
    this.storage = new Array(this.size);
    oldStorage.foreEach((node) => {
      while (node) {
        this.set(node.key, node.value);
        node = node.next;
      }
    });
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
HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.size);
  if (!this.storage[index]) return undefined; // if nothing in the index, return undefined
  let node = this.storage[index];
  // cycle through nodes until you find the key or at end of list
  while (node.key !== key && node) node = node.next;
  // if node isn't null, that means node.key === key, otherwise we're at the end of the list
  return node ? node.value : undefined;
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
  const index = hashCode(key, this.size);
  if (!this.storage[index]) return undefined; // if nothing in the index, can't remove
  let node = this.storage[index];
  // if the key is in the first node
  if (node.key === key) {
    // if no other nodes, then set the index to undefined and return the node
    if (!node.next) {
      const found = node;
      this.storage[index] = undefined;
      this.stored--;
      this.checksize();
      return found.value;
    }
    // else make the next node the first element in the hashtable
    this.storage[index] = node.next;
    this.stored--;
    this.checksize();
    return node.value;
  }

  // first node !== key and there are collisions
  while (node.next.key !== key && node.next) {
    node = node.next;
  }
  if (!node.next) return undefined; // walked through the entire linked list and haven't seen it
  // node.next has the key
  const found = node.next;
  node.next = found.next;
  this.stored--;
  this.checksize();
  return found.value;
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
