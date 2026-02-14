/* ═══════════════════════════════════════════
   VALENTINE'S DAY — INTERACTIONS
   Prompt flow · Celebration · Confetti · Hearts
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ══════════════════════════════════════
    // ⬇️  PASTE YOUR YOUTUBE LINK BELOW  ⬇️
    // ══════════════════════════════════════
    const YOUTUBE_URL = "https://youtu.be/zxFRIcb8iIk";
    // ══════════════════════════════════════

    // ── DOM refs ──────────────────────────
    const heartsContainer = document.getElementById('heartsContainer');
    const promptOverlay = document.getElementById('promptOverlay');
    const phase1 = document.getElementById('phase1');
    const phase2 = document.getElementById('phase2');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const btnYes2 = document.getElementById('btnYes2');
    const btnYesDark = document.getElementById('btnYesDark');
    const celebrationContainer = document.getElementById('celebrationContainer');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const heartBurst = document.getElementById('heartBurst');
    const youtubeLink = document.getElementById('youtubeLink');


    // ── Floating Hearts Background ───────
    const heartEmojis = ['❤️', '💕', '💗', '💖', '💘', '💝', '🩷', '♥️', '🌹'];

    function spawnHeart() {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (0.7 + Math.random() * 1.2) + 'rem';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);

        const totalTime = (parseFloat(heart.style.animationDuration) + parseFloat(heart.style.animationDelay)) * 1000;
        setTimeout(() => heart.remove(), totalTime + 500);
    }

    for (let i = 0; i < 8; i++) {
        setTimeout(spawnHeart, i * 600);
    }
    setInterval(spawnHeart, 2500);

    // ═══════════════════════════════════════
    // PROMPT FLOW
    // ═══════════════════════════════════════

    // Phase 1: Yes → celebrate
    btnYes.addEventListener('click', () => {
        triggerCelebration();
    });

    // Phase 1: No → switch to Phase 2
    btnNo.addEventListener('click', () => {
        phase1.classList.add('hidden');
        phase2.classList.remove('hidden');
    });

    // Phase 2: Either button → celebrate
    btnYes2.addEventListener('click', () => {
        triggerCelebration();
    });

    btnYesDark.addEventListener('click', () => {
        triggerCelebration();
    });

    // ═══════════════════════════════════════
    // CELEBRATION
    // ═══════════════════════════════════════

    function triggerCelebration() {
        // Hide prompt card
        document.getElementById('promptCard').classList.add('hidden');

        // Set YouTube link
        if (YOUTUBE_URL) {
            youtubeLink.href = YOUTUBE_URL;
        }

        // Show celebration
        celebrationContainer.classList.remove('hidden');
        celebrationContainer.classList.add('show');

        // Fire heart burst
        createHeartBurst();

        // Fire confetti
        startConfetti();
    }

    // ── Heart Burst Effect ───────────────
    function createHeartBurst() {
        const burstHearts = ['❤️', '💖', '💕', '💗', '💘', '🥰', '✨', '🌟', '💝', '🩷'];
        const count = 16;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('span');
            el.classList.add('burst-heart');
            el.textContent = burstHearts[i % burstHearts.length];

            const angle = (360 / count) * i;
            const distance = 80 + Math.random() * 120;
            const rad = (angle * Math.PI) / 180;
            const tx = Math.cos(rad) * distance;
            const ty = Math.sin(rad) * distance;

            el.style.setProperty('--burst-translate', `translate(${tx}px, ${ty}px)`);
            el.style.setProperty('--burst-rotate', `${Math.random() * 360}deg`);
            el.style.animationDelay = `${i * 0.05}s`;

            heartBurst.appendChild(el);
        }
    }

    // ── Confetti Canvas ──────────────────
    function startConfetti() {
        const ctx = confettiCanvas.getContext('2d');
        let W = confettiCanvas.width = window.innerWidth;
        let H = confettiCanvas.height = window.innerHeight;

        const colors = [
            '#f43f5e', '#fb7185', '#fda4af', '#fecdd3',
            '#d4a574', '#f0d9b5', '#ff6b9d', '#c084fc',
            '#e11d48', '#be123c', '#ff0050', '#ff69b4',
        ];

        const particles = [];
        const particleCount = 120;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H - H,
                w: 4 + Math.random() * 8,
                h: 6 + Math.random() * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 3,
                vy: 1.5 + Math.random() * 3,
                rot: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 8,
                opacity: 0.8 + Math.random() * 0.2,
                shape: Math.random() > 0.3 ? 'rect' : 'heart',
            });
        }

        let frame = 0;
        const maxFrames = 300; // ~5s at 60fps

        function draw() {
            ctx.clearRect(0, 0, W, H);

            particles.forEach((p) => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rot * Math.PI) / 180);
                ctx.globalAlpha = p.opacity;

                if (p.shape === 'heart') {
                    drawHeart(ctx, 0, 0, p.w * 0.6, p.color);
                } else {
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                }

                ctx.restore();

                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.rotSpeed;
                p.vx += (Math.random() - 0.5) * 0.2;
                p.vy += 0.02;

                // Fade out near end
                if (frame > maxFrames - 60) {
                    p.opacity *= 0.97;
                }

                // Recycle if off screen
                if (p.y > H + 20) {
                    p.y = -10;
                    p.x = Math.random() * W;
                }
            });

            frame++;
            if (frame < maxFrames) {
                requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, W, H);
            }
        }

        draw();

        window.addEventListener('resize', () => {
            W = confettiCanvas.width = window.innerWidth;
            H = confettiCanvas.height = window.innerHeight;
        });
    }

    function drawHeart(ctx, x, y, size, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y + size * 0.3);
        ctx.bezierCurveTo(x, y, x - size, y, x - size, y + size * 0.3);
        ctx.bezierCurveTo(x - size, y + size * 0.7, x, y + size, x, y + size * 1.2);
        ctx.bezierCurveTo(x, y + size, x + size, y + size * 0.7, x + size, y + size * 0.3);
        ctx.bezierCurveTo(x + size, y, x, y, x, y + size * 0.3);
        ctx.fill();
    }

    // ── Touch-friendly ───────────────────
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
})();
