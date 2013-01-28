S3Client.js
===========
An S3 client library for the browser.

Example usage
-------------
In your `<head>`:

    <script src='s3client.js'></script>

In your `<script>`:

    var s3 = new S3Client('AWS ACCESS KEY', 'AWS SECRET');
    s3.getBucket('BUCKET NAME', function(err, bucket) {
        // bucket => {
        //   Name: 'BUCKET NAME'
        //   Contents: [
        //      Key: '/PATH/TO/FILE',
        //      ...
        //   ]
        // }
    });
    
    s3.getObject('BUCKET NAME', '/PATH/TO/FILE', function(err, obj) {
        // obj => {
        //   headers: { ... },
        //   code:    200,
        //   body:    "FILE CONTENTS HERE"
        // }
    });

    s3.putObject('BUCKET NAME', '/PATH/TO/FILE', 'FILE CONTENTS',
        function(err) {
        }
    );

API
---
### constructor - S3Client(key, secret)

### getBucket (bucket, callback(err, bucket) )

### getObject (bucket, key, callback(err, object) )

### putObject (bucket, key, data, callback(err, rsp) )

CORS Configuration
------------------
    <?xml version="1.0" encoding="UTF-8"?>
    <CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
        <CORSRule>
            <AllowedOrigin>http://*</AllowedOrigin>
            <AllowedMethod>GET</AllowedMethod>
            <AllowedMethod>PUT</AllowedMethod>
            <MaxAgeSeconds>3000</MaxAgeSeconds>
            <AllowedHeader>Authorization</AllowedHeader>
            <AllowedHeader>x-amz-date</AllowedHeader>
            <AllowedHeader>Accept</AllowedHeader>
            <AllowedHeader>Origin</AllowedHeader>
            <AllowedHeader>Content-MD5</AllowedHeader>
            <AllowedHeader>Content-Type</AllowedHeader>
        </CORSRule>
    </CORSConfiguration>

Testing
-------
Edit the `test/spec/s3client.js` and set the `awsKey` and `awsSecret` values
with your AWS Access Key and Secret.

To run the tests, open the `test/index.html` file.

Change log
----------
### 0.0.1 - 2013-01-27
- Initial commit
