const fs = require('fs');

class Node 
{
    constructor(data) 
    {
        this.left = null;
        this.right = null;
        this.data = data;
    }
}

class Tree {
    constructor() 
    {
        this.root = null;
    }

    insert(data) 
    {

    var newNode = new Node(data);

    if(this.root === null){
        this.root = newNode;
    }
    else
        this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) 
    {
        if(newNode.data < node.data)
        {
            if(node.left == null)
                node.left = newNode;
            else
                this.insertNode(node.left, newNode);
        }
        else
        {
            if(node.right == null)
                node.right = newNode;
            else
                this.insertNode(node.right, newNode);
        }
    }

    printTree(level, mediana) 
    {
        let firstQueue = []
        let secondQueue = [this.root]
        let result = []

        while (true) 
        {
            for (const i of secondQueue) 
            {
                if (i != null) 
                {
                    firstQueue.push(i.left)
                    firstQueue.push(i.right)
                }
            }

            [firstQueue, secondQueue] = [secondQueue, firstQueue];

            for (const i of firstQueue) 
            {
                if (i != null) 
                    result.push(i.data)
            }

            firstQueue = []

            if (secondQueue.length == 0)
                break
        }

        let spaces = []

        for (let i = 0; i < level; i++) 
            spaces.push(2**i)

        result.splice(0,0,0)
        let currentLevel = 1
        var stream = fs.createWriteStream("result.txt");
        
        stream.once('open', function(fd) {
            for (const i of spaces) 
            {
                for (let j = 0; j < i; j++) 
                {   
                    let spaceBefore = Math.floor((2**(level - currentLevel + mediana.toString().length)) / 2)
                    let spaceBetween =  Math.floor((2**(level - currentLevel + mediana.toString().length) - 1) / 2)

                    stream.write(" ".repeat(spaceBefore))
                    let value = result.slice(i)[j]
                    let isMinus = 0

                    if (value.toString().includes('-')) {
                        isMinus = 1
                    }

                    if (value.toString().length >= mediana.toString().length)
                    {
                        stream.write(value.toString() + " ".repeat(spaceBetween + (value.toString().length - mediana.toString().length)) + " ".repeat(isMinus))
                    } else {
                        stream.write(value.toString() + " ".repeat(spaceBetween)+ " ".repeat(isMinus))
                    }
                }
                currentLevel++;
                stream.write("\n")
            }

        stream.end();
        });

    }
}

function median(values) 
{
    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

const tree = new Tree()

let levels = 3;
let min = -100
let max = 100

for(let i = 0; i < (2**levels - 1); i++)
{
    let el = Math.floor(Math.random() * (max - min)) + min;
    tree.insert(el)
}

let arr = []

for (let i = min; i < max; i++) 
{
    arr.push(Math.abs(i))
}

let mediana = median(arr)

tree.printTree(levels, mediana)