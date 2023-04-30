<div class="wrapper">
	<div class="logo">
		<img alt="Database Icon" src="/database-icon.svg" width="55px" height="55px" />
	</div>
	<nav>
		<ul class="mainNav">
			<a href="/"><li><img alt="Financial Accounts" src="/money-icon.svg" /></li></a>
			<a href="/"><li><img alt="File Database" src="/file-icon.svg" /></li></a>
			<a href="/"><li><img alt="Lawyer Corner" src="/briefcase-icon.svg" /></li></a>
		</ul>
	</nav>
</div>

<style>
	.wrapper {
		width: 75px;
		height: 100vh;
		background-color: #00bcbc;
		display: inline-block;
	}

	.logo {
		width: 75px;
		height: 75px;
		box-sizing: border-box;
		padding: 10px;
		position: relative;
	}

	.logo::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 5px;
		width: 65px;
		height: 2px;
		background-color: #04d5ce;
	}

	ul {
		list-style: none;
		padding: 0;
		margin-top: 20px;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
		justify-content: center;
		align-items: center;
	}

	.mainNav img {
		width: 30px;
	}

	.mainNav li {
		width: 60px;
		height: 60px;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 300ms ease-in;
	}

	.mainNav li:hover {
		background-color: #007a7a;
		border-radius: 5px;
	}
</style>
