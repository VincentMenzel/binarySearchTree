import {IBSTNode} from "./index";
import util = require('util');

class BSTNode {

  public value: number;
  public right: IBSTNode;
  public left: IBSTNode;

  constructor(value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  private readonly rootNode: BSTNode
  private nodeCount: number = 1;

  constructor(value: number) {
    this.rootNode = new BSTNode(value)
  }

  public size (): number {
    console.log(`BTS size: ${this.nodeCount}`)
    return this.nodeCount;
  }

  public min (): number {
    let currentNode = this.rootNode;

    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    console.log(`BTS min: ${currentNode.value}`)
    return currentNode.value;
  }

  public max (): number {
    let currentNode = this.rootNode;

    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    console.log(`BTS max: ${currentNode.value}`)
    return currentNode.value;
  }

  public contains (value: number): boolean {
    let currentNode = this.rootNode;

    while (value !== currentNode.value) {

      if (value < currentNode.value && currentNode.left) {
        currentNode = currentNode.left
      }

      else if (value > currentNode.value && currentNode.right) {
        currentNode = currentNode.right
      }

      else {
        break;
      }
    }

    const doesContain = currentNode.value === value
    console.log(`BTS contains ${value}: ${doesContain}`)
    return doesContain;
  }

  public insert (newValue: number): true {
    const newNode = new BSTNode(newValue);
    const parentNode = this.findClosestNode(newValue)
    let alreadyExists = false;

    if (parentNode.value > newValue) {
      parentNode.left = newNode;
      this.nodeCount++;
    }

    else if (parentNode.value < newValue) {
      parentNode.right = newNode;
      this.nodeCount++;
    }

    else {
      alreadyExists = true;
    }

    alreadyExists
      ? console.log(`BTS insert skipped (${newValue} already exists)`)
      : console.log(`BTS inserted new node: ${newValue}`)
    return true;
  }

  private findClosestNode (value: number): BSTNode {
    const searchNode = (node: BSTNode): BSTNode => {
      if (node.value > value) {

        if (node.left) {
          return searchNode(node.left)
        } else {
          return node;
        }

      } else if (node.value < value) {

        if (node.right) {
          return searchNode(node.right)
        } else {
          return node;
        }

      } else {
        return node;
      }
    }

    return searchNode(this.rootNode);
  }

  drawTree(): void {
    console.log(util.inspect(bts, false, null, true))
  }
}

/**
 * Testing The Binary Search Tree
 */
const bts = new BST(10);
bts.insert(5);

bts.contains(4);

bts.insert(4);

bts.contains(4);
bts.contains(10);

bts.insert(7);
bts.insert(11);

bts.size();
bts.min();
bts.max();

bts.insert(12);
bts.insert(9);
bts.insert(8);

bts.size();
bts.min();
bts.max();

bts.insert(8);

bts.size();
bts.min();
bts.max();

bts.drawTree();
