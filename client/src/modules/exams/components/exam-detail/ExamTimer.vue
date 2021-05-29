<template>
  <div class="timer d-inline-flex align-center">
    <div v-if="timeOut" class="mr-4 font-weight-bold" style="font-size: 1.5rem">
      Time out!
    </div>
    <template v-for="(item, index) in times">
      <div class="time" :class="{ timeOut }" :key="index" v-if="item.isShow">
        <div class="number">{{ item.time }}</div>
        <div class="label">{{ item.label }}</div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import moment, { Moment } from "moment";

@Component({})
export default class ExamTimer extends Vue {
  @Prop({ required: true }) value!: Moment;
  @Prop({ required: true }) end!: string;
  @Prop({ default: false }) stop!: boolean;
  @Prop({ default: true }) hours!: boolean;
  @Prop({ default: true }) minutes!: boolean;
  @Prop({ default: true }) seconds!: boolean;
  itervalId: number | null = null;

  get timeOut() {
    return moment(this.start).isSame(this.end);
  }

  get start() {
    return this.value;
  }

  set start(value) {
    this.$emit("input", value);
  }

  get times() {
    return [
      {
        label: "Hours",
        time: moment(this.end).diff(this.start, "hours") % 24,
        isShow: this.hours
      },
      {
        label: "Minutes",
        time: moment(this.end).diff(this.start, "minutes") % 60,
        isShow: this.minutes
      },
      {
        label: "Seconds",
        time: moment(this.end).diff(this.start, "seconds") % 60,
        isShow: this.seconds
      }
    ];
  }

  clearIntervalId() {
    if (this.itervalId) clearInterval(this.itervalId);
    this.$emit("on-time-out");
  }

  mounted() {
    this.itervalId = setInterval(() => {
      this.start = moment(this.start)
        .clone()
        .add(1, "seconds");
    }, 1000);
  }

  beforeDestroy() {
    this.clearIntervalId();
  }

  @Watch("timeOut")
  onTimeOut(value: boolean) {
    if (value) {
      this.clearIntervalId();
    }
  }

  @Watch("stop")
  onStopTime(value: boolean) {
    if (value) {
      this.clearIntervalId();
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
  width: 50px;
  background-color: yellow;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid white;
  }

  .number {
    font-size: 25px;
  }
  .label {
    font-size: 11px;
  }
}

.timeOut {
  background: #ff0266;
}
</style>
