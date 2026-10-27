/* =========================================================
   1. KONFIGURASI TAUTAN MEDIA SOSIAL
   Ganti URL di sini saja; semua ikon (Hero & Footer) ikut berubah.
   ========================================================= */
const SOCIAL_LINKS = {
  github: "https://github.com/habyy-sans",
  linkedin: "https://www.linkedin.com/in/muhammad-hasbiy-ashshiddiqi-4bb472320?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://www.instagram.com/habyy.by?srtk=b2NtbmhxM2drOXdp"
};

// Ikon SVG sederhana untuk tiap media sosial
const SOCIAL_ICONS = {
  github: '<path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z"/>',
  linkedin: '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.32-1.96 2.69V21h-4z"/>',
  instagram: '<path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.500 4.500 0 0 1 12 7.500zm0 2A2.500 2.500 0 1 0 14.500 12 2.500 2.500 0 0 0 12 9.500zM17.500 5.800a1.100 1.100 0 1 1-1.100 1.100 1.100 1.100 0 0 1 1.100-1.100z"/>'
};

// Buat ikon di semua elemen [data-socials]
document.querySelectorAll("[data-socials]").forEach((box) => {
  Object.entries(SOCIAL_LINKS).forEach(([name, url]) => {
    // Lewati jika URL kosong, agar tidak ada tautan palsu
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer"; // membuka tab baru dengan aman
    a.setAttribute("aria-label", name.charAt(0).toUpperCase() + name.slice(1));
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true">' + SOCIAL_ICONS[name] + "</svg>";
    box.appendChild(a);
  });
});

/* =========================================================
   2. PLACEHOLDER GAMBAR
   Jika file gambar belum ada, tampilkan kotak placeholder yang jelas.
   ========================================================= */
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  img.addEventListener("error", () => {
    const label = img.dataset.fallback;
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><rect width="100%" height="100%" fill="#dfe6d4"/>' +
      '<text x="50%" y="48%" text-anchor="middle" font-family="sans-serif" font-size="26" fill="#4f6b45">' + label + "</text>" +
      '<text x="50%" y="60%" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#6d7a6c">Image placeholder</text></svg>';
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }, { once: true });
});

/* =========================================================
   3. SCROLL REVEAL (IntersectionObserver)
   Tanpa JS, konten tetap terlihat (lihat class "js" di CSS).
   ========================================================= */
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 80 + "ms"; // jeda kecil antarkartu
    io.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

/* =========================================================
   4. AYUNAN KARTU PROYEK: BERHENTI HALUS
   CSS menjalankan ayunan saat hover. Saat kursor keluar, animasi CSS
   langsung hilang dan kartu akan "melompat" ke posisi 0. Supaya halus,
   kita baca sudut saat itu, lalu biarkan transition membawanya ke 0.
   ========================================================= */
document.querySelectorAll(".lift").forEach((lift) => {
  const swing = lift.querySelector(".swing");

  lift.addEventListener("mouseenter", () => {
    swing.style.animation = "";   // biarkan CSS menjalankan ayunan
    swing.style.transform = "";
  });

  lift.addEventListener("mouseleave", () => {
    const t = getComputedStyle(swing).transform;
    if (!t || t === "none") return;
    const m = new DOMMatrixReadOnly(t);
    const angle = Math.atan2(m.b, m.a);        // sudut saat ini (radian)
    swing.style.animation = "none";            // hentikan animasi
    swing.style.transform = "rotate(" + angle + "rad)"; // mulai dari sudut itu
    void swing.offsetWidth;                    // paksa browser menghitung ulang
    swing.style.transform = "rotate(0deg)";    // transisi halus ke posisi normal
  });
});