Handlebars.registerHelper(
    'each_modified',
    function (context, context2, options) {
        return context2[context];
    },
);
