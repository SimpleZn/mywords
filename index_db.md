# Basic pattern

1. Open a database
   打开数据库：
   使用 indexedDB.open() 方法打开或创建数据库。

2. Create an object store in the database
   监听 onupgradeneeded 事件：
   当数据库版本变化或首次创建时，会触发 onupgradeneeded 事件。在这个事件的处理函数中，你可以创建新的对象仓库。
   var objectStore = db.createObjectStore('storeName', { keyPath: 'id' });
   这里 storeName 是对象仓库的名称，keyPath 是用来指定主键的属性路径。

3. Start a transaction and make a request to do some database operation, like adding or retrieving data.

4. Wait for the operation to compelete by listening to the right kind of DOM event.

5. Do something with the results (can be found on the request object)

One of the main design goals of IndexedDB is to allow large amounts of data to be stored for offline use.

// Let us open our database
const request = window.indexedDB.open("MyTestDatabase", 3);

The request here was generated with a call to indexedDB.open(), so request.result is an instance of IDBDatabase, and you definitely want to save that for later. Your code might look something like this:

IndexedDB 是一个运行在浏览器中的低级 API，用于在客户端存储大量结构化数据。

## 数据库 (Database)

最顶层对象，用于管理数据存储，
每个数据库都有一个名称和一个版本号

## 对象仓库（Object Store）

存储记录的容器，类似关系数据库中的表
每个对象仓库都有一个名称和一个键路径，用于唯一标识记录

q: 对象仓库之间如何关联起来?
由于 IndexedDB 是一个 NoSQL 数据库，它不像关系型数据库那样支持复杂的连接和外键约束，因此需要在应用层面处理这些关系。

你可以在应用中维护对象仓库之间的关系。例如，你可以在一个对象仓库中存储指向另一个对象仓库中记录的引用（通过键值）。这样，虽然数据库层面没有直接的外键关系，但你的应用程序可以通过这些引用来管理不同对象仓库之间的关联。

使用事务（db.transaction()）和游标（objectStore.openCursor()）来遍历和操作多个对象仓库中的数据。虽然这不会直接创建对象仓库之间的关联，但它可以帮助你在查询和更新数据时跨对象仓库操作。

## 记录（Record）

存储在对象仓库中的数据项，可以是任何类型，包括 JavaScript 对象
每个记录都有一个一个键（key）,用于索引和检索

## 键（key）

用于唯一标识对象仓库中的记录
可以是主键，也可以是次级索引

## 索引（Index）

提供了一种在对象仓库中对记录进行索引的方法，以便快速检索
可以创建多个索引，每个索引都有一个名称和一个关键路径

## 事务（Transaction）

IndexedDB 操作是在事务中进行的，确保数据的一致性和完整性
事务有三种模式：readonly,readwrite versionchange

## 游标（Cursor）

用于遍历对象仓库中的记录
有多种类型的游标，用于不同的遍历需求

## 请求（Request）

执行数据库操作时创建的异步请求对象
可以通过监听请求对象的事件来获取操作结果

## 版本控制（Version Control）

IndexedDB 数据库有版本控制机制，可以通过修改版本号来升级数据库结构。
当数据库版本发生变化时，会触发 onupgradeneeded 事件

## 同源策略(Same-origin policy)

IndexedDB 遵循同源策略，只有来自同一源的页面才能访问同一个数据库

## 异步 API

IndexedDB 所有操作都是异步的，不阻塞主线程，使用回调函数或者 Promise 来处理结果

IndexedDB 提供了强大的数据存储和查询能力，使得 Web 应用可以在离线状态下运行，并且能够处理大量数据。它适用于需要存储复杂数据结构和大量数据的应用，如邮件客户端、图形密集型游戏、复杂的文档编辑器等。

# 在 IndexedDB 中如何存储不同用户的数据

在 IndexedDB 中存储不同用户的数据时，关键是要确保数据的隔离性和安全性。

## 用户认证和会话管理

在存储用户数据之前，你需要一个用户认证机制来识别和验证用户身份。
一旦用户登录，你可以创建一个会话，并为该会话生成一个唯一的会话标识符（session ID）。

## 创建用户特定的数据库或对象存储

对于每个用户，你可以创建一个单独的数据库或者在同一个数据库内创建用户特定的对象存储。这种方法可以更好地隔离用户数据。

创建单独的数据库 这种方法适用于每个用户的数据量非常大，或者需要严格隔离用户数据的场景。为每个用户创建一个单独的数据库可以提供更好的性能和安全性，因为每个数据库都有自己的事务和锁机制，不会受到其他用户数据操作的影响。

优点：

数据隔离：每个用户的数据完全独立，不会相互影响。
性能：大数据量操作时，可以提供更好的性能。
安全性：每个数据库可以有自己的安全策略和访问控制。
缺点：

管理复杂：需要管理多个数据库，增加了数据库的创建和管理复杂性。
资源消耗：每个数据库都会占用一定的系统资源。

# 我开发了一个小的浏览器插件，数据存储使用的是 IndexedDB, 我想为会员开通数据同步到云端数据库 MongoDB。同步时机应该是什么时候，同步逻辑应该怎么实现。

同步时机
用户登录时：当会员用户登录插件时，可以检查是否有未同步的数据，并与云端数据库进行同步。
网络状态变化时：当用户的网络连接从离线变为在线时，触发数据同步。
数据修改后：每次本地数据被创建、更新或删除后，标记这些更改，并在合适的时机同步到云端。

同步逻辑
推送本地更改到服务器：

连接到 IndexedDB 数据库，检索所有标记为已修改、新创建或删除的对象。
将这些更改序列化成 JSON 格式。
通过建立 API 连接到 MongoDB 服务器。
使用 API 端点将这些更改发送到服务器。
服务器接收到数据后，验证并更新 MongoDB 中的相应记录
。
从服务器拉取远程更改：

连接到 MongoDB 服务器，查询自上次同步以来所做的更改。
从服务器检索更新的记录。
连接到 IndexedDB 数据库，并用从服务器拉取的数据更新本地记录。
处理冲突：

当同一数据项在客户端和服务器上都被修改时，需要处理冲突。可以采用“最后写入者优先”策略，或者开发算法自动合并冲突的更改
。

您可以使用如 synceddb 这样的库来简化 IndexedDB 与远程 REST API（例如您的 MongoDB 数据库）之间的同步过程。synceddb 库提供了一个 SyncManager，可以自动跟踪 IndexedDB 中的变化，并在网络可用时与远程 API 同步这些变化
。
