# Notify 

    * Notify is based on  Notifications API is used to configure and display desktop notifications to the user. * 

+ Based on jQuery and HTML5 standard.
+ Supports Ajax/Json managing.
+ Simple and easy to use.

### Defaults options
    <script>
        $(function () {
            // These are the defaults.
            $().notify({
                url: '',                // URI Path to file [NOTE: It is good to use static file *.json]
                timer: 3000,            // Timer [NOTE: Response Code 304 from server is required for lower interval loops]
                query: {},              // Object for URI method GET Query params to file
                icon: 'notify.png',     // Default icon for messages
                dataIndex: '',          // If is set dataIndex then accepts format will be something like: ( user_id_4: { name: ..., body: ... ...  } )
                dataGlobal: 'global',   // If "dataIndex" is used then this is the global massage
                data: [],               // Object contained the information
                debug: false            // Debug mode
            });
        });     
    </script>

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
    
    




