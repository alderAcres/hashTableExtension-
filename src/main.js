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

function LinkedList() {
  this.head = null;
  this.tail = null;
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
HashTable.prototype.set = function(key, value) {
  // get hashed key
  const hashedKey = hashCode(key, this.SIZE);
  // console.log(hashedKey);
  // check if ll exists, otherwise create Linked List and initialize with head
  if (!this.storage[hashedKey]) {
    this.storage[hashedKey] = new LinkedList();
    const ll = this.storage[hashedKey];

    const newNode = new Node(key, value);
    ll.head = newNode;
  } else if (this.storage[hashedKey].head === null) {
    // if head is null
    this.storage[hashedKey].head = new Node(key, value);
  } else {
    // if .head exists, iterate through list
    let current = this.storage[hashedKey].head;

    while (current.next) {
      // check keys; if key exists, overwrite
      if (current.key === key) {
        current.value = value;
        break;
      }
      current = current.next;
    }
    // check final item in Linked List, else append
    if (current.key === key) {
      current.value = value;
    } else {
      // if key does not exist, append to end of linked list
      current.next = new Node(key, value);
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
  const hashedKey = hashCode(key, this.SIZE);

  // check if Linked List at the key exists
  if (this.storage[hashedKey]) {
    // start at the head of the Linked List
    let current = this.storage[hashedKey].head;

    // iterate through Linked List, returning value of hashedkey + unhashed key
    while (current) {
      if (current.key === key) return current.value;
      current = current.next;
    }
  }
  // default to return undefined if nothing found at key
  return undefined;
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
  const hashedKey = hashCode(key, this.SIZE);

  // check if Linked List exists
  if (this.storage[hashedKey]) {
    // iterate through linked list, looking for the same key, keeping track of previous node in list to make removal of node easier

    let current = this.storage[hashedKey].head;
    let prev;

    // if key is found at the head
    if (current.key === key) {
      this.storage[hashedKey].head = current.next;
      return current.value;
    }

    while (current) {
      prev = current;
      current = current.next;
      if (current.key === key) {
        // if key is found elsewhere
        prev.next = current.next;
        return current.value;
      }
    }
  }

  // default undefined
  return undefined;
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

const ht = new HashTable();
ht.set('no u', 'test');
ht.set('heiddd', 'nox');
ht.set('efkhhf', 'yes');
ht.set('efkhhf', 'lemme overwrite');
ht.set('exdddddffggckhhc', 'aye lmao a collision');
console.log(ht.remove('exdddddffggckhhc'));
console.log(ht.remove('no u'));
ht.set('no u', 're add');
console.log(ht.storage);

// Do not remove!!
module.exports = HashTable;
