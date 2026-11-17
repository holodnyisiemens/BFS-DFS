'use strict';

const { TreeNode, bfs, preorder, inorder, postorder } = require('./tree');

// Бинарное дерево:
//         F
//       /   \
//      B     G
//     / \   / \
//    A   D  H  I
//       / \
//      C   E
function buildBinaryTree() {
  const root = new TreeNode('F');
  const b = root.addChild(new TreeNode('B'));
  const g = root.addChild(new TreeNode('G'));
  b.addChild(new TreeNode('A'));
  const d = b.addChild(new TreeNode('D'));
  d.addChild(new TreeNode('C'));
  d.addChild(new TreeNode('E'));
  g.addChild(new TreeNode('H'));
  g.addChild(new TreeNode('I'));
  return root;
}

// k-ичное дерево (3-ary):
//         1
//       / | \
//      2  3  4
//     /|     |
//    5 6     7
function buildKaryTree() {
  const root = new TreeNode(1);
  const two = root.addChild(new TreeNode(2));
  root.addChild(new TreeNode(3));
  const four = root.addChild(new TreeNode(4));
  two.addChild(new TreeNode(5));
  two.addChild(new TreeNode(6));
  four.addChild(new TreeNode(7));
  return root;
}

console.log('--- Бинарное дерево (F, B, G, ...) ---');
const binary = buildBinaryTree();
console.log(`BFS:       ${bfs(binary).join(' ')}`);
console.log(`Preorder:  ${preorder(binary).join(' ')}`);
console.log(`Inorder:   ${inorder(binary).join(' ')}`);
console.log(`Postorder: ${postorder(binary).join(' ')}`);

console.log('\n--- k-ичное дерево (1; 2, 3, 4; 5, 6; 7) ---');
const kary = buildKaryTree();
console.log(`BFS:       ${bfs(kary).join(' ')}`);
console.log(`Preorder:  ${preorder(kary).join(' ')}`);
console.log(`Inorder:   ${inorder(kary).join(' ')}`);
console.log(`Postorder: ${postorder(kary).join(' ')}`);

console.log('\n--- Самопроверка (сравнение с эталонными порядками) ---');
const checks = [
  ['BFS бинарного', bfs(binary), 'F B G A D H I C E'],
  ['Preorder бинарного', preorder(binary), 'F B A D C E G H I'],
  ['Inorder бинарного', inorder(binary), 'A B C D E F H G I'],
  ['Postorder бинарного', postorder(binary), 'A C E D B H I G F'],
  ['BFS k-ичного', bfs(kary), '1 2 3 4 5 6 7'],
  ['Preorder k-ичного', preorder(kary), '1 2 5 6 3 4 7'],
  ['Inorder k-ичного', inorder(kary), '5 2 6 1 3 7 4'],
  ['Postorder k-ичного', postorder(kary), '5 6 2 3 7 4 1'],
];
let passed = 0;
for (const [name, got, want] of checks) {
  const ok = got.join(' ') === want;
  console.log(`${ok ? 'OK  ' : 'ОШИБКА'} ${name}: ${got.join(' ')}`);
  if (ok) passed++;
}
console.log(`пройдено ${passed}/${checks.length} проверок`);

console.log('\n--- Производительность (случайное дерево ~200000 узлов) ---');
function buildRandomTree(count) {
  const nodes = [new TreeNode(0)];
  for (let i = 1; i < count; i++) {
    const node = new TreeNode(i);
    nodes[Math.floor(Math.random() * nodes.length)].addChild(node);
    nodes.push(node);
  }
  return nodes[0];
}
const big = buildRandomTree(200000);
for (const [name, fn] of [['BFS', bfs], ['Preorder', preorder], ['Inorder', inorder], ['Postorder', postorder]]) {
  const t0 = Date.now();
  const r = fn(big);
  console.log(`${name}: ${r.length} узлов за ${Date.now() - t0} мс`);
}
