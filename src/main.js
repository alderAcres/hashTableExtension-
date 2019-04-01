/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
function HashTable() {
  this.SIZE = 16;
  this.size = 0;
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
  const hash = hashCode(key,this.SIZE);

  if (!this.storage[hash]) this.storage[hash] = {}; // if hash table is empty for this entry - create empty object in that spot

  if(this.storage[hash][key]) console.log("Value exists for Key already - overwriting");
  this.storage[hash][key] = value; //store key/value pair in the hash table object

  this.size++;
  return this.size; //return total number of items stored in hash
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
  const hash = hashCode(key,this.SIZE);;
  if (!this.storage[hash]) console.error("Entry not found in hash table") //log error if hash table is empty (SHOULDN'T HAPPEN EVER)
  if (!this.storage[hash][key]) console.error("Key not found in Hashed Object") //log error if hash table is empty (SHOULDN'T HAPPEN EVER)

  return this.storage[hash][key];

}

/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function (key) {
  const hash = hashCode(key,this.SIZE);;
  if (!this.storage[hash]) {
    console.error(`"Entry not found in hash table" Hash:${hash}`) //log error if hash table is empty (SHOULDN'T HAPPEN EVER)
    return undefined;
  }
  if (!this.storage[hash][key]) {
    console.error(`"Key not found in Hashed Object. Hash:${hash} Key:${key}`) //log error if hash table is empty (SHOULDN'T HAPPEN EVER)
    return undefined; 
  }
  const retval = this.storage[hash][key];
  delete this.storage[hash][key];
  this.size--;
  return retval;
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

//infile quokka testing
let meinHash = new HashTable();

meinHash.set('bob',32);
meinHash.set('bill',34);
meinHash.set('bqrill',34);
meinHash.set('brwill',34);
meinHash.set('briell',34);
meinHash.set('brilrl',34);
meinHash.set('briltl',34);
meinHash.set('tbrill',34);
meinHash.set('btrill',34);
meinHash.set('br4tittll',34);
meinHash.set('brt5ittll',34);
meinHash.set('brtigttll',34);
meinHash.set('brtithtll',34);
meinHash.set('brtitjtll',34);
meinHash.set('brtithjtll',34);
meinHash.set('brtiasdfttll',34);
meinHash.set('britll',34);
let totalSize = meinHash.set('Sam',35);
totalSize
let bobAge = meinHash.get('bob');
bobAge;

totalSize = meinHash.size;
totalSize;

// console.log(meinHash.storage)

meinHash.remove("Hello there")