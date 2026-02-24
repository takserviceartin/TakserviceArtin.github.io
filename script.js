/**
 * فایل جاوااسکریپت اصلی سایت تک سرویس آرتین
 * نویسنده: تیم توسعه
 * تاریخ: بهار 1404
 * شامل: منوی همبرگری، انیمیشن بنر، ارسال فرم به واتساپ و ...
 * بهینه‌سازی شده برای سئو و عملکرد بالا
 */

// منتظر بارگذاری کامل DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== منوی همبرگری ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.sidebar-menu a');

    // تابع باز کردن منو
    window.toggleMenu = function() {
        sidebarMenu.classList.add('active');
        menuOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // تابع بستن منو
    window.closeMenu = function() {
        sidebarMenu.classList.remove('active');
        menuOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    // بستن منو با کلیک روی لینک‌ها
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // بستن منو با کلیک روی overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // بستن منو با کلید ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // ========== انیمیشن بنر اصلی ==========
    const bannerElement = document.getElementById('banner-text');
    if (bannerElement) {
        // تنظیم اولیه
        bannerElement.style.animation = 'none';
        bannerElement.style.textAlign = 'center';

        // شروع انیمیشن بعد از ۵ ثانیه
        setTimeout(function() {
            bannerElement.style.animation = 'slideHorizontal 7s linear infinite';
            bannerElement.style.textAlign = 'left';
        }, 5000);
    }

    // ========== ارسال فرم به واتساپ ==========
    const requestForm = document.getElementById('requestForm');
    if (requestForm) {
        requestForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // دریافت مقادیر فرم
            const name = document.getElementById('name').value.trim();
            const device = document.getElementById('device').value.trim();
            const phone = document.getElementById('phone').value.trim();

            // اعتبارسنجی
            if (!name || !device || !phone) {
                alert('لطفاً تمام فیلدها را پر کنید');
                return;
            }

            // اعتبارسنجی شماره موبایل (الگوی ساده)
            const phonePattern = /^09[0-9]{9}$/;
            if (!phonePattern.test(phone)) {
                alert('شماره موبایل معتبر وارد کنید (مثال: 09123456789)');
                return;
            }

            // ساخت پیام برای واتساپ
            const message = `🔧 *درخواست جدید تعمیرات*\n👤 نام: ${name}\n📱 دستگاه: ${device}\n📞 تماس: ${phone}\n📍 منطقه: قرچک/تهرانپارس`;
            
            // شماره واتساپ (با کد کشور)
            const whatsappNumber = '989194675921'; // بدون صفر و +
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            // باز کردن لینک واتساپ در iframe (برای جلوگیری از مسدود شدن popup)
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = whatsappUrl;
            document.body.appendChild(iframe);

            // نمایش پیام موفقیت
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // پاک کردن فرم
            this.reset();

            // حذف iframe بعد از ۳ ثانیه
            setTimeout(() => {
                if (iframe.parentNode) {
                    document.body.removeChild(iframe);
                }
            }, 3000);
        });
    }

    // ========== بستن پیام موفقیت ==========
    window.closeSuccessMessage = function() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    };

    // ========== دکمه‌های شناور (اختیاری - عملکرد لینک در HTML است) ==========
    // نیازی به کد اضافی نیست، لینک‌ها در HTML تعریف شده‌اند.

    // ========== جلوگیری از کپی (اختیاری - از قبل در CSS هست) ==========
    // این مورد در CSS با user-select: none مدیریت شده است
});
