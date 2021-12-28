const fs = require('fs');

var md5 = require('md5');

class Node 
{
    constructor(data, offset = null) 
    {
        this.left = null;
        this.right = null;
        this.data = data;
        this.offset = offset;
    }
}

class Tree {
    constructor() 
    {
        this.root = null;
    }

    insert(data, newOffset) 
    {

    var newNode = new Node(data, newOffset);

    if(this.root === null){
        this.root = newNode;
        this.offset = newOffset;
    }
    else
        this.insertNode(this.root, newNode, newOffset);
    }

    insertNode(node, newNode, newOffset) 
    {
        if(newNode.data < node.data)
        {
            if(node.left == null)
            {
                node.left = newNode;
                node.offset = newOffset;
            }
            else
                this.insertNode(node.left, newNode, newOffset);
        }
        else
        {
            if(node.right == null)
            {
                node.right = newNode;
                node.offset = newOffset;
            }
            else
                this.insertNode(node.right, newNode, newOffset);
        }
    }

    search(root, key) 
    {
        if (root === null || root.data == key)
        {
            return `Hash ${root.data} has offset - ${root.offset}`;
        }
        if (root.data < key)
        {
            return this.search(root.right, key);
        }
        return this.search(root.left, key);
    }
}

function generateHashes(length)
{
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-';
    var charactersLength = characters.length;
   
    for ( let i = 0; i < length; i++ ) 
    {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

let hashTree = new Tree();
var tempTree = [];

var stream = fs.createWriteStream("data.txt");
        
stream.on('open', function(fd) 
{
    for ( let i = 0; i < 10000; i++ )
    {
        let hashes = generateHashes(36);
        simpleHashes = md5(hashes).substr(0,7);
        tempTree.push(simpleHashes);
        stream.write(`${hashes} - ${simpleHashes}\n`);
    }

    hashTree.root = new Node(tempTree[0], 1);
    tempTree.pop(0);

    for (let i = 0; i < tempTree.length; i++) 
    {
        hashTree.insert(tempTree[i], i + 2);
    }

    let hs = [];

    for ( let i = 0; i < 1000; i++ ) 
    {
        randomHash = Math.floor(Math.random() * 4);
        hs.push(tempTree[randomHash]);
    }

    stream.end();

    //search in the tree
    console.time('Execution Time');
    for (let i = 0; i < 1000; i++) 
    {
        hashTree.search(hashTree.root, hs[i]);
    }
    console.timeEnd('Execution Time');

    stream.on('finish', () => {
        let findings = 0; 
        //search in the file after saving file  
        console.time('Execution Time'); 
        fs.readFileSync("data.txt").toString().split("\n").forEach(function(line, index, arr) {  
            if (index === arr.length - 1 && line === "") { return; }
            if (line.includes(hs[index]))
                findings++; //used for checking that this works
        });      
        console.timeEnd('Execution Time');     
    });   
});      



 