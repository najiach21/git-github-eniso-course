// js/main.js - Interactive features for our amazing team website

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Welcome to our amazing team website!');
    
    // Initialize all features
    initializeCounters();
    initializeTeamFeatures();
    initializeGitTips();
    initializeProgressBars();
    
    // TODO: Students will add more features here through tickets
});

// Counter Animation for Header Stats
function initializeCounters() {
    const counters = {
        'commits-count': 0,
        'members-count': 1,
        'features-count': 0
    };
    
    // Animate counters on page load
    Object.keys(counters).forEach(id => {
        animateCounter(id, counters[id]);
    });
}

function animateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = targetValue / 50; // 50 steps
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, 30);
}

// Update counters when new features are added
function updateCounter(counterId, increment = 1) {
    const counter = document.getElementById(counterId);
    if (counter) {
        const currentValue = parseInt(counter.textContent) || 0;
        const newValue = currentValue + increment;
        animateCounter(counterId, newValue);
        
        // Add celebration effect
        celebrateUpdate(counter);
    }
}

function celebrateUpdate(element) {
    element.style.transform = 'scale(1.2)';
    element.style.color = '#48bb78';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
        element.style.color = '#fff';
    }, 500);
}

// Team Member Interactive Features
function initializeTeamFeatures() {
    // Add click effects to team member cards
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Click effect
        member.addEventListener('click', function() {
            // Add sparkle effect
            createSparkleEffect(this);
            
            // Temporary highlight
            this.style.background = 'linear-gradient(145deg, #e6fffa, #b3f5e6)';
            setTimeout(() => {
                this.style.background = '';
            }, 1000);
            
            // Fun message
            showTemporaryMessage('✨ Great choice! This team member rocks!');
        });
        
        // Hover sound effect (console log for now)
        member.addEventListener('mouseenter', function() {
            console.log('🎵 *hover sound effect* 🎶');
        });
    });
    
    // Update member count when new members are added
    updateMemberCount();
}

function createSparkleEffect(element) {
    // Create sparkle elements
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        
        // Random position around the clicked element
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        sparkle.animate([
            { transform: 'scale(0) rotate(0deg)', opacity: 1 },
            { transform: 'scale(1.5) rotate(180deg)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).addEventListener('finish', () => {
            sparkle.remove();
        });
    }
}

function updateMemberCount() {
    // Count actual team members (excluding example card)
    const realMembers = document.querySelectorAll('.team-member:not(.example-card)');
    const memberCount = realMembers.length;
    
    // Update the counter
    const counterElement = document.getElementById('members-count');
    if (counterElement) {
        counterElement.textContent = memberCount + 1; // +1 for the example
    }
}

