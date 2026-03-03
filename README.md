# Node.js Auth Backend

مشروع Backend مبني بـ **Node.js** و **Express.js** مع **MongoDB** لإدارة البيانات.  
هذا المشروع يتيح إنشاء تطبيق إدارة مستخدمين وكتب ومؤلفين مع حماية المسارات والتحقق من صلاحيات المستخدمين.

---

## المميزات

- **تسجيل مستخدمين** (Register) وتسجيل الدخول (Login) باستخدام **JWT**  
- حماية المسارات بـ **Middleware** للتحقق من التوكن وصلاحيات المستخدم  
- **CRUD للمستخدمين** (إنشاء، قراءة، تعديل، حذف)  
- **CRUD للكتب والمؤلفين**  
- **تشفير كلمات السر** باستخدام **bcrypt**  
- إدارة الصلاحيات بين **Admin/User**  

---

## مسارات API

### المستخدمين (Users)
- `POST /api/auth/register` – تسجيل مستخدم جديد  
- `POST /api/auth/login` – تسجيل دخول مستخدم  
- `GET /api/users` – جلب كل المستخدمين (Admin فقط)  
- `GET /api/users/:id` – جلب مستخدم محدد (Admin أو صاحب الحساب فقط)  
- `PUT /api/users/:id` – تحديث بيانات مستخدم (Admin أو صاحب الحساب فقط)  
- `DELETE /api/users/:id` – حذف مستخدم (Admin أو صاحب الحساب فقط)  

### الكتب (Books)
- `GET /api/books` – جلب كل الكتب  
- `POST /api/books` – إضافة كتاب جديد  
- `PUT /api/books/:id` – تعديل كتاب  
- `DELETE /api/books/:id` – حذف كتاب  

### المؤلفين (Authors)
- `GET /api/authors` – جلب كل المؤلفين  
- `POST /api/authors` – إضافة مؤلف جديد  
- `PUT /api/authors/:id` – تعديل مؤلف  
- `DELETE /api/authors/:id` – حذف مؤلف  

---

## التشغيل

1. تثبيت الحزم:

```bash
npm install
