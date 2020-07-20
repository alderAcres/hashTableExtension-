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
  // add an object to store the key
  this.keysStorage = [];
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
  // declare a hash variable to find out the bucket address
  const hash = hashCode(key, this.SIZE);

  // if the key has already been used, overwrite the value (instead of linking to the list of the hash)
  if (this.keysStorage.includes(key)) {
    this.storage[hash][key] = value;
    return this;
  }

  // else, if the key is not stored...
  // push the key to keysStorage so we can later check this array to trace what keys were passed in
  this.keysStorage.push(key);

  // if there is nothing in the address, create an object and add the key/value pair
  if (!this.storage[hash]) {
    this.storage[hash] = {};
    this.storage[hash][key] = value;
    return this;
  }

  // else, if objects already exists, add the key/value pair to the object
  this.storage[hash][key] = value;
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
  // first check the keysStorage to see if this key was passed in before
  // if can't find, just return false message
  if (!this.keysStorage.includes(key)) { return 'Invalid key, unable to find value'; }
  // else, invoke hashCode and get the value;
  const hash = hashCode(key, this.SIZE);
  return this.storage[hash][key];
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
  const hash = hashCode(key, this.SIZE);
  if (!this.storage[hash][key]) { return undefined; }
  delete this.storage[hash][key];
};

// Do not modify
function hashCode(string, size) {
  let hash = 0;
  if (string.length === 0) return hash;

  for (let i = 0; i < string.length; i++) {
    const letter = string.charCodeAt(i);
    hash = ((hash << 5) - hash) + letter;
    hash &= hash; // Convert to 32bit integer
  }

  return Math.abs(hash) % size;
}

// Do not remove!!
module.exports = HashTable;

// Tests
const myHash = new HashTable();

myHash.set('name', 'Doudou');
myHash.set('breed', 'Corgi');
myHash.set('test', '123');
myHash.set('age', 3);
myHash.set('neutured', true);
console.log(myHash.get('breed'));
console.log(myHash.get('test')); // properly handled collision, expects 123
myHash.set('breed', 'Corgisssss');
console.log(myHash.get('breed')); // expects corgisssss
console.log(myHash.get('weight'));
myHash.remove('test');
console.log(myHash.get('test')); // exptects undefined
console.log(myHash);
