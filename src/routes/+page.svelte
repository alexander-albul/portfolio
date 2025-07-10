<script>
	import { animate, stagger,createTimeline } from 'animejs';
	import { onMount} from 'svelte'

	let inPerspective = true
	
	const tl = createTimeline();


onMount(() => {
  const tl = createTimeline();

  tl
	.add(['.word', 'title'],
    {
      opacity: [0, 0.5],
      filter: ["blur(10px)","blur(0px)"],
      translateY: ['15%','0%'],
      duration: 600,
      delay: stagger(100)
    })
	.add('.title',
    {
      opacity: [0, 1],
      duration: 600,
    }, 0)
	.add(
    '.app',
    {
      opacity: [0, 1],
	transform: [
		"translateX(0%) translateY(29%) scale(1) rotateX(47deg) rotateY(31deg) rotate(324deg)",
		"translateX(0%) translateY(23%) scale(1) rotateX(47deg) rotateY(31deg) rotate(324deg)",
	],
      filter: ["blur(10px)","blur(0px)"],
      duration: 700,
    },)
	.add('.content',
    {	
		transform: [
		"translateZ(-300px)",
		"translateZ(-0px)",

	],
      translateZ: ['-300px','0px'],
      opacity: [0, 1],
      duration: 700,
    }, )
});
</script>



<!-- <label>
	<input type="checkbox" bind:checked={inPerspective}/>
	<span>Perspective</span>
</label> -->
<main>
	<section>
		<nav>
			<a href="#">Alexander Albul</a>
			<span>/</span>
			<a href="#">Works</a>
			<a href="#" style:margin-left="auto">Contact</a>
		</nav>
	</section>
	<section id="hero-text">
		<h1><span class="word title">Pages</span><br/>
			{#each 'Система управления контентом'.split(" ") as item, i}
				<span class="word">{item}</span>
				<span> </span>
			{/each}
		</h1>
	</section>
	<section class="image-wrap">
		<video class="decaeder" src="deca-2.webm" muted autoplay loop>
			<track kind="captions"/>
		</video>
		<div class="app-wrap">	
			<div class={["app", inPerspective && "in-perspective"]}>
				<div class="sidebar">
					
				</div>
				<div class="content"></div>
			</div>
		</div>
	</section>
</main>



<style>
	/* Nav compontent */
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
	
	nav{
		display: flex;
		font-family: "Inter", sans-serif;
		gap: 8px;
		padding-block: 4rem;
	}
	
	#hero-text{
		padding-top: 4rem;
	}

	a, a:visited{
		font-weight: 400;
		color: inherit;
		opacity: .8;
		text-decoration: none;
		transition: font-weight .3s;
	}

	span{
		opacity: .8;
	}
	
	a:hover{
		font-weight: 600;
		opacity: 1;
	}
	/* /Nav compontent */

	main{
		position: relative;
		background: 
		radial-gradient(
			145.65% 101.72% at 32.26% -1.09%, 
			#D8A5ED 0%, 
			#AF95E3 35%, 
			#7470E2 80%, 
			#6768E1 100%);
		background-attachment: fixed;
		background-repeat: no-repeat;
		font-family: "Gilroy", sans-serif;
		color: white;
		overflow: hidden;
	}

	h1{
		max-width: 16ch;
		font-size: 64px;
		font-weight: 600;
		font-size: 64px; 
		line-height: 90%;
	}

	h1 span{
		display: inline-block;
		opacity: 0;
	}

	.title{
		margin-bottom: 0.5rem;
	}

	section {
		width: 100%;
		max-width: 1280px;
		margin-inline: auto;
    	padding-inline: 80px;
	}

	.image-wrap{
		position: relative;
		height: 2000px;
    	perspective: 4000px;
		max-width: 100%;
    	perspective-origin: 100% 0;
	}
	
	.in-perspective{
		transform: translateX(0%) translateY(23%) scale(1) rotateX(47deg) rotateY(31deg) rotate(324deg);
	}

	.app{
		position: relative;
		left: 1%;
		display: flex;
		gap: 1rem;
		padding-block: .75rem;
		padding-inline: .5rem;
		width: 1500px;
		aspect-ratio: 16 / 7;
		background-color: rgba(255 255 255 / .2);
		border: 1px solid rgba(255 255 255 / .4);
		backdrop-filter: blur(12px);
		transform-origin: top left;
		transform-style: preserve-3d;
		backface-visibility: hidden;
		border-radius: 16px;
		perspective: 3000px;
		opacity: 0;
	}

	.sidebar{
		width: 30%;
		border-radius: .5rem;
	}

	.content{
		width: 100%;
		background: white;
		border-radius: .5rem;
		position: relative;
		opacity: 0;
		transform-style: flat;
	}	

	.decaeder{
		position: absolute;
		top: 1%;
		left: 8%;
		width: 150px;
		z-index: 2;
		animation: bounce 4s cubic-bezier(0.65, 0, 0.35, 1) infinite forwards;
		filter: drop-shadow(1px 15px 10px rgba(184, 111, 206, 0.1))
	}

	@keyframes bounce {
		50%{
			transform: translateY(15%);
		}
	}
</style>