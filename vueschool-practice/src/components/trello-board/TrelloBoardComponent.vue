<template>
  <div class="flex flex-col gap-4">
    <header class="font-bold text-2xl">Trello Board</header>
    <draggable 
      v-model="boards"
      group="boards"
      item-key="id"
      :animation="150"
      handle=".drag-handle"
      class="flex gap-4 max-w-fit w-full overflow-x-auto items-start">
        <template #item="{element: board}: {element: Board}">
          <div class="p-4 flex flex-col gap-2 rounded-md min-w-60 bg-gray-200 shadow-sm">
            <header class="text-xl font-bold pb-2 flex items-center gap-2">
              <span class="drag-handle cursor-move">⋮⋮</span>
              {{ board.title }}
            </header>
            <draggable 
              v-model="board.tasks"
              group="task"
              item-key="id"
              :animation="150"
              handle=".drag-handle"
              >
              <template #item="{element: task}: {element: Task}">
                <div class="p-3 bg-white rounded-md">
                  <span class="drag-handle cursor-move">⋮⋮</span>
                  {{ task.title }}
                </div>
              </template>
            </draggable>
            <footer>
              <Button label="Add a Card"  severity="secondary" icon="pi pi-plus" class="w-full flex !justify-start"/>
            </footer>
        </div>
        </template>
    </draggable>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Board, Task } from '../../models/TrelloBoardModel';
import Button from 'primevue/button';
import draggable from 'vuedraggable';

const boards = ref<Board[]>([{
    id: crypto.randomUUID(),
    title: 'Board 1',
    tasks: [{
    id:  crypto.randomUUID(),
    title: 'Task 1',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
}]
},
{
    id: crypto.randomUUID(),
    title: 'Board 2',
    tasks: []
}])
</script>