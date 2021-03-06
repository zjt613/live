<template>
  <div class="live-date-picker-container" v-click-outside="hide" @click="visible = true">
    <l-input readonly class="live-date-picker-input" style="width: 240px;" v-model="selectedDate" :placeholder="placeholder">
      <span slot="prefix"><i class="fa fa-calendar-o"></i></span>
      <span
        slot="suffix"
        class="btn-close"
        v-show="selectedDate"
        @click.stop="reset"
      ><i class="material-icons">clear</i></span>
    </l-input>
    <transition name="fade-select">
      <div class="live-calendar-container" v-if="visible">
        <div class="live-calendar-header">
          <div class="year-month">
            {{ currentYear }} 年 {{ currentMonth }} 月
          </div>
          <div class="btn-container">
            <span class="btn-jump btn-jump-left" @click="prev">
              <i class="fa fa-angle-left arrow-left"></i>
            </span>
            <span class="btn-jump btn-jump-right" @click="next">
              <i class="fa fa-angle-right arrow-right"></i>
            </span>
          </div>
        </div>
        <div class="live-calendar-body">
          <div class="weeks">
            <div class="week" v-for="item in weeksLabel" :key="item">{{ item }}</div>
          </div>
          <div class="days">
            <div
              class="day"
              @click.stop="selectDate(day)"
              :class="{ 'active': !!day, 'today': isToday(day) }"
              v-for="(day, index) in tableDays"
              :key="index"
            >{{ day }}</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import LInput from '../LInput/LInput.vue'

export default {
  name: 'LDatePicker',
  props: {
    format: String,
    placeholder: String,
  },
  components: {
    LInput,
  },
  data() {
    return {
      weeksLabel: ['日', '一', '二', '三', '四', '五', '六'],
      visible: false,
      now: new Date(),
      selectedDate: null,
      offSetYear: 0,
      offSetMonth: 0,
    }
  },
  computed: {
    currentYear() {
      return this.now.getFullYear() + this.offSetYear
    },
    nowMonth() {
      return this.now.getMonth() + 1
    },
    currentMonth() {
      return this.nowMonth + this.offSetMonth
    },
    tableDays() {
      const list = []
      const LIST_LENGTH = 42

      // Current month length
      const date = new Date(this.currentYear, this.currentMonth, 0)
      const currentMonthLength = date.getDate()

      // The first day of the current month is the day of the week
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth - 1, 1)
      const weekIndex = firstDayOfMonth.getDay()

      for (let i = 0; i < LIST_LENGTH; i += 1) {
        if (i >= weekIndex && i < weekIndex + currentMonthLength) {
          list.push((i - weekIndex) + 1)
        } else {
          list.push(null)
        }
      }

      return list
    },
  },
  methods: {
    hide() {
      this.visible = false
    },
    prev() {
      if (this.currentMonth > 1) {
        this.offSetMonth -= 1
      } else {
        this.offSetYear -= 1
        this.offSetMonth = 12 - this.nowMonth
      }
    },
    next() {
      if (this.currentMonth < 12) {
        this.offSetMonth += 1
      } else {
        this.offSetYear += 1
        this.offSetMonth = this.nowMonth - 12 - 1
      }
    },
    selectDate(day) {
      const displayMonth = this.currentMonth > 9 ? this.currentMonth : `0${this.currentMonth}`
      const displayDay = day > 9 ? day : `0${day}`
      const selectedDate = `${this.currentYear}-${displayMonth}-${displayDay}`
      this.selectedDate = this.format ? dayjs(selectedDate).format(`${this.format}`) : selectedDate
      this.$emit('input', this.selectedDate)
      this.visible = false
    },
    reset() {
      this.selectedDate = null
      this.$emit('input', this.selectedDate)
    },
    isToday(day) {
      const currentDate = dayjs(`${this.currentYear}-${this.currentMonth}-${day}`).format('YYYY-MM-DD')
      const nowDate = dayjs().format('YYYY-MM-DD')
      return currentDate === nowDate
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
