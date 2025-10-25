import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from plotly.offline import plot
import os
import streamlit as st

# 📂 Ruta del archivo CSV
ruta_csv = r"D:\TALENTO_TECH\PROGRAMACION_EXPLORADOR\html_css_javascript_python\pagina_proyecto\csv\Meta_FNCER__Incorporar_en_la_matriz_energ_tica_nueva_capacidad_instalada_a_partir_de_Fuentes_No_Convencionales_de_Energ_a_Renovable_-_FNCER.csv"

# 📁 Carpeta donde guardarás los gráficos
carpeta_salida = r"D:\TALENTO_TECH\PROGRAMACION_EXPLORADOR\html_css_javascript_python\pagina_proyecto"

# Crear carpeta si no existe
os.makedirs(carpeta_salida, exist_ok=True)

# Leer el CSV (usando separador ; y saltando líneas con errores)
df = pd.read_csv(ruta_csv, sep=";", encoding="utf-8", on_bad_lines="skip")

# Asegurarse de que las columnas clave existan
df['Capacidad'] = pd.to_numeric(df['Capacidad'], errors='coerce')
df = df.dropna(subset=['Tipo', 'Capacidad'])

# ✅ Gráfico de barras
fig_barras = px.bar(df.groupby('Tipo', as_index=False)['Capacidad'].sum(),
                    x='Tipo', y='Capacidad', color='Tipo',
                    title='Producción de Energía Renovable por Fuente (MW)')
plot(fig_barras, filename=os.path.join(carpeta_salida, 'grafico_barras.html'), auto_open=False)

# ✅ Gráfico de torta
fig_torta = px.pie(df.groupby('Tipo', as_index=False)['Capacidad'].sum(),
                names='Tipo', values='Capacidad',
                title='Participación de Energías Renovables')
plot(fig_torta, filename=os.path.join(carpeta_salida, 'grafico_torta.html'), auto_open=False)

# ✅ Gráfico de líneas
fig_lineas = px.line(df.sort_values(by='Capacidad'),
                x='Proyecto', y='Capacidad', color='Tipo',
                title='Tendencia de Capacidad Instalada por Proyecto')
plot(fig_lineas, filename=os.path.join(carpeta_salida, 'grafico_lineas.html'), auto_open=False)

# ✅ Gráfico de área
fig_area = go.Figure()
for tipo in df['Tipo'].unique():
    data = df[df['Tipo'] == tipo]
    fig_area.add_trace(go.Scatter(
        x=data['Proyecto'],
        y=data['Capacidad'],
        mode='lines',
        stackgroup='one',
        name=tipo
    ))
fig_area.update_layout(title='Comparación entre tipos de Energía Renovable (MW)')
plot(fig_area, filename=os.path.join(carpeta_salida, 'grafico_area.html'), auto_open=False)

print("✅ Todos los gráficos fueron creados correctamente en:")
print(carpeta_salida)
