// Menú móvil responsive
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if(mobileMenuButton && mobileMenu){
        mobileMenuButton.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Mostrar sección (si tienes varias secciones tipo SPA)
function showSection(sectionId) {
    document.querySelectorAll('div[id$="-page"]').forEach(div => div.style.display = 'none');
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';
}

// Mostrar modal de registro (ajusta el id si tienes otro modal)
function showSignupForm() {
    const modal = document.getElementById('signup-modal');
    if (modal) modal.style.display = 'block';
}
