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

function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;

}
//linked list class
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
  const newNode = new Node(key, value);
  const v = hashCode(key, this.SIZE);
  this.items++

  //check if storage has hashcode
  if (this.storage[v]) {
    this.storage[v].tail.next = newNode;
    this.storage[v].tail = newNode;
    return this.items
  } else {
    this.storage[v] = new LinkedList();
    if (this.storage[v].head === null && this.storage[v].tail === null) {
      this.storage[v].head = newNode;
      this.storage[v].tail = newNode;
      return this.items
    }
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
HashTable.prototype.get = function(key) {
  const v = hashCode(key, this.SIZE);
  let current = this.storage[v].head;
  while (current.key !== key) {
    if (current.next === null) {
      return undefined;
    }
    current = current.next;
  }
  if (current.value !== null) {
    return current.value;
  } else {
    return undefined;
  }
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
  const v = hashCode(key, this.SIZE);



  if (this.storage[v]) {
    if (this.storage[v].head === this.storage[v].tail) {
      let deleted = this.storage[v].head.value;
      this.storage[v].head = null;
      this.storage[v].tail = null;
      return deleted;
    }
    let current = this.storage[v].head;
    while (current.next.key !== key) {
      if (current.next === null) {
        return undefined;
      }
      current = current.next;
    }

    let deleted = current.next.value;
    current.next = current.next.next;
    return deleted;

  } else {
    return undefined;
  }
};


const myhash = new HashTable()
console.log(myhash.set('apple', 10.95))
console.log(myhash.set('elppa', 25));
console.log(myhash.set('lappe', 43))
console.log(myhash.set('ppale', 43));
console.log(myhash.set('leppa', 42));
myhash.set('coding', 'isFun')

console.log(myhash.remove('coding'))

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