const commonReturn = async (cb, ctx) => {
    let result = {
        code: -1
    };
    await cb.then(res => {
        ctx.body = {
            code: 200,
            body: res
        };
    }, err => {
        if (err) {
            result.message = err;
        }
        ctx.body = result;
    });
};

module.exports = commonReturn;