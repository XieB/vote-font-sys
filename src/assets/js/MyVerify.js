
const MyVerify = {};
MyVerify.install = function (Vue, options) {
    // 1. 添加全局方法或属性
    Vue.myGlobalMethod = function () {
        // 逻辑...
    }

    // 2. 添加全局资源
    Vue.directive('checkParam', {
        //     // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el, binding, vNode) {
            let realInput = el.getElementsByTagName('input')[0];
            if (!realInput) realInput = el.getElementsByTagName('textarea')[0];
            el.addEventListener('keyup', function (event) {
                // 首先去除已有样式
                // console.log(realInput);
                el.className = el.className.replace('input-error', '').trim()
                let isRequired = binding.value.required
                if (isRequired) {
                    if (!realInput.value || realInput.value === '') {
                        el.className += ' input-error'
                    }
                }

                // 判断正则
                // debugger
                let regex = binding.value.regex
                if (!realInput.value.match(regex)) {
                    el.className += ' input-error'
                }
            })
        }
    })

    // 3. 注入组件
    Vue.mixin({
        created: function () {
            // 逻辑...
        }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function (methodOptions) {
        // 逻辑...
    }

    Vue.prototype.$VerifyAll = function () {
        return new Promise((resolve, reject)=>{
            let elements = document.getElementsByClassName('van-cell--required');
            // console.log(elements);
            var evObj = document.createEvent('Event')
            evObj.initEvent('keyup', true, true)
            for (let element of elements) {
                element.dispatchEvent(evObj)
            }
            let errorInputs = document.getElementsByClassName('input-error');
            if (errorInputs.length === 0) {
                resolve(true);
            }else{
                reject(false);
            }
        });

    }
}

export default MyVerify;