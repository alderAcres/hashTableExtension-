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
HashTable.prototype.set = function(key, value) {
    // create the hashIndex in order to put the key & value inside
    let hashIndex = hashCode(key, this.SIZE);

    // if there is no value at this storage[hashIndex] then create an object container
    // this object container is meant to avoid ht collisions by having unique keys & value pairs
    if (!this.storage[hashIndex]) {
        this.storage[hashIndex] = {};
    }

    // create space inside that ht objet 
    this.storage[hashIndex][key] = value;
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
    // create hashIndex link to refer to the key
    let hashIndex = hashCode(key, this.SIZE);

    // return the index the key points to
    return this.storage[hashIndex][key];
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
    // create hashIndex 
    let hashIndex = hashCode(key, this.SIZE);

    // save the removed value so that you can return it later
    let removed = this.storage[hashIndex][key];

    // if key exists as the hashIndex, then delete the key pair
    if (this.storage[hashIndex][key]) {
        delete this.storage[hashIndex][key]
    }

    // return what you removed
    return removed;
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

let ht = new HashTable();

console.log(ht.SIZE);
console.log(ht.set("rick", "james")); // added this key,value pair at this.storage[hashIndex]
console.log(ht.set("john", "wick")); // added this key,value pair at this.storage[hashIndex]
console.log(ht.set("jack", "bauer")); // added this key,value pair at this.storage[hashIndex]
console.log(ht.get("rick")); // james
console.log(ht.get("john")); // wick
console.log(ht.get("jack")); // bauer
console.log(ht.remove("jack")); // bauer
console.log(ht.remove("john")); // wick
console.log(ht.remove("rick")); // james
console.log(ht) // should be empty with objects inside various indexes of ht array