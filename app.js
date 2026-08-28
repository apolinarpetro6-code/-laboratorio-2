// Configuración de Supabase
const SUPABASE_URL = 'https://mskparkfueshghfebcmx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ALT1eUrp7ZdbD-YRAxi3KQ_19dZs4gZ';

// Inicializar cliente de Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Elementos del DOM
const form = document.getElementById('studentForm');
const nombreInput = document.getElementById('nombre');
const nota1Input = document.getElementById('nota1');
const nota2Input = document.getElementById('nota2');
const nota3Input = document.getElementById('nota3');
const resultadoDiv = document.getElementById('resultado');
const resNombre = document.getElementById('resNombre');
const resPromedio = document.getElementById('resPromedio');
const resEstado = document.getElementById('resEstado');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const historialDiv = document.getElementById('historial');

// Calcular promedio
function calcularPromedio(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

// Determinar estado
function determinarEstado(promedio) {
    return promedio >= 3.0 ? 'APROBADO' : 'REPROBADO';
}

// Formatear fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Mostrar resultado
function mostrarResultado(nombre, promedio, estado) {
    resNombre.textContent = nombre;
    resPromedio.textContent = promedio.toFixed(2);
    resEstado.textContent = estado;
    
    // Configurar clase de estado
    resEstado.className = 'value status ' + (estado === 'APROBADO' ? 'aprobado' : 'reprobado');
    
    // Configurar barra de progreso
    const porcentaje = (promedio / 5) * 100;
    progressBar.style.setProperty('--width', porcentaje + '%');
    progressBar.className = 'progress-bar ' + (estado === 'APROBADO' ? 'aprobado' : 'reprobado');
    progressBar.querySelector('::before').style.width = porcentaje + '%';
    progressText.textContent = porcentaje.toFixed(0) + '%';
    
    // Mostrar sección de resultado
    resultadoDiv.classList.remove('hidden');
}

// Guardar en Supabase
async function guardarEstudiante(nombre, nota1, nota2, nota3, promedio, estado) {
    try {
        const { data, error } = await supabase
            .from('estudiantes')
            .insert([
                {
                    nombre: nombre,
                    nota1: nota1,
                    nota2: nota2,
                    nota3: nota3,
                    promedio: promedio,
                    estado: estado
                }
            ]);
        
        if (error) throw error;
        
        console.log('Estudiante guardado:', data);
        return data;
    } catch (error) {
        console.error('Error al guardar:', error);
        alert('Error al guardar en la base de datos: ' + error.message);
        return null;
    }
}

// Cargar historial
async function cargarHistorial() {
    try {
        const { data, error } = await supabase
            .from('estudiantes')
            .select('*')
            .order('fecha_creacion', { ascending: false });
        
        if (error) throw error;
        
        mostrarHistorial(data);
    } catch (error) {
        console.error('Error al cargar historial:', error);
        historialDiv.innerHTML = '<p class="empty-message">Error al cargar historial: ' + error.message + '</p>';
    }
}

// Mostrar historial en el DOM
function mostrarHistorial(estudiantes) {
    if (!estudiantes || estudiantes.length === 0) {
        historialDiv.innerHTML = '<p class="empty-message">No hay estudiantes registrados aún</p>';
        return;
    }
    
    historialDiv.innerHTML = estudiantes.map(est => `
        <div class="history-item ${est.estado.toLowerCase()}">
            <div class="history-item-header">
                <span class="history-item-name">${est.nombre}</span>
                <span class="history-item-date">${formatearFecha(est.fecha_creacion)}</span>
            </div>
            <div class="history-item-details">
                <div class="history-item-detail">
                    <span>Nota 1</span>
                    <span>${est.nota1.toFixed(2)}</span>
                </div>
                <div class="history-item-detail">
                    <span>Nota 2</span>
                    <span>${est.nota2.toFixed(2)}</span>
                </div>
                <div class="history-item-detail">
                    <span>Nota 3</span>
                    <span>${est.nota3.toFixed(2)}</span>
                </div>
                <div class="history-item-detail">
                    <span>Promedio</span>
                    <span>${est.promedio.toFixed(2)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Limpiar formulario
function limpiarFormulario() {
    form.reset();
    resultadoDiv.classList.add('hidden');
}

// Limpiar historial
async function limpiarHistorial() {
    if (!confirm('¿Estás seguro de que quieres eliminar todo el historial?')) return;
    
    try {
        const { error } = await supabase
            .from('estudiantes')
            .delete()
            .neq('id', 0); // Eliminar todos los registros
        
        if (error) throw error;
        
        cargarHistorial();
        alert('Historial eliminado correctamente');
    } catch (error) {
        console.error('Error al limpiar historial:', error);
        alert('Error al eliminar historial: ' + error.message);
    }
}

// Manejar envío del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Obtener valores
    const nombre = nombreInput.value.trim();
    const nota1 = parseFloat(nota1Input.value);
    const nota2 = parseFloat(nota2Input.value);
    const nota3 = parseFloat(nota3Input.value);
    
    // Validar
    if (!nombre) {
        alert('Por favor ingresa el nombre del estudiante');
        return;
    }
    
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        alert('Por favor ingresa notas válidas');
        return;
    }
    
    if (nota1 < 0 || nota1 > 5 || nota2 < 0 || nota2 > 5 || nota3 < 0 || nota3 > 5) {
        alert('Las notas deben estar entre 0.0 y 5.0');
        return;
    }
    
    // Calcular
    const promedio = calcularPromedio(nota1, nota2, nota3);
    const estado = determinarEstado(promedio);
    
    // Mostrar resultado
    mostrarResultado(nombre, promedio, estado);
    
    // Guardar en Supabase
    await guardarEstudiante(nombre, nota1, nota2, nota3, promedio, estado);
    
    // Actualizar historial
    cargarHistorial();
});

// Validación en tiempo real
[nota1Input, nota2Input, nota3Input].forEach(input => {
    input.addEventListener('input', (e) => {
        const value = parseFloat(e.target.value);
        if (value < 0 || value > 5) {
            e.target.style.borderColor = '#ef4444';
        } else {
            e.target.style.borderColor = '#e2e8f0';
        }
    });
});

// Cargar historial al iniciar
document.addEventListener('DOMContentLoaded', cargarHistorial);