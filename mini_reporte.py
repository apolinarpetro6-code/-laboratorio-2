# mini_reporte.py
# ===========================================
# Script que solicita el nombre de un estudiante y sus 3 notas,
# calcula el promedio, determina si está aprobado o reprobado
# y genera un archivo HTML con los resultados.
# El HTML se crea a partir de una plantilla externa (plantilla.html)
# y se le aplica un estilo CSS separado (estilos.css).
# ===========================================

import webbrowser         # Para abrir el reporte HTML automáticamente en el navegador
from pathlib import Path  # Para gestionar rutas de archivos de manera fácil y segura
import sys               # Para aceptar argumentos de línea de comandos

print("=== Mini Reporte (HTML + CSS) ===")

# --- Función para leer y validar cada nota ---
def leer_nota(etiqueta):
    """
    Solicita una nota por consola, valida que sea un número entre 0.0 y 5.0.
    Retorna el valor como float.
    """
    try:
        valor = float(input(f"{etiqueta} (0.0 a 5.0): "))
    except ValueError:
        # Si el valor no es numérico, termina el programa
        print("Alguna nota no es un número. Intenta de nuevo.")
        raise SystemExit
    if valor < 0 or valor > 5:
        # Si la nota no está en rango, termina el programa
        print("Las notas deben estar entre 0.0 y 5.0.")
        raise SystemExit
    return valor

# --- Captura de datos ---
# Verificar si se proporcionaron argumentos de línea de comandos
if len(sys.argv) >= 5:
    # Modo no interactivo: usar argumentos
    nombre = sys.argv[1].strip()
    try:
        n1 = float(sys.argv[2])
        n2 = float(sys.argv[3])
        n3 = float(sys.argv[4])
    except ValueError:
        print("Las notas deben ser números válidos.")
        raise SystemExit
    # Validar rango
    for nota in [n1, n2, n3]:
        if nota < 0 or nota > 5:
            print("Las notas deben estar entre 0.0 y 5.0.")
            raise SystemExit
else:
    # Modo interactivo: solicitar input
    nombre = input("Nombre del estudiante: ").strip()  # strip() elimina espacios extra
    n1 = leer_nota("Nota 1")
    n2 = leer_nota("Nota 2")
    n3 = leer_nota("Nota 3")

# --- Cálculo del promedio ---
promedio = (n1 + n2 + n3) / 3

# --- Determinar estado y clase CSS según promedio ---
estado = "APROBADO" if promedio >= 3.0 else "REPROBADO"
clase_estado = "ok" if estado == "APROBADO" else "bad"

# --- Definir rutas de archivos ---
base = Path(__file__).parent          # Carpeta donde está este script
ruta_plantilla = base / "plantilla.html"
ruta_salida = base / "reporte.html"

# --- Cargar la plantilla HTML ---
try:
    html = ruta_plantilla.read_text(encoding="utf-8")
except FileNotFoundError:
    print("No se encontró 'plantilla.html'. Asegúrate de que esté en la misma carpeta.")
    raise SystemExit

# --- Reemplazar marcadores por los valores reales ---
html = (html
    .replace("{{NOMBRE}}", nombre or "-")
    .replace("{{N1}}", f"{n1:.2f}")
    .replace("{{N2}}", f"{n2:.2f}")
    .replace("{{N3}}", f"{n3:.2f}")
    .replace("{{PROMEDIO}}", f"{promedio:.2f}")
    .replace("{{ESTADO}}", estado)
    .replace("{{CLASE_ESTADO}}", clase_estado)
)

# --- Guardar el archivo final ---
ruta_salida.write_text(html, encoding="utf-8")
print(f"Archivo generado: {ruta_salida.name}")

# --- Abrir el reporte en el navegador ---
webbrowser.open_new_tab(ruta_salida.as_uri())
