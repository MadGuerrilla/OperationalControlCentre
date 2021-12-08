d3.json('public/javascripts/json/ssr-old.json', function(error, data) {
    tabulateSSR(data, '#SSR', '');
});
