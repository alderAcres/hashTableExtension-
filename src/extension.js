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
  this.elementsCount = 0;
  
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.reset = function() {
  let newStorage = new Array(this.size);
  
  for (let obj of this.storage) {
    for (let key in obj) {
      let index = hashCode(key, this.SIZE);
      if (newStorage[index] === undefined) {
        newStorage[index] = {};
      }
    
      newStorage[index][key] = obj[key];
    }
  }
  this.storage = newStorage;
}

HashTable.prototype.checkSize = function() {
  let percentage = this.elementsCount / this.SIZE;

  //check percentage and resize accoringly, call reset to reassign storage;
  if (percentage > .75) {
    this.SIZE = this.SIZE * 2;
    this.reset();
  } else if (percentage < .25 && this.SIZE > 16) {
    this.SIZE = this.SIZE / 2;
    this.reset();
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

// 1. set:
//       - If adding the new item will push the number of stored items to over 75% of
//         the hash table's SIZE, then double the hash table's SIZE and rehash everything

HashTable.prototype.set = function(key, value) {
  let index = hashCode(key, this.SIZE);
  if (this.storage[index] === undefined) {
    this.storage[index] = {};
  }

  this.storage[index][key] = value;
  this.elementsCount += 1;
  this.checkSize();
  return this.elementsCount;
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
  let index = hashCode(key, this.SIZE);
  return this.storage[index][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/

//   2. remove:
//       - If the hash table's SIZE is greater than 16 and the result of removing the
//         item drops the number of stored items to be less than 25% of the hash table's SIZE
//         (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.

HashTable.prototype.remove = function(key) {
  let index = hashCode(key, this.SIZE);
  let value = this.storage[index][key];
  if (value !== undefined) {
    delete this.storage[index][key];
    this.elementsCount -= 1;
  }
  this.checkSize();
  return value;
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

// let myHash = new HashTable();
// console.log(myHash.set('key1','value1'));
// console.log(myHash.set('key2','value2'));
// console.log(myHash.set('key3','value3'));
// console.log(myHash.set('key4','value4'));
// console.log(myHash.set('key5','value5'));
// console.log(myHash.set('key6','value6'));
// console.log(myHash.set('key7','value7'));
// console.log(myHash.set('key8','value8'));
// console.log(myHash.set('key9','value9'));
// console.log(myHash.set('key10','value10'));
// console.log(myHash.set('key11','value11'));
// console.log(myHash.set('key12','value12'));
// console.log(myHash.set('key13','value13'));
// console.log(myHash.set('key14','value14'));
// console.log(myHash.set('key15','value15'));
// console.log(myHash.set('key16','value16'));
// console.log(myHash.set('key17','value17'));
// console.log(myHash.set('key18','value18'));
// console.log(myHash.set('key19','value19'));
// console.log(myHash.set('key20','value20'));
// console.log('------------------------');
// console.log(myHash.SIZE)
// console.log(myHash.elementsCount)
// console.log(myHash.elementsCount / myHash.SIZE)
// console.log('------------------------');
// console.log(myHash.remove('key19'));
// console.log(myHash.remove('key18'));
// console.log(myHash.remove('key17'));
// console.log(myHash.remove('key16'));
// console.log(myHash.remove('key15'));
// console.log(myHash.remove('key14'));
// console.log(myHash.remove('key13'));
// console.log(myHash.remove('key12'));
// console.log(myHash.remove('key11'));
// console.log(myHash.remove('key10'));
// console.log(myHash.remove('key9'));
// console.log(myHash.remove('key8'));
// console.log(myHash.remove('key7'));
// console.log(myHash.remove('key6'));
// console.log(myHash.remove('key5'));
// console.log(myHash.remove('key4'));
// console.log('------------------------');
// console.log(myHash.SIZE)
// console.log(myHash.elementsCount)
// console.log(myHash.elementsCount / myHash.SIZE)
// console.log('------------------------');
// console.log(myHash.get('key1'))