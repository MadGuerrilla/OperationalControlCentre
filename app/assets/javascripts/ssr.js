// d3.json('/load/ssr', function(error, data) {
//     console.log(data);
//     if ((error) || (data.length == 0)) {
//         console.log('No data available for week, loading table stucture');
//         d3.json('/public/javascripts/json/tablestructure/ssr-copy.json', function(data) {
//             tabulateSSRnew(data, '#SSR', 'ssr');
//         });
//     } else {
//         key = Object.keys(data);
//         data = data[key][0];
//         tabulateSSRnew(data, '#SSR', 'ssr');
//     }
// });

// $.ajax({
//     type: 'POST',
//     url: '/load/ssr',
//     data: {
//         serviceCentre: 'bangor',
//         weekCommencing: getMonday()
//     },
//     timeout: 5000,
//     success: function(data) {
//         console.log('output', data);
//     },
//     error: function(request, err, ex) {}
// });

function postStatus(scenario) {
    switch (scenario) {
        case 'success':
            var id = '';
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
            for (var i = 0; i < 5; i++)
                id += possible.charAt(Math.floor(Math.random() * possible.length));
            $('#messages').append('<div id="' + id + '" class="panel panel-border-wide alert-success" style="display:none;">\
            <strong class="bold-small">\
              Page has been saved.\
            </strong>\
            </div><br>');

            $('#' + id).toggle('fast');
            setTimeout(function() {
                $('#' + id).toggle('slow');
            }, 5000);
            break;
        case 'fail':
            break;
    }
}

// d3.select('input[type="submit"]').on('click', function() {
//     var formData = {
//         "dates": {},
//         "tables": {}
//     };
//     var formTarget = this.dataset.target;
//     entryId = d3.select(formTarget)._groups[0][0].dataset.id;
//     dateTo = d3.select(formTarget)._groups[0][0].dataset.dt;
//     datesString = {
//         "dateFrom": entryId,
//         "dateTo": dateTo,
//     };
//     formData['dates'] = datesString;
//     x = 0;
//     var dataTableArr = []
//     var dataTable = d3.select(formTarget).selectAll('table').each(function(d) {
//         formData['tables'][x] = {
//             [this.dataset.table]: []
//         };
//         dataTableArr.push(this.dataset.table);
//         x++;
//     });
//     var inputElems = d3.select(formTarget).selectAll('input');
//     i = 0;
//     while (i < inputElems._groups[0].length) {
//         ii = i++;
//         tableParent = inputElems._groups[0][i].dataset.tableparent;
//         tableDataString = {
//             [inputElems._groups[0][i].dataset.service]: {
//                 "notes": inputElems._groups[0][i].value,
//                 "value": inputElems._groups[0][ii].value
//             }
//         };
//         index = dataTableArr.indexOf(tableParent);
//         formData['tables'][index][tableParent].push(tableDataString)
//         i++;
//     }
//     var JSONData = {
//         [entryId]: [formData]
//     }
//     JSONData = JSON.stringify(JSONData);
//     console.log(JSONData);
//     $.ajax({
//         type: 'POST',
//         url: '/save/ssr',
//         data: {
//             JSONstring: JSONData,
//             serviceCentre: 'bangor',
//             weekCommencing: getMonday()
//         },
//         timeout: 5000,
//         success: function(json) {
//             console.log('Post successfull');
//             postStatus('success');
//         },
//         error: function(request, err, ex) {}
//     });
// });
