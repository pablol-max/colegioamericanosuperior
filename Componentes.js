document.addEventListener("DOMContentLoaded", function () {
    // 1. INYECCIÓN DEL ESTILO CSS GLOBAL
    const style = document.createElement('style');
    style.textContent = `
        /* =========================================================
           ESTILOS DEL LOADER Y FLUIDEZ DE CARGA
           ========================================================= */
        #cas-loader {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background-color: #171b36;
            display: flex; justify-content: center; align-items: center;
            z-index: 999999;
            opacity: 0; pointer-events: none;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            visibility: hidden;
        }
        #cas-loader.active { 
            opacity: 1; 
            pointer-events: auto; 
            visibility: visible;
        }
        .cas-loader-content { text-align: center; }
        .cas-spheres-container { display: flex; gap: 16px; justify-content: center; align-items: center; margin-bottom: 18px; }
        .cas-sphere { width: 22px; height: 22px; border-radius: 50%; animation: casBounce 0.6s infinite alternate cubic-bezier(0.45, 0.05, 0.55, 0.95); }
        .sphere-blue1 { background: #2563EB; box-shadow: 0 0 12px rgba(37, 99, 235, 0.8); animation-delay: 0s; }
        .sphere-yellow { background: #F5B411; box-shadow: 0 0 15px rgba(245, 180, 17, 0.9); animation-delay: 0.2s; }
        .sphere-blue2 { background: #38BDF8; box-shadow: 0 0 12px rgba(56, 189, 248, 0.8); animation-delay: 0.4s; }
        .cas-loader-text { color: #FFFFFF; font-family: inherit; font-weight: 700; font-size: 0.85rem; letter-spacing: 1.5px; text-transform: uppercase; margin: 0; }
        @keyframes casBounce { 0% { transform: translateY(0) scale(1); } 100% { transform: translateY(-24px) scale(1.1); } }

        /* =========================================================
           ESTILOS BASE DEL HEADER Y NAVBAR
           ========================================================= */
        #main-header {
            position: fixed;
            top: 0; left: 0; width: 100%; z-index: 1000;
            background: rgba(23, 27, 54, 0.95) !important;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 2.5%;
            max-width: 1480px;
            margin: 0 auto;
        }

        .brand-logo { 
            display: flex; align-items: center; gap: 10px; 
            text-decoration: none; color: #FFFFFF; 
            margin-right: 25px; flex-shrink: 0; z-index: 1002;
        }
        .brand-logo .brand-icon { width: 42px; height: 42px; object-fit: contain; }
        .brand-text { display: flex; flex-direction: column; line-height: 1.15; }
        .brand-text .line-1, .brand-text .line-2, .brand-text .line-3 {
            font-size: 0.72rem; font-weight: 800; color: #FFFFFF; text-transform: capitalize;
        }

        .nav-links { 
            display: flex; list-style: none; gap: 0; 
            align-items: center; margin: 0 auto; padding: 0; 
        }
        .nav-links > li { display: flex; align-items: center; }

        .nav-links > li:not(:last-child):not(.mobile-portal-item):not(.mobile-social-menu)::after {
            content: "";
            display: inline-block;
            width: 1px; height: 12px;
            background-color: rgba(255, 255, 255, 0.2);
            margin: 0 10px;
        }

        .nav-links a {
            text-decoration: none; color: #FFFFFF;
            font-size: 0.82rem; font-weight: 700;
            transition: color 0.3s; white-space: nowrap;
        }
        .nav-links a:hover, .nav-links a.active { color: #F5B411 !important; }

        /* Dropdowns Escritorio */
        .dropdown { position: relative; }
        .dropdown-toggle { display: inline-flex; align-items: center; gap: 5px; cursor: pointer; }
        .dropdown-menu {
            position: absolute; top: 100%; left: 0; background: #171b36;
            border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px;
            padding: 8px 0; min-width: 160px; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
            opacity: 0; visibility: hidden; transform: translateY(10px);
            transition: all 0.3s ease; list-style: none; z-index: 1002; margin: 0;
        }
        @media (min-width: 992px) {
            .dropdown:hover .dropdown-menu { opacity: 1; visibility: visible; transform: translateY(0); }
        }
        .dropdown-menu li a { display: block; padding: 8px 16px; font-size: 0.8rem; color: #FFFFFF; }
        .dropdown-menu li a:hover, .dropdown-menu li a.active { background: rgba(245, 180, 17, 0.15); color: #F5B411 !important; }

        .header-actions-desktop { display: flex; align-items: center; gap: 15px; flex-shrink: 0; }
        .desktop-social-links { display: flex; align-items: center; gap: 12px; padding-right: 15px; border-right: 1px solid rgba(255, 255, 255, 0.2); }
        .desktop-social-links a { color: #FFFFFF; font-size: 0.92rem; text-decoration: none; transition: color 0.3s; }
        .desktop-social-links a:hover { color: #F5B411; }

        .btn-portal {
            background: transparent !important; color: #FFFFFF !important;
            border: 1.5px solid #F5B411; padding: 7px 18px; border-radius: 20px;
            font-weight: 700 !important; text-decoration: none; display: inline-flex;
            align-items: center; gap: 8px; font-size: 0.8rem; white-space: nowrap; transition: all 0.3s ease;
            outline: none;
        }
        .btn-portal:hover { 
            background: #F5B411 !important; color: #171b36 !important; 
        }

        .mobile-portal-item, .mobile-social-menu { display: none !important; }
        .menu-toggle { display: none; background: none; border: none; color: #FFF; font-size: 1.5rem; cursor: pointer; z-index: 1002; margin-left: auto; }

        /* Estilos del Footer */
        #main-footer {
            background: #171b36; border-top: 1px solid rgba(255, 255, 255, 0.08);
            padding: 60px 5% 25px; color: #CBD5E1; font-size: 0.88rem;
        }
        .footer-container { max-width: 1300px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 35px; text-align: left; }
        .footer-col h4 { color: #FFFFFF; font-size: 1.05rem; font-weight: 700; margin-bottom: 20px; position: relative; padding-bottom: 8px; }
        .footer-col h4::after { content: ''; position: absolute; bottom: 0; left: 0; width: 32px; height: 3px; background-color: #F5B411; }
        .footer-col p { margin-bottom: 12px; line-height: 1.5; display: flex; align-items: center; gap: 10px; }
        .footer-col p i { color: #F5B411; font-size: 0.95rem; }
        .footer-col ul { list-style: none; padding: 0; margin: 0; }
        .footer-col ul li { margin-bottom: 10px; }
        .footer-col ul li a { color: #CBD5E1; text-decoration: none; transition: color 0.3s ease; display: inline-flex; align-items: center; gap: 8px; }
        .footer-col ul li a:hover { color: #F5B411; }
        .map-buttons-container { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
        .btn-map-nav { display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px; border-radius: 8px; font-size: 0.85rem; font-weight: 700; text-decoration: none; transition: transform 0.2s ease, filter 0.2s ease; }
        .btn-gmaps { background-color: #4285F4; color: #FFFFFF !important; }
        .btn-waze { background-color: #33CCFF; color: #000000 !important; }
        .btn-map-nav:hover { transform: translateY(-2px); filter: brightness(1.08); }
        .btn-footer-wa { background-color: #25D366; color: #FFFFFF !important; padding: 10px 20px; border-radius: 25px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; margin-top: 12px; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); transition: transform 0.2s ease, background-color 0.2s ease; }
        .btn-footer-wa:hover { background-color: #20ba5a; transform: translateY(-2px); }
        .footer-bottom { max-width: 1300px; margin: 50px auto 0; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.08); text-align: center; font-size: 0.8rem; color: #64748B; }

        /* =========================================================
           ADAPTACIÓN MÓVIL ESTÁNDAR Y HOMOGÉNEA
           ========================================================= */
        @media (max-width: 991px) {
            .menu-toggle { display: block !important; }
            .header-actions-desktop { display: none !important; }
            .nav-links > li:not(:last-child)::after { display: none !important; }

            .mobile-portal-item {
                display: block !important; width: 100%; margin-bottom: 12px;
                padding-bottom: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.15);
            }
            .mobile-portal-item .btn-portal { width: 100%; justify-content: center; }

            /* Redes sociales en móvil: 3 juntas centradas en horizontal */
            .mobile-social-menu {
                display: flex !important;
                flex-direction: row !important;
                justify-content: center !important;
                align-items: center !important;
                gap: 25px !important;
                margin-top: 18px;
                padding-top: 14px;
                border-top: 1px solid rgba(255, 255, 255, 0.15);
                width: 100%;
            }
            .mobile-social-menu a { 
                color: #FFFFFF; 
                font-size: 1.3rem; 
                display: inline-flex;
                align-items: center;
                justify-content: center;
                border-bottom: none !important;
                padding: 0 !important;
                width: auto !important;
            }
            .mobile-social-menu a:hover { color: #F5B411; }

            /* Contenedor lateral del menú móvil */
            .nav-links {
                position: fixed; top: 0; right: -100%; width: 280px; max-width: 80vw; height: 100vh;
                background: #171b36; flex-direction: column; justify-content: flex-start; align-items: flex-start;
                gap: 4px !important; padding: 75px 20px 25px; transition: right 0.3s ease; box-shadow: -8px 0 25px rgba(0,0,0,0.5);
                overflow-y: auto; margin: 0; z-index: 1001;
            }
            .nav-links.active { right: 0 !important; }

            .nav-links > li { width: 100%; display: flex; flex-direction: column; align-items: flex-start; }
            
            /* Espaciado moderado idéntico para cada opción */
            .nav-links a { 
                font-size: 0.9rem; 
                width: 100%; 
                padding: 10px 0 !important; 
                border-bottom: 1px solid rgba(255, 255, 255, 0.05); 
            }

            /* Submenús desplegables en móvil */
            .dropdown { width: 100%; }
            .dropdown-toggle { width: 100%; justify-content: space-between; }
            .dropdown-menu {
                position: static !important; opacity: 1 !important; visibility: visible !important;
                transform: none !important; display: none; background: rgba(0, 0, 0, 0.25);
                width: 100%; border: none; box-shadow: none; padding: 4px 0 4px 14px; margin-top: 4px;
            }
            .dropdown-menu li a { padding: 8px 0 !important; }
            .dropdown.active .dropdown-menu { display: block !important; }
            .dropdown.active .dropdown-toggle i { transform: rotate(180deg); transition: transform 0.3s; }

            .footer-container { grid-template-columns: repeat(2, 1fr); gap: 25px; }
        }

        @media (max-width: 640px) {
            .footer-container { grid-template-columns: 1fr; }
        }
    `;
    document.head.appendChild(style);

    // Identificación estandarizada de la página actual
    function getNormalizedPage() {
        let rawPage = window.location.pathname.split("/").pop();
        if (!rawPage || rawPage === "" || rawPage === "/") {
            return "index.html";
        }
        return rawPage.toLowerCase();
    }
    const currentPage = getNormalizedPage();

    // 2. HTML DEL LOADER
    const loaderHTML = `
        <div id="cas-loader">
            <div class="cas-loader-content">
                <div class="cas-spheres-container">
                    <div class="cas-sphere sphere-blue1"></div>
                    <div class="cas-sphere sphere-yellow"></div>
                    <div class="cas-sphere sphere-blue2"></div>
                </div>
                <p class="cas-loader-text">Cargando...</p>
            </div>
        </div>
    `;

    // 3. HTML DEL HEADER ESTRUCTURADO Y HOMOGÉNEO
    const headerHTML = `
        <header id="main-header">
            <nav class="navbar">
                <a href="index.html" class="brand-logo">
                    <img src="https://raw.githubusercontent.com/pablol-max/mi-sitiocas/refs/heads/main/1000186930%20(1).ico" alt="Logo Colegio Americano Superior" class="brand-icon">
                    <div class="brand-text">
                        <span class="line-1">Colegio</span>
                        <span class="line-2">Americano</span>
                        <span class="line-3">Superior</span>
                    </div>
                </a>

                <ul class="nav-links" id="nav-menu">
                    <li class="mobile-portal-item">
                        <a href="https://sites.google.com/view/portal-cas-antigua/Inicio" target="_blank" class="btn-portal"><i class="fas fa-laptop-code"></i> Portal Web</a>
                    </li>

                    <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Inicio</a></li>
                    
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle ${['nosotros.html', 'metodologia.html', 'alianzas.html', 'actividades.html'].includes(currentPage) ? 'active' : ''}">Nosotros <i class="fas fa-chevron-down" style="font-size: 0.65rem;"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="nosotros.html" class="${currentPage === 'nosotros.html' ? 'active' : ''}">Nosotros</a></li>
                            <li><a href="metodologia.html" class="${currentPage === 'metodologia.html' ? 'active' : ''}">Metodología</a></li>
                            <li><a href="alianzas.html" class="${currentPage === 'alianzas.html' ? 'active' : ''}">Alianzas</a></li>
                            <li><a href="actividades.html" class="${currentPage === 'actividades.html' ? 'active' : ''}">Actividades</a></li>
                        </ul>
                    </li>

                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle ${['preprimaria.html', 'primaria.html', 'basico.html', 'diversificado.html'].includes(currentPage) ? 'active' : ''}">Niveles <i class="fas fa-chevron-down" style="font-size: 0.65rem;"></i></a>
                        <ul class="dropdown-menu">
                            <li><a href="preprimaria.html" class="${currentPage === 'preprimaria.html' ? 'active' : ''}">Preprimaria</a></li>
                            <li><a href="primaria.html" class="${currentPage === 'primaria.html' ? 'active' : ''}">Primaria</a></li>
                            <li><a href="basico.html" class="${currentPage === 'basico.html' ? 'active' : ''}">Básico</a></li>
                            <li><a href="diversificado.html" class="${currentPage === 'diversificado.html' ? 'active' : ''}">Diversificado</a></li>
                        </ul>
                    </li>

                    <li><a href="smartstage.html" class="${currentPage === 'smartstage.html' ? 'active' : ''}">Smart Stage</a></li>
                    <li><a href="kn-u-high.html" class="${currentPage === 'kn-u-high.html' ? 'active' : ''}">Kn-U High</a></li>
                    <li><a href="empleo.html" class="${currentPage === 'empleo.html' ? 'active' : ''}">Empleo</a></li>
                    <li><a href="contacto.html" class="${currentPage === 'contacto.html' ? 'active' : ''}">Contacto</a></li>

                    <li class="mobile-social-menu">
                        <a href="https://www.facebook.com/CASAntiguaG/?locale=es_LA" target="_blank" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/casantiguag/?hl=es-la" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="mailto:info@colegioamericanosuperior.edu.gt" aria-label="Correo"><i class="fas fa-envelope"></i></a>
                    </li>
                </ul>

                <div class="header-actions-desktop">
                    <div class="desktop-social-links">
                        <a href="https://www.facebook.com/CASAntiguaG/?locale=es_LA" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.instagram.com/casantiguag/?hl=es-la" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
                        <a href="mailto:info@colegioamericanosuperior.edu.gt" title="Correo"><i class="fas fa-envelope"></i></a>
                    </div>
                    <a href="https://sites.google.com/view/portal-cas-antigua/Inicio" target="_blank" class="btn-portal"><i class="fas fa-laptop-code"></i> Portal Web</a>
                </div>

                <button class="menu-toggle" id="menu-btn" aria-label="Abrir Menú"><i class="fas fa-bars"></i></button>
            </nav>
        </header>
    `;

    // 4. HTML DEL FOOTER
    const footerHTML = `
        <footer id="main-footer">
            <div class="footer-container">
                <div class="footer-col">
                    <h4>Contacto</h4>
                    <p><i class="fas fa-map-marker-alt"></i> Calle de Los Nazarenos #28, Antigua Guatemala</p>
                    <p><i class="fas fa-phone-alt"></i> +(502) 5047–3131</p>
                    <p><i class="fas fa-envelope"></i> info@colegioamericanosuperior.edu.gt</p>
                </div>

                <div class="footer-col">
                    <h4>¿Cómo llegar?</h4>
                    <p style="font-size: 0.85rem; margin-bottom: 6px; display: block;">Inicia la ruta directa en tu aplicación de mapas favorita:</p>
                    <div class="map-buttons-container">
                        <a href="https://www.google.com/maps/dir/?api=1&destination=14.5633525,-90.7418365" target="_blank" class="btn-map-nav btn-gmaps">
                            <i class="fas fa-map-marked-alt"></i> Google Maps
                        </a>
                        <a href="https://waze.com/ul?ll=14.5633525,-90.7418365&navigate=yes" target="_blank" class="btn-map-nav btn-waze">
                            <i class="fab fa-waze"></i> Abrir en Waze
                        </a>
                    </div>
                </div>

                <div class="footer-col">
                    <h4>Niveles Educativos</h4>
                    <ul>
                        <li><a href="preprimaria.html"><i class="fas fa-chevron-right" style="font-size: 0.65rem;"></i> Preprimaria</a></li>
                        <li><a href="primaria.html"><i class="fas fa-chevron-right" style="font-size: 0.65rem;"></i> Primaria</a></li>
                        <li><a href="basico.html"><i class="fas fa-chevron-right" style="font-size: 0.65rem;"></i> Básico</a></li>
                        <li><a href="diversificado.html"><i class="fas fa-chevron-right" style="font-size: 0.65rem;"></i> Diversificado</a></li>
                    </ul>
                </div>

                <div class="footer-col">
                    <h4>Admisiones</h4>
                    <p style="display: block; margin-bottom: 8px;">¿Interesado en formar parte de nuestra comunidad educativa?</p>
                    <a href="https://wa.me/50250473131?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20Admisiones" target="_blank" class="btn-footer-wa">
                        <i class="fab fa-whatsapp"></i> Admisiones WhatsApp
                    </a>
                </div>
            </div>

            <div class="footer-bottom">
                &copy; 2026 Colegio Americano Superior. Todos los derechos reservados.
            </div>
        </footer>
    `;

    // Inyección limpia
    document.body.insertAdjacentHTML("afterbegin", loaderHTML);
    document.body.insertAdjacentHTML("afterbegin", headerHTML);
    document.body.insertAdjacentHTML("beforeend", footerHTML);

    // 5. LÓGICA INTERACTIVA DEL MENÚ Y DESPLEGABLES
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (menuBtn && navMenu) {
        // Abrir/Cerrar Menú
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Abrir/Cerrar submenús desplegables en Móvil
        dropdowns.forEach(drop => {
            const toggleBtn = drop.querySelector('.dropdown-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', (e) => {
                    if (window.innerWidth <= 991) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Cerrar los otros desplegables para no encimar opciones
                        dropdowns.forEach(other => {
                            if (other !== drop) other.classList.remove('active');
                        });

                        drop.classList.toggle('active');
                    }
                });
            }
        });
    }

    // Remover foco visual del botón del portal al presionar
    document.querySelectorAll('.btn-portal').forEach(btn => {
        btn.addEventListener('click', function () {
            this.blur();
        });
    });

    // Estado inicial limpio
    resetPageState();
});

// Función de limpieza de estado al navegar o volver de página
function resetPageState() {
    const loader = document.getElementById('cas-loader');
    if (loader) {
        loader.classList.remove('active');
    }
    if (document.activeElement && document.activeElement !== document.body) {
        document.activeElement.blur();
    }
}

// Escuchadores de eventos para restaurar estado
window.addEventListener('load', resetPageState);
window.addEventListener('pageshow', resetPageState);