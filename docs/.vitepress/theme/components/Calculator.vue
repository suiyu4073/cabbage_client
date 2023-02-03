<template>
  <div class="border rounded-md p-4">
    <div class="p-2 font-bold">
      方案计算器
    </div>
    <div class=" grid grid-cols-2 gap-2 mt-4">
      <div class="relative">
        <input type="text"
          class="block w-full rounded-md shadow-sm focus:ring focus:ring-lime-600 focus:ring-opacity-50 px-2 py-1"
          :class="gpa ? ' ring ring-lime-500 ring-opacity-50' : ''" placeholder="绩点GPA" v-model="gpa" />
        <div
          class="absolute bg-white text-xs left-2 top-0 select-none -translate-y-2/3 transition-all duration-200 origin-bottom px-1 text-lime-600"
          :class="gpa ? 'scale-100' : 'scale-0'">
          绩点GPA
        </div>
        <div class="h-3 text-xs text-red-500 m-2">
          {{ gpaError }}
        </div>
      </div>

      <div class="relative">
        <input type="text"
          class="block w-full rounded-md shadow-sm focus:ring focus:ring-lime-600 focus:ring-opacity-50 px-2 py-1"
          :class="moral ? ' ring ring-lime-500 ring-opacity-50' : ''" placeholder="思想品德" v-model="moral" />
        <div
          class="absolute bg-white text-xs left-2 top-0 select-none -translate-y-2/3 transition-all duration-200 origin-bottom px-1 text-lime-600"
          :class="moral ? 'scale-100' : 'scale-0'">
          思想品德
        </div>
        <div class="h-3 text-xs text-red-500 m-2">
          {{ moralError }}
        </div>
      </div>

      <div class="relative">
        <input type="text"
          class="block w-full rounded-md shadow-sm focus:ring focus:ring-lime-600 focus:ring-opacity-50 px-2 py-1"
          :class="activity ? ' ring ring-lime-500 ring-opacity-50' : ''" placeholder="课外活动" v-model="activity" />
        <div
          class="absolute bg-white text-xs left-2 top-0 select-none -translate-y-2/3 transition-all duration-200 origin-bottom px-1 text-lime-600"
          :class="activity ? 'scale-100' : 'scale-0'">
          课外活动
        </div>
        <div class="h-3 text-xs text-red-500 m-2">
          {{ activityError }}
        </div>
      </div>

      <div class="relative">
        <input type="text"
          class="block w-full rounded-md shadow-sm focus:ring focus:ring-lime-600 focus:ring-opacity-50 px-2 py-1"
          :class="innovation ? ' ring ring-lime-500 ring-opacity-50' : ''" placeholder="创新成果" v-model="innovation" />
        <div
          class="absolute bg-white text-xs left-2 top-0 select-none -translate-y-2/3 transition-all duration-200 origin-bottom px-1 text-lime-600"
          :class="innovation ? 'scale-100' : 'scale-0'">
          创新成果
        </div>
        <div class="h-3 text-xs text-red-500 m-2">
          {{ innovationError }}
        </div>
      </div>
    </div>

    <div>
      总分：{{ isValid? score: '填写中...' }}
    </div>
  </div>
</template>


<script setup>
import { useForm, useField, useIsFormValid } from 'vee-validate'
import { computed } from 'vue';
import * as yup from 'yup'

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    gpa: yup.number().required().typeError('请输入数字').min(0, '绩点不能小于0').max(4, '绩点不能超过4'),
    moral: yup.number().required().typeError('请输入数字').min(0, '思想品德分不能小于0').max(100, '思想品德分不能超过100'),
    activity: yup.number().required().typeError('请输入数字').min(0, '课外活动分不能小于0').max(100, '课外活动分不能超过100'),
    innovation: yup.number().required().typeError('请输入数字').min(0, '创新成果分不能小于0').max(40, '创新成果分不能超过40'),
  })
})
const isValid = useIsFormValid()
const { value: gpa, errorMessage: gpaError } = useField('gpa')
const { value: moral, errorMessage: moralError } = useField('moral')
const { value: activity, errorMessage: activityError } = useField('activity')
const { value: innovation, errorMessage: innovationError } = useField('innovation')

const score = computed(() =>
  gpa.value * 0.01 * 25 * 0.7 + moral.value * 0.1 + activity.value * 0.05 + innovation.value * 1 / 40 * 100 * 0.15
)
</script>