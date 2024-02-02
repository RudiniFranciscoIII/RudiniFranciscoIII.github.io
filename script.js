const content = document.getElementById('content');
const scoreElement = document.getElementById('score');
let score = 0;
let currentTargets = [];

function playHitSound() {
  // Add code to play a hit sound effect here
}

function createTarget() {
  if (currentTargets.length >= 5) { // Limit to 5 targets
    return;
  }

  const target = document.createElement('div');
  target.classList.add('target');
  content.appendChild(target);

  // Set random position at creation
  const newPosition = getRandomPosition();
  target.style.left = `${newPosition.x}px`;
  target.style.top = `${newPosition.y}px`;

  target.addEventListener('click', () => {
    playHitSound();
    target.classList.add('hit-animation');
    score++;
    scoreElement.textContent = `Score: ${score}`;

    // Remove from tracked targets and remove element after animation
    const targetIndex = currentTargets.indexOf(target);
    currentTargets.splice(targetIndex, 1);
    setTimeout(() => {
      target.remove();
      createTarget(); // Respawn at random location on hit
    }, 500);
  });

  currentTargets.push(target);
}

function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 100);
  const y = Math.random() * (window.innerHeight - 100);
  return { x, y };
}

// No need for separate moveTarget function as targets don't move

// Create initial targets
for (let i = 0; i < 5; i++) {
  createTarget();
}

// No need for setInterval for movement (targets only move on respawn)