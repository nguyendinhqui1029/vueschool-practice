<template>
  <div class="flex flex-col gap-4">
    <HeaderComponent :content="content.aboutHoisting.header" />
    <ParagraphComponent :content="content.aboutHoisting.conceptOfHoisting" />

    <div v-for="(item, index) of content.aboutHoisting.hoisting" :key="`hoisting_${index}`" class="flex flex-col gap-4">
      <HeaderComponent :content="item.header" />
      <ParagraphComponent :content="item.content" />
      <CodeEditorComponent :language="LANGUAGE_CONSTANT.JAVASCRIPT" :initCode="item.codeExample" />
    </div>
    <HeaderComponent styleClass="font-bold text-xl" :content="content.aboutHoisting.summary.header" />
    <ListComponent :contents="content.aboutHoisting.summary.contents" />
   
    <div class="flex flex-col gap-4 mt-2">
      <HeaderComponent :content="content.aboutConst.header" />
      <ParagraphComponent :content="content.aboutConst.content" />
      <CodeEditorComponent :language="LANGUAGE_CONSTANT.JAVASCRIPT" :initCode="content.aboutConst.codeExample" />
    </div>

    <div class="flex flex-col gap-4 mt-2">
      <HeaderComponent :content="content.aboutLet.header" />
      <ListComponent :contents="content.aboutLet.contents" />
      <CodeEditorComponent :language="LANGUAGE_CONSTANT.JAVASCRIPT" :initCode="content.aboutLet.codeExample" />
    </div>

    <div class="flex flex-col gap-4 mt-2">
      <HeaderComponent :content="content.aboutVar.header" />
      <ListComponent :contents="content.aboutVar.contents" />
      <CodeEditorComponent :language="LANGUAGE_CONSTANT.JAVASCRIPT" :initCode="content.aboutVar.codeExample" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from '../common/HeaderComponent.vue';
import ParagraphComponent from '../common/ParagraphComponent.vue';
import ListComponent from '../common/ListComponent.vue';
import CodeEditorComponent from '../common/CodeEditorComponent.vue';
import { LANGUAGE_CONSTANT } from '../../constants/common.constant';

