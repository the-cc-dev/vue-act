# Vue Store

A simple global event handle for Vue.js.


## Install

~~~
> sudo npm install @websanova/vue-event
~~~    

~~~
Vue.use(require('@websanova/vue-event'));
~~~


## Usage

Usage is straight forward. Note that the `.on()` method will always receive the instance of the component it is called from.

~~~
this.$event.on('some:event', function () {});
this.$event.emit('some:event', {some: 'data'});
this.$event.off('some:event');
~~~