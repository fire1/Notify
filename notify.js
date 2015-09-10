/**
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 * Date: 09/08/2015
 * @version 1.00
 * @link https://github.com/fire1/notify
 * @author Angel Zaprianov <me@fire1.eu>
 */
(function ($) {
    $.fn.notify = function (options) {

        var opt = $.extend({
            // These are the defaults.
            url: '',
            timer: 1000,
            query: '',
            icon: 'notify.png',
            data: []
        }, options);


        /**
         * Set local storage item
         * @param key
         * @param obj
         */
        var setStorage = function (key, obj) {
            return localStorage.setItem(key, JSON.stringify(obj))
        };
        /**
         * Get local storage
         * @param key
         */
        var getStorage = function (key) {
            return JSON.parse(localStorage.getItem(key))
        };


        var timeContainer = getStorage('notifyTime');
        if (!timeContainer) {
            timeContainer = [];
        }

        /**
         * Runs notifications
         * @param msg
         */
        var actionNotify = function (msg) {
            if (!msg.name || !msg.body) {
                console.error(''
                    + 'Given file is not supported! Please set your json as {title: "", body:"", token:"" }'
                    + '');
                return;
            }

            console.log(Math.floor(Date.now() / 1000));


            var timeShow = parseInt(msg.time);
            if (Math.floor(Date.now() / 1000) < timeShow) {
                return;
            }


            // Check showed message for users not refreshed page
            if (timeContainer.indexOf(timeShow) == -1) {
                timeContainer.push(timeShow);
                // Trigger notifiaction
                trigger(msg.name, msg.body, !msg.icon ? opt.icon : msg.icon);
                setStorage('notifyTime', timeContainer);
            }
        };

        /**
         * Create message
         * @param txtTitle
         * @param txtBody
         * @param srcIcon
         * @returns {*}
         */
        var show = function (txtTitle, txtBody, srcIcon) {
            return new Notification(txtTitle, {
                body: txtBody,
                icon: srcIcon
            })
        };

        /**
         * Trigger notification
         * @param txtTitle
         * @param txtBody
         * @param srcIcon
         */
        var trigger = function (txtTitle, txtBody, srcIcon) {
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
                // backup option
                alert(txtBody);
                console.error('Browser do not support notification!');
            }

            // Let's check whether notification permissions have already been granted
            else if (Notification.permission === "granted") {
                // If it's okay let's create a notification
                show(txtTitle, txtBody, srcIcon);
            }

            // Otherwise, we need to ask the user for permission
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    // If the user accepts, let's create a notification
                    if (permission === "granted") {
                        show(txtTitle, txtBody, srcIcon);
                    }
                });
            }

            // At last, if the user has denied notifications, and you
            // want to be respectful there is no need to bother them any more.
        };

        /**
         * Runs notify from jquery function object
         */
        var actionObject = function () {
            $.each(opt.data, function (index, messages) {
                actionNotify(messages);
            });
            setTimeout(actionObject, opt.timer);
        };

        /**
         * Runs Ajax action
         */
        var actionAjax = function () {
            var request = $.ajax({
                url: opt.url,
                data: opt.query,
                dataType: 'json'
            });
            var now = new Date();
            // Trigger notify
            request.done(function (arrResponce) {

                $.each(arrResponce, function (index, messages) {
                    //console.log(messages);
                    actionNotify(messages);
                });
            });

            // Show page not found error
            request.fail(function (jqXHR, textStatus) {
                console.error('Cannot find given URL page ')
            });
            setTimeout(actionAjax, opt.timer);
        };

        if (opt.url) {
            actionAjax();
        } else if (opt.data.length > 0) {
            actionObject();
        } else {
            console.error('Ajax URL is not set!');
        }
    };

}(jQuery));
