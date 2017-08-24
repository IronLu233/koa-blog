exports.isAuthenticated = async(ctx, next) => {
    if (ctx.session.uid) {
        return next()
    }
    ctx.status = 401
    ctx.body = {
        detail: 'You must do this after login.'
    }
}
