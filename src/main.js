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

function Node(key, val) {
  this.key = key;
  this.val = val;
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
HashTable.prototype.set = function (key, value) {
  //get hashed key
  let hashed = hashCode(key, 16);
  //create node
  let node = new Node(key, value);
  //check if index available
  //if not, set to node
  if (!this.storage[hashed]) {
    this.storage[hashed] = node;
  } else {
    //if so, access the last ll node, set last ll node.next to node
    let current = this.storage[hashed];
    while (current.next) {
      current = current.next;
    }
    current.next = node;
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
  //get hashed key
  let hashed = hashCode(key, 16);
  //check if index available
  //if not, no val, return undefined
  if (!this.storage[hashed]) return undefined;
  //if so, iterate through ll and return ll.val
  let current = this.storage[hashed];
  while (current) {
    if (current.key === key) return true;
    current = current.next;
  }
  //if not return false
  return false;
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
  //get hashed key
  let hashed = hashCode(key, 16);
  //check if index available
  //if not, no val, return undefined
  if (!this.storage[hashed]) return undefined;
  let returnVal = undefined;
  //if so, check if single node (current.next === null), save val in returnVal and set to undefined
  if (!this.storage[hashed].next) {
    returnVal = this.storage[hashed].val;
    this.storage[hashed] = undefined;
  } else {
    //if multiple nodes, set prev and cur pointer, once cur pointer reaches val, sav returnVal and set prev.next to cur.next
    let prev = this.storage[hashed];
    let cur = this.storage[hashed].next;
    while (cur) {
      if (cur.key === key) {
        returnVal = cur.val;
        prev.next = cur.next;
        break;
      }
      prev = prev.next;
      cur = cur.next;
    }
  }
  //if cur reaches end, return returnVal
  return returnVal;
};

// Do not modify
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
