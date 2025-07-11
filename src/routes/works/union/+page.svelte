<script>
    import boy from "$lib/assets/1boy1cup.gif";
    let vid = $state();
</script>

<main>
    <div class="card">
        <h1>
            <span class="word title">Содружество</span><br />
            <span class="word">Образовательная платформа</span>
        </h1>
        <img src={boy} alt="" />
        <!-- <video bind:this={vid} src={boy} alt="" muted autoplay onclick={() => vid.play()}>
            <track kind="captions">
        </video> -->
    </div>
</main>

<style>
    main {
        padding: 2rem;
        font-family: "Gilroy", sans-serif;
        background: #eee0da;
        min-height: 100vh;
    }

    h1 {
        max-width: 16ch;
        font-size: 64px;
        font-weight: 600;
        font-size: 64px;
        line-height: 90%;
    }

    h1 span {
        display: inline-block;
        opacity: 0.5;
    }

    .title {
        opacity: 1;
        margin-bottom: 0.5rem;
    }
    .card {
        position: relative;
        display: flex;
        min-height: 500px;
        border-radius: 1rem;
        padding-inline: 80px;
        overflow: hidden;
        border: 5px solid white;
    }

    img,
    video {
        position: absolute;
        bottom: 0;
        right: -5%;
        display: inline-block;
        margin-left: auto;
        height: 400px;
        filter: drop-shadow(0 0 10px wheat);
    }
</style>
