var testBucket = 'test.autumncloud.net';
var testFile = 'xtest.txt';
var testData = '123456';
var timeout = 5000;

var creds = window.location.hash.substr(1).split(':');
console.log(creds);
var awsKey = creds[0];
var awsSecret = creds[1];
console.log('key', awsKey);
console.log('secret', awsSecret);

describe('test setup', function() {
    it('should have key defined', function() {
        expect(awsKey).toBeTruthy();
    });

    it('should have secret defined', function() {
        expect(awsSecret).toBeTruthy();
    });
});

describe('S3Client', function() {
    var s3 = new S3Client(awsKey, awsSecret);

    it('should list buckets', function() {
        var done = false;
        runs(function() {
            s3.listBuckets(function(err, list) {
                expect(err).toBeNull();
                done = true;
                console.log(list);
            });
        });
        waitsFor(function() {
            return done;
        }, 'Should call callback', timeout);
    });

    it('should GET bucket', function() {
        var done = false;
        runs(function() {
            s3.getBucket(testBucket, function(err, b) {
                expect(err).toBeNull();
                expect(b.Name).toEqual(testBucket);
                console.log(b);
                done = true;
            });
        });
        waitsFor(function() {
            return done;
        }, 'Should call callback', timeout);
    });

    it('should PUT object', function() {
        var done = false;
        runs(function() {
            s3.putObject(testBucket, testFile, testData, function(err, rsp) {
                expect(err).toBeNull();
                done = true;
            });
        });

        waitsFor(function() {
            return done;
        }, 'Callback should be called', 5000);
    });

    it('should GET object', function() {
        var done = false;
        runs(function() {
            s3.getObject(testBucket, testFile, function(err, o) {
                expect(err).toBeNull();
                expect(o).toBeTruthy();
                expect(o.code).toEqual(200);
                expect(o.body).toEqual(testData);
                done = true;
            });
        });
        waitsFor(function() {
            return done;
        }, 'Callback should be called', 5000);
    });


});
