import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Truck, MapPin, RefreshCcw, Package, Box, Clock, HeadphonesIcon, Smartphone, ChevronRight, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { SiShopify, SiWoocommerce, SiPrestashop, SiWix, SiEtsy, SiSquare } from 'react-icons/si';
import { FaAmazon, FaMagento } from 'react-icons/fa';
import './App.css';

const legalContent = {
  aviso: `
    <h3>1. Datos de la empresa</h3>
    <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información, se exponen los datos identificativos: MYL Exprés. Correo de contacto: <a href="mailto:myloficina01@gmail.com">myloficina01@gmail.com</a>.</p>
    <h3>2. Propiedad Intelectual</h3>
    <p>Todos los derechos reservados. El diseño, código y contenido de esta web son propiedad exclusiva de MYL Exprés.</p>
  `,
  privacidad: `
    <h3>1. Protección de Datos</h3>
    <p>En MYL Exprés protegemos tus datos personales según el RGPD. Los datos recabados en nuestros formularios o mediante el correo <a href="mailto:myloficina01@gmail.com">myloficina01@gmail.com</a> se usarán de forma exclusiva para responder a solicitudes y prestar servicios de logística.</p>
    <h3>2. Derechos de los usuarios</h3>
    <p>Puedes ejercer tus derechos de acceso, rectificación, cancelación u oposición escribiendo a nuestra dirección de correo electrónico.</p>
  `,
  cookies: `
    <h3>Política de Cookies</h3>
    <p>Esta página web utiliza cookies técnicas para garantizar su correcto funcionamiento. No utilizamos cookies de terceros intrusivas ni para rastreo publicitario sin consentimiento previo expreso.</p>
  `
};

const LegalModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        className="modal-content glass"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <div className="modal-body" dangerouslySetInnerHTML={{ __html: content }} />
      </motion.div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item glass ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <h4>{question}</h4>
        {isOpen ? <ChevronUp size={20} className="text-accent" /> : <ChevronDown size={20} className="text-accent" />}
      </div>
      {isOpen && (
        <motion.div 
          className="faq-answer"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <p>{answer}</p>
        </motion.div>
      )}
    </div>
  );
};

