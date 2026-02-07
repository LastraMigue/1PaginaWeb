/**
 * NEXUS BUILDS - Base de Datos de Componentes
 * Contiene todos los componentes disponibles para el configurador
 */

const PC_DATABASE = {
    // PROCESADORES (CPU)
    cpu: [
        {
            id: 'cpu-1',
            name: 'AMD Ryzen 5 5600',
            brand: 'AMD',
            specs: '6 núcleos / 12 hilos - 3.5GHz',
            price: 129,
            performance: 6,
            image: 'img/Ryzen5.png',
            tdp: 65
        },
        {
            id: 'cpu-2',
            name: 'Intel Core i5-14600K',
            brand: 'Intel',
            specs: '14 núcleos / 20 hilos - 3.5GHz',
            price: 329,
            performance: 8,
            image: 'img/i5.png',
            tdp: 125
        },
        {
            id: 'cpu-3',
            name: 'AMD Ryzen 9 7950X3D',
            brand: 'AMD',
            specs: '16 núcleos / 32 hilos - 4.2GHz',
            price: 599,
            performance: 10,
            image: 'img/Ryzen9.png',
            tdp: 120
        }
    ],

    // TARJETAS GRÁFICAS (GPU)
    gpu: [
        {
            id: 'gpu-1',
            name: 'NVIDIA RTX 4060',
            brand: 'NVIDIA',
            specs: '8GB GDDR6 - Ray Tracing',
            price: 299,
            performance: 6,
            image: 'img/RTX4060.png',
            tdp: 115,
            fps: {
                '1080p': { low: 120, high: 85, ultra: 65 },
                '1440p': { low: 90, high: 60, ultra: 45 },
                '4k': { low: 50, high: 35, ultra: 25 }
            }
        },
        {
            id: 'gpu-2',
            name: 'NVIDIA RTX 4070 Super',
            brand: 'NVIDIA',
            specs: '12GB GDDR6X - DLSS 3',
            price: 599,
            performance: 8,
            image: 'img/RTX4070.png',
            tdp: 220,
            fps: {
                '1080p': { low: 200, high: 150, ultra: 120 },
                '1440p': { low: 160, high: 110, ultra: 85 },
                '4k': { low: 90, high: 65, ultra: 50 }
            }
        },
        {
            id: 'gpu-3',
            name: 'NVIDIA RTX 4090',
            brand: 'NVIDIA',
            specs: '24GB GDDR6X - Flagship',
            price: 1599,
            performance: 10,
            image: 'img/RTX4090.png',
            tdp: 450,
            fps: {
                '1080p': { low: 300, high: 250, ultra: 200 },
                '1440p': { low: 280, high: 200, ultra: 160 },
                '4k': { low: 200, high: 140, ultra: 100 }
            }
        }
    ],

    // MEMORIA RAM
    ram: [
        {
            id: 'ram-1',
            name: 'Corsair Vengeance 16GB',
            brand: 'Corsair',
            specs: 'DDR4 3200MHz (2x8GB)',
            price: 45,
            performance: 5,
            image: 'img/Vengeance.png',
            type: 'DDR4'
        },
        {
            id: 'ram-2',
            name: 'G.Skill Trident Z5 32GB',
            brand: 'G.Skill',
            specs: 'DDR5 5600MHz (2x16GB)',
            price: 129,
            performance: 8,
            image: 'img/Trident.png',
            type: 'DDR5'
        },
        {
            id: 'ram-3',
            name: 'Corsair Dominator 64GB',
            brand: 'Corsair',
            specs: 'DDR5 6400MHz (2x32GB)',
            price: 299,
            performance: 10,
            image: 'img/Dominator.png',
            type: 'DDR5'
        }
    ],

    // ALMACENAMIENTO
    storage: [
        {
            id: 'storage-1',
            name: 'Samsung 980 NVMe',
            brand: 'Samsung',
            specs: '500GB - 3100 MB/s',
            price: 49,
            performance: 5,
            image: 'img/Samsung980.png',
            capacity: 500
        },
        {
            id: 'storage-2',
            name: 'WD Black SN850X',
            brand: 'Western Digital',
            specs: '1TB - 7300 MB/s Gen4',
            price: 89,
            performance: 8,
            image: 'img/WDBlack.png',
            capacity: 1000
        },
        {
            id: 'storage-3',
            name: 'Samsung 990 Pro',
            brand: 'Samsung',
            specs: '2TB - 7450 MB/s Gen5',
            price: 179,
            performance: 10,
            image: 'img/Samsung990.png',
            capacity: 2000
        }
    ],

    // FUENTES DE PODER (PSU)
    psu: [
        {
            id: 'psu-1',
            name: 'Corsair CV550',
            brand: 'Corsair',
            specs: '550W - 80+ Bronze',
            price: 49,
            performance: 5,
            image: 'img/CV550.png',
            wattage: 550,
            efficiency: 'bronze'
        },
        {
            id: 'psu-2',
            name: 'EVGA SuperNOVA 750',
            brand: 'EVGA',
            specs: '750W - 80+ Gold',
            price: 99,
            performance: 8,
            image: 'img/EVGA750.png',
            wattage: 750,
            efficiency: 'gold'
        },
        {
            id: 'psu-3',
            name: 'Corsair AX1000',
            brand: 'Corsair',
            specs: '1000W - 80+ Titanium',
            price: 249,
            performance: 10,
            image: 'img/AX1000.png',
            wattage: 1000,
            efficiency: 'titanium'
        }
    ],

    // PLACAS BASE
    motherboard: [
        {
            id: 'mobo-1',
            name: 'Gigabyte B550M DS3H',
            brand: 'Gigabyte',
            specs: 'Micro ATX - AM4',
            price: 99,
            performance: 6,
            image: 'img/B550M_DS3H.png',
            socket: 'AM4'
        },
        {
            id: 'mobo-2',
            name: 'MSI MPG Z790 Edge',
            brand: 'MSI',
            specs: 'ATX - LGA1700 - WiFi',
            price: 289,
            performance: 8,
            image: 'img/Z790.png',
            socket: 'LGA1700'
        },
        {
            id: 'mobo-3',
            name: 'ASUS ROG Crosshair X670E',
            brand: 'ASUS',
            specs: 'E-ATX - AM5 - Extreme',
            price: 599,
            performance: 10,
            image: 'img/X670E.png',
            socket: 'AM5'
        }
    ],

    // CAJAS/TORRES
    case: [
        {
            id: 'case-1',
            name: 'NZXT H510',
            brand: 'NZXT',
            specs: 'Mid Tower - Cristal Templado',
            price: 79,
            performance: 6,
            image: 'img/H510.png',
            size: 'mid-tower'
        },
        {
            id: 'case-2',
            name: 'Lian Li O11 Dynamic',
            brand: 'Lian Li',
            specs: 'Mid Tower - Doble Cámara',
            price: 149,
            performance: 8,
            image: 'img/O11D.png',
            size: 'mid-tower'
        },
        {
            id: 'case-3',
            name: 'Corsair 7000D',
            brand: 'Corsair',
            specs: 'Full Tower - Airflow Max',
            price: 249,
            performance: 10,
            image: 'img/7000D.png',
            size: 'full-tower'
        }
    ]
};

