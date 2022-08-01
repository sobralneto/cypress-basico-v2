/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

	//antes de cada teste, a URL será acessada novamente
	beforeEach(() => {
		cy.visit('./../../src/index.html')
	})

	it('verifica o título da aplicação', () => {
		cy.title().should('be.equal','Central de Atendimento ao Cliente TAT');
	})

	it('preenche os campos obrigatórios e envia o formulário', () => {
		cy.get('#firstName').should('be.visible').type('Luiz Carlos', { delay: 0 }).should('have.value', 'Luiz Carlos');
		cy.get('#lastName').should('be.visible').type('Sobral Neto', { delay: 0 }).should('have.value', 'Sobral Neto');
		cy.get('#email').should('be.visible').type('sobral.22@gmail.com', { delay: 0 }).should('have.value', 'sobral.22@gmail.com');
		cy.get('#open-text-area').should('be.visible').type('Obrigado pela ajuda', { delay: 0 }).should('have.value', 'Obrigado pela ajuda');		
		//cy.get('button[type="submit"]').click();

		cy.contains('button', 'Enviar').click();

		cy.get('.success').should('be.visible');
	})

	it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
		cy.get('#firstName').should('be.visible').type('Luiz Carlos', { delay: 0 }).should('have.value', 'Luiz Carlos');
		cy.get('#lastName').should('be.visible').type('Sobral Neto', { delay: 0 }).should('have.value', 'Sobral Neto');
		cy.get('#email').should('be.visible').type('sobral.22gmail.com', { delay: 0 }).should('have.value', 'sobral.22gmail.com');
		cy.get('#open-text-area').should('be.visible').type('Obrigado pela ajuda', { delay: 0 }).should('have.value', 'Obrigado pela ajuda');
		cy.contains('button', 'Enviar').click();
		cy.get('.error').should('be.visible');
	})

	it('verificando campo de telefone somente números', () => {
		cy.get('#phone').should('be.visible').type('abc', { delay: 0 }).should('have.value', '');
	})

	
	it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
		cy.get('#firstName').should('be.visible').type('Luiz Carlos', { delay: 0 }).should('have.value', 'Luiz Carlos');
		cy.get('#lastName').should('be.visible').type('Sobral Neto', { delay: 0 }).should('have.value', 'Sobral Neto');
		cy.get('#email').should('be.visible').type('sobral.22@gmail.com', { delay: 0 }).should('have.value', 'sobral.22@gmail.com');
		cy.get('#phone-checkbox').check();
		cy.get('#open-text-area').should('be.visible').type('Obrigado pela ajuda', { delay: 0 }).should('have.value', 'Obrigado pela ajuda');		
		cy.contains('button', 'Enviar').click();
		cy.get('.error').should('be.visible');
	})

	it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
		cy.get('#firstName').should('be.visible').type('Luiz Carlos', { delay: 0 }).clear().should('have.value', '');
		cy.get('#lastName').should('be.visible').type('Sobral Neto', { delay: 0 }).clear().should('have.value', '');
		cy.get('#email').should('be.visible').type('sobral.22@gmail.com', { delay: 0 }).clear().should('have.value', '');
		cy.get('#phone').should('be.visible').type('21979007880', { delay: 0 }).clear().should('have.value', '');
	})

	it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
		cy.contains('button', 'Enviar').click();
		cy.get('.error').should('be.visible');
	})

	it('envia o formuário com sucesso usando um comando customizado', () => {
		cy.fillMandatoryFieldsAndSubmit();
		cy.get('.success').should('be.visible');
	})

	it('seleciona um produto (YouTube) por seu texto', () => {
		const produto = 'YouTube';
		cy.get('#product').select(produto).should('have.value', produto.toLowerCase())
	})

	it('seleciona um produto (Mentoria) por seu value', () => {
		const produto = 'mentoria';
		cy.get('#product').select(produto).should('have.value', produto)
	})

	it('seleciona um produto (Blog) por seu índice', () => {
		cy.get('#product').select(1).should('have.value', 'blog')
	})

	it('marca o tipo de atendimento "Feedback"', () => {
		cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
	})

	it('marca cada tipo de atendimento', () => {
		cy.get('input[type="radio"]')
		.should('have.length', 3)
		.each($radio => {
			cy.wrap($radio).check()
			cy.wrap($radio).should('be.checked')
		})
	})

	it('marca ambos checkboxes, depois desmarca o último', () => {
		cy.get('input[type="checkbox"]')
			.check()
			.should('be.checked')
			.last()
			.uncheck()
			.should('not.be.checked')
	})

	it('seleciona um arquivo da pasta fixtures', () => {
		cy.get('input[type="file"]#file-upload')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json')
			.should(input => {
				expect(input[0].files[0].name).to.be.equal('example.json')
			})
	})

	it('seleciona um arquivo simulando um drag-and-drop', () => {
		cy.get('input[type="file"]#file-upload')
			.should('not.have.value')
			.selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
			.should(input => {
				expect(input[0].files[0].name).to.be.equal('example.json')
			})
	})

	it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
		cy.fixture('example.json').as('sampleFile')
		cy.get('input[type="file"]#file-upload')
			.selectFile('@sampleFile')
	})

	it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
		cy.get('#privacy a').should('have.attr', 'target', '_blank')
	})

	it('acessa a página da política de privacidade removendo o target e então clicanco no link', () => {
		cy.get('#privacy a').invoke('removeAttr', 'target').click()

		cy.contains('Talking About Testing').should('be.visible')
	})

});
