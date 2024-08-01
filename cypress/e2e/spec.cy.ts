describe('Home Page', () => {
  it('should display header and footer', () => {
    cy.visit('http://localhost:4200/'); // Verificamos que cargue la pagina inicial
    cy.get('app-header').should('be.visible'); //Que cargue el header
    cy.get('app-footer').should('be.visible'); // Y eL FOOTER
  });
});

describe('User List Page', () => {
  it('should display a list of users', () => {
    cy.visit('http://localhost:4200/user-list'); //Verificamos que se cargue la vista
    cy.get('ol.list-decimal').should('be.visible');
    cy.get('ol.list-decimal li').should('have.length.greaterThan', 0);
  });

  it('should display user names and emails', () => {
    cy.visit('http://localhost:4200/user-list'); // Ruta completa para la lista de usuarios
    cy.get('ol.list-decimal li').first().within(() => {
      cy.get('span').first().should('not.be.empty'); // Nombre del usuario
      cy.get('span').last().should('not.be.empty');  // Correo electrónico del usuario
    });
  });

  it('should filter users by name', () => {
    cy.visit('http://localhost:4200/user-list'); // Que cargue la vista de usuarios
    cy.get('input[placeholder="Buscar usuarios por nombre"]').type('aaa');
    cy.get('ol.list-decimal li').each(($li) => {
      cy.wrap($li).should('contain.text', 'aaa');
    });
  });

  it('should navigate to the user details page on click', () => {
    cy.visit('http://localhost:4200/user-list');
    cy.get('ol.list-decimal li').first().find('span.cursor-pointer').click();
    cy.url().should('include', '/user-form'); // Que la ruta incluya el path de userform
  });

  it('should delete a user from the list', () => {
    cy.visit('http://localhost:4200/home/user-list');

    // Obtenemos la cantidad de la lista de usuarios
    cy.get('ol.list-decimal li').its('length').then((initialCount) => {
      // Eliminamos el primer usuario y que funcione
      cy.get('ol.list-decimal li').first().find('button').click();

      // Aqui verificaremos que la lista tengo 1 usuario menos , a la de antes de eliminar 1
      cy.get('ol.list-decimal li').should('have.length', initialCount - 1);
    });
  });
});

describe('User Form', () => {
  it('should add a new user and redirect to user list', () => {
    cy.visit('http://localhost:4200/home/user-form');
    cy.get('input[id="name"]').type('Jane Doe');
    cy.get('input[name="email"]').type('jane.doe@example.com');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/home/user-list');
    cy.get('ol.list-decimal li').should('contain.text', 'Jane Doe');
  });
});

describe('Add User Button', () => {
  it('should navigate to the user form page on clicking add button', () => {
    cy.visit('http://localhost:4200/home/user-list'); // Ruta completa para la lista de usuarios

    // Esperaramos para que la pagina cargue correctamente
    cy.wait(5000);

    // Intentamos seleccionar el boton que diga Agregar
    cy.get('button', { timeout: 10000 }) // Esperamos 10 segundos
      .contains('Agregar')
      .should('be.visible')
      .click();

    // Verificamos que la URL incluye el path '/user-form'
    cy.url().should('include', '/user-form');
  });
});