const content = ref({
  aboutHoisting: {
    header: {
      vietnamese: 'Khái niệm về hoisting',
      english: 'The concept of hoisting:'
    },
    conceptOfHoisting: {
      vietnamese: 'Hoisting có nghĩa là "đưa lên" (hoist) các khai báo biến và hàm lên đầu phạm vi (scope) của chúng. Điều này có nghĩa là bạn có thể sử dụng biến hoặc hàm trước khi chúng được khai báo trong mã.',
      english: 'Hoisting means \'lifting up\' (hoist) variable and function declarations to the top of their scope. This means you can use variables or functions before they are declared in the code.'
    },
    hoisting: [
      {
        header: {
          vietnamese: 'Hoisting với var',
          english: 'Hoisting with var'
        },
        content: {
          vietnamese: 'Khi bạn khai báo biến bằng var, việc khai báo này sẽ được hoisted lên đầu hàm hoặc phạm vi toàn cục, nhưng giá trị của biến sẽ không được khởi tạo cho đến khi dòng mã thực sự được thực thi.',
          english: 'When you declare a variable with var, the declaration is hoisted to the top of the function or global scope, but the variable\'s value is not initialized until the line of code is actually executed.'
        },
        codeExample: 'console.log(myVar); // undefined \nvar myVar = 5; \nconsole.log(myVar); // 5'
      },
      {
        header: {
          vietnamese: 'Hoisting với hàm',
          english: 'Hoisting with functions'
        },
        content: {
          vietnamese: 'Tương tự như biến, các khai báo hàm cũng được hoisted lên đầu phạm vi. Điều này có nghĩa là bạn có thể gọi hàm trước khi nó được khai báo.',
          english: 'Similar to variables, function declarations are also hoisted to the top of the scope. This means you can call a function before it is declared.'
        },
        codeExample: 'myFunction(); // "Hello, World!" \n\nfunction myFunction() { \n console.log("Hello, World!"); \n}'
      },
      {
        header: {
          vietnamese: 'Hoisting với const và let',
          english: 'Hoisting with const and let'
        },
        content: {
          vietnamese: 'Đối với let và const, việc hoisting vẫn xảy ra, nhưng các biến này không thể được truy cập trước khi chúng được khai báo, dẫn đến lỗi ReferenceError. Điều này được gọi là "temporal dead zone" (vùng chết tạm thời).',
          english: 'For let and const, hoisting still occurs, but these variables cannot be accessed before they are declared, leading to a ReferenceError. This is known as the \'temporal dead zone\'.'
        },
        codeExample: 'console.log(myLet); // ReferenceError: Cannot access \'myLet\' before initialization \nlet myLet = 10;'
      }
    ],
    summary: {
      header: {
        vietnamese: 'Tóm tắt',
        english: 'Summary'
      },
      contents: [
        {
          vietnamese: 'Hoisting là quá trình mà các khai báo biến và hàm được đưa lên đầu phạm vi.',
          english: 'Hoisting is the process by which variable and function declarations are moved to the top of their scope.'
        },
        {
          vietnamese: 'Biến khai báo bằng var có thể được sử dụng trước khi khai báo nhưng có giá trị undefined.',
          english: 'Variables declared with var can be used before declaration but have an undefined value.'
        },
        {
          vietnamese: 'Hàm có thể được gọi trước khi khai báo mà không gặp lỗi.',
          english: 'Functions can be called before declaration without encountering errors.'
        },
        {
          vietnamese: 'Biến khai báo bằng let và const không thể được sử dụng trước khi khai báo.',
          english: 'Variables declared with let and const cannot be used before declaration.'
        }
      ]
    }
  },
  aboutConst: {
    header: {
      vietnamese: 'Về từ khóa const:',
      english: 'About const keyword:'
    },
    content: {
      vietnamese: 'Các biến được khai báo bằng từ khóa const không thể được gán lại, vì tham chiếu của chúng đến giá trị là chỉ đọc.',
      english: 'Variables declared with the const keyword cannot be reassigned, since their reference to their value is read-only.'
    },
    codeExample: 'const name="Nguyễn Qui"; \nname = "Alex Nguyễn"; // => Lỗi: const không thể gán lại giá trị;'
  },
  aboutLet: {
    header: {
      vietnamese: 'Về từ khóa let:',
      english: 'About let keyword:'
    },
    contents: [
    {
      vietnamese: 'Biến được khai báo bằng let chỉ có thể truy cập trong khối mã mà nó được khai báo, bao gồm cả các khối if, for, và while.',
      english: 'Variables declared with let can only be accessed within the block of code where they are declared, including if, for, and while blocks.'
    },
    {
      vietnamese: 'Biến khai báo bằng let có thể được gán lại giá trị mới sau khi đã được khởi tạo.',
      english: 'Variables declared with let can be reassigned new values after they have been initialized.'
    },
    {
      vietnamese: 'Không thể truy cập một biến let trước khi nó được khai báo.',
      english: 'A let variable cannot be accessed before it is declared.'
    }
    ],
    codeExample: 'let myName="Nguyễn Qui"; \nmyName = "Alex Nguyễn"; \n\nfor(let i=0; i<2; i++) {  \n\tconsole.log(i); \n} \nconsole.log("Ngoài khối", i);  // => Lỗi: let có phạm vi khối.'
  },
  aboutVar: {
    header: {
      vietnamese: 'Về từ khóa var:',
      english: 'About var keyword:'
    },
    contents: [
      {
        vietnamese: 'Biến được khai báo bằng var có phạm vi toàn bộ hàm mà nó được khai báo. Nếu var được sử dụng bên ngoài hàm, biến sẽ có phạm vi toàn cục (global scope)',
        english: 'Variables declared with var have function scope, meaning they are accessible throughout the entire function they are declared in. If var is used outside of a function, the variable will have global scope.'
      },
      {
        vietnamese: 'Bạn có thể khai báo lại một biến với cùng tên trong cùng một phạm vi mà không gặp lỗi.',
        english: 'You can redeclare a variable with the same name within the same scope without encountering errors.'
      },
      {
        vietnamese: 'Biến được khai báo bằng var sẽ được "hoisted" lên đầu phạm vi của nó, có nghĩa là bạn có thể sử dụng biến trước khi nó được khai báo trong mã. Tuy nhiên, giá trị của biến sẽ là undefined cho đến khi dòng mã thực sự được thực thi.',
        english: 'Variables declared with var are hoisted to the top of their scope, meaning you can use the variable before it is declared in the code. However, the variable’s value will be undefined until the line of code is actually executed.'
      },
      {
        vietnamese: 'Giống như let, biến khai báo bằng var cũng có thể được gán lại giá trị mới sau khi đã được khởi tạo.',
        english: 'Similar to let, variables declared with var can also be reassigned new values after they have been initialized.'
      }
    ],
    codeExample: 'console.log(x); // undefined \nvar x = 5; \nconsole.log(x); // 5 \n\nmyFunction(); \n\nfunction myFunction() { \n\tvar y = 10; // y chỉ có thể được truy cập trong hàm này \n\tconsole.log(y); // 10 \n} \n\nfor(var i=0; i<2; i++) \n{ \n\tconsole.log(i); \n} \nconsole.log("Outside block", i);'
  }
})
</script>
