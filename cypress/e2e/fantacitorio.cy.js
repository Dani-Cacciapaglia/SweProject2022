describe('Check if fantacitorio works', () => {
	it('passes', () => {
		cy.request('GET', '/api/fantacitorio/scores').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.length).to.be.greaterThan(3);
			expect(response.body[0]).to.have.property('Bagnai');
			expect(response.body[0]['Bagnai']).to.eq(45);
		});
	});
});
