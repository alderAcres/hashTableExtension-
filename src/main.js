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
  // initialize variable assigned to eval result of invoking hashCode function with args
  const result = hashCode(key, this.SIZE);

  // I think there is an issue with the way that I'm invoking the hashCode function
  console.log(result);

  // use variable to check where to place key: value pair inside hash table
  // check if there is a key: value pair at hashtable index
  if (!this.storage[result]) {
    // if not, means it is empty and we should initialize an empty object to store info
    this.storage[result] = {};
    this.storage[result][key] = value;
  } else {
    // if there is, then object has already been created, and we can simply add key: value pair to object
    this.storage[result][key] = value;
  }

  // return hashtable, might not need too actually since storing in the C.O.V.E.
  // return this.storage;
};

const boo = new HashTable();
boo.set('5', 27);
// I think I have an issue where if I enter the same key, it will overwrite from previous same key
boo.set('5', 42);
boo.set('9', 17);
boo.set('15', 57);

console.log(boo.storage);

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
  // initialize variable set to eval result of hashCode invokation with provided parameter
  const result = hashCode(key, this.SIZE);
  // console.log(result);
  // use hashCode result && initial key to -> check HashTable index and then check
  // if that initial key exists in an object
  // if yes, return that associated value
  if (this.storage[result][key]) {
    return this.storage[result][key];
  }
  // if (!this.storage[result][key]) console.log('Sorry that key does not exist in the HashTable');
};

console.log(boo.get('5'));



/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  // initialize variable set to eval result of hashCode invokation with provided parameter
  const result = hashCode(key, this.SIZE);
  let temp;

  // check to see if key exists in HashTable, if so delete key inside object at HashTable
  if (this.storage[result][key]) {
    temp = this.storage[result][key];
    delete this.storage[result][key];
  }
  // return temp, whether undefined or actual value;
  return temp;
};
boo.remove('5');
console.log(boo.storage);

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
