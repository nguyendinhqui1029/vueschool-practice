<template>
  <div class="flex flex-col gap-4">
    <header class="font-bold text-2xl">Trello Board</header>
    <div class="flex max-w-fit w-full gap-4 overflow-x-auto">
      <draggable 
      v-model="boards"
      group="boards"
      item-key="id"
      :animation="150"
      handle=".drag-handle"
      class="flex gap-4 items-start"
      @dragend="boardOrderChange(boards)"
      >
        <template #item="{element: board}: {element: Board}">
          <div class="p-4 flex flex-col gap-2 rounded-md min-w-60 bg-gray-200 shadow-sm">
            <header class="text-xl font-bold pb-2 flex items-center gap-2">
              <span class="drag-handle cursor-move">⋮⋮</span>
              <InputText class="rounded-lg disabled:bg-gray-200 disabled:border-none disabled:shadow-none w-full" :disabled="!board.isEdit" v-model="board.title"/>

              <span v-if="(board.isEdit ||  !board.isEdit) && board.title" class="pi cursor-pointer" :class="{'pi-save': board.isEdit, 'pi-pencil': !board.isEdit}" @click="handleEditBoardTile(board)"></span>
            </header>
            <draggable 
              v-model="board.tasks"
              group="task"
              item-key="id"
              :animation="150"
              handle=".drag-handle"
              class="flex flex-col gap-4"
              @dragend="taskOrderChange(board)"
              >
              <template #item="{element: task}: {element: Task}">
                <div class="flex flex-col gap-4 p-3 bg-white rounded-md">
                  <div class="flex gap-4 items-center justify-between">
                    <span class="drag-handle cursor-move">⋮⋮</span>
                    <div class="flex gap-4">
                      <span class="pi cursor-pointer" :class="{'pi-save': task.isEdit, 'pi-pencil': !task.isEdit}" @click="saveTask(board, task.id)"></span>
                      <span class="pi pi-times cursor-pointer" v-if="task.isEdit" @click="discardTask(board, task.id)"></span>                      
                    </div>
                  </div>
                  <Textarea class="rounded-lg disabled:bg-white disabled:border-none disabled:shadow-none w-full" :disabled="!task.isEdit" v-model="task.description"/>
                </div>
              </template>
            </draggable>
            <footer class="flex gap-4">
              <Button label="Add a Card"  severity="secondary" icon="pi pi-plus" class="min-w-fit w-full flex !justify-start" @click="addNewTask(board)"/>
              <Button icon="pi pi-trash" severity="danger" variant="text" @click="deleteColumn(board)"/>
            </footer>
          </div>
        </template>
    </draggable>
    <Button label="Add a column"  severity="secondary" icon="pi pi-plus" class="min-w-fit flex h-12 !justify-start" @click="addNewColumn"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Board, Task } from '../../models/TrelloBoardModel';
import Button from 'primevue/button';
import draggable from 'vuedraggable';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { addColumData, updateColumn, getBoardData, removeColumn } from '../../services/TrelloBoardServer';
const boards = ref<Board[]>([])

async function addNewColumn() {
  const response = await addColumData({
    order: new Date().getTime(),
    title: 'New Column',
    tasks: []
  });
  boards.value.push({
    order: new Date().getTime(),
    id:response.id,
    title: 'New Column',
    tasks: []
  });
}

async function handleEditBoardTile(board: Board) {
  if(!board.isEdit) {
    board.isEdit = true;
    return;
  }
  board.isEdit = false;
  await updateColumn(board);
  const index = boards.value.findIndex(item=>item.id === board.id);
  if(index !== -1) {
    boards.value[index] = board;
  }
}

async function deleteColumn(board: Board) {
  await removeColumn(board.id!);
  const index = boards.value.findIndex(item=>item.id === board.id);
  if(index !== -1) {
    boards.value.splice(index,1);
  }
}
async function addNewTask(board: Board) {
  board.tasks.push({
    id: crypto.randomUUID(),
    title: '',
    isEdit: true,
    isNew: true,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date()
});
}

async function saveTask(board: Board, taskId: string) {
  const index = board.tasks.findIndex(item=>item.id === taskId);

  if(index !== -1 && !board.tasks[index].isEdit) {
    board.tasks[index].isEdit = true;
    return;
  }


  if(index !== -1) {
     board.tasks[index].isEdit = false;
     board.tasks[index].isNew = false;
     updateColumn(board);
  }
}
function discardTask(board: Board, taskId: string) {
  const taskIndex = board.tasks.findIndex(item=>item.id === taskId);
  if(taskIndex !== -1 && board.tasks[taskIndex].isNew) {
    board.tasks.splice(taskIndex,1);
    return;
  }
  board.tasks[taskIndex].isEdit = false;
}

function taskOrderChange(board: Board) {
  updateColumn(board);
}

function boardOrderChange(boards: Board[]) {
  boards.forEach((item:Board, index: number)=>{
    updateColumn({...item, order: index});
  })
  
}
async function init() {
  boards.value = (await getBoardData()).sort((itemOne: Board, itemTwo: Board)=> itemOne.order - itemTwo.order);
}

init();
</script>