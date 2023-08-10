<script lang="ts">
	import { onDestroy } from 'svelte';
	import DynamicItem from '$lib/components/DynamicItem.svelte';

	const messages = [
		'A live começará em breve',
		'Conectando cabos',
		'Abrindo latinha de energético',
		'Colocando câmera no tripé',
		'Dando DELETE sem WHERE',
		'Carregando mensagens',
		'[object Object]',
		'A live começa em NaN segundos',
		'Botando a coquinha pra gelar',
		'Acordando os anões programadores',
		"Enchendo a garrafinha d'água",
		'Commitando na main',
		'{ status: 200, success: false }',
		'Escolhendo playlist',
		'Ajeitando a coluna',
		'Debugando código',
		'Vazando a senha do banco de dados',
		'Corrigindo erro em produção',
		'Pensando numa mensagem',
		'Erro 404: mensagem não encontrada',
		'Compilando código',
		'Evangelizando a palavra do Svelte',
		'Clonando cartões',
		'Ensaboando os sapos',
		'Tirando fotos do pé',
		'Fabricando devs homossexuais',
		'Treinando com monjes tibetanos',
		'Provando inocência do Celso Portiolli',
		'Quem sabe faz ao vivo',
		'Impedindo macacos de pularem no colchão',
		'Arrumando o bigode'
	];
	let label = messages[0];

	const messagesInterval = setInterval(
		() => (label = messages[Math.floor(Math.random() * messages.length)]),
		8000
	);

	onDestroy(() => clearInterval(messagesInterval));
</script>

<main class="main">
	<DynamicItem label="{label}..." />
</main>

<style lang="scss">
	.main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		width: 100%;
		height: 100%;
	}
</style>
