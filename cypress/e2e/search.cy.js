describe('Check if search works', () => {
	it('passes', () => {
		cy.request('GET', '/api/search/twitter').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.length).to.be.lessThan(11);
			expect(response.body[0]).to.have.property('id');
			expect(response.body[0]).to.have.property('text');
			expect(response.body[0]).to.have.property('created_at');
			expect(response.body[0]).to.have.property('author');
			expect(response.body[0].author).to.have.property('id');
			expect(response.body[0].author).to.have.property('name');
			expect(response.body[0].author).to.have.property('username');
			expect(response.body[0].author).to.have.property('profile_image_url');
			let next_token = response.body[response.body.length - 1].next_token;
			cy.request('GET', '/api/search/twitter?next_token=' + next_token).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.length).to.be.lessThan(11);
				expect(response.body[0]).to.have.property('id');
				expect(response.body[0]).to.have.property('text');
				expect(response.body[0]).to.have.property('created_at');
				expect(response.body[0]).to.have.property('author');
				expect(response.body[0].author).to.have.property('id');
				expect(response.body[0].author).to.have.property('name');
				expect(response.body[0].author).to.have.property('username');
				expect(response.body[0].author).to.have.property('profile_image_url');
			});
		});
		cy.request('GET', '/api/search/twitter?max_results=100').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.length).to.be.lessThan(101);
		});
		cy.request('GET', '/api/search/from:random_places').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body[0]).to.have.property('place');
			expect(response.body[0].place).to.have.property('id');
			expect(response.body[0].place).to.have.property('full_name');
			expect(response.body[0].place).to.have.property('geo');
		});
		let yesterday_12 = new Date();
		yesterday_12.setDate(yesterday_12.getDate() - 1);
		yesterday_12.setHours(12);
		yesterday_12.setMinutes(45);
		let yesterday_13 = new Date();
		yesterday_13.setDate(yesterday_13.getDate() - 1);
		yesterday_13.setHours(13);
		yesterday_13.setMinutes(0);
		cy.request('GET', `/api/search/lasagne?max_results=100&start_time=${yesterday_12.toISOString()}&end_time=${yesterday_13.toISOString()}`).then((response) => {
			expect(response.status).to.eq(200);
			expect(new Date(response.body[0].created_at)).to.be.at.least(yesterday_12);
			expect(new Date(response.body[0].created_at)).to.be.lessThan(yesterday_13);
		});
		cy.request('GET', '/api/search/from:nopost').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.length).to.be.equal(0);
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
