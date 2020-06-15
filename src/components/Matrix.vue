<template>
  <div class="matrixbox" v-if="!res">
    <div
      v-for="(r, i) in matrix"
      :key="i"
      class="matrixbox__row"
    >
      <input
        v-for="(c, j) in r"
        :key="j"
        class="matrixbox__input"
        :data-i="i"
        :data-j="j"
        :value="c"
        @input="handleInput"
        @blur="realoadIfEmpty"
      />
    </div>
  </div>
  <table class="matrixbox-res" v-else>
    <tbody>
      <tr
        v-for="(r, i) in matrix"
        :key="i"
        class="matrixbox-res__row"
      >
        <td
          v-for="(c, j) in r"
          :key="j"
          class="matrixbox-res__val"
        >
          {{
            c === 502
              ? 'Wyznacznik nie może zostać obliczony'
              : c
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import { MatrixType, upValType } from '../types';

@Component
export default class MatrixBox extends Vue {
  @Prop() readonly matrix!: MatrixType;

  @Prop({ default: false }) readonly res!: boolean;

  @Prop({ default: false }) readonly reload!: boolean;

  handleInput(event: InputEvent | any): boolean {
    const { target } = event;
    const { i, j } = target.dataset;
    const upVal: upValType = {
      update: false,
      v: {
        i: 0,
        j: 0,
        value: 0,
      },
    };

    if (Number(target.value) || Number(target.value) === 0) {
      target.classList.remove('err');

      upVal.update = true;
      upVal.v.i = i;
      upVal.v.j = j;
      upVal.v.value = Number(target.value)
        ? Number(target.value)
        : 0;

      this.$emit('updateValue', upVal);
    } else {
      target.classList.add('err');
      this.$emit('updateValue', upVal);
      return false;
    }
    return true;
  }

  @Watch('reload')
  realodValues() {
    this.$forceUpdate();
  }

  realoadIfEmpty(event: InputEvent | any) {
    const { target } = event;
    if (target.value === '') {
      this.$forceUpdate();
    }
  }
}
</script>

<style lang="scss" scoped>
.matrixbox {
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  display: flex;
  flex-direction: column;

  &__row {
    display: flex;
    flex-direction: row;
  }

  &__input {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    width: 50px;
    height: 50px;
    font-size: 20px;

    margin: 2.5px;
    padding: 2.5px;
  }
}

.matrixbox-res {
  width: 100%;
  height: 100%;
  display: block;

  &__row,
  &__val {
    width: min-content;
    height: min-content;
    width: 60px;
    height: 60px;
    border: 1px solid black;
  }

  &__val {
    padding: 1px 5px;
    text-align: center;
  }
}

.err {
  background-color: rgba(red, 0.5);
}
</style>
