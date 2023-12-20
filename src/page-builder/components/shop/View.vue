<template>
  <div class="shop-view">
    <img class="shop-view__bg" :src="backgroundImage" alt="">
    <div class="shop-view__content">
      <div class="shop-view__logo-wrapper">
        <img v-if="logo" :src="logo" alt="" class="shop-view__logo">
        <svg v-else class="shop-view__logo-placeholder" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M1024 366.688c0-2.92-.416-5.84-1.264-8.648l-70.184-234.88c-6.84-25.32-27.696-102.368-109.208-102.368H177.672c-53.96 0-93.848 37.648-109.064 101.936L1.168 358.36A30.65 30.65 0 0 0 0 366.688C0 437.4 38.768 499.112 96.096 532.096v378.216c0 51.232 41.672 92.888 92.888 92.888h646.024c51.224 0 92.888-41.656 92.888-92.888V532.096C985.232 499.144 1024 437.4 1024 366.688zM867.432 910.312a32.48 32.48 0 0 1-32.424 32.424H188.984a32.456 32.456 0 0 1-32.416-32.424v-356.08c11.136 2.048 22.56 3.248 34.264 3.248 64.912 0 125.648-33.392 160.592-87.688A191.232 191.232 0 0 0 512 557.48c64.96 0 125.784-33.816 160.592-87.752 34.816 53.944 95.6 87.752 160.592 87.752 11.688 0 23.12-1.2 34.248-3.248v356.08zm-34.256-413.296c-50.464 0-95.464-28.232-117.432-73.696-13.144-27.168-30.704-32.864-43.136-32.864s-30.032 5.696-43.192 32.92c-22.032 45.408-67.024 73.64-117.432 73.64a130.72 130.72 0 0 1-113.672-66.496c-14.944-26.576-33.512-32.152-46.464-32.152-13.096 0-32.096 5.816-48.16 33.568a130.904 130.904 0 0 1-112.872 65.08c-70.536 0-128.16-56.312-130.296-126.32l66.56-232.672c8.936-37.664 25.96-56.768 50.576-56.768H843.32c18.568 0 36.432 4.416 51.048 58.432l69.096 231.184c-2.24 69.96-59.808 126.144-130.288 126.144z" fill="#d9d9d9"/></svg>
      </div>
      <div class="shop-view__info">
        <div class="shop-view__name">
          <span>城运集团</span>
          <svg class="shop-view__link-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M320 885.333c-8.533 0-17.067-4.266-23.467-10.666-12.8-12.8-10.666-34.134 2.134-44.8L654.933 512 298.667 194.133c-12.8-10.666-14.934-32-2.134-44.8 10.667-12.8 32-14.933 44.8-2.133l384 341.333c6.4 6.4 10.667 14.934 10.667 23.467s-4.267 17.067-10.667 23.467l-384 341.333c-6.4 6.4-12.8 8.533-21.333 8.533z" fill="currentColor"/></svg>
        </div>
        <el-rate v-if="isShowStars" class="shop-view__stars" v-model="rate"
          disabled
          disabled-void-color="#666666"
          :colors="['#fe5c2d','#fe5c2d','#fe5c2d']"
        ></el-rate>
      </div>
      <div v-if="isShowFollow" class="shop-view__follow">
        <svg class="shop-view__follow-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M899.982 312.889a184.036 184.036 0 0 0-56.889-75.662 217.031 217.031 0 0 0-147.626-58.88 230.684 230.684 0 0 0-164.125 68.835L525.938 256l-6.542-6.542a234.382 234.382 0 0 0-154.17-72.25h-9.955a205.653 205.653 0 0 0-147.627 58.596 294.969 294.969 0 0 0-56.888 75.663 216.462 216.462 0 0 0-19.627 88.462 204.516 204.516 0 0 0 16.213 88.747 248.604 248.604 0 0 0 51.77 80.213l239.786 246.044a127.147 127.147 0 0 0 183.75 0l238.08-246.044a199.111 199.111 0 0 0 49.494-80.213 248.604 248.604 0 0 0 14.791-90.454 363.804 363.804 0 0 0-25.03-85.333zm-58.88 154.169a151.609 151.609 0 0 1-36.124 56.889L565.476 768a58.88 58.88 0 0 1-42.667 19.911A52.907 52.907 0 0 1 480.142 768L240.356 521.387a212.764 212.764 0 0 1-36.125-56.89 143.929 143.929 0 0 1-9.671-65.706 234.382 234.382 0 0 1 13.084-65.707 225.28 225.28 0 0 1 39.254-56.888 147.627 147.627 0 0 1 101.83-39.254h6.543a160.996 160.996 0 0 1 111.502 52.622l6.543 6.543a65.422 65.422 0 0 0 46.08 19.626 56.889 56.889 0 0 0 46.08-23.04l6.542-6.542a160.996 160.996 0 0 1 118.044-49.209 155.307 155.307 0 0 1 106.382 41.53 175.502 175.502 0 0 1 39.538 56.888 256 256 0 0 1 17.351 64.853 127.147 127.147 0 0 1-12.23 65.423z" fill="currentColor"/><path d="M371.769 314.596a119.467 119.467 0 0 0-101.831 46.08 101.547 101.547 0 0 0-16.214 32.71 312.889 312.889 0 0 0-9.955 33.28 32.142 32.142 0 0 0 26.169 35.84h6.542a32.142 32.142 0 0 0 32.996-26.168 44.658 44.658 0 0 1 6.542-19.627v-3.413a28.444 28.444 0 0 1 9.67-16.214 53.191 53.191 0 0 1 32.996-16.497c6.543 0 13.085-3.414 19.627-3.414a28.444 28.444 0 0 0 28.445-26.169v-6.826c-5.405-13.085-18.49-29.582-34.987-29.582z" fill="currentColor"/></svg>
        <span>关注</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
  data() {
    return {
      rate: 87*5/100,
    }
  },
}
</script>

<style lang="scss" scoped>
.shop-view {
  width: 100%;
  padding-top: 16.6667%;
  overflow: hidden;
  color: #ffffff;
  position: relative;
  cursor: pointer;

  &__bg {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(9px);

    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  &__content {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    box-sizing: border-box;
    background-color: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  &__logo-wrapper {
    flex: none;
    width: 36px;
    height: 36px;
    border-radius: 4px;
    overflow: hidden;
    background: #ffffff;
    position: relative;
  }

  &__logo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__logo-placeholder {
    flex: none;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -12px;
  }

  &__info {
    flex: 1;
    margin-left: 8px;
  }

  &__name {
    display: flex;
    align-items: center;
    height: 20px;
    font-size: 13px;
    line-height: 20px;
    font-weight: 600;
    padding-left: 10px;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 4px;
      height: 14px;
      border-radius: 2px;
      background-color: #fe5c2d;
      position: absolute;
      left: 0;
      top: 3px;
    }
  }

  &__link-icon {
    flex: none;
    width: 10px;
    height: 10px;
    color: #ffffff;
    margin-left: 2px;
  }

  &__stars {
    ::v-deep .el-rate__icon {
      font-size: 12px;
      margin-right: -1px;
    }
  }

  &__follow {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: none;
    height: 24px;
    padding: 0 10px 0 6px;
    border-radius: 14px;
    font-size: 12px;
    background: #ff7a3a;

    &-icon {
      flex: none;
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  }
}
</style>
