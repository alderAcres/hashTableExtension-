function HashTable() {
  this.SIZE = 16;
  this.storage = new Array(this.SIZE);
}

HashTable.prototype.address = function (key) {
  return hashCode(key, this.SIZE);
};

HashTable.prototype.set = function (key, value) {
  const a = this.address(key);
  if (!this.storage[a]) this.storage[a] = {};
  this.storage[a][key] = value;
};

HashTable.prototype.get = function (key) {
  const a = this.address(key);
  return this.storage[a][key];
};

HashTable.prototype.remove = function (key) {
  const a = this.address(key);
  delete this.storage[a][key];
};

// Do not modify
function hashCode(string, size) {
  "use strict";

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

// // test case
// let hash = new HashTable();

// for (let i = 50; i < 150; i++) {
//   hash.set(String(i), Math.floor(Math.random() * 100));
// }

// console.log(hash.storage);
