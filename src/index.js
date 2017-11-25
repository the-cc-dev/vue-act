module.exports = (function () {

    function Act(options) {
        this.options = {
            logEmits: options.logEmits === false ? false : true
        };

        this.data = {};
    }

    Act.prototype.on = function (name, func) {
        var _act = this.$act || this;

        if (_act.data[name]) {
            console.error('Vue.act:error The act ' + name + ' already exists!.');
            return;
        }

        _act.data[name] = func.bind(this);
    };

    Act.prototype.off = function (name) {
        if (this.data[name]) {
            delete this.data[name];
        }
    };

    Act.prototype.emit = function (name, data) {
        if ( ! this.data[name]) {
            console.error('Vue.act:error The act ' + name + ' does not exist!.');
            return;
        }

        if (this.options.logEmits) {
            console.info('Vue.act:event ' + name);
        }

        this.data[name](data);
    }

    return function install(Vue, options) {
        var act,
            _on;

        options = options || {};

        act = new Act(options);
        _on = act.on;

        Vue.act = act;

        Object.defineProperties(Vue.prototype, {
            $act: {
                get: function() {
                    act.on = _on.bind(this);

                    return act;
                }
            }
        });
    }
})();