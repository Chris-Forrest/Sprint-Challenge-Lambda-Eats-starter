it('it works !!!!', () => {
    expect (5).to.eq(5)
})


describe('user sign up', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000/')
    })
    it("Click order link", () => {
        cy.get('[data-cy_order_link="cy_order_link"]').click()
    })
    it("input a name", () => {
        cy.get('[data-cy_name_input="cy_name_input"]').type("Chris").should("have.value", "Chris");
      });
    it("check pepperoni", () => {
        cy.get('[data-cy_pepperoni_check="cy_pepperoni_check"]').check().should('checked')
    })
    it("check mushroom", () => {
        cy.get('[data-cy_pepperoni_check="cy_pepperoni_check"]').check().should('checked')
    })
    it("check sausage", () => {
        cy.get('[data-cy_pepperoni_check="cy_pepperoni_check"]').check().should('checked')
    })
    it("check olives", () => {
        cy.get('[data-cy_pepperoni_check="cy_pepperoni_check"]').check().should('checked')
    })



})