// Builds preconfigurados para "El Olimpo"
const PREBUILDS = {
    starter: {
        name: 'Starter Nova',
        tier: 'entry',
        components: {
            cpu: 'cpu-1',
            gpu: 'gpu-1',
            ram: 'ram-1',
            storage: 'storage-1',
            psu: 'psu-1',
            motherboard: 'mobo-1',
            case: 'case-1'
        }
    },
    gaming: {
        name: 'Gaming Titan',
        tier: 'mid',
        components: {
            cpu: 'cpu-2',
            gpu: 'gpu-2',
            ram: 'ram-2',
            storage: 'storage-2',
            psu: 'psu-2',
            motherboard: 'mobo-2',
            case: 'case-2'
        }
    },
    extreme: {
        name: 'Extreme Overlord',
        tier: 'ultra',
        components: {
            cpu: 'cpu-3',
            gpu: 'gpu-3',
            ram: 'ram-3',
            storage: 'storage-3',
            psu: 'psu-3',
            motherboard: 'mobo-3',
            case: 'case-3'
        }
    }
};

// Datos de juegos para el comparador FPS
const GAMES_DATA = [
    {
        id: 'cyberpunk',
        name: 'Cyberpunk 2077',
        image: 'img/Cyberpunk.jpg',
        genre: 'RPG de mundo abierto'
    },
    {
        id: 'cod',
        name: 'Call of Duty: Black Ops 6',
        image: 'img/COD.jpg',
        genre: 'Shooter FPS'
    },
    {
        id: 'fortnite',
        name: 'Fortnite',
        image: 'img/FORTNITE.jpg',
        genre: 'Battle Royale'
    },
    {
        id: 'valorant',
        name: 'Valorant',
        image: 'img/VALORANT.jpg',
        genre: 'Shooter táctico'
    },
    {
        id: 'apex',
        name: 'Apex Legends',
        image: 'img/APEX.jpg',
        genre: 'Battle Royale'
    },
    {
        id: 'rdr2',
        name: 'Red Dead Redemption 2',
        image: 'img/RDR2.jpg',
        genre: 'Aventura western'
    }
];

