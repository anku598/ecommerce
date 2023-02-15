<template>
  <div class="step-progressbar">
    <ul class="progressbar">
      <li
        v-for="(step, idx) in steps"
        :key="`step-${idx}`"
        :class="{ active: idx == currentStep, disabled: step.disabled }"
        @click.prevent="handleStepAction(step, idx)"
      >
        {{ step.label }}
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { StepOption } from '~/utils/types';

@Component({
  name: 'StepWizard',
  components: {},
})
export default class StepWizard extends Vue {
  @Prop({ default: [] }) steps!: StepOption[];
  @Prop({ default: 0 }) currentStep!: number;

  handleStepAction(opt: StepOption, idx: number) {
    const disabled = opt.disabled || opt.url || opt.emit || true;
    if (!disabled || idx <= this.currentStep) {
      if (opt.emit) {
        this.$emit('step-change', idx);
      } else if (opt.url !== undefined) {
        this.$router.push(opt.url);
      }
    }
  }
}
</script>
<style scoped lang="scss">
.step-progressbar {
  margin-bottom: 60px;
  margin-top: 60px;

  @include mediaXs {
    margin-bottom: 40px;
  }

  @include iPad {
    margin-top: 150px;
  }
}
.progressbar {
  counter-reset: step;
  display: flex;
}
.progressbar li {
  list-style: none;
  display: inline-block;
  width: 30.33%;
  position: relative;
  text-align: center;
  cursor: pointer;
  @include mediaXs {
    font-size: 12px;
  }
}
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ddd;
  border-radius: 100%;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  background-color: #fff;
}
.progressbar li:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index: -1;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active {
  color: green;
}
.progressbar li.active:before {
  border-color: green;
}
.progressbar li.active + li:after {
  background-color: green;
}
</style>
