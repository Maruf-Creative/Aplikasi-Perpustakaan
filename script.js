function validateTransaksiForm(event) {
    event.preventDefault();
    
    const namaPeminjam = document.getElementById('namaPeminjam').value.trim();
    const judulBuku = document.getElementById('judulBuku').value.trim();
    const jumlahBuku = document.getElementById('jumlahBuku').value.trim();
    const tanggalPinjam = document.getElementById('tanggalPinjam').value;
    const kategori = document.getElementById('kategori').value;
    
    resetErrorMessages();
    
    let isValid = true;
    
    if (namaPeminjam === '') {
        showError('errorNama', 'Nama peminjam harus diisi!');
        isValid = false;
    } else if (namaPeminjam.length < 3) {
        showError('errorNama', 'Nama peminjam minimal 3 karakter!');
        isValid = false;
    }
    
    if (judulBuku === '') {
        showError('errorJudul', 'Judul buku harus diisi!');
        isValid = false;
    } else if (judulBuku.length < 3) {
        showError('errorJudul', 'Judul buku minimal 3 karakter!');
        isValid = false;
    }
    
    if (jumlahBuku === '') {
        showError('errorJumlah', 'Jumlah buku harus diisi!');
        isValid = false;
    } else if (parseInt(jumlahBuku) < 1) {
        showError('errorJumlah', 'Jumlah buku minimal 1!');
        isValid = false;
    }
    
    if (tanggalPinjam === '') {
        showError('errorTanggal', 'Tanggal peminjaman harus diisi!');
        isValid = false;
    }
    
    if (kategori === '') {
        showError('errorKategori', 'Kategori transaksi harus dipilih!');
        isValid = false;
    }
    
    if (isValid) {
        addTransaksiToTable(namaPeminjam, judulBuku, jumlahBuku, tanggalPinjam, kategori);
        
        document.getElementById('transaksiForm').reset();
        
        alert('Transaksi berhasil disimpan!');
        
        if (confirm('Apakah Anda ingin melihat daftar transaksi?')) {
            window.location.href = 'daftar_transaksi.html';
        }
    }
    
    return false;
}

function addTransaksiToTable(nama, judul, jumlah, tanggal, kategori) {
    let transaksiData = localStorage.getItem('transaksiData');
    let transaksiArray = transaksiData ? JSON.parse(transaksiData) : [];
    
    transaksiArray.push({
        nama: nama,
        judul: judul,
        jumlah: jumlah,
        tanggal: tanggal,
        kategori: kategori
    });
    
    localStorage.setItem('transaksiData', JSON.stringify(transaksiArray));
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(element) {
        element.textContent = '';
        element.style.display = 'none';
    });
}

function validateLoginForm(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    resetErrorMessages();
    
    let isValid = true;
    
    if (username === '') {
        showError('errorUsername', 'Username harus diisi!');
        isValid = false;
    } else if (username.length < 4) {
        showError('errorUsername', 'Username minimal 4 karakter!');
        isValid = false;
    }
    
    if (password === '') {
        showError('errorPassword', 'Password harus diisi!');
        isValid = false;
    } else if (password.length < 6) {
        showError('errorPassword', 'Password minimal 6 karakter!');
        isValid = false;
    }
    
    if (isValid) {
        if (username === 'admin' && password === 'admin123') {
            alert('Login berhasil! Selamat datang, ' + username);
            window.location.href = 'index.html';
        } else {
            alert('Username atau password salah!');
        }
    }
    
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    const transaksiForm = document.getElementById('transaksiForm');
    if (transaksiForm) {
        transaksiForm.addEventListener('submit', validateTransaksiForm);
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
    }
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

function addRealTimeValidation() {
    const namaPeminjam = document.getElementById('namaPeminjam');
    if (namaPeminjam) {
        namaPeminjam.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                showError('errorNama', 'Nama peminjam harus diisi!');
            } else if (this.value.trim().length < 3) {
                showError('errorNama', 'Nama peminjam minimal 3 karakter!');
            } else {
                document.getElementById('errorNama').textContent = '';
            }
        });
        
        namaPeminjam.addEventListener('input', function() {
            if (this.value.trim().length >= 3) {
                document.getElementById('errorNama').textContent = '';
            }
        });
    }
    
    const judulBuku = document.getElementById('judulBuku');
    if (judulBuku) {
        judulBuku.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                showError('errorJudul', 'Judul buku harus diisi!');
            } else if (this.value.trim().length < 3) {
                showError('errorJudul', 'Judul buku minimal 3 karakter!');
            } else {
                document.getElementById('errorJudul').textContent = '';
            }
        });
        
        judulBuku.addEventListener('input', function() {
            if (this.value.trim().length >= 3) {
                document.getElementById('errorJudul').textContent = '';
            }
        });
    }
    
    const jumlahBuku = document.getElementById('jumlahBuku');
    if (jumlahBuku) {
        jumlahBuku.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                showError('errorJumlah', 'Jumlah buku harus diisi!');
            } else if (parseInt(this.value) < 1) {
                showError('errorJumlah', 'Jumlah buku minimal 1!');
            } else {
                document.getElementById('errorJumlah').textContent = '';
            }
        });
    }
    
    const tanggalPinjam = document.getElementById('tanggalPinjam');
    if (tanggalPinjam) {
        tanggalPinjam.addEventListener('blur', function() {
            if (this.value === '') {
                showError('errorTanggal', 'Tanggal peminjaman harus diisi!');
            } else {
                document.getElementById('errorTanggal').textContent = '';
            }
        });
    }
    
    const kategori = document.getElementById('kategori');
    if (kategori) {
        kategori.addEventListener('change', function() {
            if (this.value === '') {
                showError('errorKategori', 'Kategori transaksi harus dipilih!');
            } else {
                document.getElementById('errorKategori').textContent = '';
            }
        });
    }
}