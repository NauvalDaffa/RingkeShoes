document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that should fade in
    const fadeElements = document.querySelectorAll('#Tips, #services, #contact, #whatsapp-cta, #price-card');
    
    // Add initial fade-in class
    fadeElements.forEach(element => {
      element.classList.add('fade-in');
    });
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
        rect.bottom >= 0
      );
    }
    
    // Function to handle scroll events
    function handleScroll() {
      fadeElements.forEach(element => {
        if (isElementInViewport(element)) {
          element.classList.add('visible');
        }
      });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial check
    handleScroll();
  });

// Fungsi untuk animasi angka harga
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
          element.textContent = 'Rp ${current.toLocaleString()}';
      if (progress < 1) {
          window.requestAnimationFrame(step);
      }
  };
  window.requestAnimationFrame(step);
}

// Fungsi untuk memilih paket
function selectPackage(packageName) {
  // Buat pop-up konfirmasi yang menarik
  Swal.fire({
      title: 'Konfirmasi Pemilihan Paket',
      text: 'Anda memilih paket ${packageName}. Ingin melanjutkan ke WhatsApp?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#004225',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Lanjutkan',
      cancelButtonText: 'Batal'
  }).then((result) => {
      if (result.isConfirmed) {
          // Redirect ke WhatsApp dengan pesan yang sudah diformat
          const message = 'Halo, saya tertarik dengan paket ${packageName}. Bisakah memberikan informasi lebih lanjut?';
          const whatsappUrl = 'https://wa.me/6281234567890?text=${encodeURIComponent(message)}';
          window.open(whatsappUrl, '_blank');
      }
  });
}

// Tambahkan efek scroll reveal
window.addEventListener('load', () => {
  const cards = document.querySelectorAll('.price-card');
  cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
          card.style.transition = 'all 0.8s ease';
          card.style.opacity = '1';
          card.style.transform = card.classList.contains('featured') ? 'scale(1.05)' : 'translateY(0)';
      }, 200 * index);
  });
});

function formatRupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(angka);
}

// Fungsi untuk mengirim pesan ke WhatsApp
function sendToWhatsApp(packageName, price) {
  // Nomor WhatsApp tujuan (ganti dengan nomor WhatsApp bisnis Anda)
  const phoneNumber = "62877111343333"; // Ganti dengan nomor WhatsApp Anda
  
  // Membuat pesan dengan format yang rapi
  const message = `Halo, saya tertarik dengan layanan cuci sepatu Ringkeshoes.
  
Paket yang dipilih: ${packageName}
Harga: ${formatRupiah(price)}
  
Mohon informasi lebih lanjut mengenai layanan ini.`;
  
  // Membuat URL WhatsApp dengan pesan yang sudah di-encode
  const whatsappUrl = 'https://wa.me/6287711134333?text=Halo, saya tertarik dengan layanan cuci sepatu Ringkeshoes, dengan paket:';
  
  // Membuka WhatsApp di tab baru
  window.open(whatsappUrl, '_blank');
}

// Fungsi untuk menangani klik tombol "Pilih Paket"
function selectPackage(packageName) {
  let price;
  
  // Menentukan harga berdasarkan paket yang dipilih
  switch(packageName) {
    case 'Basic Clean':
      price = 35000;
      break;
    case 'Premium Clean':
      price = 50000;
      break;
    case 'Professional Clean':
      price = 75000;
      break;
    default:
      price = 0;
  }
  
  // Konfirmasi sebelum mengirim ke WhatsApp
  if (confirm('Anda akan menghubungi kami via WhatsApp untuk paket Basic Clean dengan harga Rp35.000\n\nLanjutkan?')) {
    sendToWhatsApp(packageName, price, 'Basic Clean');
  }
  else if (confirm('Anda akan menghubungi kami via WhatsApp untuk paket Basic Clean dengan harga Rp50.000\n\nLanjutkan?')) {
    sendToWhatsApp(packageName, price, 'Premium Clean');
  } 
  else if (confirm('Anda akan menghubungi kami via WhatsApp untuk paket Basic Clean dengan harga Rp75.000\n\nLanjutkan?')) {
    sendToWhatsApp(packageName, price, 'Professional Clean');
  } 

}