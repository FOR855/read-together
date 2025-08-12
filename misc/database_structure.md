数据库结构方案
1. users (用户表)
这个表用于存储所有注册用户的基本信息。


| 列名 | 数据类型 | 说明 |
|---|---|---|
| user_id | INT 或 UUID (主键) | 用户的唯一ID |
| username | VARCHAR(50) | 用户名 (可用于登录) |
| email | VARCHAR(255) | 邮箱地址 (可用于登录) |
| password_hash | VARCHAR(255) | 加密后的密码，不直接存储明文密码 |
| bio | TEXT | 用户个人简介 |
| profile_picture_url | VARCHAR(255) | 用户头像的存储路径 |
| created_at | TIMESTAMP | 用户注册时间 |

1. books (书籍表)
这个表用于存储用户上传的每一本书籍的信息。

| 列名 | 数据类型 | 说明 |
|---|---|---|
| book_id | INT 或 UUID (主键) | 书籍的唯一ID |
| uploader_id | INT 或 UUID | 外键，指向 users.user_id，表示上传者 |
| title | VARCHAR(255) | 书籍标题 |
| author | VARCHAR(255) | 书籍作者 |
| description | TEXT | 书籍简介 |
| file_url | VARCHAR(255) | 书籍文件（如PDF）的存储路径 |
| uploaded_at | TIMESTAMP | 书籍上传时间 |

3. friends (好友关系表)
这个表用于处理用户之间的好友关系。这是一个多对多关系，需要一个中间表来存储。

| 列名 | 数据类型 | 说明 |
|---|---|---|
| user_id_1 | INT 或 UUID (主键) | 外键，指向 users.user_id |
| user_id_2 | INT 或 UUID (主键) | 外键，指向 users.user_id |
| status | VARCHAR(20) | 好友关系状态 (pending, accepted, blocked 等) |
| created_at | TIMESTAMP | 好友关系创建时间 |

4. chats (聊天会话表)
这个表用于存储所有聊天会话的记录。

| 列名 | 数据类型 | 说明 |
|---|---|---|
| chat_id | INT 或 UUID (主键) | 聊天的唯一ID |
| type | VARCHAR(20) | 聊天类型 (private, group 等) |
| created_at | TIMESTAMP | 会话创建时间 |

5. chat_participants (聊天参与者表)
这个表用于关联 users 表和 chats 表，处理多对多关系，一个会话可以有多个参与者。

| 列名 | 数据类型 | 说明 |
|---|---|---|
| chat_id | INT 或 UUID (主键) | 外键，指向 chats.chat_id |
| user_id | INT 或 UUID (主键) | 外键，指向 users.user_id |

6. messages (聊天消息表)
这个表用于存储每一条具体的聊天消息。

| 列名 | 数据类型 | 说明 |
|---|---|---|
| message_id | INT 或 UUID (主键) | 消息的唯一ID |
| chat_id | INT 或 UUID | 外键，指向 chats.chat_id |
| sender_id | INT 或 UUID | 外键，指向 users.user_id，表示发送者 |
| message_text | TEXT | 消息内容 |
| sent_at | TIMESTAMP | 消息发送时间 |

7. user_books (用户书架表)
这个表用于记录用户添加到自己书架的书籍，可以跟踪用户的阅读状态。这是一个用户和书籍之间的多对多关系。

| 列名 | 数据类型 | 说明 |
|---|---|---|
| user_id | INT 或 UUID (主键) | 外键，指向 users.user_id |
| book_id | INT 或 UUID (主键) | 外键，指向 books.book_id |
| status | VARCHAR(50) | 阅读状态 (to_read, reading, completed) |
| added_at | TIMESTAMP | 添加到书架的时间 |