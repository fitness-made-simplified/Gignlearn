/**
 * GigNLearn Cookie Consent Banner
 * Add this ONE script tag to every page before </body>:
 * 
 * ROOT pages:    <script src="/cookie-consent.js"></script>
 * poems/ pages:  <script src="../cookie-consent.js"></script>
 */

(function () {
  const CONSENT_KEY = 'gignlearn_cookie_consent';
  const CONSENT_VERSION = '1';

  // Already accepted? Do nothing
  if (localStorage.getItem(CONSENT_KEY) === CONSENT_VERSION) return;

  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    #gn-cookie-banner {
      position: fixed;
      bottom: 0; left: 0; right: 0;
      z-index: 99999;
      background: #2D2D2D;
      color: #fff;
      padding: 16px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
      font-family: 'Nunito', sans-serif;
      animation: slideUp 0.4s ease;
    }
    @keyframes slideUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    #gn-cookie-banner .gn-cookie-text {
      flex: 1;
      font-size: 0.88rem;
      font-weight: 600;
      color: rgba(255,255,255,0.88);
      line-height: 1.5;
      min-width: 200px;
    }
    #gn-cookie-banner .gn-cookie-text a {
      color: #FFD93D;
      text-decoration: underline;
    }
    #gn-cookie-banner .gn-cookie-btns {
      display: flex;
      gap: 10px;
      flex-shrink: 0;
    }
    #gn-cookie-accept {
      background: #FF6B35;
      color: #fff;
      border: none;
      padding: 10px 22px;
      border-radius: 30px;
      font-family: 'Fredoka One', cursive;
      font-size: 1rem;
      cursor: pointer;
      box-shadow: 0 3px 0 rgba(0,0,0,0.2);
      transition: transform 0.15s;
    }
    #gn-cookie-accept:hover { transform: translateY(-2px); }
    #gn-cookie-decline {
      background: transparent;
      color: rgba(255,255,255,0.6);
      border: 1px solid rgba(255,255,255,0.3);
      padding: 10px 18px;
      border-radius: 30px;
      font-family: 'Nunito', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      cursor: pointer;
      transition: border-color 0.2s;
    }
    #gn-cookie-decline:hover { border-color: rgba(255,255,255,0.6); }
    @media(max-width: 500px) {
      #gn-cookie-banner { flex-direction: column; text-align: center; }
      #gn-cookie-banner .gn-cookie-btns { justify-content: center; width: 100%; }
    }
  `;
  document.head.appendChild(style);

  // Detect privacy page path (works from root or poems/ folder)
  const isPoems = window.location.pathname.includes('/poems/');
  const privacyPath = isPoems ? '../privacy.html' : '/privacy.html';

  // Build banner HTML
  const banner = document.createElement('div');
  banner.id = 'gn-cookie-banner';
  banner.innerHTML = `
    <div class="gn-cookie-text">
      🍪 We use cookies to improve your experience and show relevant ads.
      By clicking <strong>Accept</strong>, you agree to our 
      <a href="${privacyPath}" target="_blank">Privacy Policy</a> 
      and use of cookies including Google Analytics &amp; AdSense.
    </div>
    <div class="gn-cookie-btns">
      <button id="gn-cookie-decline">Decline</button>
      <button id="gn-cookie-accept">✅ Accept All</button>
    </div>
  `;
  document.body.appendChild(banner);

  // Accept handler
  document.getElementById('gn-cookie-accept').addEventListener('click', function () {
    localStorage.setItem(CONSENT_KEY, CONSENT_VERSION);
    banner.style.animation = 'none';
    banner.style.transform = 'translateY(100%)';
    banner.style.transition = 'transform 0.3s ease';
    setTimeout(() => banner.remove(), 300);
  });

  // Decline handler - just closes banner, doesn't store consent
  document.getElementById('gn-cookie-decline').addEventListener('click', function () {
    banner.style.animation = 'none';
    banner.style.transform = 'translateY(100%)';
    banner.style.transition = 'transform 0.3s ease';
    setTimeout(() => banner.remove(), 300);
  });

})();
