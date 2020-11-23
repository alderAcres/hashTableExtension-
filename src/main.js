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

    const position = hashCode(key, this.SIZE);
    //use hashcode with input of key to determine position
    // if the storage at position
    if (this.storage[position] === undefined) {
        //set the 
        this.storage[position] = {};
        this.storage[position][key] = value;
    } else this.storage[position][key] = value;

    //if position key 

    //collision -> set a object
};

let hash = new HashTable;
hash.set(69, 420)
hash.set(420, "snoop-dogg")
hash.set("heelloword", "xD")
console.log(hash);

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

    //const position
    const position = hashCode(key, this.SIZE);

    //search the hashtable storage
    // if it exists return value
    if (this.storage[position][key]) return this.storage[position][key];
    //else return undefined 
    else return undefined;
};

// console.log(hash.get(69));
/**
 * remove - delete a key/value pair from the hash table
 *
 * - If the key does not exist in the hash table, return undefined
 *
 * @param {string} key - key to be found and deleted in hash table
 * @return {string|number|boolean} The value deleted from the hash table
 */
HashTable.prototype.remove = function(key) {

    // find position of key
    const position = hashCode(key, this.SIZE);
    //temp to store the value of the removed
    let temp = this.get(key);
    //if the position does not exist return undefined 
    if (temp) delete this.storage[position][key];
    if (temp === undefined) return undefined


    //delete the key value pair;
    return temp;
};

console.log(hash.remove(69));
console.log(hash);

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