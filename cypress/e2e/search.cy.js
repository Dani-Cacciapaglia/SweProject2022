describe('Check if search works', () => {
	it('passes', () => {
		cy.request('GET', '/api/search/twitter').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).length.to.be.lessThan(11);
			expect(response.body[0]).to.have.property('id');
			expect(response.body[0]).to.have.property('text');
			expect(response.body[0]).to.have.property('created_at');
			expect(response.body[0]).to.have.property('author');
			expect(response.body[0].author).to.have.property('id');
			expect(response.body[0].author).to.have.property('name');
			expect(response.body[0].author).to.have.property('username');
			expect(response.body[0].author).to.have.property('profile_image_url');
		});
		cy.request('GET', '/api/search/twitter?max_results=100').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).length.to.be.lessThan(101);
		});
		cy.request('GET', '/api/search/from:random_places').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body[0]).to.have.property('place');
			expect(response.body[0].place).to.have.property('id');
			expect(response.body[0].place).to.have.property('full_name');
			expect(response.body[0].place).to.have.property('geo');
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
