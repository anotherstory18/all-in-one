# Smart Hospital Management & Queue System

A full-stack hospital workflow platform with role-based login (Admin, Receptionist, Doctor), patient registration, OPD queue/token management, bed occupancy, billing, receipt PDF generation, hospital master management, and analytics dashboards.

## Tech Stack
- Frontend: React + Tailwind CSS + Chart.js
- Backend: Node.js + Express + JWT
- Database: MongoDB (Mongoose)

## Project Structure

- `frontend/` - React UI, pages, components, charts
- `backend/` - Express APIs, controllers, routes, models
- `backend/models` - Mongo collections: Hospitals, Patients, Doctors, Beds, Queue, Bills, Receipts, Users

## Features Implemented
- JWT authentication with roles: Admin, Receptionist, Doctor
- Admin dashboard analytics:
  - total patients today
  - total revenue today
  - doctor availability
  - OPD queue load
  - bed occupancy
  - receipts generated
  - hospital count and bed summary
- Hospital Management Admin Module (database-backed CRUD):
  - Add hospital
  - Edit hospital details
  - Delete hospital
  - View all hospitals in table
  - Update total/available/ICU/emergency beds
  - Update doctor availability and departments
  - Update OPD consultation fee and service charges
- Patient registration and OPD slip/token generation
- Queue management with emergency priority, status and filters
- Doctor dashboard with assigned queue and status updates
- Emergency bed availability with green/red indicators
- Billing calculator + printable bill support
- Receipt generation + downloadable PDF endpoint
- Reports module with chart and printable report view
- Search patient by patient ID endpoint
- Responsive card-based UI in hospital color theme (blue/white/light gray)

## Quick Start (Local)

### 1) Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

### 3) Demo Credentials (seed data)
- Admin: `admin@hospital.com` / `admin123`
- Receptionist: `reception@hospital.com` / `recep123`
- Doctor: `doctor@hospital.com` / `doctor123`

## API Overview
- `POST /api/auth/login`
- `POST /api/patients` (reception/admin)
- `GET /api/patients`, `GET /api/patients/search/:patientId`
- `GET /api/queue`, `PATCH /api/queue/:id`, `POST /api/queue/next`
- `GET /api/doctors`, `GET /api/doctors/:id/queue`
- `GET /api/beds`, `PATCH /api/beds/:id` (admin)
- `POST /api/billing/bills`
- `POST /api/billing/receipts`, `GET /api/billing/receipts/:id/pdf`
- `GET /api/admin/dashboard`, `GET /api/admin/reports`
- `GET /api/hospitals`, `POST /api/hospitals`
- `GET /api/hospitals/:id`, `PUT /api/hospitals/:id`, `DELETE /api/hospitals/:id`
- `PATCH /api/hospitals/:id/beds`
- `PATCH /api/hospitals/:id/settings`

## Notes
- PDF receipts are generated server-side using PDFKit.
- OPD slip, bills, and reports support browser print/download.