const SplineBackground = () => {
  const [splineLoaded, setSplineLoaded] = useState(false);

  const handleSplineLoad = (splineApp) => {
    try {
      const forceHideSplineText = () => {
        const objs = splineApp.getAllObjects();
        objs.forEach(node => {
          if (!node) return;
          const lowerName = (node.name || "").toLowerCase();
          if (
            lowerName.includes("heading") || 
            lowerName.includes("subheading") ||
            lowerName.includes("button") ||
            lowerName.includes("text 2") ||
            lowerName.includes("logo") ||
            node.type === "Text"
          ) {
            node.visible = false;
            if (node.scale) {
              node.scale.x = 0;
              node.scale.y = 0;
              node.scale.z = 0;
            }
            if (node.position) {
              node.position.x = 999999;
            }
          }
        });
      };

      // Hide immediately
      forceHideSplineText();

      // Some Spline scenes have internal animation loops that reset visibility
      // Set an interval to ensure the text stays completely gone.
      setInterval(forceHideSplineText, 100);

      // Show spline after a tiny delay to ensure texts are completely hidden first
      setTimeout(() => {
        setSplineLoaded(true);
      }, 50);

    } catch (e) {
      console.error("Error hiding spline objects:", e);
      setSplineLoaded(true);
    }
  };

  return (
    <div className={`spline-background ${splineLoaded ? 'loaded' : ''}`}>
      <Spline 
        scene="https://prod.spline.design/Ab64ImVYbKUkmntL/scene.splinecode" 
        onLoad={handleSplineLoad}
      />
      <div className="spline-overlay"></div>
    </div>
  );
};

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [modalConfig, setModalConfig] = useState({ isOpen: false, title: '', content: '' });

  const openModal = (type) => {
    const titles = { aviso: 'Aviso Legal', privacidad: 'Política de Privacidad', cookies: 'Política de Cookies' };
    setModalConfig({ isOpen: true, title: titles[type], content: legalContent[type] });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* 3D Background */}
      <SplineBackground />

      {/* Navigation */}
      <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
        <div className="nav-content">
          <div className="logo">
            <img src="/logo.png" alt="MYL Express Logística" className="logo-image" />
          </div>
          <div className="nav-links">
            <a href="#servicios" className="nav-link">Servicios</a>
            <a href="#tiendas" className="nav-link">Tiendas Online</a>
            <a href="#contacto" className="nav-link">Contacto</a>
          </div>
          <a href="https://wa.me/34679227695" className="btn-primary" target="_blank" rel="noopener noreferrer">
            WhatsApp Directo
          </a>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-grid">
            <motion.div 
              className="hero-image-col"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="box-composition">
                <img src="/boxes.png" alt="Logística y envíos 3D" className="box-image" />
              </div>
            </motion.div>

            <motion.div 
              className="hero-text-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="badge glass">
                <span className="badge-dot"></span>
                Tu punto de envíos de confianza en Illescas
              </div>
              <h1 className="hero-title">
                La logística <span className="text-gradient">inteligente y rápida</span> que necesitas
              </h1>
              <motion.p 
                className="hero-subtitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Optimizamos la entrega de tus paquetes y somos el motor logístico de tu tienda online.
              </motion.p>
              <motion.div 
                className="hero-actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <a href="#servicios" className="btn-primary btn-large">Descubrir Servicios</a>
                <a href="#contacto" className="btn-secondary btn-large">Solicitar Presupuesto</a>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-stats-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="stats-container">
                <div className="stat-item glass">
                  <span className="stat-value text-gradient">+10k</span>
                  <span className="stat-label">Paquetes Gestionados</span>
                </div>
                <div className="stat-item glass">
                  <span className="stat-value text-gradient">100%</span>
                  <span className="stat-label">Clientes Satisfechos</span>
                </div>
                <div className="stat-item glass">
                  <span className="stat-value text-gradient">24h</span>
                  <span className="stat-label">Entregas en Madrid</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services for Individuals */}
        <section id="servicios" className="section-padding">
          <div className="section-container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Servicios para Particulares</h2>
              <p className="section-desc">Soluciones diseñadas para que enviar o recibir paquetes sea lo más fácil de tu día.</p>
            </motion.div>
            
            <div className="services-grid">
              {[
                { img: '/service_shipping.png', icon: <Truck size={28} />, title: 'Envío Nacional e Internacional', desc: 'Soluciones rápidas y seguras para enviar tus paquetes a cualquier rincón de España y el mundo.' },
                { img: '/service_pickup.png', icon: <MapPin size={28} />, title: 'Punto de Recogida Premium', desc: 'Olvídate de esperar en casa. Recoge tus pedidos online en nuestro local en Illescas de forma cómoda.' },
                { img: '/service_returns.png', icon: <RefreshCcw size={28} />, title: 'Gestión Eficaz de Devoluciones', desc: 'Simplificamos las devoluciones de tus compras online. Un proceso rápido para tu total tranquilidad.' }
              ].map((service, index) => (
                <motion.div 
                  key={index}
                  className="service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.1)' }}
                >
                  <div className="service-img-wrapper">
                    <img src={service.img} alt={service.title} className="service-img" />
                    <div className="service-img-overlay"></div>
                  </div>
                  <div className="service-content">
                    <div className="icon-wrapper-absolute">
                      {service.icon}
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* E-commerce Solutions */}
        <section id="tiendas" className="section-padding bg-alt">
          <div className="section-container">
            <div className="ecommerce-layout">
              <motion.div 
                className="ecommerce-content"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="section-title">Soluciones 360º para <span className="text-gradient">Tiendas Online</span></h2>
                <p className="ecommerce-desc">
                  Delega tu almacén en nosotros. Tú vendes, nosotros preparamos, empaquetamos y enviamos. Así de simple.
                </p>
                
                <div className="features-list">
                  {[
                    { icon: <Box size={24} />, title: 'Recepción y Almacenaje', desc: 'Guardamos tu stock de forma segura y organizada.' },
                    { icon: <Package size={24} />, title: 'Picking & Packing', desc: 'Preparamos tus pedidos con mimo y embalaje profesional.' },
                    { icon: <Clock size={24} />, title: 'Envíos Exprés', desc: 'Salidas diarias con las mejores tarifas para e-commerce.' },
                    { icon: <HeadphonesIcon size={24} />, title: 'Soporte Continuo', desc: 'Gestión de incidencias para que tu cliente esté siempre feliz.' }
                  ].map((feature, idx) => (
                    <motion.div 
                      key={idx}
                      className="feature-item"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.15 }}
                    >
                      <div className="feature-icon">{feature.icon}</div>
                      <div>
                        <h4>{feature.title}</h4>
                        <p>{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <a href="#contacto" className="btn-primary mt-8">Quiero Profesionalizar Mis Envíos <ChevronRight size={20} /></a>
              </motion.div>
              
              <motion.div 
                className="ecommerce-visual"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="video-showcase">
                  <div className="video-container">
                    <video 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      preload="auto"
                    >
                      <source src="/camion.mp4" type="video/mp4" />
                    </video>
                    <div className="video-inner-overlay">
                      <div className="video-tag">
                        <Truck size={20} className="text-accent"/>
                        En movimiento por ti
                      </div>
                    </div>
                  </div>

                  <div className="trust-card glass">
                    <h3>¿Por qué confiar en MYL Exprés?</h3>
                    <p>No somos solo un punto de entrega; somos expertos dedicados a profesionalizar la logística de tu negocio.</p>
                    <ul className="trust-list">
                      {[
                        'Ubicación estratégica en Illescas, corazón logístico de España.',
                        'Tecnología avanzada para el control total de tus envíos.',
                        'Atención 100% personalizada y directa, sin bots.',
                        'Tarifas competitivas a medida para e-commerce.'
                      ].map((item, idx) => (
                        <motion.li 
                          key={idx}
                          initial={{ opacity: 0, x: 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + (idx * 0.1) }}
                        >
                          ✓ {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cómo Trabajamos / Proceso */}
        <section className="section-padding">
          <div className="section-container">
            <motion.div 
              className="section-header"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Tu logística, en 4 sencillos pasos</h2>
              <p className="section-desc">Diseñamos un flujo de trabajo optimizado para que te despreocupes por completo de los envíos de tu negocio o compras personales.</p>
            </motion.div>
            
            <div className="process-grid">
              {[
                { title: 'Recepción', desc: 'Recibimos tus mercancías en nuestro almacén en Illescas y las inventariamos al instante.', icon: <Package size={28}/> },
                { title: 'Almacenaje Seguro', desc: 'Guardamos tu stock de manera segura bajo estrictos controles de calidad.', icon: <Box size={28}/> },
                { title: 'Picking y Packing', desc: 'Preparamos los pedidos con material premium cuidando enormemente la presentación final.', icon: <Target size={28}/> },
                { title: 'Envío Exprés', desc: 'Despachamos los paquetes diariamente mediante las mejores y más rápidas rutas logísticas.', icon: <Truck size={28}/> }
              ].map((step, idx) => (
                <motion.div 
                  key={idx} 
                  className="process-step"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="process-number-hologram">0{idx + 1}</div>
                  <div className="process-icon-glow">{step.icon}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integraciones E-commerce */}
        <section className="section-padding bg-alt overflow-hidden">
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 style={{fontSize: '2rem', marginBottom: '3rem', fontWeight: '700'}}>Perfectamente compatible con tu Tienda</h3>
              
              <div className="marquee-container">
                <div className="marquee-content">
                  {[
                    { name: 'Shopify', icon: <SiShopify color="#95BF47" /> },
                    { name: 'WooCommerce', icon: <SiWoocommerce color="#96588A" /> },
                    { name: 'PrestaShop', icon: <SiPrestashop color="#DF0067" /> },
                    { name: 'Magento', icon: <FaMagento color="#F26322" /> },
                    { name: 'Amazon', icon: <FaAmazon color="#FF9900" /> },
                    { name: 'Wix', icon: <SiWix color="#FFFFFF" /> },
                    { name: 'Etsy', icon: <SiEtsy color="#F16521" /> },
                    { name: 'Square', icon: <SiSquare color="#FFFFFF" /> }
                  ].map((platform) => (
                    <div key={`run1-${platform.name}`} className="marquee-item glass">
                      {platform.icon}
                      <span>{platform.name}</span>
                    </div>
                  ))}
                  {[
                    { name: 'Shopify', icon: <SiShopify color="#95BF47" /> },
                    { name: 'WooCommerce', icon: <SiWoocommerce color="#96588A" /> },
                    { name: 'PrestaShop', icon: <SiPrestashop color="#DF0067" /> },
                    { name: 'Magento', icon: <FaMagento color="#F26322" /> },
                    { name: 'Amazon', icon: <FaAmazon color="#FF9900" /> },
                    { name: 'Wix', icon: <SiWix color="#FFFFFF" /> },
                    { name: 'Etsy', icon: <SiEtsy color="#F16521" /> },
                    { name: 'Square', icon: <SiSquare color="#FFFFFF" /> }
                  ].map((platform) => (
                    <div key={`run2-${platform.name}`} className="marquee-item glass">
                      {platform.icon}
                      <span>{platform.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="section-container">
             <div className="section-header">
                <h2 className="section-title">Preguntas Frecuentes</h2>
                <p className="section-desc">Resolvemos las dudas más habituales sobre nuestro servicio de paquetería y almacenamiento logístico en Illescas.</p>
             </div>
             <div className="faq-list">
               <FAQItem question="¿Puedo integrar mi tienda online directamente con vosotros?" answer="Sí. Trabajamos con los CMS más populares del mercado como Shopify o WooCommerce. Nos adaptamos a tu flujo de pedidos para que todo el proceso sea automático desde el momento en que se procesa la compra en tu web." />
               <FAQItem question="¿Hacéis envíos internacionales para particulares y empresas?" answer="Por supuesto. Ofrecemos cobertura tanto a nivel nacional (Península e Islas) como exportación a nivel internacional apoyándonos en una potente red con tarifas muy competitivas." />
               <FAQItem question="¿Tengo que asegurar un volumen mínimo al mes para trabajar con MYL Exprés?" answer="No, en absoluto. Nuestro servicio está diseñado tanto para pequeños emprendedores con muy poco volumen al mes como para grandes gigantes del e-commerce. Creceremos contigo a tu propio ritmo garantizándote el mejor precio." />
               <FAQItem question="Si un destinatario no está en casa para recibir el paquete, ¿qué ocurre?" answer="Además de re-entregas concertadas, contamos con servicios de recogida en un Punto Premium seguro en nuestro propio local físico de Illescas. Nos aseguramos incansablemente de que la mercancía siempre llegue impecable a sus dueños." />
             </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="section-padding bg-alt">
          <div className="section-container">
            <motion.div 
              className="contact-box glass"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7 }}
            >
              <div className="contact-info">
                <h2 className="text-gradient">Hablemos</h2>
                <p>¿Tienes dudas sobre un envío o quieres un presupuesto para tu empresa?</p>
                
                <div className="contact-methods">
                  <div className="contact-method">
                    <MapPin className="text-accent" />
                    <div>
                      <h5>Nuestra Oficina</h5>
                      <p>Calle Mercurio 545200 Illescas (Toledo)</p>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <Smartphone className="text-accent" />
                    <div>
                      <h5>Llámanos o envíanos un WhatsApp</h5>
                      <a href="https://wa.me/34679227695" className="contact-link">+34 679 22 76 95 (Principal)</a>
                      <a href="https://wa.me/34689264759" className="contact-link">+34 689 26 47 59 (Empresas)</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="contact-form-placeholder">
                <h3>Envíanos un Mensaje</h3>
                <form className="minimal-form" onSubmit={(e) => e.preventDefault()}>
                  <input type="text" placeholder="Tu Nombre" className="form-input" />
                  <input type="email" placeholder="Tu Email o Teléfono" className="form-input" />
                  <textarea placeholder="¿En qué podemos ayudarte?" className="form-input form-textarea"></textarea>
                  <button type="submit" className="btn-primary" style={{width: '100%'}}>Enviar Mensaje</button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer border-t border-glass">
        <div className="section-container footer-content">
          <div className="footer-brand">
            <img src="/logo.png" alt="MYL Express Logística" className="footer-logo-image" />
            <p>La logística inteligente en Illescas.</p>
            <p className="copyright">&copy; {new Date().getFullYear()} MYL Exprés. Todos los derechos reservados.</p>
          </div>
          <div className="footer-links">
            <button onClick={() => openModal('aviso')} className="footer-link-btn">Aviso Legal</button>
            <button onClick={() => openModal('privacidad')} className="footer-link-btn">Política de Privacidad</button>
            <button onClick={() => openModal('cookies')} className="footer-link-btn">Política de Cookies</button>
          </div>
        </div>
      </footer>

      <LegalModal 
        isOpen={modalConfig.isOpen} 
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        title={modalConfig.title}
        content={modalConfig.content}
      />
    </div>
  );
}

export default App;
