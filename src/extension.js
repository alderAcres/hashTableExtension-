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
  this.size = 0;

  this.storage = new Array(this.SIZE);
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
}

function LinkedList() {
  this.head = null;
}

Node.prototype.find = function find(key) {
  if (this.key === key) {
    return this;
  } else if (this.next === null) {
    return false;
  }
  return this.next.find(key);
};

Node.prototype.add = function add(key, value) {
  if (this.next === null) {
    this.next = new Node(key, value);
    return;
  }
  this.next.add(key, value);
};

LinkedList.prototype.remove = function remove(key) {
  if (!this.head || !this.head.find(key)) return [undefined, false];

  let currentNode = this.head;
  if (currentNode.key === key) {
    this.head = this.head.next;
    return [currentNode.value, true];
  }
  while (currentNode.next.key !== key) {
    currentNode = currentNode.next;
  }
  const temp = currentNode.next.value;
  currentNode.next = currentNode.next.next;
  return [temp, true];
};

LinkedList.prototype.find = function find(key) {
  if (!this.head) return undefined;
  return this.head.find(key);
};

LinkedList.prototype.add = function add(key, value) {
  if (!this.head) {
    this.head = new Node(key, value);
    return;
  }

  this.head.add(key, value);
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
HashTable.prototype.set = function set(key, value) {
  if (typeof key !== 'string') {
    key = JSON.stringify(key)
  }
  const location = hashCode(key, this.SIZE);

  if (
    this.size / this.SIZE >= 0.75
    && (!this.storage[location] || !this.storage[location].find(key))
  ) {
    this.SIZE *= 2;
    const tempStorage = new Array(this.SIZE).fill(null);
    for (let i = 0; i < this.SIZE; i += 1) {
      tempStorage[i] = new LinkedList();
    }
    this.storage.forEach(function (linkedList) {
      while (linkedList.head) {
        const newLocation = hashCode(linkedList.head.key, this.SIZE);
        tempStorage[newLocation].add(linkedList.head.key, linkedList.head.value);
        linkedList.head = linkedList.head.next;
      }
    });
    this.storage = tempStorage;
  }


  if (!this.storage[location]) {
    this.storage[location] = new LinkedList();
    this.storage[location].add(key, value);
    this.size += 1;
    return this.size;
  } else if (this.storage[location].find(key)) {
    this.storage[location].find(key).value = value;
    return this.size;
  }

  this.storage[location].add(key, value);
  this.size += 1;
  return this.size;
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
HashTable.prototype.get = function get(key) {
  if (typeof key !== 'string') {
    key = JSON.stringify(key);
  }
  const location = hashCode(key, this.SIZE);
  if (!this.storage[location] || !this.storage[location].find(key)) {
    return undefined;
  }

  return this.storage[location].find(key).value;
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function remove(key) {
  if (typeof key !== 'string') {
    key = JSON.stringify(key);
  }
  const location = hashCode(key, this.SIZE);
  if (!this.storage[location]) return undefined;

  if (
    this.size / this.SIZE <= 0.25
    && (this.storage[location].find(key))
  ) {
    this.SIZE /= 2
    const tempStorage = new Array(this.SIZE).fill(null)
    for (let i = 0; i < this.SIZE; i += 1) {
      tempStorage[i] = new LinkedList();
    }
    this.storage.forEach(function (linkedList) {
      while (linkedList.head) {
        const newLocation = hashCode(linkedList.head.key, this.SIZE);
        tempStorage[newLocation].add(linkedList.head.key, linkedList.head.value);
        linkedList.head = linkedList.head.next;
      }
    });
    this.storage = tempStorage;
  }

  const [item, success] = this.storage[location].remove(key);
  if (success) {
    this.size -= 1;
    return item;
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
    hash = ((hash << 5) - hash) + letter;
    hash = hash & hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;
