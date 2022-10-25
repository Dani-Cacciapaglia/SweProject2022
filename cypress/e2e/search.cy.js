describe('Check if search works', () => {
	it('passes', () => {
		cy.request('GET', '/api/search/test').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.meta.result_count).to.eq(response.body.data.length);
		});
	});
});
