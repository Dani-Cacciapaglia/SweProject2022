describe('Check if search works', () => {
	it('passes', () => {
		cy.request('GET', '/api/search/test').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).length.to.be.greaterThan(1);
			expect(response.body[0]).to.have.property('id');
		});
		cy.request({
			method: 'GET',
			url: '/api/search/"',
			failOnStatusCode: false
		}).then((response) => {
			expect(response.status).to.eq(400);
		});
	});
});
