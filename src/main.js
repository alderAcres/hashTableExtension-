/**
 * HashTable costructor
 *
 * construct a new hash table
 *
 * - You may modify this constructor as you need to achieve the challenges below.
 */
function HashTable(size) {
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
 * @return {number} The new number of capacity stored in the hash table
 */
HashTable.prototype.set = function (key, value) {
	// Get hash code
	const code = hashCode(key, this.SIZE);

	if (this.storage[code] === undefined) {
		// If undefined at this.storage[code], create new object and place in storage
		const obj = {};
		obj[key] = value;
		this.storage[code] = obj;
	} else {
		// Else add key-value pair to existing object
		this.storage[code][key] = value;
	}
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
	// Get hash code
	const code = hashCode(key, this.SIZE);

	// If key does not exist in hash table return undefined
	if (this.storage[code] === undefined) return undefined;

	// Return the value stored of the key-value pair
	return this.storage[code][key];
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
	// Get hash code
	const code = hashCode(key, this.SIZE);

	// Return undefined if key does not exist in hash table
	if (this.storage[code] === undefined) return undefined;

	// Store output before deleting
	const output = this.storage[code][key];

	if (Object.keys(this.storage[code]).length <= 1) {
		// If only one or less elements in the object at this.storage[code], reassign to undefined
		this.storage[code] = undefined;
	} else {
		// Else delete the key-value pair and keep the object at this.storage[code]
		delete this.storage[code][key];
	}

	return output;
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
