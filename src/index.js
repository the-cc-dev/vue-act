module.exports = (function () {

    function Event() {
        this.data = {};
    }

    Event.prototype.on = function (name, func) {
        if (this.$event.data[name]) {
            console.error('Vue Event: The event ' + name + ' already exists!.');
            return;
        }

        this.$event.data[name] = func.bind(this);
    };

    Event.prototype.off = function (name) {
        if (this.data[name]) {
            delete this.data[name];
        }
    };

    Event.prototype.emit = function (name, data) {
        if ( ! this.data[name]) {
            console.error('Vue Event: The event ' + name + ' does not exist!.');
            return;
        }

        this.data[name](data);
    }

    return function install(Vue) {
        var event = new Event,
            on = event.on;

        Object.defineProperties(Vue.prototype, {
            $event: {
                get: function() {
                    event.on = on.bind(this);

                    return event;
                }
            }
        });
    }
})();