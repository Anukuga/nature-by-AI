
// Navigation with smooth transitions
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active states with animation
        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            a.style.transform = 'translateY(0)';
        });
        link.classList.add('active');
        link.style.transform = 'translateY(-2px)';
        
        // Show target section with fade effect
        document.querySelectorAll('.section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.classList.remove('active');
        });
        
        setTimeout(() => {
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active');
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 300);
    });
});

// Enhanced chat functionality
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');

// Add enter key support for sending messages
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (!message) return;

    // Display user's message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = message;
    chatMessages.appendChild(userDiv);

    // Add typing indicator
    const typing = document.createElement('div');
    typing.className = 'message ai-message';
    typing.textContent = 'Lina is typing...';
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Call backend
    fetch('http://127.0.0.1:5002/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        typing.remove();
        const aiDiv = document.createElement('div');
        aiDiv.className = 'message ai-message';
        aiDiv.textContent = data.reply || "Sorry, I didn't understand.";
        chatMessages.appendChild(aiDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    })
    .catch(err => {
        typing.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'message ai-message';
        errorDiv.textContent = 'Error contacting Lina.';
        chatMessages.appendChild(errorDiv);
        console.error(err);
    });

    messageInput.value = '';
}


function addMessage(type, text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    // Add message with typing animation
    let i = 0;
    const typing = setInterval(() => {
        if (i < text.length) {
            messageDiv.textContent += text.charAt(i);
            i++;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } else {
            clearInterval(typing);
        }
    }, 30);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.querySelector('.timer-display').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Video Call Functionality
document.querySelectorAll('.call-btn').forEach(button => {
    button.addEventListener('click', function() {
        const videoInterface = document.getElementById('videoCallInterface');
        const videoGrid = document.querySelector('.video-grid');
        
        // Hide the video cards and show the call interface
        videoGrid.style.display = 'none';
        videoInterface.style.display = 'block';
        
        // Initialize video call
        initializeVideoCall();
    });
});

function initializeVideoCall() {
    // This is a simulation of video call functionality
    // In a real application, you would use WebRTC or a similar technology
    
    // Simulate getting local video stream
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    
    // Create a canvas element to simulate video
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    
    // Draw a placeholder for local video
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Your Video', canvas.width / 2, canvas.height / 2);
    
    // Set the canvas as the source for local video
    localVideo.srcObject = canvas.captureStream();
    
    // Simulate remote video with a different canvas
    const remoteCanvas = document.createElement('canvas');
    remoteCanvas.width = 640;
    remoteCanvas.height = 480;
    const remoteCtx = remoteCanvas.getContext('2d');
    
    // Draw a placeholder for remote video
    remoteCtx.fillStyle = '#444';
    remoteCtx.fillRect(0, 0, remoteCanvas.width, remoteCanvas.height);
    remoteCtx.fillStyle = 'white';
    remoteCtx.font = '20px Arial';
    remoteCtx.textAlign = 'center';
    remoteCtx.fillText('Doctor\'s Video', remoteCanvas.width / 2, remoteCanvas.height / 2);
    
    // Set the canvas as the source for remote video
    remoteVideo.srcObject = remoteCanvas.captureStream();
    
    // Add event listeners for video controls
    document.getElementById('toggleVideo').addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-video')) {
            icon.classList.remove('fa-video');
            icon.classList.add('fa-video-slash');
            localVideo.style.opacity = '0.5';
        } else {
            icon.classList.remove('fa-video-slash');
            icon.classList.add('fa-video');
            localVideo.style.opacity = '1';
        }
    });
    
    document.getElementById('toggleAudio').addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-microphone')) {
            icon.classList.remove('fa-microphone');
            icon.classList.add('fa-microphone-slash');
        } else {
            icon.classList.remove('fa-microphone-slash');
            icon.classList.add('fa-microphone');
        }
    });
    
    document.getElementById('endCall').addEventListener('click', function() {
        // End the call and show the video cards again
        document.getElementById('videoCallInterface').style.display = 'none';
        document.querySelector('.video-grid').style.display = 'grid';
        
        // Update AI insights after video call
        updateAIInsights('video call completed');
    });
}

