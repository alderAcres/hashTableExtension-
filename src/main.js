/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.CONTENTS = 0;
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
  const bucket = hashCode(key, this.SIZE);
  if (!this.storage[bucket]) {
    const hash = {};
    hash[key] = value;
    this.storage[bucket] = hash;
    this.CONTENTS++;
  } else {
    const hash = this.storage[bucket];
    if (!hash.hasOwnProperty(key)) {
      this.CONTENTS++;
    }
    hash[key] = value;
  }
  return this.CONTENTS;
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
  const bucket = hashCode(key, this.SIZE);
  const hash = this.storage[bucket];
  if (hash === undefined)
    return undefined;
  else {
    return hash[key];
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
  const bucket = hashCode(key, this.SIZE);
  const hash = this.storage[bucket];
  if (hash === undefined) 
    return undefined;
  else {
    const removed = hash[key];
    if (removed !== undefined) {
      this.CONTENTS--;
    }
    delete hash[key];
    return removed;
  }
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

const myHash = new HashTable();
console.log('set(1, "a")', myHash.set(1, 'a'), 'expect 1');
console.log('set(2, "a")', myHash.set(2, 'a'), 'expect 2');
console.log('get(1)', myHash.get(1), 'expect "a"');
console.log('get(1)', myHash.set(1, 'b'), 'expect 2');
console.log('set(1, "a")', myHash.get(1), 'expect "b"');
console.log('remove(1)', myHash.remove(1), 'expect "b"');
console.log('remove(1)', myHash.remove(1), 'expect undefined');
console.log('set(1, "a")', myHash.set(1, 'a'), 'expect 2');
console.log('set("ab", "a")', myHash.set('ab', 'ab'), 'expect 3');
console.log('set("abb", "a")', myHash.set('abb', 'abb'), 'expect 4');
console.log(myHash.get('ab'), 'expect "ab"');
console.log('remove("abc")', myHash.remove('abc'), 'expect undefined');
console.log(myHash.get('abb'), 'expect "abb"');
