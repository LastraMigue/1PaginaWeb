/**
 * NEXUS BUILDS - Comparador FPS
 * Compara el rendimiento de los builds en diferentes juegos y configuraciones
 */

class FPSComparator {
    constructor() {
        this.currentResolution = '1080p';
        this.currentQuality = 'high';
        this.init();
    }

    init() {
        this.renderGamesGrid();
        this.renderFPSChart();
        this.bindEvents();
    }

    // Obtener datos de FPS para un build
    getBuildFPS(buildKey, gameId) {
        const build = PREBUILDS[buildKey];
        if (!build) return 0;

        const gpuId = build.components.gpu;
        const gpu = getComponentById('gpu', gpuId);

        if (!gpu || !gpu.fps) return 0;

        // Obtener FPS base según resolución y calidad
        const fpsData = gpu.fps[this.currentResolution];
        if (!fpsData) return 0;

        let baseFPS = fpsData[this.currentQuality] || fpsData.high;

        // Ajustes por juego (simulados)
        const gameMultipliers = {
            'cyberpunk': 1.0,
            'cod': 1.3,
            'fortnite': 1.8,
            'valorant': 2.5,
            'apex': 1.4,
            'rdr2': 0.9
        };

        return Math.round(baseFPS * (gameMultipliers[gameId] || 1.0));
    }

    // Renderizar gráfico de barras de FPS
    renderFPSChart() {
        const chart = document.getElementById('fps-chart');
        if (!chart) return;

        chart.innerHTML = '';

        // Juegos principales para el gráfico
        const mainGames = ['cyberpunk', 'cod', 'fortnite'];
        const gameNames = {
            'cyberpunk': 'Cyberpunk 2077',
            'cod': 'Call of Duty',
            'fortnite': 'Fortnite'
        };

        mainGames.forEach(gameId => {
            const container = document.createElement('div');
            container.className = 'chart-bar-container';

            // Calcular FPS para cada build
            const fpsEntry = this.getBuildFPS('starter', gameId);
            const fpsMid = this.getBuildFPS('gaming', gameId);
            const fpsUltra = this.getBuildFPS('extreme', gameId);

            const maxFPS = Math.max(fpsEntry, fpsMid, fpsUltra, 200);

            container.innerHTML = `
                <span class="chart-bar-label">${gameNames[gameId]}</span>
                <div class="chart-bar-wrapper">
                    <div class="chart-bar entry" style="width: ${(fpsEntry / maxFPS) * 100}%">
                        <span class="chart-bar-value">${fpsEntry}</span>
                    </div>
                </div>
                <div class="chart-bar-wrapper">
                    <div class="chart-bar mid" style="width: ${(fpsMid / maxFPS) * 100}%">
                        <span class="chart-bar-value">${fpsMid}</span>
                    </div>
                </div>
                <div class="chart-bar-wrapper">
                    <div class="chart-bar ultra" style="width: ${(fpsUltra / maxFPS) * 100}%">
                        <span class="chart-bar-value">${fpsUltra}</span>
                    </div>
                </div>
            `;

            chart.appendChild(container);
        });
    }

    // Renderizar grid de juegos
    renderGamesGrid() {
        const grid = document.getElementById('games-grid');
        if (!grid) return;

        grid.innerHTML = '';

        GAMES_DATA.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';

            const fpsEntry = this.getBuildFPS('starter', game.id);
            const fpsMid = this.getBuildFPS('gaming', game.id);
            const fpsUltra = this.getBuildFPS('extreme', game.id);

            card.innerHTML = `
                <div class="game-card-image">
                    <img src="${game.image}" alt="${game.name}" loading="lazy">
                </div>
                <h4 class="game-card-title">${game.name}</h4>
                <div class="game-card-fps">
                    <div class="fps-row entry">
                        <span class="build-name">Starter Nova</span>
                        <span class="fps-number">${fpsEntry} FPS</span>
                    </div>
                    <div class="fps-row mid">
                        <span class="build-name">Gaming Titan</span>
                        <span class="fps-number">${fpsMid} FPS</span>
                    </div>
                    <div class="fps-row ultra">
                        <span class="build-name">Extreme Overlord</span>
                        <span class="fps-number">${fpsUltra} FPS</span>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });
    }

    // Actualizar todos los gráficos
    updateAll() {
        this.renderFPSChart();
        this.renderGamesGrid();
    }

    // Event listeners
    bindEvents() {
        // Selector de resolución
        const resSelector = document.getElementById('resolution-selector');
        if (resSelector) {
            resSelector.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Actualizar botones activos
                    resSelector.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');

                    // Actualizar resolución actual
                    this.currentResolution = e.target.dataset.res;

                    // Actualizar gráficos
                    this.updateAll();

                    showToast('Resolución cambiada', `Mostrando FPS en ${this.currentResolution}`, 'info');
                });
            });
        }

        // Selector de calidad
        const qualitySelector = document.getElementById('quality-selector');
        if (qualitySelector) {
            qualitySelector.querySelectorAll('button').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Actualizar botones activos
                    qualitySelector.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');

                    // Actualizar calidad actual
                    this.currentQuality = e.target.dataset.quality;

                    // Actualizar gráficos
                    this.updateAll();

                    const qualityNames = {
                        'low': 'Baja',
                        'high': 'Alta',
                        'ultra': 'Ultra'
                    };

                    showToast('Calidad cambiada', `Mostrando FPS en calidad ${qualityNames[this.currentQuality]}`, 'info');
                });
            });
        }
    }
}

// Inicializar comparador cuando el DOM esté listo
let fpsComparator;
document.addEventListener('DOMContentLoaded', () => {
    fpsComparator = new FPSComparator();
});
