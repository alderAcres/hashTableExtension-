/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.items = 0;
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
HashTable.prototype.set = function set(key, value) {
  const hashedKey = hashCode(JSON.stringify(key), this.SIZE);

  console.log(hashedKey);
  // hash already exists, so we have a collision
  // add the key/value pair to existing item storage
  if (this.storage[hashedKey]) {
    const item = this.storage[hashedKey];

    if (!Object.keys(item).includes(JSON.stringify(key))) {
      this.items += 1;
    }

    item[JSON.stringify(key)] = value;

    this.storage[hashedKey] = item;
  } else {
    // create new item storage and add key/value pair to it
    const item = {};
    item[JSON.stringify(key)] = value;

    // store item on hash table
    this.storage[hashedKey] = item;

    // increment number of items in hash table
    this.items += 1;
  }


  // @return {number} The new number of items stored in the hash table
  return this.items;
};

// const h = new HashTable();
// console.log(h.set(5, 'hello'));
// console.log(h);
// console.log(h.set(5, 'goodbye'));
// console.log(h);
// console.log(h.set(16, 'not today'));
// console.log(h);


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
  const hashedKey = hashCode(JSON.stringify(key), this.SIZE);

  // if hashed key exists, retrieve the value specified by key
  if (this.storage[hashedKey]) {
    return this.storage[hashedKey][JSON.stringify(key)];
  }

  // otherwise return undefined
  return undefined;
};

// console.log(h.get(5));
// console.log(h.get(16));
// console.log(h.set(1, 'steve'));
// console.log(h);


/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function(key) {
  const hashedKey = hashCode(JSON.stringify(key), this.SIZE);

  let item;

  // if hashed key exists, retrieve the item specified by key from storage
  // delete the key from the storage
  // return the item
  if (this.storage[hashedKey]) {
    item = this.storage[hashedKey][JSON.stringify(key)];
    delete this.storage[hashedKey][JSON.stringify(key)];
    this.items -= 1;
  }

  // will return undefined if item not found
  return item;
};

// console.log(h);
// console.log(h.remove(5));
// console.log(h);
// console.log(h.remove(1));
// console.log(h);
// console.log(h.remove(1));
// console.log(h.set(1, 'steve'));
// console.log(h);

// const hashTable = new HashTable();
// hashTable.set('key','value');
// console.log(hashTable.get('key')); // .to.be('value');
// console.log(hashTable.storage.length); // .to.eql(16);
// hashTable.set('first key', 'first value');
// hashTable.set('second key', 'second value');
// console.log(hashTable.get('first key')); // to.be('first value');
// console.log(hashTable.get('second key')); // .to.be('second value');
// hashTable.set('first key', 'first value');
// console.log(hashTable.get('first key')); // .to.eql('first value');
// console.log(hashTable.remove('first key')); //.to.eql('first value');
// console.log(hashTable.get('first key')); // .to.eql(undefined);

// const hashTable = new HashTable();
// for (let i = 0; i < 30; i++) {
//   const key = 'key ' + i;
//   const value = 'value ' + i;
//   hashTable.set(key, value);
//   console.log(hashTable.get(key)); // .to.be(value);
// }
// for (let i = 0; i < 30; i++) {
//   const key = 'key ' + i;
//   const value = 'value ' + i;
//   console.log(hashTable.get(key)); // .to.be(value);
// }

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
