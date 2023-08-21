<template>
  <div class="mb-10 mt-6">
    <div class="-my-2 -mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-0 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div class="relative">
          <table class="min-w-full table-fixed divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(col, colIndex) in body.table.thead"
                  :key="`h-${colIndex}`"
                  scope="col"
                  :class="
                    colIndex === 0 && body.is_first_col_sticky
                      ? 'sticky -left-4 border-b border-gray-300 bg-gray-50 sm:left-0 sm:border-0 xl:relative'
                      : undefined
                  "
                  class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  {{ col.value }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="(row, rowIndex) in body.table.tbody"
                :key="rowIndex"
                :class="rowIndex % 2 === 0 ? undefined : 'bg-gray-50'"
              >
                <template v-for="(col, colIndex) in row.body">
                  <th
                    v-if="colIndex === 0"
                    :key="`b-${colIndex}`"
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-left text-sm text-gray-900 sm:pl-6"
                    :class="[
                      body.is_first_col_sticky
                        ? 'sticky -left-4 font-semibold sm:left-0 xl:relative'
                        : 'font-medium',
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                    ]"
                  >
                    {{ col.value }}
                  </th>
                  <td
                    v-else
                    :key="`b-${colIndex}`"
                    class="whitespace-nowrap px-3 py-4 text-left text-sm text-gray-500"
                  >
                    <span v-html="col.value"></span>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
          <span
            class="pointer-events-none absolute left-0 top-0 h-full w-full shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  body: {
    type: Object as PropType<{
      table: {
        thead: {
          value: string
        }[]
        tbody: {
          body: {
            value: string
          }[]
        }[]
      }
      is_first_col_sticky: boolean
    }>,
    required: true,
  },
})
</script>
