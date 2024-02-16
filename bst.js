class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        array = this.sortArray(array);
        array = this.removeDuplicates(array);
        this.root = this.buildTree(array, 0, array.length - 1);
    }

    buildTree(arr, start, end) {
        if (start > end) {
            return null;
        }

        let middle = Math.ceil((start + end) / 2);
        let node = new Node(arr[middle]);

        node.left = this.buildTree(arr, start, middle - 1);
        node.right = this.buildTree(arr, middle + 1, end);
        
        return node;
    }
    
    sortArray(arr) {
        if (arr.length === 1) {
            return arr;
        } else {
            let half = Math.ceil(arr.length / 2);
            let left = this.sortArray(arr.slice(0, half));
            let right = this.sortArray(arr.slice(half));
            
            let newArr = [];
            let leftIndex = 0;
            let rightIndex = 0;

            for (let i = 0; i < arr.length; i++) {
                if (leftIndex === left.length) {
                    newArr.push(right[rightIndex]);
                    rightIndex++;
                } else if (rightIndex === right.length) {
                    newArr.push(left[leftIndex]);
                    leftIndex++;
                } else if (left[leftIndex] < right[rightIndex]) {
                    newArr.push(left[leftIndex]);
                    leftIndex++;
                } else {
                    newArr.push(right[rightIndex]);
                    rightIndex++;
                }
            }
            return newArr;
        }
    }

    removeDuplicates(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr;
    }

    insert(value) {
        let endOfTree = false;
        let node = this.root;

        if (node == null) {
            root = new Node(value);
        }

        while (!endOfTree) {
            if (value == node.value) {
                return;
            }

            if (value < node.value) {
                if (node.left == null) {
                    node.left = new Node(value);
                    endOfTree = true;
                } else {
                    node = node.left;
                }
            }

            if (value > node.value) {
                if (node.right == null) {
                    node.right = new Node(value);
                    endOfTree = true;
                } else {
                    node = node.right;
                }
            }
        }
    }

    delete(value) {
        let endOfTree = false;
        let node = this.root;
        let parent = null;
        let dir = "";

        if (node == null) {
            return;
        }

        while (!endOfTree) {
            if (value == node.value) {
                if (parent == null) {
                    if (node.left == null && node.right == null) {
                        this.root = null;
                    } else if (node.left != null ^ node.right != null) {
                        if (node.left != null) {
                            this.root = node.left;
                        } else {
                            this.root = node.right;
                        }
                    } else {
                        node = node.right;
                        while (true) {
                            if (node.left != null) {
                                node = node.left;
                                continue;
                            } else {
                                break;
                            }
                        }
                        this.delete(node.value);
                        let temp = this.root;
                        node.right = temp.right;
                        node.left = temp.left;
                        this.root = node;
                        
                    }
                    return;
                }
                if (node.left == null && node.right == null) {
                    parent[dir] = null;
                } else if (node.left != null ^ node.right != null) {
                    if (node.left != null) {                       
                        parent[dir] = node.left;
                    } else {
                        parent[dir] = node.right;
                    }
                } else {
                    node = node.right;
                    while (true) {
                        if (node.left != null) {
                            node = node.left;
                            continue;
                        } else {
                            break;
                        }
                    }
                    this.delete(node.value);
                    let temp = parent[dir];
                    node.right = temp.right;
                    node.left = temp.left;
                    parent[dir] = node;
                }
                return;
            }

            if (value < node.value) {
                if (node.left == null) {
                    endOfTree = true;
                } else {
                    parent = node;
                    node = node.left;
                    dir = "left";
                }
            }

            if (value > node.value) {
                if (node.right == null) {
                    endOfTree = true;
                } else {
                    parent = node;
                    node = node.right;
                    dir = "right";
                }
            }
        }
    }

    find(value) {
        let endOfTree = false;
        let node = this.root;

        if (node == null) {
            root = new Node(value);
        }

        while (!endOfTree) {
            if (value == node.value) {
                return node;
            }

            if (value < node.value) {
                if (node.left == null) {
                    endOfTree = true;
                } else {
                    node = node.left;
                }
            }

            if (value > node.value) {
                if (node.right == null) {
                    endOfTree = true;
                } else {
                    node = node.right;
                }
            }
        }
    }

    levelOrder(callback) {
        let queue = [];
        let arr = [];
        queue.push(this.root);

        while (queue.length != 0) {
            let node = queue.shift();
            arr.push(node);

            if (callback != null) {
                callback(node);
            }

            if (node.left != null) {
                queue.push(node.left);
            }

            if (node.right != null) {
                queue.push(node.right);
            }
        }

        if (callback == null) {
            return arr;
        }
    }

    levelOrderRecursive(callback) {
        let arr = [];
        
        let levelOrder = (node, level) => {
            if (node = null) {
                return;
            }
            if (level == 1) {
                if (callback != null) {
                    callback(node);
                }
                arr.push(node);
            } else if (level > 1) {
                levelOrder(node.left, level - 1);
                levelOrder(node.right, level -1);
            }
        }

        let height = this.height(root);
        for (let i = 0; i <= height; i++) {
            printCurrentLevel(root, i);
        }

        if (callback == null) {
            return arr;
        }
    }

    inOrder(callback) {
        let arr = [];

        let inOrderRecursion = (node) => {
            if (node.left != null) {
                inOrderRecursion(node.left);
            }

            if (callback != null) {
                callback(node);
            }

            arr.push(node);

            if (node.right != null) {
                inOrderRecursion(node.right);
            }
        }

        inOrderRecursion(this.root);

        if (callback == null) {
            return arr;
        }
    }

    preOrder(callback) {
        let arr = [];
        let preOrderRecursion = (node) => {
            if (callback != null) {
                callback(node);
            }

            arr.push(node);
            
            if (node.left != null) {
                preOrderRecursion(node.left);
            }

            if (node.right != null) {
                preOrderRecursion(node.right);
            }
        }

        preOrderRecursion(this.root);

        if (callback == null) {
            return arr;
        }
    }

    postOrder(callback) {
        let arr = [];
        let postOrderRecursion = (node) => {            
            
            if (node.left != null) {
                postOrderRecursion(node.left);
            }

            if (node.right != null) {
                postOrderRecursion(node.right);
            } 

            if (callback != null) {
                callback(node);
            }

            arr.push(node);
        }

        postOrderRecursion(this.root);

        if (callback == null) {
            return arr;
        }
    }

    height(root) {
        if (root == null) {
            return 0;
        } else {
            let lHeight = this.height(root.left);
            let rHeight = this.height(root.right);

            if (lHeight > rHeight) {
                return (lHeight + 1);
            } else {
                return (rHeight + 1);
            }
        }
    }

    depth (node) {
        let length = 0;

        let inOrderRecursion = (node) => {
            if (node.left != null) {
                inOrderRecursion(node.left);
            }

            if (node.right != null) {
                inOrderRecursion(node.right);
            }

            length++;
        }

        inOrderRecursion(node);
        return length;
    }
    
    isBalanced() {
        let checkNode = (node) => {
            if (node.left != null) {
                checkNode(node.left);
            }

            if (node.right != null) {
                checkNode(node.right);
            }

            let difference = this.height(node.right) - this.height(node.left);

            if (difference < -1 || difference > 1) {
                return false;
            }
        }

        checkNode(this.root);
        return true;
    }

    rebalance() {
        let nodeArr = this.postOrder();
        let arr = [];
        for (let i = 0; i < nodeArr.length; i++) {
            arr.push(nodeArr[i].value);
        }
        arr = this.sortArray(arr);
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }

    prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "   "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

let arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(Math.floor(Math.random() * 100 + 1))
}

let tree = new Tree(arr);

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
console.log("\ninOrder:")
tree.inOrder((node) => {console.log(node.value)});
console.log("\nPostOrder:")
tree.postOrder((node) => {console.log(node.value)});
console.log("\npreOrder:")
tree.preOrder((node) => {console.log(node.value)});
console.log("\nlevelOrder:")
tree.levelOrder((node) => {console.log(node.value)});

for (let i = 0; i < 5; i++) {
    tree.insert(Math.floor(Math.random() * 100 + 1));
}

tree.prettyPrint(tree.root);
console.log(tree.isBalanced());
tree.rebalance();
tree.prettyPrint(tree.root);
console.log("\ninOrder:")
tree.inOrder((node) => {console.log(node.value)});
console.log("\nPostOrder:")
tree.postOrder((node) => {console.log(node.value)});
console.log("\npreOrder:")
tree.preOrder((node) => {console.log(node.value)});
console.log("\nlevelOrder:")
tree.levelOrder((node) => {console.log(node.value)});