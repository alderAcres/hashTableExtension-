function HashTable() {
  this.SIZE = 16;

  // the array will be instantiated as [undefined, undefined....]
  // pop() and push() shouldn't be used on the storage
  this.storage = new Array(this.SIZE);
}

// stores a value in the storage array
// hint: use the hash function to determine where in the array to store the value
HashTable.prototype.set = function(key, value) {
  let position = hashCode(key,this.SIZE);
  if (this.storage[position] === undefined){
    let newObj = {};
    newObj[key] = value;
    return this.storage[position] = [newObj];
  }
  else{
    let newObj = {};
    newObj[key] = value;
    return this.storage[position][this.storage[position].length] = newObj;
  }
};

// return a previously stored value
HashTable.prototype.get = function(key) {
  let position = hashCode(key,this.SIZE);
  for (let i=0; i<this.storage[position].length; i++){
    if (Object.keys(this.storage[position][i])[0] ===`${key}`){
      return this.storage[position][i][key];
    }
  }
};

// returns and removes a key from the hash table
HashTable.prototype.remove = function(key) {
  let position = hashCode(key,this.SIZE);
  for (let i=0; i<this.storage[position].length; i++){
    if (Object.keys(this.storage[position][i])[0] ===`${key}`){
      let value = JSON.stringify(this.storage[position][i][key]);
      this.storage[position][i][key] = undefined;
      return value = JSON.parse(value)
    }
  }
};

// returns a number between 0 and size that is unique* and generated from the the inputted string
function hashCode(string, size){
  var hash = 0;
  if (string.length == 0) return hash;
  for (i = 0; i < string.length; i++) {
    var letter = string.charCodeAt(i);
    hash = ((hash<<5)-hash)+letter;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash) % size ;
}
