# Samandar Portfolio

Full-Stack Portfolio — Next.js 14 + MongoDB Atlas + Render

## Loyiha tuzilishi

```
samandar-portfolio/
├── app/
│   ├── page.tsx              # Asosiy sahifa
│   ├── layout.tsx
│   ├── globals.css
│   ├── admin/
│   │   └── page.tsx          # Admin panel (/admin)
│   ├── api/
│   │   ├── projects/route.ts # GET, POST loyihalar
│   │   ├── projects/[id]/    # PUT, DELETE
│   │   ├── about/route.ts    # GET, PUT haqimda
│   │   └── auth/route.ts     # POST login
│   └── components/
│       ├── Navbar.tsx
│       ├── Hero.tsx
│       ├── AboutSection.tsx
│       ├── SkillsSection.tsx
│       ├── ProjectsSection.tsx
│       └── ContactSection.tsx
├── models/
│   ├── Project.ts
│   └── About.ts
├── lib/
│   └── mongodb.ts
└── .env.local.example
```

---

## 1. MongoDB Atlas sozlash

1. [mongodb.com/atlas](https://mongodb.com/atlas) ga kiring va bepul cluster yarating
2. **Database Access** → User yarating (username va password)
3. **Network Access** → `0.0.0.0/0` qo'shing (hamma joydan kirish uchun)
4. **Connect** → "Connect your application" → Connection string nusxalang:
   ```
   mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
   ```

---

## 2. GitHub ga yuklash

```bash
cd samandar-portfolio
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/samandar-portfolio.git
git push -u origin main
```

---

## 3. Render.com da deploy qilish

### Frontend + Backend (bitta servis)

1. [render.com](https://render.com) ga kiring
2. **New** → **Web Service**
3. GitHub reponi ulang
4. Sozlamalar:
   - **Name**: samandar-portfolio
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. **Environment Variables** bo'limiga qo'shing:
   ```
   MONGODB_URI = mongodb+srv://...
   ADMIN_PASSWORD = parolingiz
   ```
6. **Create Web Service** bosing

Deploy 3-5 daqiqa ichida tayyor bo'ladi!

---

## 4. Admin panel ishlatish

- URL: `https://sizning-sayt.onrender.com/admin`
- `.env.local`dagi `ADMIN_PASSWORD` ni kiriting
- **Loyihalar** tabida yangi loyiha qo'shing / tahrirlang / o'chiring
- **Haqimda** tabida ma'lumotlaringizni yangilang:
  - Asosiy: ism, bio, kontaktlar
  - Ko'nikmalar: nom, daraja (%), kategoriya
  - Tajriba: kompaniya, rol, davr
  - Ta'lim: muassasa, daraja, yillar
  - Statistika: raqamlar (10+, 5+, ...)

---

## Local ishlatish

```bash
# 1. .env.local yarating
cp .env.local.example .env.local
# (MONGODB_URI va ADMIN_PASSWORD ni to'ldiring)

# 2. Paketlarni o'rnating
npm install

# 3. Ishga tushiring
npm run dev
# http://localhost:3000
```
