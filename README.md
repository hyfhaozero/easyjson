# EasyJson Library 使用文档 (中文)

## 简介

\easyjson\ 是一个方便的 JSON 操作库，提供了简单易用的接口来查询、操作和修改指定路径的 JSON 文件。用户无需每次都进行 JSON 解析，函数内置错误处理和回调功能，确保操作的顺利进行。

## 安装

\bash
npm install easyjson
\

## 引入库

\typescript
import { ej } from 'easyjson';
\

## API 介绍

### 1. 初始化

使用 \ej.new()\ 创建新的 \EasyJson\ 实例，并可选择传入回调函数。

\typescript
const j = ej.new(initialData, (error, result) => {
  if (error) console.error('Error:', error);
  else console.log('Callback result:', result);
});
\

### 2. 查询数据

通过 \search(path)\ 查找指定路径的数据。

\typescript
j.search('family.father.son');  // 返回该节点的数据
\

### 3. 删除节点

通过 \del(path)\ 删除指定路径的节点。

\typescript
j.del('family.father.son', (error, success) => {
  if (error) console.error('Delete failed:', error);
  else console.log('Deleted successfully');
});
\

### 4. 添加节点

通过 \add(path, value, callback)\ 在指定路径添加新节点，\value\ 可选，默认值为 \null\。

\typescript
j.add('family.father.sister', 'Jane', (error, success) => {
  if (error) console.error('Add failed:', error);
  else console.log('Added successfully');
});
\

### 5. 修改节点

通过 \edit(path, value, callback)\ 修改指定路径节点的内容。

\typescript
j.edit('family.father.sister', 'Mary', (error, success) => {
  if (error) console.error('Edit failed:', error);
  else console.log('Edited successfully');
});
\

### 6. 检查节点是否存在

通过 \exists(path)\ 检查指定路径的节点是否存在。

\typescript
console.log(j.exists('family.father.son'));  // false
console.log(j.exists('family.father.sister'));  // true
\

## 示例

\typescript
import { ej } from 'easyjson';

const j = ej.new({ family: { father: { son: 'John' } } });

// 查询
console.log(j.search('family.father.son'));  // 输出: 'John'

// 添加节点
j.add('family.father.sister', 'Jane');

// 删除节点
j.del('family.father.son');

// 修改节点
j.edit('family.father.sister', 'Mary');

// 检查节点是否存在
console.log(j.exists('family.father.son'));  // 输出: false
console.log(j.exists('family.father.sister'));  // 输出: true
\

---

# EasyJson Library Usage Documentation (English)

## Introduction

\easyjson\ is a convenient library for manipulating JSON data. It provides simple interfaces for querying, modifying, and manipulating JSON nodes without the need for repetitive parsing. The library includes error handling and callback functionality to ensure smooth operations.

## Installation

\bash
npm install easyjson
\

## Importing the Library

\typescript
import { ej } from 'easyjson';
\

## API Overview

### 1. Initialization

Use \ej.new()\ to create a new \EasyJson\ instance. You can optionally pass a callback function.

\typescript
const j = ej.new(initialData, (error, result) => {
  if (error) console.error('Error:', error);
  else console.log('Callback result:', result);
});
\

### 2. Searching Data

Use \search(path)\ to query data at a specific path.

\typescript
j.search('family.father.son');  // Returns the data at the given node
\

### 3. Deleting a Node

Use \del(path)\ to delete a node at a specified path.

\typescript
j.del('family.father.son', (error, success) => {
  if (error) console.error('Delete failed:', error);
  else console.log('Deleted successfully');
});
\

### 4. Adding a Node

Use \add(path, value, callback)\ to add a new node at the specified path. \value\ is optional and defaults to \null\.

\typescript
j.add('family.father.sister', 'Jane', (error, success) => {
  if (error) console.error('Add failed:', error);
  else console.log('Added successfully');
});
\

### 5. Editing a Node

Use \edit(path, value, callback)\ to modify the content of an existing node at a specified path.

\typescript
j.edit('family.father.sister', 'Mary', (error, success) => {
  if (error) console.error('Edit failed:', error);
  else console.log('Edited successfully');
});
\

### 6. Checking if a Node Exists

Use \exists(path)\ to check if a node exists at a specific path.

\typescript
console.log(j.exists('family.father.son'));  // false
console.log(j.exists('family.father.sister'));  // true
\

## Example

\typescript
import { ej } from 'easyjson';

const j = ej.new({ family: { father: { son: 'John' } } });

// Querying
console.log(j.search('family.father.son'));  // Output: 'John'

// Adding a node
j.add('family.father.sister', 'Jane');

// Deleting a node
j.del('family.father.son');

// Editing a node
j.edit('family.father.sister', 'Mary');

// Checking if a node exists
console.log(j.exists('family.father.son'));  // Output: false
console.log(j.exists('family.father.sister'));  // Output: true
\
