/**
 * NEXUS BUILDS - Configurador Maestro
 * Lógica del configurador de PCs con cálculo en tiempo real
 */

class PCConfigurator {
    constructor() {
        // Estado actual del configurador
        this.selectedComponents = {
            cpu: null,
            gpu: null,
            motherboard: null,
            ram: null,
            storage: null,
            psu: null,
            case: null
        };

        // Inicializar
        this.init();
    }

    init() {
        this.renderComponentOptions();
        this.bindEvents();
        this.updateSummary();
    }

    // Renderizar opciones de componentes
    renderComponentOptions() {
        const categories = ['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'case'];

        categories.forEach(category => {
            const container = document.getElementById(`${category}-options`);
            if (!container) return;

            container.innerHTML = '';

            PC_DATABASE[category].forEach(component => {
                const optionEl = this.createComponentOption(component, category);
                container.appendChild(optionEl);
            });
        });
    }

    // Crear elemento de opción de componente
    createComponentOption(component, category) {
        const div = document.createElement('div');
        div.className = 'component-option';
        div.dataset.id = component.id;
        div.dataset.category = category;

        div.innerHTML = `
            <div class="option-image">
                <img src="${component.image}" alt="${component.name}" loading="lazy">
            </div>
            <div class="option-name">${component.name}</div>
            <div class="option-specs">${component.specs}</div>
            <div class="option-price">${component.price}€</div>
        `;

        div.addEventListener('click', () => this.selectComponent(category, component.id));

        return div;
    }

    // Seleccionar un componente
    selectComponent(category, componentId) {
        // Actualizar estado
        this.selectedComponents[category] = componentId;

        // Actualizar UI
        this.updateComponentSelectionUI(category, componentId);

        // Actualizar resumen
        this.updateSummary();

        // Mostrar notificación
        const component = getComponentById(category, componentId);
        showToast('Componente añadido', `${component.name} seleccionado`, 'success');

        // Verificar compatibilidad
        this.checkCompatibility();
    }

    // Actualizar UI de selección
    updateComponentSelectionUI(category, selectedId) {
        const container = document.getElementById(`${category}-options`);
        const options = container.querySelectorAll('.component-option');
        const statusEl = document.getElementById(`${category}-status`);

        options.forEach(option => {
            if (option.dataset.id === selectedId) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });

        const component = getComponentById(category, selectedId);
        if (component && statusEl) {
            statusEl.textContent = component.name;
            statusEl.classList.add('selected');
        }
    }

    // Actualizar panel de resumen
    updateSummary() {
        const summaryItems = document.getElementById('summary-items');
        const totalPriceEl = document.getElementById('total-price');
        const performanceEl = document.getElementById('performance-score');
        const qualityFill = document.getElementById('quality-fill');
        const qualityValue = document.getElementById('quality-value');

        // Limpiar items actuales
        summaryItems.innerHTML = '';

        let hasComponents = false;
        const icons = {
            cpu: '🖥',
            gpu: '🎮',
            motherboard: '🔌',
            ram: '💾',
            storage: '💿',
            psu: '⚡',
            case: '🖱'
        };

        const names = {
            cpu: 'Procesador',
            gpu: 'Gráfica',
            motherboard: 'Placa Base',
            ram: 'RAM',
            storage: 'Almacenamiento',
            psu: 'Fuente',
            case: 'Caja'
        };

        // Agregar items seleccionados
        for (const [category, id] of Object.entries(this.selectedComponents)) {
            if (id) {
                hasComponents = true;
                const component = getComponentById(category, id);

                const itemEl = document.createElement('div');
                itemEl.className = 'summary-item';
                itemEl.innerHTML = `
                    <span class="summary-item-icon">${icons[category]}</span>
                    <div class="summary-item-info">
                        <div class="summary-item-name">${names[category]}</div>
                        <div class="summary-item-specs">${component.name}</div>
                    </div>
                    <span class="summary-item-price">${component.price}€</span>
                `;
                summaryItems.appendChild(itemEl);
            }
        }

        if (!hasComponents) {
            summaryItems.innerHTML = '<div class="empty-summary">Selecciona componentes para comenzar</div>';
        }

        // Verificar si todos los componentes están seleccionados
        const allSelected = Object.values(this.selectedComponents).every(id => id !== null);

        // Calcular totales (solo si todos seleccionados)
        const totalPrice = this.calculateTotalPrice();
        const performance = allSelected ? this.calculatePerformance() : 0;
        const valueScore = allSelected ? this.calculateValueScore() : 0;

        // Actualizar UI
        totalPriceEl.textContent = `${totalPrice}€`;
        performanceEl.textContent = allSelected ? `${performance}/10` : '-/10';

        // Actualizar medidor de calidad-precio (solo si todos seleccionados)
        qualityFill.style.width = allSelected ? `${valueScore}%` : '0%';
        qualityValue.textContent = allSelected ? `${valueScore}%` : '0%';

        // Cambiar color según valor
        qualityFill.className = 'meter-fill';
        if (valueScore < 40) {
            qualityFill.classList.add('low');
        } else if (valueScore < 70) {
            qualityFill.classList.add('medium');
        } else {
            qualityFill.classList.add('high');
        }

        // Actualizar preview de FPS (solo si todos seleccionados)
        if (allSelected) {
            this.updateFPSPreview();
        } else {
            document.getElementById('fps-cyberpunk').textContent = '- FPS';
            document.getElementById('fps-cod').textContent = '- FPS';
            document.getElementById('fps-fortnite').textContent = '- FPS';
        }

        // Habilitar/deshabilitar botones
        document.getElementById('btn-buy').disabled = !allSelected;
        document.getElementById('btn-export').disabled = !allSelected;
    }

    // Calcular precio total
    calculateTotalPrice() {
        let total = 0;
        for (const [category, id] of Object.entries(this.selectedComponents)) {
            if (id) {
                const component = getComponentById(category, id);
                if (component) {
                    total += component.price;
                }
            }
        }
        return total;
    }

    // Calcular rendimiento
    calculatePerformance() {
        let totalPerformance = 0;
        let count = 0;

        for (const [category, id] of Object.entries(this.selectedComponents)) {
            if (id) {
                const component = getComponentById(category, id);
                if (component && component.performance) {
                    // La GPU tiene más peso en gaming
                    const weight = category === 'gpu' ? 2.5 : 1;
                    totalPerformance += component.performance * weight;
                    count += weight;
                }
            }
        }

        return count > 0 ? (totalPerformance / count).toFixed(1) : 0;
    }

    // Calcular calidad-precio
    calculateValueScore() {
        const totalPrice = this.calculateTotalPrice();
        const performance = parseFloat(this.calculatePerformance());

        if (totalPrice === 0) return 0;

        // Fórmula ajustada: mejor relación = score más alto
        // Un build de 750€ con rendimiento 6 = ~72% calidad-precio
        const valueRatio = (performance * 1000) / totalPrice;
        return Math.min(Math.round(valueRatio * 8), 100);
    }

    // Actualizar preview de FPS
    updateFPSPreview() {
        const gpuId = this.selectedComponents.gpu;

        if (!gpuId) {
            document.getElementById('fps-cyberpunk').textContent = '- FPS';
            document.getElementById('fps-cod').textContent = '- FPS';
            document.getElementById('fps-fortnite').textContent = '- FPS';
            return;
        }

        const gpu = getComponentById('gpu', gpuId);
        if (!gpu || !gpu.fps) return;

        // Mostrar FPS en 1080p High por defecto
        const fpsData = gpu.fps['1080p'];
        document.getElementById('fps-cyberpunk').textContent = `~${fpsData.high} FPS`;
        document.getElementById('fps-cod').textContent = `~${Math.round(fpsData.high * 1.3)} FPS`;
        document.getElementById('fps-fortnite').textContent = `~${Math.round(fpsData.high * 1.8)} FPS`;
    }

    // Verificar compatibilidad
    checkCompatibility() {
        const warnings = [];

        // Verificar PSU vs consumo
        const psuId = this.selectedComponents.psu;
        const cpuId = this.selectedComponents.cpu;
        const gpuId = this.selectedComponents.gpu;

        if (psuId && (cpuId || gpuId)) {
            const psu = getComponentById('psu', psuId);
            let totalTDP = 0;

            if (cpuId) {
                const cpu = getComponentById('cpu', cpuId);
                totalTDP += cpu.tdp || 65;
            }

            if (gpuId) {
                const gpu = getComponentById('gpu', gpuId);
                totalTDP += gpu.tdp || 150;
            }

            // Margen de seguridad del 30%
            const recommendedWattage = Math.ceil(totalTDP * 1.3 / 50) * 50;

            if (psu.wattage < recommendedWattage) {
                warnings.push(`⚠️ La fuente de ${psu.wattage}W puede ser insuficiente. Recomendado: ${recommendedWattage}W`);
            }
        }

        // Verificar RAM vs plataforma (simplificado)
        const ramId = this.selectedComponents.ram;
        const cpu = cpuId ? getComponentById('cpu', cpuId) : null;

        if (ramId && cpu) {
            const ram = getComponentById('ram', ramId);
            const isModernCPU = cpu.name.includes('13') || cpu.name.includes('14') ||
                cpu.name.includes('7000') || cpu.name.includes('7950');

            if (isModernCPU && ram.type === 'DDR4') {
                warnings.push('💡 Los CPUs modernos aprovechan mejor la RAM DDR5');
            }
        }

        // Mostrar advertencias
        if (warnings.length > 0) {
            warnings.forEach(warning => {
                showToast('Compatibilidad', warning, 'warning');
            });
        }
    }

    // Cargar un build preconfigurado
    loadPrebuild(buildKey) {
        const prebuild = PREBUILDS[buildKey];
        if (!prebuild) return;

        // Seleccionar todos los componentes
        for (const [category, id] of Object.entries(prebuild.components)) {
            this.selectedComponents[category] = id;
            this.updateComponentSelectionUI(category, id);
        }

        this.updateSummary();
        showToast('Build cargado', `${prebuild.name} cargado correctamente`, 'success');

        // Scroll al configurador
        document.getElementById('configurador').scrollIntoView({ behavior: 'smooth' });
    }

    // Reiniciar configurador
    reset() {
        this.selectedComponents = {
            cpu: null,
            gpu: null,
            motherboard: null,
            ram: null,
            storage: null,
            psu: null,
            case: null
        };

        // Limpiar UI
        document.querySelectorAll('.component-option').forEach(el => {
            el.classList.remove('selected');
        });

        document.querySelectorAll('.component-status').forEach(el => {
            el.textContent = 'No seleccionado';
            el.classList.remove('selected');
        });

        this.updateSummary();
        showToast('Configurador reiniciado', 'Todos los componentes han sido eliminados', 'success');
    }

    // Exportar a PDF (simulado)
    exportToPDF() {
        const totalPrice = this.calculateTotalPrice();
        const performance = this.calculatePerformance();

        let content = `═══════════════════════════════════════\n`;
        content += `     NEXUS BUILDS - PRESUPUESTO\n`;
        content += `═══════════════════════════════════════\n\n`;

        const names = {
            cpu: 'PROCESADOR',
            gpu: 'TARJETA GRÁFICA',
            motherboard: 'PLACA BASE',
            ram: 'MEMORIA RAM',
            storage: 'ALMACENAMIENTO',
            psu: 'FUENTE DE PODER',
            case: 'TORRE/CAJA'
        };

        for (const [category, id] of Object.entries(this.selectedComponents)) {
            if (id) {
                const component = getComponentById(category, id);
                content += `${names[category]}\n`;
                content += `  ${component.name}\n`;
                content += `  ${component.specs}\n`;
                content += `  Precio: ${component.price}€\n\n`;
            }
        }

        content += `───────────────────────────────────────\n`;
        content += `PRECIO TOTAL: ${totalPrice}€\n`;
        content += `RENDIMIENTO: ${performance}/10\n`;
        content += `═══════════════════════════════════════\n`;

        // Crear blob y descargar
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nexus-builds-presupuesto.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('PDF Exportado', 'Tu presupuesto se ha descargado', 'success');
    }

    // Mostrar modal de compra
    showBuyModal() {
        const modal = document.getElementById('buy-modal');
        const modalBody = document.getElementById('modal-body');

        const totalPrice = this.calculateTotalPrice();
        const performance = this.calculatePerformance();
        const valueScore = this.calculateValueScore();

        let componentsList = '<div class="modal-components">';
        const names = {
            cpu: 'Procesador',
            gpu: 'Gráfica',
            motherboard: 'Placa Base',
            ram: 'RAM',
            storage: 'Almacenamiento',
            psu: 'Fuente',
            case: 'Caja'
        };

        for (const [category, id] of Object.entries(this.selectedComponents)) {
            if (id) {
                const component = getComponentById(category, id);
                componentsList += `
                    <div class="modal-component-item">
                        <span>${names[category]}: ${component.name}</span>
                        <span>${component.price}€</span>
                    </div>
                `;
            }
        }
        componentsList += '</div>';

        modalBody.innerHTML = `
            <div class="modal-summary">
                <div class="modal-total">
                    <span>Total:</span>
                    <span class="modal-price">${totalPrice}€</span>
                </div>
                <div class="modal-stats">
                    <div class="modal-stat">
                        <span>Rendimiento:</span>
                        <span>${performance}/10</span>
                    </div>
                    <div class="modal-stat">
                        <span>Calidad-Precio:</span>
                        <span>${valueScore}%</span>
                    </div>
                </div>
            </div>
            ${componentsList}
        `;

        modal.classList.add('active');
    }

    // Event listeners
    bindEvents() {
        // Botón reiniciar
        document.getElementById('btn-reset').addEventListener('click', () => this.reset());

        // Botón exportar
        document.getElementById('btn-export').addEventListener('click', () => this.exportToPDF());

        // Botón comprar
        document.getElementById('btn-buy').addEventListener('click', () => this.showBuyModal());

        // Cerrar modal
        document.getElementById('modal-close').addEventListener('click', () => {
            document.getElementById('buy-modal').classList.remove('active');
        });

        document.getElementById('btn-continue').addEventListener('click', () => {
            document.getElementById('buy-modal').classList.remove('active');
        });

        document.getElementById('btn-checkout').addEventListener('click', () => {
            showToast('¡Gracias!', 'Redirigiendo al proceso de pago...', 'success');
            setTimeout(() => {
                document.getElementById('buy-modal').classList.remove('active');
            }, 2000);
        });

        // Cerrar modal al hacer click fuera
        document.getElementById('buy-modal').addEventListener('click', (e) => {
            if (e.target.id === 'buy-modal') {
                document.getElementById('buy-modal').classList.remove('active');
            }
        });

        // Botones de builds preconfigurados
        document.querySelectorAll('.btn-select-build').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const build = e.target.dataset.build;
                this.loadPrebuild(build);
            });
        });
    }
}

// Función global para mostrar toast
function showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;

    container.appendChild(toast);

    // Auto-remove después de 4 segundos
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => {
            container.removeChild(toast);
        }, 300);
    }, 4000);
}

// Inicializar configurador cuando el DOM esté listo
let configurator;
document.addEventListener('DOMContentLoaded', () => {
    configurator = new PCConfigurator();
});
