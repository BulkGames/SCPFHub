<!-- <script>
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
</script> -->

<script>
	export let data
</script>

<header>
	<nav>
		<h1>SCPF Hub</h1>
		{#if !data.user}
			<form action="/api/auth">
				<input type="submit" value="{JSON.stringify(data)}" />
			</form>
		{:else}
			<img alt="{data.user.username}" src="https://cdn.discordapp.com/avatars/{data.user.id}/{data.user.avatar}.png">
			<p>{data.user.username}</p>
		{/if}

		{#if data.admissions.roles.includes('911195549439504394')}
			<a href="/DoA">Department of Admissions</a>
		{:else}
			<a href="/Applications">Application Center</a>
		{/if}
		
	</nav>
</header>

<style>

	nav {
		width: 100%;
		height: 8.5vh;
		background: rgb(0,117,176);
		background: linear-gradient(90deg, rgba(0,117,176,1) 0%, rgb(92, 167, 182) 100%);
		box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
	}

	p {
		font-size: 24px;
		color: white;
		font-weight: 700;
		float: right;
		position: relative;
		text-align: center;
		padding-left: 15px;
		padding-right: 15px;
	}

	a {
		font-size: 20px;
		color: white;
		font-weight: 700;
		float: right;
		position: relative;
		text-align: center;
		padding-left: 15px;
		padding-right: 15px;
		margin-top: 28px;
	}

	h1 {
		margin-left: 40px;
		font-size: 24px;
		color: white;
		font-weight: 700;
		float: left;
		position: relative;
	}

	img {
		border-radius: 100%;
		height: 63px;
		position: relative;
		float: right;
		margin-top: 0.8vh;
		margin-right: 1vh;
	}

	input {
		float: right;
		background-color: rgb(87, 219, 109);
		border-radius: 5px;
		color: white;
		font-weight: 700;
		font-size: x-large;
		border-width: 0px;
		width: 130px;
		height: 40px;
		margin-top: 2vh;
		margin-right: 3vh;
	}

	/* .rigthDiv {
		display: flex;
		position: absolute;
		right: 0;
		margin-right: 40px;
		height: 80px;
	} */

</style>
