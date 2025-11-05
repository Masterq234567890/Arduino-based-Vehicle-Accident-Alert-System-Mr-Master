// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const logoVideo = document.getElementById('logoVideo');
    const logoAnimationScreen = document.getElementById('logoAnimationScreen');
    const mainScreen = document.getElementById('mainScreen');
    const clickSound = document.getElementById('clickSound');
    const mainButtons = document.querySelectorAll('.main-button');
    const topLogos = document.querySelectorAll('.top-logo');
    
    let videoPlayed = false;
    
    // Function to show main screen
    function showMainScreen() {
        if (!videoPlayed) {
            videoPlayed = true;
            logoAnimationScreen.classList.remove('active');
            mainScreen.classList.add('active');
            topLogos.forEach(logo => logo.classList.add('visible'));
        }
    }
    
    // Video ended event
    logoVideo.addEventListener('ended', showMainScreen);
    
    // Auto-start after 5 seconds if video doesn't load or play
    setTimeout(showMainScreen, 5000);
    
    // Fallback: if video fails to load
    logoVideo.addEventListener('error', function() {
        setTimeout(showMainScreen, 1000);
    });
    
    // Main buttons click event
    mainButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            playClickSound();
            
            const targetScreen = this.getAttribute('data-screen');
            
            setTimeout(() => {
                mainScreen.classList.remove('active');
                document.getElementById(targetScreen).classList.add('active');
                window.scrollTo(0, 0);
            }, 100);
        });
    });
    
    // Play click sound
    function playClickSound() {
        clickSound.currentTime = 0;
        clickSound.play().catch(e => console.log('Audio play failed:', e));
    }
    
    // Add click sound to all buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', playClickSound);
    });
});

// Back button function
function goBack(currentScreen) {
    const current = document.getElementById(currentScreen);
    const mainScreen = document.getElementById('mainScreen');
    
    current.classList.remove('active');
    mainScreen.classList.add('active');
    window.scrollTo(0, 0);
}

// Copy code function
function copyCode() {
    const codeBox = document.getElementById('codeBox');
    const codeText = codeBox.innerText;
    const copyButton = document.querySelector('.copy-button');
    
    // Create temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = codeText;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        copyButton.textContent = 'Copied!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
            copyButton.textContent = 'Copy';
            copyButton.classList.remove('copied');
        }, 2000);
    } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy code');
    }
    
    document.body.removeChild(textarea);
}

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Disable text selection on buttons
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
});
