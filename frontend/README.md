# Food Retail Frontend

React 19 + TypeScript e-commerce web app.

## 🏗️ Tech Stack

- React 19, TypeScript, Vite 7
- Tailwind CSS 3, Lucide React icons
- Zustand (state management)
- Axios (HTTP client)
- React Router DOM v7
- ESLint

## 📁 Project Structure

```txt
src/
├── components/   # Auth, Category, Home, Layout, UI
├── pages/        # HomePage, LoginPage, RegisterPage
├── services/     # API calls (auth.api, axios.instance)
├── store/        # Zustand (authStore)
├── types/        # TypeScript types
├── api/          # API utilities
└── constants/    # Routes

## 🔐 Authentication

- Axios interceptor for token injection
- Zustand store: `user`, `isAuthenticated`, `hydrated`
- Token refresh queue logic
- Bearer token in `Authorization` header

## 🎯 Features

- ✅ Responsive design (Tailwind)
- ✅ Type-safe (TypeScript)
- ✅ Custom hooks (`useLoginForm`, `useHeader`, `useCategoryMenu`)
- ✅ Reusable UI components
- ✅ Environment-based configuration
- ✅ Category tree structure

## 🔌 Routes

- `/` - Home
- `/login` - Login
- `/register` - Register
- `/cart` - Cart
- `/checkout` - Checkout
- `/profile` - Profile

## 🎨 Colors

- Primary: `#ff7a00`
- Secondary: `#ffb703`
- Dark: `#1f2937`

## 📦 Key Dependencies

React 19 | TypeScript | Vite | Tailwind CSS | Axios | Zustand | React Router

---

**Version**: 0.0.0
