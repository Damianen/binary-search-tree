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

let tree = new Tree([10, 3, 3, 3, 3, 3, 4, 4, 6, 8, 2]);
tree.prettyPrint(tree.root);