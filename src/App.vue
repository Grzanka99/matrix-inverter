<template>
  <div id="app">
    <div class="controlls">
      <button class="size size__+" @click="size < 14 && size++">
        +
      </button>
      <button class="size size__-" @click="size > 2 && size--">
        -
      </button>
      <button class="run" @click="run('gauss')">
        run with gauss
      </button>
      <button class="run" @click="run('equ')">
        run by equations
      </button>

      <button class="run" @click="rand">
        fill with random values
      </button>

      <button class="clear" @click="clearM">
        clear matrix
      </button>

      <div>Time to calculate: {{ timeTaken }} ms</div>
    </div>
    <div class="matrix">
      <div class="matrix__one matrix--primary">
        <MatrixBox
          :matrix="Matrix.matrix"
          @updateValue="updateValue"
          :reload="reload"
        />
      </div>
      <div class="matrix__one matrix--secondary">
        <MatrixBox :matrix="inverted" :res="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import MatrixBox from '@/components/Matrix.vue';
import { Matrix } from './classes/Matrix';
import { upValType, MatrixType } from './types';

@Component({
  components: {
    MatrixBox,
  },
})
export default class App extends Vue {
  size = 2;

  timeTaken = 0;

  reload = false;

  Matrix = new Matrix(this.size);

  inverted: MatrixType = [[]];

  @Watch('size')
  onSizeChange() {
    this.timeTaken = 0;
    this.Matrix.updateSize = this.size;
  }

  updateValue(value: upValType): void {
    const { update, v } = value;
    this.timeTaken = 0;

    if (update) {
      this.Matrix.setValue(v.i, v.j, v.value);
    }
  }

  run(which: string) {
    let t0;
    let t1;
    switch (which) {
      case 'gauss':
        t0 = performance.now();
        this.inverted = this.Matrix.invertMatrixWithGauss();
        t1 = performance.now();
        this.timeTaken = t1 - t0;
        break;
      case 'equ':
        this.inverted = this.Matrix.inverMatrixByEquations();
        break;
      default:
        break;
    }
  }

  rand() {
    this.timeTaken = 0;
    this.Matrix.fillWithRandomValues();
  }

  clearM() {
    this.Matrix.clearMatrix();
    this.reload = !this.reload;
  }
}
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
}

input,
button {
  border: 1px solid black;
  border-radius: 5px;
}

button {
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid gray;
  transition: background 200ms;

  &:hover {
    background-color: gray;
  }

  &:active {
    background-color: rgba(black, 0.6);
  }
}

input {
  &:focus {
    background-color: #abcdef;
    border: 2px solid black;
  }
}
</style>

<style lang="scss" scoped>
#app {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;

  .controlls {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: center;
    padding: 0 0 0 20px;

    button {
      margin: 0 10px;
      height: 45px;

      &.size {
        width: 45px;
      }

      &.run {
        width: fit-content;
      }
    }
  }

  .matrix {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    border-top: 2px solid black;

    @media (min-width: 1000px) {
      flex-direction: row;
    }

    &__one {
      display: flex;
      height: 100%;
      width: 100%;
    }

    &--primary {
      border-right: 2px solid black;
    }

    &--secondary {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 15px;
    }
  }
}
</style>
