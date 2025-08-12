-- 启用 pgcrypto 扩展（只需一次）
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 插入两个管理员用户，密码用 BCrypt 加密
INSERT INTO users (user_id, username, email, password_hash, bio, profile_picture_url)
VALUES
    (gen_random_uuid(), 'admin1', 'yanghuoshan2021@gmail.com', crypt('Y@ng13859295533', gen_salt('bf')), '系统管理员', NULL),
    (gen_random_uuid(), 'admin2', '849762861@qq.com', crypt('Y@ng13859295533', gen_salt('bf')), '系统管理员', NULL);
