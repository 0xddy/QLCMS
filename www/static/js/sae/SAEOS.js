/**
 * Created by admin on 2017/6/17.
 */

var s3url = '.sinacloud.net';


var aws_canned_acl = 'private';

var aws_policy_document_b64;

var bucket;
var aws_access_key_id;
var aws_secret_access_key;

var aws_signature;

var upload_dir;

var time;

var fileName;

var file_path;

var sign;

var setBucket = function (val) {
    bucket = val;
};
var setAwsAccessKey = function (val) {
    aws_access_key_id = val;
};

var setAwsSecretAccessKey = function (val) {
    aws_secret_access_key = val;
};
var setUploadDir = function (val) {
    upload_dir = val;
};

var setFileName = function (val) {
    fileName = val;
};
var makeAwsPolicy = function () {
    let aws_policy_document = '{"expiration":"2020-12-01T12:00:00.000Z","conditions":[{"bucket":"' + bucket + '"},{"acl":"' + aws_canned_acl + '"},["eq","$acl","' + aws_canned_acl + '"],["starts-with","$key",""]]}';
    aws_policy_document_b64 = rstr2b64(aws_policy_document);
    aws_signature = sign(aws_secret_access_key, aws_policy_document_b64);

};
var buildFormData = function () {
    time = new Date().getTime();
    file_path = upload_dir  + time + '-${filename}';
    return {
        key: file_path,
        AWSAccessKeyId: aws_access_key_id,
        acl: aws_canned_acl,
        Policy: aws_policy_document_b64,
        Signature: aws_signature + '=' //不知道为啥这里签名缺个=
    };
};
var sign = function (aws_secret_access_key, string_to_sign) {
    sign = b64_hmac_sha1(aws_secret_access_key, string_to_sign);
    return sign;
    // Authorization: AWS AWSAccessKeyId:Signature
    // http://docs.amazonwebservices.com/AmazonS3/2006-03-01/dev/RESTAuthentication.html
};
var getSign = function () {
    return aws_signature;
};
var getImgPath = function () {
    return getUrl() + file_path.replace('${filename}',fileName);
};
var getUrl = function () {
    var url = "http://" + bucket + s3url + "/";
    return url;
};


