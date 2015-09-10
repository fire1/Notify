# Notify 

* Notify is based on  Notifications API is used to configure and display desktop notifications to the user. * 

+ Based on jQuery and HTML5 standard.
+ Supports Ajax/Json managing.
+ Simple and easy to use.


### Simple Example: 
    <script>
        $(function () {
            $().notify({
                data: [
                    {
                        //  This message will appear 1 sec. after document is loaded
                        "name": "Hello World 1",
                        "body": " This is only example message ",
                        "time": (Math.floor(Date.now() / 1000) + 1)
                    },
                    {
                        // This message will appear 5 sec  after document is loaded
                        "name": "Hello World 2",
                        "body": " This is only example message ",
                        "time": (Math.floor(Date.now() / 1000) + 5)
                    },
                    {
                        // This message will appear 10 sec  after document is loaded
                        "name": "Hello World 3",
                        "body": " This is only example message ",
                        "time": (Math.floor(Date.now() / 1000) + 10)
                    }
                ]
            });
        });
    </script>
    
### Ajax Example: 
    <script>
        $(function () {
            $().notify({
              url: 'path/to/file.json'
              query: {uid: '<?=$user_id?>'}
            });
        });
    </script>