// Respuestas del chatbot IA
const AI_RESPONSES = {
    'presupuesto 800 euros': `Con 800€, te recomiendo el **Starter Nova** con algunas mejoras:
    
• CPU: AMD Ryzen 5 5600
• GPU: RTX 4060 (excelente calidad-precio)
• RAM: 16GB DDR4
• SSD: 500GB NVMe

**Total: ~749€** - Te sobra para un monitor o periféricos. ¿Te gustaría personalizar algo?`,

    'mejor calidad precio': `El **Gaming Titan** es nuestro build más vendido por una razón:

• Rendimiento 8/10 para gaming 1440p
• Precio/Calidad 8.5/10 ⭐
• Perfecto para jugar todo en ultra a 60+ FPS
• Ideal para streaming y creación de contenido

**Precio: 1.299€** - ¿Quieres ver la configuración completa?`,

    'jugar en 4K': `Para gaming en 4K necesitas potencia bruta. Te recomiendo el **Extreme Overlord**:

• RTX 4090 - La GPU más potente del mercado
• Ryzen 9 7950X3D - 16 núcleos
• 64GB DDR5 - Futuro asegurado
• SSD 2TB Gen5 - Cargas instantáneas

**Rendimiento 4K:** 100+ FPS en ultra
**Precio: 3.499€** - ¿Te lo mereces?`,

    'streaming y gaming': `Para streaming necesitas CPU potente. Dos opciones:

**Opción 1 - Gaming Titan (1.299€)**
• i5-14600K con Quick Sync para streaming
• RTX 4070 Super con NVENC
• Perfecto para streaming 1080p60

**Opción 2 - Extreme Overlord (3.499€)**
• Ryzen 9 7950X3D - Stream sin impacto en FPS
• RTX 4090 - Calidad x264 Slow sin lag
• Streaming 4K60 profesional

¿Qué presupuesto tienes?`,

    'default': `Entiendo. Permíteme ayudarte mejor. Aquí tienes algunas opciones:

1️⃣ **¿Cuál es tu presupuesto?** (500€, 1000€, 2000€+...)

2️⃣ **¿Para qué lo usarás principalmente?**
   - Gaming casual
   - Gaming competitivo
   - Streaming/Creación de contenido
   - Trabajo profesional

3️⃣ **¿Qué resolución de monitor tienes?**
   - 1080p
   - 1440p
   - 4K

Responde y te daré la mejor recomendación personalizada. 🤖`
};

// Función helper para obtener un componente por ID
function getComponentById(category, id) {
    return PC_DATABASE[category].find(comp => comp.id === id);
}

// Función para calcular el precio total de un build
function calculateBuildPrice(componentIds) {
    let total = 0;
    for (const [category, id] of Object.entries(componentIds)) {
        const component = getComponentById(category, id);
        if (component) {
            total += component.price;
        }
    }
    return total;
}

// Función para calcular el rendimiento promedio de un build
function calculateBuildPerformance(componentIds) {
    let totalPerformance = 0;
    let count = 0;

    for (const [category, id] of Object.entries(componentIds)) {
        const component = getComponentById(category, id);
        if (component && component.performance) {
            // La GPU pesa más en el rendimiento gaming
            const weight = category === 'gpu' ? 2 : 1;
            totalPerformance += component.performance * weight;
            count += weight;
        }
    }

    return count > 0 ? (totalPerformance / count).toFixed(1) : 0;
}

// Función para calcular la calidad-precio (0-100)
function calculateValueScore(componentIds) {
    const totalPrice = calculateBuildPrice(componentIds);
    const performance = parseFloat(calculateBuildPerformance(componentIds));

    if (totalPrice === 0) return 0;

    // Fórmula: (rendimiento / precio) * factor de escala
    // Un build de 750€ con rendimiento 6 = 90% calidad-precio
    const valueRatio = (performance / totalPrice) * 1000;
    return Math.min(Math.round(valueRatio * 10), 100);
}

// Exportar para uso en otros módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PC_DATABASE, PREBUILDS, GAMES_DATA, AI_RESPONSES };
}
