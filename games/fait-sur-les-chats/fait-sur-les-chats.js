const factUrl = 'https://catfact.ninja/fact';
const translateProxyUrl = 'https://deepl-api-access.florine-lef62.workers.dev/';

const factStr = document.querySelector('#fact-text');

function getFact() {
	fetch(factUrl)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Erreur lors de la récupération du catfact`);
			}
			return response.json();
		})
		.then(data => {
			translate(data['fact']);
		});
}

function translate(fact) {
	fetch(translateProxyUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text: [fact],
			target_lang: 'FR',
		}),
	})
		.then(response => response.json())
		.then(data => {
			if (!data.translations || data.translations.length === 0) {
				console.error('Réponse inattendue de DeepL :', data);
				updateText('⚠️ Erreur de traduction');
				return;
			}
			updateText(data.translations[0].text);
		});
}

getFact();

function updateText(fact) {
	factStr.innerHTML = fact;
}
