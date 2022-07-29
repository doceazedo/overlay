<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { scaleVector } from '$lib/transitions';
  import { sleep } from '$lib/utils';
  import { UserAddIcon } from '$lib/components/icons/animated';
  import type { AlertData } from './alert.types';

  export let showAlert = false,
    data: AlertData,
    showNextAlert: () => void;

  const transitionDuration = 400;

  let showAlertIcon = false;
  let showAlertAction = false;
  let showAlertDetails = false;
  let showAlertAvatar = false;

  onMount(async () => {
    showAlert = true;
    await sleep(500);
    showAlertIcon = true;
    await sleep(data.iconDuration);
    showAlertIcon = false;
    showAlertAction = true;
    await sleep(1000);
    data.title = data.detailsTile;
    showAlertDetails = true;
    showAlertAvatar = true;
    await sleep(data.duration);
    showAlert = false;
    await sleep(transitionDuration);
    showNextAlert();
  });
</script>

<div class="alert-wrapper">
  {#if data && showAlert}
    <div
      class="alert"
      class:show-details={showAlertDetails}
      class:tall={!!data.message.length}
      in:scaleVector={{
        duration: transitionDuration,
        vector: 'Y',
        easing: quintOut,
      }}
      out:fly={{
        duration: transitionDuration,
        x: -128,
        opacity: 0,
        easing: quintOut,
      }}
    >
      {#if showAlertIcon}
        <div class="alert-icon">
          <UserAddIcon />
        </div>
      {/if}

      <figure
        class="alert-avatar"
        class:show={showAlertAvatar}
        style="background-image:url({data?.avatar})"
      />

      {#if showAlertAction}
        <div
          class="alert-action"
          transition:fly={{
            duration: 200,
            y: -8,
            easing: quintOut,
          }}
        >
          {data.title}
        </div>

        {#if showAlertDetails}
          <p
            class="alert-description"
            transition:fly={{
              duration: 200,
              y: -8,
              easing: quintOut,
            }}
          >
            {data.description}
          </p>

          {#if !!data.message.length}
            <div
              class="alert-message"
              transition:fly={{
                duration: 200,
                y: -8,
                easing: quintOut,
              }}
            >
              <p>
                {data.message}
              </p>
            </div>
          {/if}
        {/if}
      {/if}
    </div>
  {/if}
</div>

<style lang="sass">
  .alert-wrapper
    position: absolute
    top: 0
    left: 1rem
    display: flex
    align-items: center
    height: 100%

  .alert
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    text-align: center
    width: 24rem
    height: 6rem
    padding: 1rem
    border-radius: 1rem
    background-color: #6930c3
    transition: all .2s ease-out

    &.show-details
      height: 12rem

      &.tall
        height: 19rem

    &-icon
      display: flex

      :global(svg)
        width: 4rem
        height: 4rem

    &-action
      font-size: 2.25rem
      font-weight: 700
      line-height: 1

    &-description
      font-size: 1.25rem
      font-weight: 300

    &-avatar
      flex-shrink: 0
      border-radius: 2rem
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      opacity: 0
      transition: all .2s ease-out

      &.show
        width: 8rem
        height: 8rem
        margin-top: -3rem
        margin-bottom: 1rem
        opacity: 1

    &-message
      flex-shrink: 0
      width: 100%
      height: 6rem
      padding: 0.5rem 0.75rem
      margin-top: 1rem
      border-radius: 1rem
      background-color: #fff
      color: #6930c3

      p
        display: -webkit-box
        -webkit-line-clamp: 4
        -webkit-box-orient: vertical
        overflow: hidden
        line-height: 1.25
</style>
