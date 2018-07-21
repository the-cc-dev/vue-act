# Vue Act

A simple global event (act) handler for Vue.


## Install

~~~
> sudo npm install @websanova/vue-act
~~~    

~~~
Vue.use(require('@websanova/vue-act'));
~~~


## Notes On Naming

I went with the naming `$act` since the `$event` keyword is already used in Vue at the component level.

~~~
<button v-on:click="doSomething($event)"></button>
~~~

This means that if we want to `emit` an event right from the component it will cause an error since the `emit` function will not be found.

~~~
<button v-on:click="$event.emit('doSomething')"></button>
~~~

The `$event.emit` could be moved into a function, but it could cause confusion and pesky bugs.

Therefore I just went with what will hopefully be an unused namespace in `$act`. As if to "act" on something.


## Usage

Since the events are stored in a global object within the plugin they can be created and called from anywhere.

> NOTE: It's generally good practice to destroy an event in the same component it is created to avoid any collisions and errors.

~~~javascript
 export default {

   ...

    mounted() {
        this.$act.on('some.act.one', function (data) {
            
            // Will receive local `this` context.

        });
        
        this.$act.on('some.act.two', function (data) {
            
            // Will receive local `this` context.

        });
    },

    beforeDestroy() {

        // Turn off events separately.
        this.$act.off('some.act.one');
        this.$act.off('some.act.two');

        // If we used dot (.) notation we can
        // also turn off events with one call.
        this.$act.off('some.act');
    }

    ...
 };
~~~

As long as the component is mounted we can then emit our events from anywhere we like.

> NOTE: When emitting an event you can pass some data into it.

~~~javascript
this.$act.emit('some.act.one', {
    some: 'data'
})
~~~

How the events are structured and at what level will depend on the application. But typically it's best to keep them as localized as possible and always `on` / `off` the events to avoid headaches.

> NOTE: Along with creating and destroying events it's also a good idea to come up with a naming scheme to avoid collisions just in case.

~~~javascript

    // We can also call Vue.act directly in an event
    // bootstraping file. In this case the function
    // will not receive any context when using `this`.

    Vue.act.on('users.login.success', function (data) {

        console.log(data.user);

    });

    Vue.act.on('users.login.error', function (data) {

        console.log(data.user);

    });

    Vue.act.on('users.logout.success', function (data) {

        console.log(data.user);

    });

    // etc...

~~~


## Options

### `logEmits`

Toggle console logging on or off which is on (`true`) by default.

There are three messages that will show in the console:

* Error if the event name has already been created / used.
* Warning if trying to call an event name that does not exist.
* Info for any successful emit call on an event name that exists.

~~~
Vue.use(require('@websanova/vue-act'), {
    logEmits: false
});
~~~


## Methods

### `on`

Used to create an event.

> NOTE: The function will receive the local `this` context.

~~~javascript
this.$act.on('some.event', function () {
    // do something
});
~~~

### `off`

Used to destroy the event.

> NOTE: It's generally a good idea to create and destroy the event within the same component (check usage for more details).

~~~javascript
this.$act.off('some.event');
~~~

It also supports dot notation for disabling multiple events at the same time.

~~~javascript
this.$act.on('some.event.one', function () {});
this.$act.on('some.event.two', function () {});

...

this.$act.off('some.event', function () {});

~~~

### `emit`

Trigger the event.

~~~javascript
this.$act.emit('some.event.one');
~~~

We can also pass some data along.

~~~javascript
this.$act.emit('some.event.one', {
    some: 'data'
});
~~~