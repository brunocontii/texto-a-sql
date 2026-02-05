# Generador de SQL a partir de LN

```bash
Aplicación web inteligente que traduce preguntas en lenguaje natural a consultas SQL mediante inteligencia artificial
```


## 👥 Equipo de Desarrollo
- Conti, Bruno  
- Gonzalez, Juan Cruz  
- Vollenweider, Erich  

Universidad Nacional de Río Cuarto - Inteligencia Artificial


## 📝 Descripción del Proyecto
Este proyecto implementa un sistema de Text-to-SQL que permite a usuarios sin conocimientos técnicos generar consultas SQL complejas
simplemente escribiendo preguntas en lenguaje natural. La aplicación comprende esquemas de bases de datos con múltiples tablas, relaciones
(claves primarias y foráneas), y genera automáticamente consultas que incluyen JOINs, agregaciones, subconsultas y más.


## 🧠 Tecnologías utilizadas
Frontend & Framework

- Reflex: Framework Python fullstack para construir aplicaciones web
- Componentes reutilizables y gestión de estado integrada
- Interfaz responsive y moderna

Backend & API

- FastAPI: Framework de alto rendimiento para crear APIs REST
- Endpoints asíncronos para inferencia del modelo
- Validación automática de datos con Pydantic
- Documentación interactiva (Swagger UI)

Modelo de IA

- CodeT5-base (Salesforce): Modelo transformer encoder-decoder especializado en código
- Fine-tuning sobre el dataset Spider: 10,181 consultas SQL complejas con 200+ bases de datos
- Arquitectura T5 optimizada para tareas de traducción sequence-to-sequence
- Soporte para:
    - Consultas simples (SELECT, WHERE, ORDER BY)
    - JOINs múltiples (INNER, LEFT, RIGHT)
    - Agregaciones (COUNT, SUM, AVG, MAX, MIN)
    - Subconsultas y queries anidadas
    - GROUP BY, HAVING, DISTINCT

Librerías de ML

- Transformers (Hugging Face): Para carga y gestión del modelo
- PyTorch: Framework de deep learning para inferencia
- Tokenizers: Procesamiento eficiente de texto


## 🏗️ Arquitectura del Sistema
```bash
┌─────────────────┐
│   Usuario       │
│  (Navegador)    │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│      Frontend (Reflex)          │
│  - Interfaz de usuario          │
│  - Constructor de schemas       │
│  - Gestión de estado            │
└────────┬────────────────────────┘
         │ HTTP Request
         ▼
┌─────────────────────────────────┐
│      Backend (FastAPI)          │
│  - API REST                     │
│  - Validación de datos          │
│  - Gestión de requests          │
└────────┬────────────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│    Modelo CodeT5 Fine-tuned     │
│  - Tokenización                 │
│  - Generación de SQL            │
│  - Post-procesamiento           │
└─────────────────────────────────┘
```


## 📊 Dataset y Entrenamiento
El modelo fue fine-tuned sobre el Spider Dataset, que incluye:

- 8,659 ejemplos de entrenamiento (train_spider + train_others)
- 1,034 ejemplos de validación
- 200+ bases de datos de dominios variados (universidades, empresas, hospitales, etc.)
- Complejidad graduada: desde consultas simples hasta queries con 5+ JOINs
- Schemas enriquecidos: Con información explícita de:
    - Primary Keys (PK)
    - Foreign Keys (FK) con referencias
    - Tipos de datos (number, text, time, etc.)


Ejemplo de entrada al modelo:
```bash
Input: "translate to SQL: List students enrolled in Computer Science courses | 
        Schema: students(id(number,PK);name(text)) | 
        enrollments(student_id(number,FK→students.id);course_id(number,FK→courses.id)) | 
        courses(id(number,PK);title(text);department(text))"

Output: "SELECT DISTINCT s.name FROM students s 
         JOIN enrollments e ON s.id = e.student_id 
         JOIN courses c ON e.course_id = c.id 
         WHERE c.department = 'Computer Science'"
```


## 📁 Estructura del Proyecto

```bash
texto-a-sql/
├── backend/
│   ├── codet5_final/
│   ├── datset/
│   ├── api.py
│   ├── model.py
│   └── train.py
├── texto_a_sql/
│   ├── components/
|   |   ├── area_component.py
|   |   ├── input_component.py
|   |   ├── nav_bar.py
|   |   ├── schema_builder.py
|   |   └── special_button.py
│   ├── pages/
|   |   └── index.py
│   ├── state/
|   |   ├── InputState.py
|   |   ├── QueryState.py
|   |   └── SchemaState.py
│   ├── styles/
|   |   ├── colors.py
|   |   ├── fonts.py
|   |   └── styles.py
│   └── texto_a_sql.py
├── .gitignore
├── README.md
├── requirements.txt
└── rxconfig.py
```

## 🚀 Requisitos previos

Asegúrate de tener instalado:
 - Python 3.10+
 - pip (el gestor de paquetes de Python)


## ⚙️ Instalación paso a paso

### 1️⃣ Clonar o descargar el repositorio
```bash
git clone https://github.com/brunocontii/texto-a-sql
```
(O simplemente descarga el ZIP del proyecto y descomprímelo en una carpeta.)


### 2️⃣ Crear un entorno virtual
```bash
python3 -m venv .venv
```

### 3️⃣ Activar el entorno virtual
En Linux o macOS:
```bash
source .venv/bin/activate
```
En Windows (PowerShell):
```bash
.venv\Scripts\activate
```

### 4️⃣ Instalar las dependencias

Una vez activado el entorno virtual, instala las librerías necesarias desde el archivo requirements.txt:
```bash
pip install -r requirements.txt
```

### 5️⃣ Ejecutar el proyecto
Ejecuta en una terminal:
```bash
cd backend/
python3 apy.py
```

Luego ejecuta en otra terminal dentro de texto-a-sql:
```bash
reflex run
```
Por último abre el navegador y escribe:
```bash
http://localhost:3000/
```
u otra opcion dentro de reflex run vas a 
```bash
App running at: http://localhost:3000/
```
