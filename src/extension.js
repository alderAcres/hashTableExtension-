/* eslint-disable */
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

/*
  1. If the hash table size is greater than equal to 12
  2. Double this.size
  3. Rehash all keys

*/
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
    //handle collisions:
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
  /*
  1. If the storage is 12 or greater
  2. Double the size of the storage
  3. Then run the set function recursively to rehash
  
  */

  // Get the length of the storage
  let currentSize = this.storage.filter((node) => node !== undefined).length;

  // 12 is 75% of the storage
  if (currentSize >= 12) {
    // store the current storage
    const tempStorage = this.storage;
    // double the size of the storage
    this.SIZE = this.SIZE * 2;
    // set the new storage size
    this.storage = new Array(this.SIZE);

    // recursively call set and iterate thru each node to rehash the key
  }

  let index = hashCode(key, this.SIZE);
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
  const index = hashCode(key, this.SIZE);
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
      let temp = this.storage[index].head.next;
      // then set the current head to the next node to overwrite the current head
      this.storage[index].head = temp;
    } else {
      // if the this head doesn't contain any next node
      // delete the current storage index
      delete this.storage[index];
    }
  }
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
