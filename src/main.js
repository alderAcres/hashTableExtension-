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
	// find the array index of running our key through the hash index
	const arrIndex = hashCode(key, this.SIZE);

	// we're going to store our data in objects, to prevent hash collision

	// check if data already exists at our storage
	// if it doesn't create an object to store our data, and pass in our key and value params as a property / value
	if (!this.storage[arrIndex]) {
		const newObj = {};
		newObj[key] = value;
		this.storage[arrIndex] = newObj;
	} else {
		// if it already exists, simply add a new key property (or reassign the old one)
		this.storage[arrIndex][key] = value;
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
HashTable.prototype.get = function(key) {
	// first find the index
	const arrIndex = hashCode(key, this.SIZE);

	// if the data exists in the obj assigned to the index prop of our storage object, return it.
	// otherwise, just return out of the method call
	if (this.storage[arrIndex][key]) {
		return this.storage[arrIndex][key];
	} else {
		return;
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
	// find the index
	const arrIndex = hashCode(key, this.SIZE);

	// if it exists, delete it from our object associated with the index at our storage object
	// otherwise, just return out of the method call
	if (this.storage[arrIndex][key]) {
		delete this.storage[arrIndex][key];
	} else {
		return;
	}
};

// Do not modify
function hashCode(string, size) {
	'use strict';

	let hash = 0;
	if (string.length === 0) return hash;

	for (let i = 0; i < string.length; i++) {
		const letter = string.charCodeAt(i);
		hash = (hash << 5) - hash + letter;
		hash = hash & hash; // Convert to 32bit integer
	}

	return Math.abs(hash) % size;
}

hashCode('hey', 16);
// Do not remove!!
module.exports = HashTable;
