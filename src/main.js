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
  this.items = 0;
}

function HashNode(key, value) {
  (this.key = key), (this.value = value);
  this.next = null;
}

function HashLinkedList() {
  this.head = null;
  this.tail = null;
}

HashLinkedList.prototype.push = function(key, value) {
  const newNode = new HashNode(key, value);
  let curr = this.head;
  if (!curr) {
    this.head = newNode;
    this.tail = newNode;
    return this;
  }
  let prev;
  while (curr) {
    if (curr.key === key) {
      curr.value = value;
      return this;
    }
    prev = curr;
    curr = curr.next;
  }
  curr = newNode;
  prev.next = curr;
  this.tail = newNode;

  return this;
};

HashLinkedList.prototype.get = function(key) {
  let curr = this.head;
  while (curr) {
    if (curr.key === key) {
      return curr.value;
    }
    curr = curr.next;
  }
  return 'key not found';
};

HashLinkedList.prototype.remove = function(key) {
  let curr = this.head;
  let prev;
  if (curr) return 'nothing to remove';
  if (!curr.next) {
    this.head = null;
    this.tail = null;
    return;
  }
  while (curr) {
    if (curr.key === key) {
      const returned = curr.value;
      if (curr === this.head) {
        this.head = curr.next;
        return returned;
      }
      if (curr === this.tail) {
        this.tail = prev;
        return returned;
      }
      prev.next = curr.next;
      return returned;
    }
    prev = curr;
    curr = curr.next;
  }
  return undefined;
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
  if (!this.storage[index]) {
    this.storage[index] = new HashLinkedList();
  }
  this.items += 1;
  this.storage[index].push(key, value);
  return this.items;
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
  return this.storage[index].get(key);
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
  return this.storage[index].remove(key);
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
