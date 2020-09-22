/*
  Complete this extension only AFTER getting the functionality in main.js working!
  Copy-paste your working code from main.js below (being sure to have 1 module.exports line).
  Modify the code to reflect to following:

*/

function HashTable() {
  this.SIZE = 16;
  this.number = 0;
  this.storage = new Array(this.SIZE);
}

/**
* set - Adds given value to the hash table with specified key.
*
* - If the provided key has already been used to store another value, simply overwrite
*   the existing value with the new value.
* - If the hashed address already contains another key/value pair, you must handle
*   the collision appropriately.

// 1. set:
// - If adding the new item will push the number of stored items to over 75% of
//   the hash table's SIZE, then double the hash table's SIZE and rehash everything
*
* @param {string} key - key to be used to create hashed address
* @param {string|number|boolean} value - value to be stored in hash table
* @return {number} The new number of items stored in the hash table
*/
HashTable.prototype.set = function (key, value) {
  const newHash = hashCode(key, this.SIZE);

  if (this.storage[newHash] === undefined) {
    this.storage[newHash] = new Object();
    this.storage[newHash][key] = value;
    this.number++;
  } else {
    this.storage[newHash][key] = value;
  }

  // if (this.number > (this.SIZE * 0.75)) {
  //   this.SIZE += this.SIZE;
  //   this.number = 0;
  //   let storage = this.storage;
  //   this.storage = new Array(this.SIZE);
  //   storage.forEach(obj =>
  //     for (const subKey in obj) {
  //       let hashKey = hashCode(subKey, this.SIZE);
  //       if (!this.Storage[hashKey] {
  //         let temp = {};
  //         temp[subKey] = obj[key];

  //       }
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
HashTable.prototype.get = function (key) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index][key] === undefined) return 'no data found';
  return this.storage[index][key];
};

/**
* remove - delete a key/value pair from the hash table
*
* - If the key does not exist in the hash table, return undefined

// 2. remove:
// - If the hash table's SIZE is greater than 16 and the result of removing the
//   item drops the number of stored items to be less than 25% of the hash table's SIZE
//   (rounding down), then reduce the hash table's SIZE by 1/2 and rehash everything.
*
* @param {string} key - key to be found and deleted in hash table
* @return {string|number|boolean} The value deleted from the hash table
*/
HashTable.prototype.remove = function (key) {
  const index = hashCode(key, this.SIZE);
  if (this.storage[index][key] === undefined) return;
  let output = this.storage[index][key];
  delete this.storage[index][key];
  // if I now have an empty object, reset to null;
  if (this.storage[index] === null) {
    this.number--;
  }

  if (this.SIZE > 16 && this.number < (this.SIZE * 0.25)) {
    this.SIZE = (this.SIZE * 0.5)
  }
  return output;
};

let hash = new HashTable();
hash.set('1 key', 'first value');
console.log(hash);
hash.set('1 key', 'second value');
console.log(hash);
hash.set('2 key', '1 value');
hash.set('3 key', '1 value');
hash.set('4 key', '1 value');
hash.set('5 key', '1 value');
hash.set('6 key', '1 value');
hash.set('7 key', '1 value');
hash.set('8 key', '1 value');
hash.set('9 key', '1 value');
hash.set('10 key', '1 value');
hash.set('11 key', '1 value');
hash.set('12 key', '1 value');
hash.set('13 key', '1 value');
hash.set('14 key', '1 value');
hash.set('15 key', '1 value');
hash.set('16 key', '1 value');
hash.set('17 key', '1 value');
hash.set('18 key', '1 value');
hash.set('19 key', '1 value');
hash.set('20 key', '1 value');
hash.set('21 key', '1 value');
hash.set('22 key', '1 value');
hash.set('23 key', '1 value');
hash.set('24 key', '1 value');
hash.set('25 key', '1 value');
hash.set('26 key', '1 value');
hash.set('27 key', '1 value');
hash.set('28 key', '1 value');
hash.set('29 key', '1 value');
hash.set('30 key', '1 value');
hash.set('31 key', '1 value');
hash.set('32 key', '1 value');
console.log(hash);

console.log(hash.get('1 key'));
console.log(hash.remove('1 key'));
console.log(hash.get('1 key'));

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