// AI Agent Functionality
function initializeAIAgent() {
    // Create a mood chart using Chart.js
    const ctx = document.getElementById('moodChart').getContext('2d');
    
    // Sample data for the mood chart
    const moodData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Mood Level',
                data: [6, 5, 7, 4, 8, 7, 6],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgba(76, 175, 80, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            },
            {
                label: 'Stress Level',
                data: [4, 5, 3, 6, 2, 3, 4],
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                borderColor: 'rgba(244, 67, 54, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }
        ]
    };
    
    // Create the chart
    new Chart(ctx, {
        type: 'line',
        data: moodData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    title: {
                        display: true,
                        text: 'Level (1-10)'
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

// Update AI insights based on user interactions
function updateAIInsights(interaction) {
    // This is a simplified version of how the AI agent would learn from user interactions
    // In a real application, this would involve more sophisticated machine learning
    
    const insightsList = document.getElementById('insightsList');
    const lowerInteraction = interaction.toLowerCase();
    
    // Check if the interaction contains certain keywords and update insights accordingly
    if (lowerInteraction.includes('meditation') || lowerInteraction.includes('meditate')) {
        // Add a new insight about meditation if it doesn't already exist
        if (!insightsList.innerHTML.includes('meditation')) {
            const newInsight = document.createElement('li');
            newInsight.textContent = 'You benefit from regular meditation sessions';
            insightsList.appendChild(newInsight);
        }
    }
    
    if (lowerInteraction.includes('anxiety') || lowerInteraction.includes('anxious')) {
        // Add a new insight about anxiety if it doesn't already exist
        if (!insightsList.innerHTML.includes('anxiety')) {
            const newInsight = document.createElement('li');
            newInsight.textContent = 'You experience anxiety, especially in the morning';
            insightsList.appendChild(newInsight);
        }
    }
    
    if (lowerInteraction.includes('sleep') || lowerInteraction.includes('tired')) {
        // Add a new insight about sleep if it doesn't already exist
        if (!insightsList.innerHTML.includes('sleep')) {
            const newInsight = document.createElement('li');
            newInsight.textContent = 'Your sleep quality improves with evening relaxation';
            insightsList.appendChild(newInsight);
        }
    }
    
    // Update recommendations based on new insights
    updateRecommendations();
}

// Update personalized recommendations based on insights
function updateRecommendations() {
    const recCards = document.querySelectorAll('.rec-card');
    
    // This is a simplified version of how recommendations would be updated
    // In a real application, this would involve more sophisticated algorithms
    
    // Example: If there are more than 3 insights about anxiety, add a recommendation
    const insightsList = document.getElementById('insightsList');
    if (insightsList.children.length > 3) {
        // Check if we already have an anxiety recommendation
        let hasAnxietyRec = false;
        recCards.forEach(card => {
            if (card.querySelector('h4').textContent.includes('Anxiety')) {
                hasAnxietyRec = true;
            }
        });
        
        // If we don't have an anxiety recommendation, add one
        if (!hasAnxietyRec) {
            const recContainer = document.querySelector('.recommendation-cards');
            const newRec = document.createElement('div');
            newRec.className = 'rec-card';
            newRec.innerHTML = `
                <i class="fas fa-heartbeat"></i>
                <h4>Anxiety Management</h4>
                <p>Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8</p>
            `;
            recContainer.appendChild(newRec);
        }
    }
}

// Neue Funktion für Krebspatienten-Ressourcen
function initializeCancerResources() {
    const resourcesContainer = document.createElement('div');
    resourcesContainer.className = 'cancer-resources';
    resourcesContainer.innerHTML = `
        <h3>Ressourcen für Krebspatienten</h3>
        <div class="resource-cards">
            <div class="resource-card">
                <i class="fas fa-book-medical"></i>
                <h4>Informationen zur Chemotherapie</h4>
                <p>Erfahren Sie, was Sie vor, während und nach der Chemotherapie erwarten können.</p>
                <button class="resource-btn">Mehr erfahren</button>
            </div>
            <div class="resource-card">
                <i class="fas fa-users"></i>
                <h4>Selbsthilfegruppen</h4>
                <p>Verbinden Sie sich mit anderen, die ähnliche Erfahrungen gemacht haben.</p>
                <button class="resource-btn">Gruppen finden</button>
            </div>
            <div class="resource-card">
                <i class="fas fa-heart"></i>
                <h4>Umgang mit Angst</h4>
                <p>Techniken und Strategien zur Bewältigung von Angst und Unsicherheit.</p>
                <button class="resource-btn">Techniken ansehen</button>
            </div>
            <div class="resource-card">
                <i class="fas fa-utensils"></i>
                <h4>Ernährungstipps</h4>
                <p>Ernährungsempfehlungen für die Zeit während und nach der Behandlung.</p>
                <button class="resource-btn">Tipps ansehen</button>
            </div>
        </div>
    `;
    
    // Füge die Ressourcen zum AI-Agent-Bereich hinzu
    const aiAgentSection = document.querySelector('.ai-recommendations');
    aiAgentSection.appendChild(resourcesContainer);
    
    // Event-Listener für die Ressourcen-Buttons
    document.querySelectorAll('.resource-btn').forEach(button => {
        button.addEventListener('click', function() {
            const resourceType = this.parentElement.querySelector('h4').textContent;
            showResourceDetails(resourceType);
        });
    });
}

function showResourceDetails(resourceType) {
    // Erstelle ein Modal mit detaillierten Informationen
    const modal = document.createElement('div');
    modal.className = 'resource-modal';
    
    let content = '';
    
    switch(resourceType) {
        case 'Informationen zur Chemotherapie':
            content = `
                <h3>Informationen zur Chemotherapie</h3>
                <div class="resource-content">
                    <h4>Was ist Chemotherapie?</h4>
                    <p>Chemotherapie ist eine medikamentöse Behandlung, die Krebszellen abtötet oder ihr Wachstum verhindert.</p>
                    
                    <h4>Was Sie vor der Behandlung wissen sollten:</h4>
                    <ul>
                        <li>Die Behandlung kann ambulant oder stationär erfolgen</li>
                        <li>Die Dauer variiert je nach Art des Krebses und des Medikaments</li>
                        <li>Es ist wichtig, alle Fragen an Ihr medizinisches Team zu stellen</li>
                    </ul>
                    
                    <h4>Mögliche Nebenwirkungen:</h4>
                    <ul>
                        <li>Müdigkeit</li>
                        <li>Übelkeit und Erbrechen</li>
                        <li>Haarausfall</li>
                        <li>Appetitlosigkeit</li>
                        <li>Erhöhte Infektanfälligkeit</li>
                    </ul>
                    
                    <h4>Tipps zur Vorbereitung:</h4>
                    <ul>
                        <li>Organisieren Sie Unterstützung für den Alltag</li>
                        <li>Bereiten Sie sich auf mögliche Nebenwirkungen vor</li>
                        <li>Führen Sie ein Tagebuch über Ihre Symptome</li>
                    </ul>
                </div>
            `;
            break;
        case 'Selbsthilfegruppen':
            content = `
                <h3>Selbsthilfegruppen für Krebspatienten</h3>
                <div class="resource-content">
                    <p>Der Austausch mit anderen Betroffenen kann eine wichtige Quelle der Unterstützung sein.</p>
                    
                    <h4>Vorteile von Selbsthilfegruppen:</h4>
                    <ul>
                        <li>Emotionale Unterstützung von Menschen, die Sie verstehen</li>
                        <li>Praktische Tipps und Erfahrungsaustausch</li>
                        <li>Reduzierung von Isolation und Einsamkeit</li>
                        <li>Stärkung des Selbstbewusstseins</li>
                    </ul>
                    
                    <h4>Wie Sie eine passende Gruppe finden:</h4>
                    <ul>
                        <li>Fragen Sie Ihr medizinisches Team nach Empfehlungen</li>
                        <li>Kontaktieren Sie Krebsberatungsstellen</li>
                        <li>Recherchieren Sie online nach Gruppen in Ihrer Nähe</li>
                        <li>Erkundigen Sie sich bei Ihrer Krankenkasse</li>
                    </ul>
                    
                    <h4>Online-Selbsthilfegruppen:</h4>
                    <p>Wenn Sie keine Gruppe in Ihrer Nähe finden oder mobil eingeschränkt sind, gibt es auch viele Online-Optionen:</p>
                    <ul>
                        <li>Krebsinformationsdienst des Deutschen Krebsforschungszentrums</li>
                        <li>Deutsche Krebshilfe Online-Community</li>
                        <li>Facebook-Gruppen für spezifische Krebsarten</li>
                    </ul>
                </div>
            `;
            break;
        case 'Umgang mit Angst':
            content = `
                <h3>Umgang mit Angst und Unsicherheit</h3>
                <div class="resource-content">
                    <p>Angst ist eine normale Reaktion auf eine Krebsdiagnose und Behandlung. Hier sind einige Strategien, die helfen können:</p>
                    
                    <h4>Atemübungen:</h4>
                    <p>Die 4-7-8-Atmung: Atmen Sie 4 Sekunden ein, halten Sie 7 Sekunden den Atem an, atmen Sie 8 Sekunden aus. Wiederholen Sie dies 4 Mal.</p>
                    
                    <h4>Achtsamkeitsmeditation:</h4>
                    <p>Konzentrieren Sie sich auf den gegenwärtigen Moment, ohne zu urteilen. Dies kann helfen, sich von beunruhigenden Gedanken zu distanzieren.</p>
                    
                    <h4>Kognitive Techniken:</h4>
                    <ul>
                        <li>Identifizieren Sie Ihre spezifischen Ängste</li>
                        <li>Fragen Sie sich, wie realistisch diese Ängste sind</li>
                        <li>Entwickeln Sie alternative, positivere Gedanken</li>
                        <li>Konzentrieren Sie sich auf das, was Sie kontrollieren können</li>
                    </ul>
                    
                    <h4>Praktische Strategien:</h4>
                    <ul>
                        <li>Informieren Sie sich gründlich über Ihre Erkrankung und Behandlung</li>
                        <li>Führen Sie ein Tagebuch über Ihre Gefühle</li>
                        <li>Planen Sie angenehme Aktivitäten</li>
                        <li>Suchen Sie professionelle Unterstützung, wenn die Angst überwältigend wird</li>
                    </ul>
                </div>
            `;
            break;
        case 'Ernährungstipps':
            content = `
                <h3>Ernährung während und nach der Krebsbehandlung</h3>
                <div class="resource-content">
                    <p>Eine ausgewogene Ernährung kann Ihre Gesundheit während der Behandlung unterstützen und Nebenwirkungen lindern.</p>
                    
                    <h4>Allgemeine Empfehlungen:</h4>
                    <ul>
                        <li>Essen Sie abwechslungsreich und farbenfroh</li>
                        <li>Wählen Sie Vollkornprodukte</li>
                        <li>Essen Sie täglich Gemüse und Obst</li>
                        <li>Begrenzen Sie verarbeitete Lebensmittel</li>
                        <li>Trinken Sie ausreichend Wasser</li>
                    </ul>
                    
                    <h4>Bei Appetitlosigkeit:</h4>
                    <ul>
                        <li>Essen Sie mehrere kleine Mahlzeiten statt weniger großer</li>
                        <li>Wählen Sie nährstoffreiche, kalorienreiche Lebensmittel</li>
                        <li>Trinken Sie Smoothies oder Suppen</li>
                        <li>Essen Sie, wenn Sie Hunger haben, auch wenn es nicht zu den üblichen Mahlzeiten ist</li>
                    </ul>
                    
                    <h4>Bei Übelkeit:</h4>
                    <ul>
                        <li>Vermeiden Sie fettige, stark gewürzte oder sehr süße Speisen</li>
                        <li>Essen Sie trockene, milde Lebensmittel wie Zwieback oder Reis</li>
                        <li>Trinken Sie Ingwertee oder Pfefferminztee</li>
                        <li>Essen Sie langsam und in kleinen Bissen</li>
                    </ul>
                    
                    <h4>Wichtige Nährstoffe:</h4>
                    <ul>
                        <li>Protein: Wichtig für den Erhalt der Muskelmasse</li>
                        <li>Omega-3-Fettsäuren: Können Entzündungen reduzieren</li>
                        <li>Antioxidantien: Unterstützen das Immunsystem</li>
                        <li>Ballaststoffe: Fördern die Verdauung</li>
                    </ul>
                </div>
            `;
            break;
        default:
            content = `<h3>${resourceType}</h3><p>Detaillierte Informationen zu diesem Thema werden bald verfügbar sein.</p>`;
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            ${content}
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Schließen-Button-Funktionalität
    modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Schließen beim Klicken außerhalb des Modals
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Initialize the AI agent when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAIAgent();
    initializeCancerResources(); // Neue Funktion aufrufen
});

// Add some initial styling for chat messages and animations
const style = document.createElement('style');
style.textContent = `
    .message {
        margin: 10px;
        padding: 15px 20px;
        border-radius: 20px;
        max-width: 70%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .user-message {
        background-color: var(--primary-green);
        color: white;
        margin-left: auto;
        border-bottom-right-radius: 5px;
    }
    .ai-message {
        background-color: var(--light-green);
        color: var(--text-dark);
        margin-right: auto;
        border-bottom-left-radius: 5px;
    }
    .typing-indicator {
        display: flex;
        gap: 5px;
        padding: 15px;
        background: var(--light-green);
        border-radius: 20px;
        width: fit-content;
        margin: 10px;
    }
    .typing-indicator span {
        width: 8px;
        height: 8px;
        background: var(--text-dark);
        border-radius: 50%;
        animation: typing 1s infinite ease-in-out;
    }
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    .completion-message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        text-align: center;
        animation: fadeInOut 5s ease-in-out;
    }
    .completion-message i {
        color: var(--primary-green);
        font-size: 2rem;
        margin-bottom: 10px;
    }
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        10%, 90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    .cancer-resources {
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid var(--glass-border);
    }
    
    .resource-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
    }
    
    .resource-card {
        background: rgba(255, 255, 255, 0.9);
        border-radius: 15px;
        padding: 1.5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .resource-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    
    .resource-card i {
        color: var(--primary-green);
        font-size: 2rem;
        margin-bottom: 1rem;
    }
    
    .resource-card h4 {
        color: var(--text-dark);
        margin-bottom: 0.5rem;
    }
    
    .resource-card p {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 1rem;
    }
    
    .resource-btn {
        background: var(--primary-green);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 0.9rem;
    }
    
    .resource-btn:hover {
        background: var(--dark-green);
    }
    
    .resource-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    
    .modal-content {
        background: white;
        border-radius: 15px;
        padding: 2rem;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    
    .resource-content {
        margin-top: 1.5rem;
    }
    
    .resource-content h4 {
        color: var(--primary-green);
        margin: 1.5rem 0 0.5rem;
    }
    
    .resource-content ul {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .resource-content li {
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style); 
// Your existing code above...

// Insert this at the bottom of app.js
function logMood(mood, notes) {
    fetch('http://127.0.0.1:5001/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mood: mood,
            notes: notes
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data.message);
        alert('Mood logged successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to log mood.');
    });
}
