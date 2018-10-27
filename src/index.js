var dot = require('dot-object');

module.exports = (function () {

    function Act(options) {
        this.options = {
            logEmits: options.logEmits === false ? false : true
        };

        this.data = {};
    }

    Act.prototype.on = function (name, func) {
        var _act = this.$act || this;

        if (typeof dot.pick(name, _act.data) === 'function') {
            console.error('Vue.act.on: The act ' + name + ' already exists!.');
            
            return;
        }

        dot.str(name, func.bind(this), _act.data);
    };

    Act.prototype.off = function (name) {
        dot.del(name, this.data);
    };

    Act.prototype.emit = function (name, data) {
        var i, ii,
            emits = [],
            _funcs,
            _event = dot.pick(name, this.data)

        if ( ! _event) {
            if (this.options.logEmits) {
                console.warn('Vue.act.emit: The act ' + name + ' does not exist.');
            }
            
            return;
        }

        if (typeof _event === 'function') {
            emits.push('_self');

            _event(data);
        }

        if (typeof _event === 'object') {
            _funcs = Object.getOwnPropertyNames(_event);

            for (i = 0, ii = _funcs.length; i < ii; i++) {
                if (typeof _event[_funcs[i]] === 'function') {
                    emits.push(_funcs[i]);

                    _event[_funcs[i]](data);
                }
            }
        }

        if (this.options.logEmits) {
            console.info('Vue.act.emit: ' + name + '.[' + emits.join(', ') + ']');
        }
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