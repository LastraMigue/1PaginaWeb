/**
 * NEXUS BUILDS - Asistente Virtual NEXUS AI
 * Chatbot de soporte para ayudar a los usuarios
 */

class AIChat {
    constructor() {
        this.messagesContainer = document.getElementById('chat-messages');
        this.chatInput = document.getElementById('chat-input');
        this.btnSend = document.getElementById('btn-send');
        this.isTyping = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    // Event listeners
    bindEvents() {
        // Enviar mensaje al hacer click
        this.btnSend.addEventListener('click', () => this.sendMessage());
        
        // Enviar mensaje al presionar Enter
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        
        // Quick replies
        this.messagesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply')) {
                const query = e.target.dataset.query;
                this.chatInput.value = query;
                this.sendMessage();
            }
        });
    }
    
    // Enviar mensaje del usuario
    sendMessage() {
        const message = this.chatInput.value.trim();
        
        if (!message || this.isTyping) return;
        
        // Agregar mensaje del usuario
        this.addUserMessage(message);
        
        // Limpiar input
        this.chatInput.value = '';
        
        // Generar respuesta de la IA
        this.generateAIResponse(message);
    }
    
    // Agregar mensaje del usuario al chat
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">👤</div>
            <div class="message-content">
                <p>${this.escapeHtml(text)}</p>
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    // Agregar mensaje de la IA al chat
    addAIMessage(text, showQuickReplies = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai-message';
        
        let quickRepliesHtml = '';
        if (showQuickReplies) {
            quickRepliesHtml = `
                <div class="quick-replies">
                    <button class="quick-reply" data-query="presupuesto 800 euros">Tengo 800€</button>
                    <button class="quick-reply" data-query="mejor calidad precio">Mejor calidad-precio</button>
                    <button class="quick-reply" data-query="jugar en 4K">Jugar en 4K</button>
                    <button class="quick-reply" data-query="streaming y gaming">Para streaming</button>
                </div>
            `;
        }
        
        messageDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${text}</p>
                ${quickRepliesHtml}
            </div>
        `;
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    // Mostrar indicador de "escribiendo..."
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p><span class="typing-dots">Escribiendo<span>.</span><span>.</span><span>.</span></p>
            </div>
        `;
        
        this.messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
        this.isTyping = true;
    }
    
    // Ocultar indicador de "escribiendo..."
    hideTypingIndicator() {
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
        this.isTyping = false;
    }
    
    // Generar respuesta de la IA
    generateAIResponse(userMessage) {
        // Mostrar indicador de escritura
        this.showTypingIndicator();
        
        // Simular tiempo de procesamiento
        const delay = 1000 + Math.random() * 1000;
        
        setTimeout(() => {
            this.hideTypingIndicator();
            
            const response = this.findBestResponse(userMessage);
            const showQuickReplies = response.includes('¿Cuál es tu presupuesto?') || 
                                    response.includes('Entiendo');
            
            this.addAIMessage(response, showQuickReplies);
        }, delay);
    }
    
    // Encontrar la mejor respuesta
    findBestResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Palabras clave para matching
        const keywords = {
            'presupuesto 800 euros': ['800', 'presupuesto', 'barato', 'económico', 'entrada'],
            'mejor calidad precio': ['calidad', 'precio', 'recomendado', 'mejor', 'vendido', 'popular'],
            'jugar en 4K': ['4k', 'ultra', 'máximo', 'entusiasta', 'potente', '4090'],
            'streaming y gaming': ['streaming', 'stream', 'grabar', 'youtube', 'twitch', 'contenido']
        };
        
        // Buscar coincidencias
        for (const [key, words] of Object.entries(keywords)) {
            for (const word of words) {
                if (lowerMessage.includes(word)) {
                    return AI_RESPONSES[key];
                }
            }
        }
        
        // Respuestas contextuales adicionales
        if (lowerMessage.includes('hola') || lowerMessage.includes('buenas')) {
            return '¡Hola! 👋 Soy NEXUS AI. ¿En qué puedo ayudarte hoy? Puedo recomendarte el mejor PC según tu presupuesto y necesidades.';
        }
        
        if (lowerMessage.includes('gracias')) {
            return '¡De nada! 😊 Si tienes más preguntas, aquí estoy para ayudarte. ¿Te gustaría ver algún build en particular?';
        }
        
        if (lowerMessage.includes('adios') || lowerMessage.includes('hasta luego')) {
            return '¡Hasta luego! 👋 Espero verte pronto en Nexus Builds. ¡Que disfrutes tu nuevo PC!';
        }
        
        if (lowerMessage.includes('precio') || lowerMessage.includes('cuanto') || lowerMessage.includes('cuesta')) {
            return 'Tenemos builds para todos los presupuestos:\n\n💚 **Starter Nova**: 749€ (Gama Entrada)\n🧡 **Gaming Titan**: 1.299€ (Gama Media)\n💜 **Extreme Overlord**: 3.499€ (Ultra)\n\n¿Cuál se ajusta a tu presupuesto?';
        }
        
        if (lowerMessage.includes('garantia') || lowerMessage.includes('garantía')) {
            return '✅ **Garantía Nexus Builds:**\n\n• 3 años en todos los componentes\n• Soporte técnico gratuito de por vida\n• Envío gratuito en 24h\n• Devolución gratuita en 30 días\n\nTu inversión está protegida. 🛡️';
        }
        
        if (lowerMessage.includes('envio') || lowerMessage.includes('envío') || lowerMessage.includes('entrega')) {
            return '🚚 **Información de envío:**\n\n• **Envío Express 24h**: Gratis en pedidos +500€\n• **Seguimiento en tiempo real**\n• **Embalaje reforzado** con protección anti-impacto\n• **Montaje y testing** incluido gratis\n\nTu PC llegará listo para enchufar y jugar. 🎮';
        }
        
        // Respuesta por defecto
        return AI_RESPONSES['default'];
    }
    
    // Escapar HTML para seguridad
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Scroll al final del chat
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Inicializar chat cuando el DOM esté listo
let aiChat;
document.addEventListener('DOMContentLoaded', () => {
    aiChat = new AIChat();
});
