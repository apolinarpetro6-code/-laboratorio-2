# Laboratorio 2 - Mini Reporte

Script en Python que genera reportes HTML con notas de estudiantes.

## Archivos

- `mini_reporte.py` - Script principal de Python
- `plantilla.html` - Plantilla HTML para el reporte
- `estilos.css` - Estilos CSS para el diseño del reporte

## Uso

### Modo Interactivo
```bash
python mini_reporte.py
```
Luego ingresa el nombre del estudiante y las 3 notas cuando se soliciten.

### Modo No Interactivo
```bash
python mini_reporte.py "Nombre del Estudiante" 4.0 5.0 4.5
```

## Salida

El script genera un archivo `reporte.html` en la misma carpeta con:
- Nombre del estudiante
- Las 3 notas ingresadas
- Promedio calculado
- Estado (APROBADO/REPROBADO) basado en si el promedio >= 3.0
- Diseño visual con colores según el estado (verde para aprobado, rojo para reprobado)

## Requisitos

- Python 3.x
- Los archivos `plantilla.html` y `estilos.css` deben estar en la misma carpeta que `mini_reporte.py`