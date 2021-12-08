$(function() {
    var startDate,
        endDate,
        selectCurrentWeek = function() {
            window.setTimeout(function() {
                $('.week-picker').datepicker('widget').find('.ui-datepicker-current-day').parent('tr').addClass('ui-state-active')
            }, 1);
        };

    calculateWeekRange = function(inst, dpThis, datepicker) {
        var date = $(dpThis).datepicker('getDate'),
            dateFormat = inst.settings.dateFormat || $.datepicker._defaults.dateFormat;
        day = ((date.getDay() == 0) ? 0 : date.getDay());
        startDate = (day == 0) ? new Date(date.getFullYear(), date.getMonth(), date.getDate() - 6) : new Date(date.getFullYear(), date.getMonth(), date.getDate() - day + 1);
        endDate = (day == 0) ? new Date(date.getFullYear(), date.getMonth(), date.getDate()) : new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 - day));
        console.log(datepicker);
        $('#datepicker').val(datepicker.formatDate(dateFormat, startDate, inst.settings) + ' - ' + datepicker.formatDate(dateFormat, endDate, inst.settings));
        selectCurrentWeek();
    };
    $.ajax({
        type: 'POST',
        url: '/timestamp',
        timeout: 5000,
        success: function(data) {
            var startDate = moment.unix(data.timestampStarting).format(),
                endDate = moment.unix(data.timestampEnding).format();
            $('#datepicker').datepicker({
                startDate: startDate,
                endDate: endDate,
                showOtherMonths: true,
                selectOtherMonths: true,
                dateFormat: 'dd M, yy ',
                dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                firstDay: 1,
                setDate: new Date('12-11-2016'),
                onSelect: function(dateText, inst) {
                    dpThis = this;
                    console.log('datepicker -- ', $.datepicker);
                    calculateWeekRange(inst, dpThis, $.datepicker);
                },
                beforeShow: function() {
                    selectCurrentWeek();
                },
                beforeShowDay: function(date) {
                    var cssClass = '';
                    if (date >= startDate && date <= endDate) {
                        cssClass = 'ui-datepicker-current-day';
                    }
                    return [true, cssClass];
                },
                onChangeMonthYear: function(year, month, inst) {
                    selectCurrentWeek();
                }
            }).datepicker('widget').addClass('ui-weekpicker');
            $('.ui-weekpicker').on('mousemove', 'tr', function() {
                $(this).find('td a').addClass('ui-state-hover');
            });
            $('.ui-weekpicker').on('mouseleave', 'tr', function() {
                $(this).find('td a').removeClass('ui-state-hover');
            });
        },
        error: function(request, err, ex) {}
    });

});
