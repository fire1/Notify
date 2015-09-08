/**
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 *
 * Created by  Angel Zaprianov <me@fire1.eu> on 9/8/15.
 */


(function ($) {

    var opt = $.extend({
        // These are the defaults.
        url: 'example.josn',
        timer: 3000
    }, options);

    var txtTitle, txtBody, srcIcon, showedContainer = [];


    // Generate message
    var messageShow = function () {
        return new Notification(txtTitle, {
            body: txtBody,
            icon: srcIcon
        })
    };

    var triggerNotify = function () {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            // backup option
            alert(txtBody);
            console.error('Browser do not support notification!');
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            messageShow();
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    messageShow();
                }
            });
        }

        // At last, if the user has denied notifications, and you
        // want to be respectful there is no need to bother them any more.
    };

    // Ajax main settings
    var actionAjax = function () {
        var request = $.ajax({
            url: opt.url,
            data: opt.query,
            dataType: 'json'
        });

        // Trigger notify
        request.done(function (msg) {
            if (!msg.title || !msg.body || !msg.token) {
                console.error('Given file is not supported! Please set your json as {title: "", body:"", token:"" } ');
            }

            // Check showed message for users not refreshed page
            if (showedContainer.indexOf(msg.token) == -1) {
                showedContainer.push(msg.token);
                triggerNotify();
            }

        });

        // Show page not found error
        request.fail(function (jqXHR, textStatus) {
            console.error('Cannot find given URL page ')
        });
        setTimeout(actionAjax, opt.timer);
    };


    $.fn.notify = function () {
        if (opt.url) {
            actionAjax();
        } else {
            console.error('Ajax URL is not set!');
        }
    };

}(jQuery));
