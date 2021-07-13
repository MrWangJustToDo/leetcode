function ListNode(val, next) {
  this.val = val;
  this.next = next;
}

/**
 *
 * @param  {...any} args 通过传入的元素生成一个链表
 */
function getListByArgs(...args) {
  let re = new List(...args);
  return re.node;
}

function List(...val) {
  this.val = val;
  this.node = this._init();
}

List.prototype._init = function () {
  let temp = new ListNode("temp");
  let re = temp;
  this.val.forEach((item) => {
    temp.next = new ListNode(item);
    temp = temp.next;
  });
  return re.next;
};

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 *
 * @param {Array} arr 原始数组
 * @returns TreeNode 根据数组获取一个紧凑的二叉树
 */
function arrToTreeNode(arr) {
  let root = new TreeNode(arr[0]);
  let current = [root];
  let start = 1;
  while (current.length) {
    let next = [];
    for (let i = 0; i < current.length; i++) {
      let temp = current[i];
      let left =
        arr[start] != null ? new TreeNode(arr[start++]) : (start++, null);
      let right =
        arr[start] != null ? new TreeNode(arr[start++]) : (start++, null);
      temp.left = left;
      temp.right = right;
      if (left) {
        next.push(left);
      }
      if (right) {
        next.push(right);
      }
    }
    current = next;
  }
  return root;
}

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function heapDown(arr, start, end, judgeFun) {
  let target = start;
  let left = start * 2 + 1;
  let right = start * 2 + 2;
  if (left < end && judgeFun(arr[target], arr[left])) {
    target = left;
  }
  if (right < end && judgeFun(arr[target], arr[right])) {
    target = right;
  }
  if (target != start) {
    swap(arr, target, start);
    heapDown(arr, target, end, judgeFun);
  }
}

function heapIfy(arr, judgeFun) {
  let start = ((arr.length - 1) / 2) | 0;
  for (let i = start; i >= 0; i--) {
    heapDown(arr, i, arr.length, judgeFun);
  }
}

/**
 *
 * @param {Array} srcArr 需要排序的数组
 * @param {Function} judgeFun 排序判断条件,默认从小到大
 */
function heapSort(srcArr, judgeFun = (o1, o2) => o1 > o2) {
  heapIfy(srcArr, judgeFun);
  for (let i = 0; i < srcArr.length; i++) {
    swap(srcArr, 0, srcArr.length - 1 - i);
    heapDown(srcArr, 0, srcArr.length - 1 - i, judgeFun);
  }
}
