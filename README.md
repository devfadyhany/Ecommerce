# Elite Cart

SEF Academy Training Project — a front-end e-commerce project split into two independent React apps: a customer-facing **store** and **admin dashboard**.

## Live Links

<ul>
  <li>
    <a href="https://elite-cart-admin.vercel.app">Admin Dashboard</a><br/>
  </li>
  <li>
    <a href="https://elite-cart-alpha.vercel.app">Store</a>
  </li>
</ul>

## Repository Structure

```
Ecommerce/
├── store/             # Customer-facing storefront (React + Vite)
└── admin-dashboard/    # Admin panel for managing the store (React + Vite)
```

Each app is a standalone Vite project with its own `package.json`, dependencies, and dev server.

## Tech Stack

Both apps share the same core stack:

- **React 19** + **Vite** — app framework and build tooling
- **Tailwind CSS v4** — utility-first styling, with custom design tokens and light/dark theming
- **React Router v7** — client-side routing
- **React Hook Form + Zod** — form state and schema validation
- **Axios** — API requests
- **Recharts** — charts and data visualization
- **React Toastify** — toast notifications
- **Lucide React / React Icons** — icon sets
- **Day.js** — date formatting/handling
- **ESLint** — linting

## Store (Customer App)

The storefront implements a typical e-commerce shopping flow:

- **Home page** with a hero/banner, category section, and featured products
- **Shop page** with product listing, filters, active-filter chips, loading skeletons, and empty/error states
- **Product Details** page
- **Cart** page backed by a shared `CartContext`
- **Wishlist**, integrated into the same cart context
- **Checkout** and **Order Success** pages
- **My Orders** and **Order Details** pages
- **Profile** page
- Full **authentication flow** (login, etc.) with a dedicated `AuthLayout`
- **Navbar** with search, wired into app-wide contexts, plus a responsive **Footer**
- **Dark mode** support
- Reusable UI primitives: `Button`, `Skeleton`, `EmptyState`, `ErrorState`, `SearchInput`, `LoadingSpinner`
- Centralized error handling and loading states across pages

## Admin Dashboard

A gold-themed admin panel for managing the store:

- **Dashboard** home aggregating API data into `InfoSection`, `OrderStatus`, `TopProducts`, and `RecentOrders`
- **Orders** page: filterable/searchable table, pagination, status & payment badges, and a details drawer for viewing/updating order status
- **Carts** management
- **Users** table
- **Sidebar** with collapsible/expandable states and a live connection-status indicator, synced with the main layout
- Reusable primitives: `SearchInput`, `FilterDropdown`, `Pagination`, `Skeleton`, badges, and loading skeletons for tables
- Login page with basic authentication (for testing)

## Getting Started

Each app is run independently:

```bash
# Store
cd store
npm install
npm run dev

# Admin Dashboard
cd admin-dashboard
npm install
npm run dev
```

## Environment Variables

- Environment variables (`.env`) you'll need to supply your own API configuration to run either app against a backend:

```env
VITE_API_URL = your_api_url
```
