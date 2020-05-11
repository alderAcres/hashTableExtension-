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
	// ('A', 'First')
	//our hash is the index of our hash table storage
	//run the hashcode function into a var called hash
	let hash = hashCode(key, this.SIZE); //key/v pair goes into slot 1
	console.log(hash);
	//if the hash slot is undefined or empty
	if (this.storage[hash] === undefined) {
		//create a new object in that hash slot
		this.storage[hash] = {};
		//add the key value pair the hash slot
		this.storage[hash][key] = value;
	}
	//otherwise if there is an object in our hash table, add our new key val pair to the object
	console.log(this.storage[hash]);
	//if theres  value in our hash table, we add another k/v pair in
	this.storage[hash][key] = value;
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
	//return the key valur pair in our hashtable
	let hash = hashCode(key, this.SIZE);
	//we ge the key val pair by looking into our hash table
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
HashTable.prototype.remove = function(key) {
	let hash = hashCode(key, this.SIZE);
	console.log(this.storage);
	let savedKey = this.storage[hash][key];
	if (!this.storage[hash][key]) return undefined;
	delete this.storage[hash][key];
	return savedKey;
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

// Do not remove!!
module.exports = HashTable;
