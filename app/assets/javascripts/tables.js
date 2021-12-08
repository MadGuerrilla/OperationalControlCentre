moment.locale('en-GB');

function tabulateSSRnew(data, target, tableClass) {
    // Get dates
    var dates = [];
    var dateFrom = (!data.dates) ? getMonday() : data.dates.dateFrom;
    var dateTo = (!data.dates) ? getMonday() + 604799 : data.dates.dateto;
    dates.push({
        "dateFrom": dateFrom,
        "dateTo": dateTo
    });
    for (table in data.tables) {
        key = Object.keys(data.tables[table]);
        var tableHtml = d3.select(target).attr('data-id', dates[0].dateFrom).attr('data-dt', dates[0].dateTo).append('table').classed(tableClass, true).classed('border top', true).attr('data-table', key)
        var thead = tableHtml.append('thead')
        var tbody = tableHtml.append('tbody');
        // append the header row
        thead.append('tr')
            .append('th')
            .attr('colspan', '5')
            .append('h2')
            .classed('heading-medium', true)
            .text(key);

        rowBody = tbody.append('tr');
        rowBody.append('td').attr('scope', 'col');
        rowBody.append('td').attr('scope', 'col').text('w/c ' + moment.unix(dates[0].dateFrom).format('MMM Do'));
        rowBody.append('td').attr('scope', 'col').text('Notes');

        for (services in data.tables[table][key]) {
            for (serviceData in data.tables[table][key][services]) {
                serviceString = serviceData.replace(/\s+/g, '').toLowerCase();
                rowBody = tbody.append('tr');
                serviceValue = (!data.tables[table][key][services][serviceData].value) ? '' : data.tables[table][key][services][serviceData].value;
                serviceNotes = (!data.tables[table][key][services][serviceData].notes) ? '' : data.tables[table][key][services][serviceData].notes;
                rowBody.append('th')
                    .attr('scope', 'row')
                    .html('<label for="' + serviceString + '-value">' + serviceData + '</label>');
                rowBody.append('td')
                    .html('<input type="text" data-service="' + serviceData + '" data-tableParent="' + key + '" data-type="value" value="' + serviceValue + '" name="' + serviceString + '-value" id="' + serviceString + '-value">');
                rowBody.append('td')
                    .html('<input type="text" data-service="' + serviceData + '" data-tableParent="' + key + '" data-type="notes" value="' + serviceNotes + '" name="' + serviceString + '-notes" id="' + serviceString + '-notes">');
            }
        }
    }
    return tableHtml;

}

function tabulateSSR(data, target, tableClass) {

    // Get dates
    var dates = [];
    for (key in data.dates) {
        var dateFrom = moment.unix(data.dates[key][0]).format('DD/MM/YY');
        var dateTo = moment.unix(data.dates[key][1]).format('DD/MM/YY');
        dates.push(dateFrom + ' - ' + dateTo);
    }

    for (table in data.tables) {
        var tableHtml = d3.select(target).append('table').classed(tableClass, true)
        var thead = tableHtml.append('thead')
        var tbody = tableHtml.append('tbody');
        // append the header row
        thead.append('tr')
            .append('th')
            .attr('colspan', '5')
            .append('h2')
            .classed('heading-medium', true)
            .text(table);

        for (service in data.tables[table]) {
            tbody.append('tr')
                .append('th')
                .attr('colspan', '5')
                .attr('scope', 'row')
                .text(service);

            // Insert dates as headers
            var getDatesTH = tbody.append('tr');

            // Append 'This week' first
            serviceString = service.replace(/\s+/g, '').toLowerCase();
            getDatesTH
                .append('th')
                .attr('scope', 'col')
                .classed('data-title', true)
                .html('<label for="' + serviceString + '">This week</label>');

            // Get insert previous weeks
            for (key in dates) {
                getDatesTH
                    .append('th')
                    .attr('scope', 'col')
                    .classed('data-title', true)
                    .text(dates[key]);
            }

            var inputRowData = tbody.append('tr');
            // Insert 'This week' field
            inputRowData.append('td').html('<input type="text" name="' + serviceString + '" id="' + serviceString + '">');
            for (value in data.tables[table][service]) {
                inputRowData.append('td').html((!data.tables[table][service][value]) ? '<span class="error-message">No data</span>' : data.tables[table][service][value])
                    .classed('data-value', true);
            }
        }
    }
    return table;
}

function tabulateDateStyle1(data, header, columns, target, tableClass) {


    var table = d3.select('#case-management').append('table').classed('case-management', true)
    var thead = table.append('thead')
    var tbody = table.append('tbody');

    // append the header row
    thead.append('tr')
        .append('th')
        .text(header)
        .attr('colspan', '3');

    tbody.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .attr('scope', 'col')
        .text(function(column) {
            return column;
        })
        .classed('data-title', true);
    tbody.select('tr').insert('th', ':first-child');

    for (key in data) {
        var rowHeader = key;

        var rowData = data[rowHeader];

        for (key in rowData) {
            console.log(rowData[key]);
        }

        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
            .data(rowData)
            .enter()
            .append('tr');

        rows.attr('class', function(rowData) {
            var difference = rowData['Difference'];
            return (difference > 0) ? 'positive' : (difference == 0) ? 'flat' : (difference < 0) ? 'negative' : '';
        });
        rows.append('th').attr('scope', 'row').classed('data-title', true).text(rowHeader); // Add row header
        rows.select('tr').insert('th', ':first-child').classed('data-title', true);

        var cells = rows.selectAll('td')
            .data(function(row) {
                return columns.map(function(column) {
                    return {
                        column: column,
                        value: row[column]
                    };
                });
            })
            .enter()
            .append('td')
            .text(function(rowData) {
                return rowData.value;
            })
            .attr('class', function(d) {
                return (d.column == 'Difference') ? 'difference' : '';
            })
            .classed('data-value', true);
    }
    return table;
}
