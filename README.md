# Prueba de Angular 16 para Desarrollador

## Descripción del Proyecto

Este es un proyecto de Angular para gestionar un CRUD (Crear, Leer, Actualizar, Eliminar) de usuarios. La aplicación incluye pruebas unitarias para asegurar el correcto funcionamiento de los componentes y servicios.

## Requisitos

### Node.js y npm

Descarga e instala Node.js desde [node.js](https://nodejs.org/). npm se instalará automáticamente junto con Node.js.

### Git

Descarga e instala Git desde [Git](https://git-scm.com/).

### Angular CLI

Instala Angular CLI globalmente ejecutando el siguiente comando:

 ```bash    
npm install -g @angular/cli
 ```
## Configuración del Proyecto

1.Para clonar el repositorio, usa el siguiente comando:

```bash
git clone https://github.com/HumbertoAceviz/Angular-prueba.git
```

2.Instalar Dependecias
```bash
npm install
```
3. Servir la Aplicacion Angular:
```bash
ng serve
```
4. Ejecutar Pruebas unitarias:
 ```bash
ng test
```
5. Ejecutar Pruebas E2E:
 ```bash
npx cypress open
```
6. Logear o Registrarse:
 ```bash
enail : betito17a@live.com.mx   Password : 12345678
``` 

7.Arquitectura del sistema
```bash
src
└── app
    ├── core
    │   ├── components
    │   │   ├── footer
    │   │   │   ├── footer.component.ts
    │   │   │   ├── footer.component.html
    │   │   │   ├── footer.component.css
    │   │   │   └── footer.component.spec.ts
    │   │   ├── header
    │   │   │   ├── header.component.ts
    │   │   │   ├── header.component.html
    │   │   │   ├── header.component.css
    │   │   │   └── header.component.spec.ts
    │   │   ├── login
    │   │   │   ├── login.component.ts
    │   │   │   ├── login.component.html
    │   │   │   ├── login.component.css
    │   │   │   └── login.component.spec.ts
    │   │   └── register
    │   │       ├── register.component.ts
    │   │       ├── register.component.html
    │   │       ├── register.component.css
    │   │       └── register.component.spec.ts
    │   ├── guards
    │   ├── interceptors
    │   └── utils
    ├── home
    │   ├── pages
    │   │   ├── user-form
    │   │   │   ├── user-form.component.ts
    │   │   │   ├── user-form.component.html
    │   │   │   ├── user-form.component.css
    │   │   │   └── user-form.component.spec.ts
    │   │   └── user-list
    │   │       ├── user-list.component.ts
    │   │       ├── user-list.component.html
    │   │       ├── user-list.component.css
    │   │       └── user-list.component.spec.ts
    │   ├── home.component.ts
    │   ├── home.component.html
    │   ├── home.component.css
    │   ├── home.component.spec.ts
    │   └── home.module.ts
    ├── models
    │   └── user.model.ts
    ├── modules
    │   ├── directives.module.ts
    │   ├── pipes.module.ts
    │   └── tailwind.config.js
    ├── services
    │   ├── auth-service
    │   │   ├── auth-service.ts
    │   │   └── auth-service.spec.ts
    │   └── user-service
    │       ├── user-service.ts
    │       └── user-service.spec.ts
    ├── shared
    │   ├── directives
    │   │   ├── highlight.directive.ts
    │   │   └── highlight.directive.spec.ts
    │   ├── pipes
    │   │   ├── filter.pipe.ts
    │   │   └── filter.pipe.spec.ts
    │   └── shared.module.ts
    ├── app-routing.module.ts
    ├── app.module.ts
    ├── app.component.ts
    ├── app.component.html
    └── app.component.css

```


 
