/**
* HashTable costructor
*
* construct a new hash table
*
* - You may modify this constructor as you need to achieve the challenges below.
*/
class HashTable {
  constructor(){
    this.SIZE = 16;
    this.storage = new Array(this.SIZE); //
    this.keys = [];
  }

}

class ValueNode {
  constructor(key, value){
    this.value = value;
    this.key = key;
    this.next = null;
  }
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

  let newNode = new ValueNode(key,value);

  let newKey = false;
  //check for existence
  if(!this.keys.includes(key)){
    this.keys.push(key);
    newKey = true;
  }

  const hashedKey = hashCode(key,this.SIZE)

  
  //check for hash key collision in storage.
  if (!this.storage[hashedKey]){
    //hashed key not here, so lets add the value
    this.storage[hashedKey] = newNode;
  }else{
    //hashed key exists, so first we check if we are supposed to be making a new key.
    //if its a new key, we shouldnt be overwriting --- we should point the currently stored node to the new node.
    if(newKey){
      let currentNode = this.storage[hashedKey];
      while(currentNode.next){
        currentNode = currentNode.next;
      }
      //after this loop, we should be at the tail of our linked hashed values
      currentNode.next = newNode;
    }else{
      //it wasn't a new key, but we've reached a collision.
      //when its not a new key, we should be overwriting current values.

      //so first we have to get the specific node we're overwriting, and then assign the new value to it.
      let nodeToOverwrite = this.getNode(key);
      nodeToOverwrite.value = value;

    }
  }

  return this.keys.length;



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
  const hashedKey = hashCode(key, this.SIZE);
  let possibleValue;

  if(!this.storage[hashedKey]){
    //doesnt even exist;
    return undefined;
  }
  if(this.storage[hashedKey].key === key){
    return this.storage[hashedKey].value;
  }else{
    let currentNode = this.storage[hashedKey];
    //look thru hashed nodes for one htat matches key i nquestion.
    while(currentNode.next){
      currentNode = currentNode.next;
      if(currentNode.key === key){
        return currentNode.value;
      }
    }
    //no matching key found
    return undefined;
  }
};



HashTable.prototype.getNode = function(key) {
  const hashedKey = hashCode(key, this.SIZE);

  if(!this.storage[hashedKey]){
    //doesnt even exist;
    return undefined;
  }
  if(this.storage[hashedKey].key === key){
    return this.storage[hashedKey];
  }else{
    let currentNode = this.storage[hashedKey];
    //look thru hashed nodes for one htat matches key i nquestion.
    while(currentNode.next){
      currentNode = currentNode.next;
      if(currentNode.key === key){
        return currentNode;
      }
    }
    //no matching key found
    return undefined;
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
  const hashedKey = hashCode(key,this.SIZE);
  const nodeAtHashAddress = this.storage[hashedKey];
  let result;

  //k, we're going to first get to the hashed key address
  if(!nodeAtHashAddress){
    //doesnt even exist;
    return undefined;
  }else{

    //remove it from the keys membervar.
    let keyIdx = this.keys.indexOf(key);
    if(keyIdx === this.keys.length - 1){
      this.keys.pop();
    }
    this.keys = this.keys.splice(keyIdx,1,'');

    if(!nodeAtHashAddress.next){
      //this is the only node on the chain, return its value and remove it.
      result = nodeAtHashAddress.value;
      this.storage[hashedKey] = 0;
      return result;
    }
    //get to the node right before the one we want to delete
    while(nodeAtHashAddress.next.key !== key){
      nodeAtHashAddress = nodeAtHashAddress.next;
      if (nodeAtHashAddress === null) return undefined; //was never found
    }

    //the next node matches the key, but check:
    //is there a node after it?
    let nextNode = nodeAtHashAddress.next;
    if(nextNode.next){
      //there is a node after it, so redirect the one before to the one after it, then remove.
      nodeAtHashAddress.next = nextNode.next;
      result = nextNode.value;
      delete nextNode;
      return result;
    }
    
  }

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


// let testHash = new HashTable();
// testHash.set('sean','istesting');
// console.log(testHash.get('sean'))
// testHash.set('sean','isnot');
// console.log(testHash.get('sean'))
// console.log(testHash.remove('sean'))
// 1;

// Do not remove!!
module.exports = HashTable;
