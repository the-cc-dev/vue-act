# Vue Act

A simple global event (act) handler for Vue.


## Install

~~~
> sudo npm install @websanova/vue-act
~~~    

~~~
Vue.use(require('@websanova/vue-act'));
~~~


## Usage

Usage is straight forward. Note that the `.on()` method will always receive the instance of the component it is called from.

~~~
this.$act.on('some:act', function () {});
this.$act.emit('some:act', {some: 'data'});
this.$act.off('some:act');
~~~