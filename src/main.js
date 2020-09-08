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

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(key, val) {
  this.key = key;
  this.value = val;
  this.next = null;
}

LinkedList.prototype.push = function (key, value) {
  if (!this.head) {
    this.head = new Node(key, value);
  } else {
    let current = this.head;
    // handle collisions:
    while (current) {
      if (current.key === key) {
        current.value = value;
        return current.value;
      }
      if (!current.next) {
        current.next = node;
        return current.next;
      }
      current = current.next;
    }
  }
};

LinkedList.prototype.contains = function (key) {
  let current = this.head;
  while (current) {
    if (current.key === key) {
      return current.value;
    }
    current = current.next;
  }
  return false;
};

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
  const index = hashCode(key, this.SIZE);
  if (!this.storage[index]) this.storage[index] = new LinkedList();
  this.storage[index].push(key, value);
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
  if (this.storage[index]) return this.storage[index].contains(key);
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
  const index = this.hashCode(key, this.SIZE);
  let containsKey;

  // check if the storage at the index exist
  if (this.storage[index]) {
    // store the value into contains key
    containsKey = this.storage[index].contains(key);
  } else {
    return undefined;
  }

  if (containsKey) {
    // check if the current head is pointing to anywhere
    if (this.storage[index].head.next) {
      // if it is, set it to a temp variable
      const temp = this.storage[index].head.next;
      // then set the current head to the next node to overwrite the current head
      this.storage[index].head = temp;
    } else {
      // if the this head doesn't contain any next node
      // delete the current storage index
      delete this.storage[index];
    }
  }
};

// Do not remove!!
module.exports = HashTable;
