export default {
    notysucc(obj, title, msg) {
        obj.success({
            title: title,
            message: msg
        });
    },
    notyerr(obj, title, msg) {
        obj.error({
            title: title,
            message: msg
        });
    },
    notywarn(obj, title, msg) {
        obj.warning({
            title: title,
            message: msg
        });
    },
    notyinfo(obj, title, msg) {
        obj.info({
            title: title,
            message: msg
        });
    }
}