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
/*
brainstorm:
keep track of a global capacity, for set method, immediately check if adding capacity+1, will tip off global 75% limit, if so, call reset function
double and rehash function
in an array, traverse entire hash table and place in array, X ordering
double the size of the array globally
iterate throught the array and continually call set function on elem

remove, same but shrink method with 1/2 size

*/
function HashTable() {
  this.SIZE = 16;
  this.capacity = 0;
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
  this.capacity++;
};

HashTable.prototype.grow = function () {};

HashTable.prototype.shrink = function () {};
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
  this.capacity--;
  return returnVal;
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

let table = new HashTable();
table.set(1, 1);
table.set(2, 2);
table.set(3, 3);
table.set(4, 4);
table.remove(4);
table.remove(3);
console.log(table.capacity);
// Do not remove!!
module.exports = HashTable;
