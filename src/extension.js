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

  this.storage = new Array(this.SIZE);
  this.rehashingInProgress = false;
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

  let currentUtil = 0;
  this.storage.forEach(() => {
    currentUtil += 1;
  });

  if (currentUtil / this.SIZE >= 0.75 && this.rehashingInProgress === false) {
    this.rehashingInProgress = true;
    // console.log(currentUtil / this.SIZE);
    const oldData = this.storage;
    this.SIZE = this.SIZE * 2;
    this.storage = new Array(this.SIZE);
    // console.log(this.storage.length);

    // iterate through each linked list in the old data
    oldData.forEach((list) => {
      // if the linked list's head is not null, iterate through, rehashing keys and appending appropriately
      if (list.head) {
        let current = list.head;

        while (current) {
          this.set(current.key, current.value);
          current = current.next;
        }
      }
    });
    this.rehashingInProgress = false;
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
  let toReturn;

  // check if Linked List head exists
  if (this.storage[hashedKey].head) {
    // iterate through linked list, looking for the same key, keeping track of previous node in list to make removal of node easier

    let current = this.storage[hashedKey].head;
    let prev;

    // if key is found at the head
    if (current.key === key) {
      this.storage[hashedKey].head = current.next;
      toReturn = current.value;
    }

    while (current.next) {
      prev = current;
      current = current.next;
      if (current.key === key) {
        // if key is found elsewhere
        prev.next = current.next;
        toReturn = current.value;
      }
    }
  }

  let currentUtil = 0;
  this.storage.forEach((val) => {
    if (val.head !== null) currentUtil += 1;
  });
  if (
    currentUtil / this.storage.length <= 0.25 &&
    this.storage.length > 16 &&
    this.rehashingInProgress === false
  ) {
    console.log('DOWNSIZING');
    this.rehashingInProgress = true;

    const oldData = this.storage;
    this.SIZE = this.SIZE / 2;
    this.storage = new Array(this.SIZE);
    console.log(this.storage.length);
    // console.log(this.storage.length);

    // iterate through each linked list in the old data
    oldData.forEach((list) => {
      // if the linked list's head is not null, iterate through, rehashing keys and appending appropriately
      if (list.head) {
        let current = list.head;

        while (current) {
          this.set(current.key, current.value);
          current = current.next;
        }
      }
    });
    this.rehashingInProgress = false;
  }

  // default undefined
  return toReturn;
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

// const ht = new HashTable();
// ht.set('noffe u', 'test');
// ht.set('a', 'test');
// ht.set('ab', 'test');
// ht.set('abc', 'test');
// ht.set('abcd', 'test');
// ht.set('abcde', 'test');
// ht.set('abcdef', 'test');
// ht.set('abcdefg', 'test');
// ht.set('abcdefgh', 'test');
// ht.set('abcdefghi', 'test');
// ht.set('abcdefghij', 'test');
// ht.set('abcdefghijk', 'test');
// ht.set('abcdefghijklm', 'test');
// ht.set('heiddd', 'nox');
// ht.set('efkhhf', 'yes');
// ht.set('efkhhf', 'lemme overwrite');
// ht.set('exdddddffggckhhc', 'aye lmao a collision');
// ht.remove('abcdefghijklm');
// ht.remove('abcdefghijkl');
// ht.remove('abcdefghijk');
// ht.remove('abcdefghij');
// ht.remove('abcdefghi');
// ht.remove('abcdefgh');
// ht.remove('abcdefg');
// ht.remove('abcdef');
// ht.remove('abcde');
// ht.remove('abcd');
// ht.remove('abc');
// ht.remove('ab');
// ht.remove('a');
// // console.log(ht.remove('exdddddffggckhhc'));
// // console.log(ht.remove('efkhhf'));
// ht.set('no u', 're add');
// console.log(ht.storage);

// Do not remove!!
module.exports = HashTable;
