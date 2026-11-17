'use strict';

/**
 * Абстрактное дерево (связь «родитель — потомок/потомки») и обходы без рекурсии.
 *
 * Узел дерева: значение + массив потомков + ссылка на родителя.
 * Рекурсия нигде не используется:
 *  - в обходах в глубину (DFS) применяется явный стек;
 *  - в обходе в ширину (BFS) — очередь на массиве с указателем головы.
 *
 * Каждый обход возвращает массив значений в порядке посещения:
 *  - bfs       — по уровням, слева направо;
 *  - preorder  — узел, затем потомки слева направо;
 *  - inorder   — для k-ичного дерева: первый потомок, затем узел,
 *                затем остальные потомки (для бинарного дерева совпадает
 *                с классическим обходом «левый — узел — правый»);
 *  - postorder — потомки слева направо, затем узел.
 *
 * Все обходы работают за O(n) времени.
 */

class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }

  // Добавляет потомка и фиксирует связь родитель–потомок в обе стороны.
  addChild(child) {
    child.parent = this;
    this.children.push(child);
    return child;
  }
}

// BFS — обход в ширину (очередь по уровням), O(n).
function bfs(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];
  for (let head = 0; head < queue.length; head++) {
    const node = queue[head];
    result.push(node.value);
    for (const child of node.children) queue.push(child);
  }
  return result;
}

// DFS Preorder — узел, потомки слева направо, O(n).
function preorder(root) {
  const result = [];
  if (!root) return result;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.value);
    for (let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]); // в стек — в обратном порядке
    }
  }
  return result;
}

// DFS Inorder — первый потомок, узел, остальные потомки, O(n).
// В стек кладём либо узел, либо маркер «узел уже обработан».
function inorder(root) {
  const result = [];
  if (!root) return result;
  const stack = [root];
  while (stack.length) {
    const item = stack.pop();
    if (item.marker) {
      result.push(item.marker.value);
      continue;
    }
    const node = item;
    const kids = node.children;
    for (let i = kids.length - 1; i >= 1; i--) stack.push(kids[i]);
    stack.push({ marker: node });
    if (kids.length) stack.push(kids[0]);
  }
  return result;
}

// DFS Postorder — потомки, затем узел, O(n).
// Тот же предобход, но потомки в стек кладутся слева направо,
// а результат в конце разворачивается.
function postorder(root) {
  const result = [];
  if (!root) return result;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    result.push(node.value);
    for (const child of node.children) stack.push(child);
  }
  result.reverse();
  return result;
}

module.exports = { TreeNode, bfs, preorder, inorder, postorder };