// Show/Hide Add Member Tip
function showAddMemberTip() {
    const tip = document.getElementById('add-member-tip');
    if (tip) {
        tip.style.display = tip.style.display === 'none' ? 'block' : 'none';
        
        if (tip.style.display === 'block') {
            tip.animate([
                { opacity: 0, transform: 'translateY(-20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], { duration: 300, easing: 'ease-out' });
        }
    }
}

// Git Tips System
function initializeGitTips() {
    const tips = [
        '💡 Pro tip: Always pull before you push!',
        '🌟 Remember: Commit early, commit often!',
        '🚀 Branch names should be descriptive!',
        '✨ Good commit messages tell a story!',
        '🎯 One feature per branch keeps things clean!',
        '🤝 Code reviews make everyone better!',
        '📝 Document your code for future you!'
    ];
    
    let currentTipIndex = 0;
    const gitTip = document.getElementById('git-tip');
    
    if (gitTip) {
        // Show first tip after 3 seconds
        setTimeout(() => {
            showGitTip(tips[currentTipIndex]);
        }, 3000);
        
        // Cycle through tips every 15 seconds
        setInterval(() => {
            currentTipIndex = (currentTipIndex + 1) % tips.length;
            showGitTip(tips[currentTipIndex]);
        }, 15000);
    }
}

function showGitTip(tipText) {
    const gitTip = document.getElementById('git-tip');
    const tipTextElement = gitTip.querySelector('.tip-text');
    
    if (gitTip && tipTextElement) {
        tipTextElement.textContent = tipText;
        gitTip.classList.add('show');
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            gitTip.classList.remove('show');
        }, 8000);
    }
}

function closeTip() {
    const gitTip = document.getElementById('git-tip');
    if (gitTip) {
        gitTip.classList.remove('show');
    }
}

// Progress Bar Animations
function initializeProgressBars() {
    // Observe when progress section comes into view
    const progressSection = document.querySelector('.progress-section');
    
    if (progressSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(progressSection);
    }
}

function animateProgressBars() {
    const progressFills = document.querySelectorAll('.progress-fill');
    
    progressFills.forEach((fill, index) => {
        setTimeout(() => {
            const width = fill.style.width;
            fill.style.width = '0%';
            fill.offsetWidth; // Force reflow
            fill.style.width = width;
        }, index * 200);
    });
}

// Utility Functions
function showTemporaryMessage(message, duration = 3000) {
    // Create temporary message element
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #48bb78, #38a169);
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1.1em;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(messageDiv);
    
    // Animate in
    messageDiv.animate([
        { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
    ], { duration: 300, easing: 'ease-out' });
    
    // Remove after duration
    setTimeout(() => {
        messageDiv.animate([
            { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
            { opacity: 0, transform: 'translate(-50%, -50%) scale(0.5)' }
        ], { duration: 300, easing: 'ease-in' }).addEventListener('finish', () => {
            messageDiv.remove();
        });
    }, duration);
}

// Feature addition helpers for students
function addContributor(name, contribution) {
    const contributorsList = document.getElementById('contributors');
    if (contributorsList) {
        const contributor = document.createElement('div');
        contributor.className = 'contributor-item';
        contributor.innerHTML = `
            <strong>${name}</strong>: ${contribution}
        `;
        contributor.style.cssText = `
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 12px;
            margin: 5px 0;
            border-radius: 10px;
            font-size: 0.9em;
        `;
        contributorsList.appendChild(contributor);
        
        // Update features counter
        updateCounter('features-count');
    }
}

function addAchievement(achievementText) {
    const achievementsContainer = document.getElementById('achievements');
    if (achievementsContainer) {
        const achievement = document.createElement('div');
        achievement.className = 'achievement';
        achievement.textContent = achievementText;
        achievementsContainer.appendChild(achievement);
        
        // Celebrate new achievement
        achievement.animate([
            { transform: 'scale(0)', opacity: 0 },
            { transform: 'scale(1.1)', opacity: 1 },
            { transform: 'scale(1)', opacity: 1 }
        ], { duration: 500, easing: 'ease-out' });
        
        updateCounter('features-count');
    }
}

// Keyboard shortcuts for fun
document.addEventListener('keydown', function(e) {
    // Konami code easter egg: ↑ ↑ ↓ ↓ ← → ← → B A
    // For now, just some simple shortcuts
    
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                showTemporaryMessage('🎹 Keyboard shortcut activated! You\'re a power user! 💪');
                break;
                
            case 'g':
                e.preventDefault();
                showGitTip('🚀 Git shortcut activated! Keep committing to greatness!');
                break;
        }
    }
    
    // Fun easter eggs
    if (e.key === 'Escape') {
        closeTip();
    }
});

// Add some console art for developers who open dev tools
console.log(`
🚀 WELCOME TO OUR TEAM WEBSITE! 🚀

    ⭐ Built with:
    • HTML5 & CSS3
    • Vanilla JavaScript
    • Lots of teamwork
    • Git & GitHub magic

    🎯 Want to contribute?
    1. Pick a ticket from our issues
    2. Create a branch
    3. Make awesome changes
    4. Submit a PR

    💡 Pro tip: This console has some fun
    shortcuts! Try Ctrl+K or Ctrl+G

    Happy coding! 💻✨
`);

// Initialize dynamic features when DOM is ready
function initializeDynamicFeatures() {
    // This function can be called by student features
    console.log('🎉 Initializing dynamic features...');
    
    console.log('✅ Dynamic features ready!');
}

// Call dynamic features initialization
setTimeout(initializeDynamicFeatures, 1000);

// Export functions for students to use in their tickets
window.teamWebsite = {
    updateCounter,
    addContributor,
    addAchievement,
    showTemporaryMessage,
    createSparkleEffect,
    showGitTip
};