# Git Workflow & PR Manager Skill

## 1. Aturan Commit (Conventional Commits)
Setiap kali membuat commit atau menyarankan pesan commit, gunakan format baku:
`<type>(<scope>): <deskripsi singkat>`

Tipe yang diperbolehkan:
- `feat`: Penambahan fitur baru
- `fix`: Perbaikan bug
- `refactor`: Restrukturisasi kode tanpa mengubah fungsionalitas
- `docs`: Perubahan dokumentasi
- `style`: Perapihan format kode (spasi, titik koma)
- `test`: Penambahan atau perbaikan unit test

Aturan commit:
- Gunakan bahasa yang konsisten dan selalu gunakan huruf kecil.
- Judul commit maksimal 50 karakter.

## 2. Aturan Branch
Saat menyarankan nama cabang baru, gunakan pola:
- `feat/<nama-fitur>`
- `fix/<nama-bug>`

## 3. Format Deskripsi Pull Request (PR)
Saat diminta menyusun deskripsi PR, hasilkan format Markdown berikut:
### 📝 Ringkasan
[Penjelasan singkat mengenai perubahan yang dilakukan]

### 🔀 Jenis Perubahan
- [ ] 🚀 Fitur Baru
- [ ] 🐛 Perbaikan Bug
- [ ] 🛠️ Refactoring

### 🧪 Langkah Pengujian
1. [Langkah 1]
2. [Langkah 2]

### ✅ Ceklis Mandiri
- [ ] Kode sudah lulus uji di lingkungan lokal.
- [ ] Tidak ada API key, token, atau file `.env` yang tersimpan tidak sengaja.