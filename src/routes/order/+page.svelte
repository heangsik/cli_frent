<script lang="ts">
	import { onMount } from 'svelte';

	let orderId: string = '';
	let productName: string = '테스트 상품';
	let productPrice: number = 1000;
	let productQuantity: number = 1;
	let totalPrice: number = 0;
	let onClicked: boolean = false;
	onMount(() => {
		orderId = 'oId_' + new Date().getTime();
	});
	function calculateTotalPrice() {
		totalPrice = productPrice * productQuantity;
	}
	// 상품가격과 상품수량이 변경될 때마다 총 금액을 계산합니다.
	$: [productPrice, productQuantity], calculateTotalPrice();

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		// 버튼 중복 클릭 방지
		onClicked = true;

		const response = await fetch('/order', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				orderId,
				productName,
				productPrice,
				productQuantity,
				totalPrice
			})
		});
		// 여기에 주문 처리 로직을 추가합니다.
		console.log('주문 정보:', {
			orderId,
			productName,
			productPrice,
			productQuantity,
			totalPrice
		});
		// 주문 처리 후 버튼을 다시 활성화합니다.
		onClicked = false;
	}
</script>

<form on:submit={handleSubmit}>
	<div class="card bg-base-100 w-96 shadow-2xl">
		<div class="card-body">
			<h1 class="card-title">Order Page</h1>
			<label class="input">
				<span>주문번호:</span>
				<input type="text" bind:value={orderId} />
			</label>
			<label class="input">
				<span>상 품 명:</span>
				<input type="text" bind:value={productName} />
			</label>
			<label class="input">
				<span>상품가격:</span>
				<input type="text" bind:value={productPrice} />
			</label>
			<label class="input">
				<span>상품수량:</span>
				<input type="text" bind:value={productQuantity} />
			</label>
			<label class="input">
				<span>총 금액:</span>
				<input type="text" bind:value={totalPrice} />
			</label>
			<button class="btn btn-soft btn-primary" class:btn-disabled={onClicked}>전송</button>
		</div>
	</div>
</form>

<style>
</style>
