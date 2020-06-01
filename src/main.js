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
  this.used = 0;
}

/**
* set - Adds given value to the hash table with specified key. -- done
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value. -- done

* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately. 
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function(key, value) {
  let objKey = key;
  let item = {};
  item[key] = value;
  item.next = null;
  const hashKey = hashCode(objKey, this.SIZE);
  // console.log(`${objKey} is: ${hashKey}`); // this helps me find the collision
  if (this.storage[hashKey] !== undefined) {
    item[key] = value;
  }
  this.storage[hashKey] = item;
  this.used += 1;
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
  let objKey = key;
  const hashKey = hashCode(objKey, this.SIZE);
  return this.storage[hashKey];
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
  let objKey = key;
  const hashKey = hashCode(objKey, this.SIZE);
  delete this.storage[hashKey];
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

const test = new HashTable();
// console.log(test);
test.set('food', 'pizza');
// console.log(test);
// console.log(test.get('food'));
// test.remove('food'); // the array is 0 based idx.
// console.log(test);
test.set('items', 'soda');
test.set('drinks', 'soda');
test.set('utensils', 'soda');
test.set('electronics', 'soda');
test.set('furnitures', 'soda');
test.set('category1', 'soda');
test.set('category2', 'soda');
test.set('category3', 'soda');
test.set('category4', 'soda');
test.set('category5', 'soda');
test.set('category6', 'soda');
test.set('category7', 'soda');
test.set('category8', 'soda');
test.set('category9', 'soda');
test.set('category10', 'soda');
// drink and utensil and category 3 collided at hashkey 5
// electronic and category5 collided at hashkey 7
// before implementating collsion mechanism, the latest set overwrites the previous
console.log(test);
console.log(test[1]);
