module.exports = (function () {

    function Act() {
        this.data = {};
    }

    Act.prototype.on = function (name, func) {
        if (this.$act.data[name]) {
            console.error('Vue Act: The act ' + name + ' already exists!.');
            return;
        }

        this.$act.data[name] = func.bind(this);
    };

    Act.prototype.off = function (name) {
        if (this.data[name]) {
            delete this.data[name];
        }
    };

    Act.prototype.emit = function (name, data) {
        if ( ! this.data[name]) {
            console.error('Vue Act: The act ' + name + ' does not exist!.');
            return;
        }

        this.data[name](data);
    }

    return function install(Vue) {
        var act = new Act,
            on = act.on;

        Object.defineProperties(Vue.prototype, {
            $act: {
                get: function() {
                    act.on = on.bind(this);

                    return act;
                }
            }
        });
    }
})();