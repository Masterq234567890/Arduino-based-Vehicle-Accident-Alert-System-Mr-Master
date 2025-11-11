let currentScreen = 'mainScreen';
let logoAnimationPlayed = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    const logoAnimation = document.getElementById('logoAnimation');
    const logoAnimationScreen = document.getElementById('logoAnimationScreen');
    const mainContainer = document.getElementById('mainContainer');
    const masterLogo = document.getElementById('masterLogo');
    
    // Play logo animation for 5 seconds
    logoAnimation.addEventListener('loadeddata', function() {
        setTimeout(() => {
            logoAnimationScreen.style.display = 'none';
            mainContainer.classList.remove('hidden');
            
            // Show master logo after main animation
            setTimeout(() => {
                masterLogo.classList.remove('hidden');
            }, 100);
            
            logoAnimationPlayed = true;
        }, 4000);
    });
    
    // Fallback if video doesn't load
    setTimeout(() => {
        if (!logoAnimationPlayed) {
            logoAnimationScreen.style.display = 'none';
            mainContainer.classList.remove('hidden');
            masterLogo.classList.remove('hidden');
            logoAnimationPlayed = true;
        }
    }, 6000);
});

// Navigation function
function navigateToScreen(targetScreen) {
    if (targetScreen === currentScreen) return;
    
    // Play click sound
    playClickSound();
    
    if (targetScreen !== 'mainScreen') {
        // Show transition animation for 3 seconds
        showTransitionAnimation(() => {
            switchToScreen(targetScreen);
        });
    } else {
        switchToScreen(targetScreen);
    }
}

// Switch screen function
function switchToScreen(targetScreen) {
    const currentScreenElement = document.getElementById(currentScreen);
    const targetScreenElement = document.getElementById(targetScreen);
    
    // Remove active class from current screen
    currentScreenElement.classList.remove('active');
    
    // Add active class to target screen
    setTimeout(() => {
        targetScreenElement.classList.add('active');
    }, 100);
    
    currentScreen = targetScreen;
}

// Show transition animation
function showTransitionAnimation(callback) {
    const transitionScreen = document.getElementById('transitionScreen');
    const transitionAnimation = document.getElementById('transitionAnimation');
    
    transitionScreen.classList.remove('hidden');
    transitionAnimation.currentTime = 0;
    transitionAnimation.play();
    
    setTimeout(() => {
        transitionScreen.classList.add('hidden');
        transitionAnimation.pause();
        callback();
    }, 1000);
}

// Play click sound (simulated with Web Audio API)
function playClickSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
        console.log('Audio context not supported');
    }
    
    // Button wave effect
    const buttons = document.querySelectorAll('.main-btn, .copy-btn, .back-btn');
    buttons.forEach(button => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    });
}
// Copy code function
function copyCode() {
    const codeBox = document.getElementById('codeBox');
    const codeText = codeBox.querySelector('code').textContent;
    
    // Create temporary textarea
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = codeText;
    document.body.appendChild(tempTextarea);
    
    // Select and copy text
    tempTextarea.select();
    tempTextarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        
        // Show feedback
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = 'linear-gradient(45deg, #00ff00, #008000)';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy code:', err);
        
        // Fallback for newer browsers
        if (navigator.clipboard) {
            navigator.clipboard.writeText(codeText).then(() => {
                const copyBtn = document.querySelector('.copy-btn');
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.style.background = 'linear-gradient(45deg, #00ff00, #008000)';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            });
        }
    }
    
    // Remove temporary textarea
    document.body.removeChild(tempTextarea);
    
    // Play click sound
    playClickSound();
}

// Add touch support for mobile
document.addEventListener('touchstart', function() {}, {passive: true});

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle orientation change
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});
