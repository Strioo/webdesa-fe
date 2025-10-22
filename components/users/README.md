# User Management Components

Komponen-komponen untuk mengelola data pengguna (users) di dashboard admin.

## Struktur Komponen

### 1. CreateEditModal.tsx
Modal untuk menambah atau mengedit user.

**Props:**
- `user`: Data user untuk edit mode (optional)
- `isOpen`: Status modal terbuka/tertutup
- `onClose`: Callback saat modal ditutup
- `onSave`: Callback saat data disimpan
- `isEdit`: Boolean untuk mode edit (default: false)

**Fitur:**
- Form input lengkap (name, email, password, role, phone, address)
- Password field dengan show/hide toggle
- Role dropdown (VISITOR, WARGA, ADMIN) dengan deskripsi
- Password opsional saat edit (hanya jika ingin mengubah)
- Validasi form client-side
- Password minimal 6 karakter
- Icon untuk setiap field input

### 2. DetailModal.tsx
Modal untuk menampilkan detail lengkap user.

**Props:**
- `user`: Data user (nullable)
- `isOpen`: Status modal terbuka/tertutup
- `onClose`: Callback saat modal ditutup

**Fitur:**
- Avatar dengan initial huruf pertama
- Role badge dengan color coding
- Info grid dengan icons (Email, Role, Phone, Created Date)
- Alamat lengkap (jika ada)
- User ID dalam format monospace
- Gradient header
- Format tanggal dalam bahasa Indonesia

### 3. UserGridView.tsx
Tampilan grid (card-based) untuk daftar user.

**Props:**
- `users`: Array data user
- `onView`: Callback saat tombol View diklik
- `onEdit`: Callback saat tombol Edit diklik
- `onDelete`: Callback saat tombol Delete diklik

**Fitur:**
- Layout responsive grid (1-3 kolom)
- Card dengan gradient header
- Avatar dengan initial huruf
- Role badge dengan icon
- Contact info (email, phone, address)
- Action buttons (View, Edit, Delete)
- Empty state ketika tidak ada data
- Hover effects dan animasi

### 4. UserTableView.tsx
Tampilan tabel untuk daftar user.

**Props:**
- `users`: Array data user
- `onView`: Callback saat tombol View diklik
- `onEdit`: Callback saat tombol Edit diklik
- `onDelete`: Callback saat tombol Delete diklik

**Fitur:**
- Tabel responsive dengan horizontal scroll
- Kolom: User (avatar + name), Email, Role, Phone, Address, Actions
- Avatar dengan initial dan gradient background
- Role badge dengan color coding
- Tanggal registrasi
- Truncate text untuk kolom panjang
- Action buttons (View, Edit, Delete)
- Empty state ketika tidak ada data
- Hover row effect

## Role & Colors

### Role Badge:
- **ADMIN**: Red (🛡️ Admin)
- **WARGA**: Blue (👤 Warga)
- **VISITOR**: Gray (👤 Visitor)

### Role Descriptions:
- **VISITOR**: Pengunjung dengan akses terbatas
- **WARGA**: Warga desa yang dapat membuat laporan
- **ADMIN**: Administrator dengan akses penuh

## Data Interface

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: "VISITOR" | "WARGA" | "ADMIN";
  noTelp?: string;
  alamat?: string;
  createdAt: string;
}
```

## Penggunaan

```tsx
import CreateEditModal from "@/components/users/CreateEditModal";
import DetailModal from "@/components/users/DetailModal";
import UserGridView from "@/components/users/UserGridView";
import UserTableView from "@/components/users/UserTableView";

// Di halaman:
const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
const [selectedUser, setSelectedUser] = useState(null);
const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const [editingUser, setEditingUser] = useState(null);

// Grid View
{viewMode === "grid" && (
  <UserGridView
    users={users}
    onView={(u) => { setSelectedUser(u); setIsDetailModalOpen(true); }}
    onEdit={(u) => { setEditingUser(u); setIsEditModalOpen(true); }}
    onDelete={handleDelete}
  />
)}

// Table View
{viewMode === "table" && (
  <UserTableView
    users={users}
    onView={(u) => { setSelectedUser(u); setIsDetailModalOpen(true); }}
    onEdit={(u) => { setEditingUser(u); setIsEditModalOpen(true); }}
    onDelete={handleDelete}
  />
)}

// Create Modal
<CreateEditModal
  isOpen={isCreateModalOpen}
  onClose={() => setIsCreateModalOpen(false)}
  onSave={handleCreate}
/>

// Edit Modal
<CreateEditModal
  user={editingUser}
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  onSave={handleEdit}
  isEdit={true}
/>

// Detail Modal
<DetailModal
  user={selectedUser}
  isOpen={isDetailModalOpen}
  onClose={() => setIsDetailModalOpen(false)}
/>
```

## API Integration

Komponen ini bekerja dengan endpoint:
- `GET /api/users/get` - Mendapatkan semua user
- `GET /api/users/get/:id` - Get user by ID
- `POST /api/users/create` - Menambah user baru
- `PUT /api/users/update/:id` - Update user
- `DELETE /api/users/delete/:id` - Menghapus user

## Form Validation

### Create User:
- Name: Required
- Email: Required, valid email format
- Password: Required, minimal 6 karakter
- Role: Required (VISITOR/WARGA/ADMIN)
- Phone: Optional
- Address: Optional

### Edit User:
- Name: Required
- Email: Required, valid email format
- Password: Optional (kosongkan jika tidak ingin mengubah)
- Role: Required
- Phone: Optional
- Address: Optional

## Security Notes

- Password di-hash menggunakan bcrypt di backend
- Password tidak ditampilkan di detail view
- Only admin can access user management
- Password field dengan show/hide toggle untuk keamanan input

## Styling

- Menggunakan Tailwind CSS
- Icons dari lucide-react
- Responsive design (mobile-first)
- Gradient backgrounds untuk visual appeal
- Avatar dengan initial letters
- Shadow dan hover effects
- Color-coded role badges
