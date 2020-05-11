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
/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.totalItems = 0;
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
HashTable.prototype.set = function(key, value) {
  // find hashed key 
  const hashedKey = hashCode(key, this.SIZE);
  // if empty, create object to store data
  if (!this.storage[hashedKey]) {
    this.storage[hashedKey] = {};
  }
  // add key/value pair to hash
  this.storage[hashedKey][key] = value;
  // increment total items and return
  this.totalItems += 1;

  // if items >75% rehash
  if (this.totalItems >= this.SIZE * .75) this.doubleSize();


  return this.totalItems;

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
  // find hashedkey and return item from storage
  const hashedKey = hashCode(key, this.SIZE);
  return this.storage[hashedKey][key];
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
  // find hashedkey and store 
  const hashedKey = hashCode(key, this.SIZE);
  // store value to return
  const removed = this.get(key);
  // delete key/value pair
  delete this.storage[hashedKey][key];
  // decrement total items  and return value
  this.totalItems -= 1;

  // if total items < 25% of size reducesize
  if (this.totalItems < Math.floor(this.SIZE * .25)) this.reduceSize();

  return removed;
};

HashTable.prototype.doubleSize = function() {
  // use map to create queue and make it more readable

  // remove all items and add to queue
  const queue = [];
  // for each hash, 
  for (let i = 0; i < this.SIZE; i += 1) {
    // push every item to the queue
    for (let key in this.storage[i]) {
      let item = {};
      item[key] = (this.remove(key));
      queue.push(item);
    }
  }
  // double size
  this.SIZE += this.SIZE;
  this.storage = new Array(this.SIZE);
  // add all elements from queue
  for (let i = 0; i < queue.length; i += 1) {
    item = queue[i];
    this.set(Object.keys(item)[0], item[Object.keys(item)[0]])
  }
}

HashTable.prototype.reduceSize = function() {
  // remove all items and add to queue
  const queue = [];
  // for each hash, 
  for (let i = 0; i < this.SIZE; i += 1) {
    // push every item to the queue
    for (let key in this.storage[i]) {
      let item = {};
      item[key] = (this.remove(key));
      queue.push(item);
    }
  }
  // reduce size
  this.SIZE /= 2;
  console.log (this.SIZE)

  this.storage = new Array(this.SIZE);
  // add all elements from queue
  for (let i = 0; i < queue.length; i += 1) {
    item = queue[i];
    this.set(Object.keys(item)[0], item[Object.keys(item)[0]])
  }
}
  
  



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

const table = new HashTable;
table.set('tom', 5)
table.set('tom', 6)
table.set('bob', 7)
table.set('abc', 12)
table.set('aaa', 15)
table.set('bbb', 97)
table.set('are', [1,2,4])
table.set('hfsd', {asdf: 16})
table.set('qwer', 0)
table.set('zxc', 10)
table.set('111', 7)
table.set('222', 12)
table.set('333', 15)
table.set('444', 97)
table.remove('444')
table.remove('333')
table.remove('222')
table.remove('111')


console.log(table)
console.log(table.storage)
// console.log(table.remove('hfsd'))
// console.log(table.remove('tom'))
// console.log(table.remove('zxc'))
// console.log(table.remove('bbb'))
console.log(table)


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
