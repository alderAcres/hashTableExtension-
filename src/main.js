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

function Linked() {
  this.head = null;
  this.tail = null;
}

function Nodes(key, val) {
  this.value = val;
  this.key = key;
  this.next = null;
}

Linked.prototype.push = function (key, val) {
  const newNode = new Nodes(key, val);
  if (this.head === null) {
    this.head = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }
};

Linked.prototype.get = function (key) {
  let current = this.head;
  if (this.tail.key === key) { return this.tail.value; }

  while (current !== null) {
    if (current.key === key) {
      return current.value;
    } else {
      current = current.next;
    }
  }
};

Linked.prototype.contains = function (key) {
  let current = this.head;

  while (current !== null) {
    if (current.key === key) {
      return true;
    } else {
      current = current.next;
    }
  }

  return false;
};

Linked.prototype.removeKey = function (key) {
  let current = this.head;
  let previous;
  if(this.head.key === key && this.head.next === null){
    this.head = null;
    this.tails = null;
  }

  while (current.next !== null) {
    if (current.key === key) {
      previous.next = current.next;
    } else {
      previous = current;
      current = current.next;
    }
  }
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
  const code = hashCode(key, this.SIZE);
  if (this.storage[code] === undefined) {
    this.storage[code] = new Linked();
    this.storage[code].push(key, value);
  } else {
    this.storage[code].push(key, value);
  }

  return this;
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
  const code = hashCode(key);
  const link = this.storage[code];
  const value = link.get(key);

  return value;
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
  const code = hashCode(key);
  const link = this.storage[code];
  if (link.contains(key) === false) {
    return undefined;
  } else {
    const value = link.get(key);
    link.removeKey(key);
  }

  return value;
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

// Do not remove!!
module.exports = HashTable;
