function flashEnemy(enemyName) {
  const enemyElement = document.querySelector(`.shadow-standee[data-name="${enemyName}"]`);
  if (enemyElement) {
    enemyElement.style.animation = 'none';
    void enemyElement.offsetWidth; // Trigger reflow
    enemyElement.style.animation = 'flashRed 0.3s';
  }
}

function showDamage(enemyName, damage, type = 'normal') {
  const enemyElement = document.querySelector(`.shadow-standee[data-name="${enemyName}"]`);
  if (enemyElement) {
    const damageElement = document.createElement('div');
    damageElement.className = `damage-number ${type}`;
    damageElement.textContent = `-${damage}`;
    damageElement.style.position = 'absolute';
    damageElement.style.top = '0';
    damageElement.style.left = '50%';
    damageElement.style.transform = 'translateX(-50%)';
    damageElement.style.fontSize = '1.5rem';
    damageElement.style.fontWeight = 'bold';
    damageElement.style.animation = 'floatUp 1s forwards';
    
    enemyElement.appendChild(damageElement);
    
    // Remove after animation completes
    setTimeout(() => {
      damageElement.remove();
    }, 1000);
  }
}

// Add these to your existing CSS (or create a new CSS file)
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes flashRed {
      0% { filter: brightness(100%); }
      50% { filter: brightness(200%) drop-shadow(0 0 10px red); }
      100% { filter: brightness(100%); }
    }
    
    @keyframes floatUp {
      0% { opacity: 1; transform: translateX(-50%) translateY(0); }
      100% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
    }
    
    .damage-number {
      color: white;
      text-shadow: 0 0 5px black;
    }
    
    .damage-number.weak {
      color: gold;
      font-size: 2rem;
      text-shadow: 0 0 10px red;
    }
    
    .damage-number.critical {
      color: red;
      font-size: 2rem;
      animation: floatUp 1s forwards, shake 0.1s infinite;
    }
  `;
  document.head.appendChild(style);
}

// Initialize animations when the script loads
addAnimationStyles();