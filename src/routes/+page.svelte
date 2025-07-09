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
    }, "<+=400")
	.add(
    '.content',
    {
      translateY: ['7%','0%'],
      /* filter: ["blur(10px)","blur(0px)"], */
      opacity: [0, 1],
      duration: 600,
    })
});
</script>



<label>
	<input type="checkbox" bind:checked={inPerspective}/>
	<span>Perspective</span>
</label>
<main>
	<section> 
		<h1><span class="word title">Pages</span><br/>
			{#each 'Система управления контентом'.split(" ") as item, i}
				<span class="word">{item}</span>
				<span> </span>
			{/each}
		</h1>
	</section>
	<section class="image-wrap">
		<img alt="3d shape" src="deca.gif"/>
		<div class="app-wrap">	
			<div class={["app", inPerspective && "in-perspective"]}>
				<div class="sidebar"></div>
				<div class="content"></div>
			</div>
		</div>
	</section>
</main>



<style>
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
    	padding-inline: 40px;
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
		display: flex;
		gap: 1rem;
		padding-block: .75rem;
		padding-inline: .5rem 1rem;
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
		width: 0%;
		border-radius: .5rem;
	}

	.content{
		width: calc(70% - 1rem);
		background: white;
		border-radius: .5rem;
		position: relative;
		opacity: 0;
		transform-style: flat;
	}	

	img{
		position: absolute;
		top: -2%;
		right: 1%;
		width: 140px;
		z-index: 2;
		animation: bounce 2.5s cubic-bezier(0.65, 0, 0.35, 1) infinite forwards;
	}

	@keyframes bounce {
		50%{
			transform: translateY(15%);
		}
	}
</style>