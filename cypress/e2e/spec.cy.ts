const nombrePublicacion = "Publicacion de Prueba"
const bodyPublicacion = "Contenido de la publicación"
var idPub = ''

describe('template spec', () => {
  it('Probar login con credenciales INCORRECTAS', () => {
    cy.visit('localhost:8100/ingreso').then(() => {
      cy.wait(4000)
      cy.get('#correo').invoke('val', 'ssss')
      cy.get('#correo').type('inexistente123')
      cy.get('#password').invoke('val', 'sss')
      cy.get('#password').type('FGHFGHFG')
      cy.contains('Ingresar').click()
      cy.intercept('/inicio').as('route').then(() => {
        cy.contains('Ingresar')
        cy.wait(3000)
      })
    })
  })
})

describe('template spec', () => {
  it('Probar login con credenciales correctas', () => {
    cy.visit('localhost:8100/ingreso').then(() => {
      cy.get('#correo').invoke('val', '')
      cy.get('#correo').type('atorres')
      cy.get('#password').invoke('val', '')
      cy.get('#password').type('1234')
      cy.contains('Ingresar').click()
      cy.wait(2000)
      cy.intercept('/inicio ').as('route').then(() => {
        cy.contains('Salir').click({force: true})
        cy.wait(2000)
      })
    })
  })
})

describe('template spec', () => {

  it('Probar Foro Publicar Y Borrar', () => {
    cy.visit('localhost:8100/ingreso').then(() => {
      cy.get('#correo').invoke('val', '')
      cy.get('#correo').type('atorres')
      cy.get('#password').invoke('val', '1234')
      cy.get('#password').type('1234')
      cy.contains('Ingresar').click()
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#foro').click({force: true})
        cy.get('#tituloPub').invoke('val', '')
        cy.get('#cuerpoPub').invoke('val', '')
        cy.get('textarea').type(bodyPublicacion, {force:true})
        cy.get('#tituloPub').find('input').type(nombrePublicacion, {force:true})
        cy.get('#guardar').click({force: true})
        cy.wait(3000)
        cy.get('#borrar').click({force: true})
        cy.wait(3000)
      })
    })
  })
})



describe('template spec', () => {

  it('Mis Datos', () => {
    cy.visit('localhost:8100/ingreso').then(() => {
      cy.get('#correo').invoke('val', '')
      cy.get('#correo').type('jperez')
      cy.get('#password').invoke('val', '1234')
      cy.get('#password').type('5678')
      cy.contains('Ingresar').click()
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#misdatos').click({force: true})
        cy.get('#nivelEd').find('input').type('Superior Incompleta', {force:true})
        cy.get('#nombre').find('input').type("Juaaaaaaaaaaaaaaaan", {force:true})
        cy.get('#apellido').find('input').type("Pereeeeeeeeeeeeeeeeeeeeeeeeeez",  {force:true})
        cy.contains('Guardar').click({force: true})
        cy.contains('Salir').click({force: true})
      })
    })
  })
})

