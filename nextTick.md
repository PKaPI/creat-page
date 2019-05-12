### 深入响应式远离 nextTick
nextTick 是 Vue 的一个核心实现，在介绍 Vue 的 nextTick 之前，为了方便大家理解，我先简单介绍一下 JS 的运行机制。


sfds
### js同步异步
同步任务：指的是在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务
异步任务： 指的是不进入主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
### javaScript运行机制
我们知道JavaScript的一大特点就是单线程，而这个线程中拥有唯一的一个事件循环。当然新标准中的web worker涉及到了多线程，但它的原理是利用一个父线程和多个子线程，归根结底来说js仍逃不过是单线程的事实。要弄懂js异步，我们必须掌握一个基础知event-loop。
事件循环大致分为以下几个步骤：
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

JavaScript代码的执行过程中，除了依靠函数调用栈来搞定函数的执行顺序外，还依靠任务队列(task queue)(先进先出)来搞定另外一些代码的执行。
一个线程中，事件循环是唯一的，但是任务队列可以拥有多个，不同类型的任务会进入不同的Event Queue。任务队列又分为macro-task（宏任务）与micro-task（微任务），在最新标准中，它们被分别称为task与jobs。
    macro-task（宏任务）大概包括：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering。
   micro-task（微任务）大概包括: process.nextTick, Promise.then, Object.observe(已废弃), MutationObserver(html5新特性)
    其中setTimeout/Promise等我们称之为任务源。而进入任务队列的是他们指定的具体执行任务。
`宏任务和微任务http://www.cnblogs.com/jiasm/p/9482443.html`




