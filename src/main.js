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
  this.total = 0;
}

// create a node class that will be added to the hash table
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

HashTable.prototype.set = function(key, value) {
  // hash the key, which will return a number for the bucket
  const index = hashCode(key, this.SIZE);

  // check if curNode, exists. If not, add a new node and return;
  if (!this.storage[index]) {
    this.storage[index] = new Node(key, value);
    this.total += 1;
    return this.total;
  }

  // declare a curNode variable
  let curNode = this.storage[index];

  // use a while loop to go through the linked list
  while (curNode) {
    // check whether the given key already exists in the bucket
    if (curNode.key === key) {
      // replace value if key already exists
      curNode.value = value;
      // since we are not creating any new nodes, return the original total number
      return this.total;
    }

    // if we hit the tail node, exit before reassigning tail node to null
    if (!curNode.next) break;

    // increment curNode to next node
    curNode = curNode.next;
  }

  // if we passed the while loop, it means given key does not exist
  // curNode is now assigned to the tail node

  // add a new node and assign origial tail node.next to newly created node
  curNode.next = new Node(key, value);

  // increment this.total then return
  this.total += 1;
  return this.total;
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
  // retrieves a value stored in the hash with given key

  // first, hash the key to find the index
  const index = hashCode(key, this.SIZE);

  // goto storage.contents[index] to check whether key exists
  // if bucket is empty, return 'Key not found'
  if (!this.storage[index]) return 'Key not found';

  // traverse through the linked list using a while loop
  // while(curNode) check to see if curNode.key === key
  let curNode = this.storage[index];
  while (curNode) {
    // if so, return curNode.value
    if (curNode.key === key) return curNode.value;
    // if curNode.next is null, return 'Key not found'

    if (curNode.next === null) return 'Key not found';

    // increment curNode to curNode.next
    curNode = curNode.next;
  }

  // if for whatever reason, we reach to this point
  // return 'Key not found'
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
  // run the hashcode on key and find index
  const index = hashCode(key, this.SIZE);
  let removedVal;

  // if !storage[index], return undefined
  if (!this.storage[index]) return undefined;

  let curNode = this.storage[index];

  // if head node's key is equal to given key
  if (curNode.key === key) {
    removedVal = curNode.value;
    // if so, remove head node and return value of the removed node
    this.storage[index] = curNode.next;
    return removedVal;
  }

  // traverse through linked list to find node with given key
  while (curNode) {
    // unlike get and set, we compare key with curNode.next.value
    // if key === curNode.next.key,
    if (curNode.next.key === key) {
      removedVal = curNode.next.value;

      // if curNode.next.next is null, curNode.next is null. It's the tail node. return the deleted value.
      if (!curNode.next.next) {
        curNode.next = null;
        return removedVal;
      }

      // if curNode.next.next is not null, point curNode to curNode.next.next. Then return the deleted value.
      curNode.next = curNode.next.next;
      return removedVal;
    }

    curNode = curNode.next;
  }

  // after traversing the linked list, if key is not found, return undefined;
  return undefined;
};

// const hash = new HashTable();
// console.log(hash.set('one', true));
// console.log(hash.set('jkhsec', false));
// console.log(hash.storage);
// console.log(hash.get('one'));
// console.log(hash.get('jkhsec'));
// console.log(hash.remove('jkhsec'));
// console.log(hash.storage[6]);

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
