<script>
    import { onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import { branches } from "../stores/data";
    import { selectedBranchId } from "../stores/state";
    import { sidebarState } from "../stores/state";
    import { Svroller } from "svrollbar";
    import Button from "./common/Button.svelte";
    import SidebarBranch from "./SidebarBranch.svelte";
    import ResizeablePanel from "./common/ResizeablePanel.svelte";
    import AdjustmentsIcon from "./icons/AdjustmentsIcon.svelte";
    import SidebarIcon from "./icons/SidebarIcon.svelte";
    import SearchIcon from "./icons/SearchIcon.svelte";
    import SidebarTree from "./SidebarTree.svelte";

    let transitionState = null;
    let readyToCollapse = false;

    $: selectedIcon = $branches.find((b) => b.id === $selectedBranchId)?.icon;
    $: selectedTitle = $branches.find((b) => b.id === $selectedBranchId)?.title;

    $: if (transitionState === "end") {
        $sidebarState.useTransitions = false;
    }

    // If user collapses sidebar its width becomes the same as collapsedWidth
    $: if ($sidebarState.collapsed) {
        $sidebarState.width = $sidebarState.collapsedWidth;
    }

    // Blur if less than minWidth and vice verca
    $: if (
        !$sidebarState.collapsed &&
        $sidebarState.width < $sidebarState.minWidth
    ) {
        readyToCollapse = true;
    } else if (
        !$sidebarState.collapsed &&
        $sidebarState.width > $sidebarState.minWidth
    ) {
        readyToCollapse = false;
    }

    function collapse() {
        $sidebarState.useTransitions = true;

        // If sidebar width is not less than minWidth, write it as userWidth
        // OR write userWidth as minWidth
        if ($sidebarState.width >= $sidebarState.minWidth) {
            $sidebarState.userWidth = $sidebarState.width;
        } else {
            $sidebarState.userWidth = $sidebarState.defaultWidth;
        }

        $sidebarState.collapsed = true;
        $sidebarState.width = $sidebarState.collapsedWidth;
    }

    function expand() {
        $sidebarState.width = $sidebarState.userWidth
            ? $sidebarState.userWidth
            : $sidebarState.defaultWidth;
        $sidebarState.useTransitions = true;
        $sidebarState.collapsed = false;
    }

    let buttonStyle = `
        --padding: 10px;
        --color: white;
        --hover-color: white;
        --hover-bg: rgba(var(--gray-90) / .3);
        --hover-shadow: transparent;
    `;

    onMount(() => {
        if (!$sidebarState.collapsed) {
            $sidebarState.userWidth = $sidebarState.width;
        }
    });

    $: console.log($sidebarState.userWidth);

    // ----- Search -----

    let searchEl;

    function handleKeydown(e) {
        if (e.keyCode === 191 && document.activeElement.tagName !== "INPUT") {
            e.preventDefault();
            searchEl.focus();
            searchEl.select();
        }
    }
</script>

<svelte:body on:keydown={() => handleKeydown(event)} />

<ResizeablePanel
    bind:currentWidth={$sidebarState.width}
    bind:collapsed={$sidebarState.collapsed}
    on:pointerup={() => (readyToCollapse ? collapse() : "")}
    on:transitionstart={() => (transitionState = "start")}
    on:transitionend={() => (transitionState = "end")}
    max="600"
    min={$sidebarState.minWidth}
    transition={"width .4s cubic-bezier(0.21, 1.06, 0.62, 1)"}
    useTransitions={$sidebarState.useTransitions}
>
    {#if !$sidebarState.collapsed}
        <div
            class="sidebar"
            in:fade={{ duration: 200 }}
            class:ready-to-collapse={readyToCollapse}
        >
            <div class="top-row">
                <SidebarBranch />
                <div class="buttons">
                    <Button
                        icon={AdjustmentsIcon}
                        type="ghost"
                        style={buttonStyle}
                    />
                    <Button
                        icon={SidebarIcon}
                        type="ghost"
                        style={buttonStyle}
                        on:click={collapse}
                    />
                </div>
            </div>
            <div class="search-row">
                <Button icon={SearchIcon} type="ghost" style={buttonStyle} />
                <input
                    bind:this={searchEl}
                    type="text"
                    title="Поиск страниц"
                    placeholder="Поиск страниц и виджетов (/)"
                />
            </div>
            <div class="pages-wrap">
                <Svroller width="100%" height="100%">
                    <SidebarTree />
                </Svroller>
            </div>
        </div>
    {/if}

    {#if $sidebarState.collapsed}
        <div
            class="collapsed-sidebar"
            on:click={expand}
            on:keypress={expand}
            role="button"
            tabindex="-1"
            in:fly={{ x: 30, duration: 150 }}
        >
            <Button
                icon={SidebarIcon}
                type="ghost"
                style={buttonStyle + "pointer-events: none;"}
            />
            <div class="collapsed-branch">
                {selectedIcon}
                {selectedTitle}
            </div>
        </div>
    {/if}
</ResizeablePanel>

<style>
    .sidebar {
        --svrollbar-thumb-background: white;
        flex-shrink: 0;
        align-self: flex-start;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        padding-top: 1.25rem;
        padding-bottom: 1rem;
        padding-inline: 1rem;
        border-radius: var(--radius);
        transition: filter 0.3s cubic-bezier(0.21, 1.06, 0.62, 1);
        overflow: hidden;
    }

    .sidebar.ready-to-collapse {
        filter: blur(8px);
        pointer-events: none;
    }

    .top-row {
        display: flex;
        align-items: center;
    }

    .buttons {
        display: flex;
    }

    .collapsed-sidebar {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        gap: calc(0.75rem + 1px);
        padding-top: 1.25rem;
        padding-block: 1rem;
        writing-mode: vertical-rl;
        text-orientation: sideways-right;
        font-weight: 450;
        color: white;
        border-radius: var(--radius);
        height: 100%;
        transition: opacity 0.15s;
        cursor: pointer;
    }

    .collapsed-sidebar:hover {
        opacity: 0.6;
    }

    .collapsed-branch {
        display: flex;
        gap: 0.25rem;
        transform: rotate(180deg);
        padding: 1rem 8px;
        border-inline-end: 1px solid rgba(255 255 255 / 0.3);
        user-select: none;
    }

    .pages-wrap {
        flex-grow: 1;
        padding-top: 1rem;
        height: 100%;
        overflow: auto;
    }

    /* ----- Search Row ----- */

    .search-row {
        display: flex;
        align-items: center;
        gap: 0;
        margin-top: 0.25rem;
        padding: 0.25rem 0.25rem 0.25rem 0;
        height: 2.25rem;
        border-radius: var(--radius-sm);
        background-color: rgba(var(--gray-90) / 0.4);
    }

    .search-row:hover {
        box-shadow: inset 0 0 0 1px rgba(var(--gray-90) / 0.6);
    }

    input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        color: white;
        text-overflow: ellipsis;
    }

    input::selection {
        background: rgb(117, 61, 208);
    }

    input::placeholder {
        color: rgba(255 255 255 / 0.5);
        user-select: none;
    }

    input:focus {
        outline: none;
    }
</style>
