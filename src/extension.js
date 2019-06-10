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

function HashTable(size = 16) {
  this.SIZE = size;
  this.itemCount = 0;
  this.storage = new Array(this.SIZE);
}

function Node (val, key) {
  this.val = val;
  this.key = key;
  this.next = null;
}

HashTable.prototype.getStorage = function getStorage() {
  return this.storage;
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
HashTable.prototype.set = function set(key, value) {
  let newKey = hashCode(key, this.SIZE);

  // check if undefined...
  if (this.storage[newKey] === undefined) {
    this.storage[newKey] = new Node(value, key);
    this.itemCount++;
    if (this.itemCount > .75 * this.SIZE) {
      this.resizeUp();
    }
    return;
  }
  let linkedNode = this.storage[newKey];
  while (linkedNode.next) {
    linkedNode = linkedNode.next;
  }
  linkedNode.next = new Node(value, key);
  this.itemCount++;
  if (this.itemCount > .75 * this.SIZE) {
    this.resizeUp();
  }
  return;

};

HashTable.prototype.resizeUp = function resizeUp() {
  console.log('calling resize up')
  let newHash = new HashTable(this.SIZE * 2);
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i] !== undefined) {
      let linkedNode = this.storage[i];
      while (linkedNode) {
        if (linkedNode.key !== undefined) {
          newHash.set(linkedNode.key, linkedNode.val);
        }
        linkedNode = linkedNode.next;
      }
    }
  }
  this.SIZE = this.SIZE * 2;
  this.storage = [...newHash.getStorage()];
  return;
}

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
  let newKey = hashCode(key, this.SIZE);
  if (typeof this.storage[newKey] !== 'object') {
    return this.storage[newKey];
  }
  let linkedNode = this.storage[newKey];
  while (linkedNode) {
    if (linkedNode.key === key) {
      return linkedNode.val;
    }
    linkedNode = linkedNode.next;
  }
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
HashTable.prototype.remove = function remove(key) {
  // console.log('called remove on ',key)
  // console.log('remove expects size to be',this.SIZE)
  let newKey = hashCode(key, this.SIZE);
  if (this.storage[newKey] === undefined) {
    // console.log('could not find item under key')
    return undefined;
  }
  let linkedNode = this.storage[newKey];
  if (!linkedNode.next) {
    this.storage[newKey] = undefined;
    this.itemCount--;
    if (this.itemCount < .25 * this.SIZE) {
      return this.resizeDown();
    }
  }
  while (linkedNode) {
    if (linkedNode.key === key) {
      linkedNode.key = undefined;
      // console.log('new item count',this.itemCount)
      this.itemCount--;
      if (this.itemCount < .25 * this.SIZE) {
        return this.resizeDown();
      }
    }
    linkedNode = linkedNode.next;
  }
  return undefined;
};

HashTable.prototype.resizeDown = function resizeDown() {
  console.log('calling resize down')
  let newSize = Math.ceil(this.SIZE / 2);
  let newHash = new HashTable(newSize);
  for (let i = 0; i < this.storage.length; i++) {
    if (this.storage[i] !== undefined) {
      let linkedNode = this.storage[i];
      while (linkedNode) {
        if (linkedNode.key !== undefined) {
          newHash.set(linkedNode.key, linkedNode.val);
        }
        linkedNode = linkedNode.next;
      }
    }
  }
  this.storage = newHash.getStorage();
  this.SIZE = newSize;
  return;
}




// TESTS // 

let myHash = new HashTable();
for (let i = 0; i < 17; i++) {
  myHash.set(`${i}`,`string${i}`)
}
console.log(myHash);
for (let i = 0; i < 15; i++) {
  myHash.remove(`${i}`)
}
console.log(myHash);
// myHash.set('lance',7)
// console.log(myHash.get('lance'))
// console.log(myHash.get('8'))
// console.log(myHash.remove('8'))
// console.log(myHash.get('8'))
// myHash.remove('lance');
// console.log(myHash.get('lance'))
// console.log(myHash.set('lance', 5))
// console.log(myHash.get('lance'))
// console.log(myHash)

// END OF TESTS //

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
