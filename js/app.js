/**
 * Created by Christian on 29/09/2016.
 */


$(function(){
    //**---The Model---**//
    var model = {
        stockExchanges: [
            {
                name: 'New York Stock Exchange',
                short: 'NYSE',
                timezone: {
                    summer: -4,
                    winter: -5
                },
                openingtime: {
                    hours: 9,
                    minutes: 30
                },
                closingtime: {
                    hours: 16,
                    minutes: 0
                }
            },
            {
                name: 'London Stock Exchange',
                short: 'LSE',
                timezone: {
                    summer: 1,
                    winter: 0
                },
                openingtime: {
                    hours: 8,
                    minutes: 0
                },
                closingtime: {
                    hours: 16,
                    minutes: 30
                }
            }
        ]
    };


    //**---The View Model---**//
    var viewModel = {
        init: function(){
            view.init();
        },
        getExchanges: function(){
            return model.stockExchanges;
        },
        openingUTC: function(index){
            var exchanges = viewModel.getExchanges();

            var t = new Date();
            var hours = t.getUTCHours();
            var minutes = t.getUTCMinutes();
            var seconds = t.getUTCSeconds();

            var dHours = exchanges[index].openingtime.hours - exchanges[index].timezone.summer - hours;
            var dMinutes = 60 + exchanges[index].openingtime.minutes - minutes - 1;
            var dSeconds = 60 - seconds;

            var timeLeft = dHours + ":" + dMinutes + ":" + dSeconds
            return timeLeft;
        }
    };


    //**---The View---**//
    var view = {
        init: function(){
            this.render();
            this.currentUTCTime();
        },

        render: function(){
            // Adds the stockexchanges from the model to the DOM
            var exchanges = viewModel.getExchanges();
            for (var i =0; i < exchanges.length; i++){
                var myId = "#" + exchanges[i].short;
                $(myId).append('<p id=\'' + exchanges[i].short + 'time' + '\' class="exchangeTime"><strong>' +
                "Current local time: " + '</strong>' +view.nonUTCTime(exchanges[i].timezone.summer)+ '</p>');
                var d = Date()
                $(myId).append('<p>')
            }
            // Adds the current time to page
            $('#currenttime').append('<p>' +"Current UTC time: " + view.currentUTCTime() + '</p>');
            this.timeLoop();
        },
        // Gets the current UTC time
        currentUTCTime: function(){
            var d = new Date();
            return d.toUTCString();
        },
        // Updates the current UTC and local time
        updateTime: function(){
            var exchanges = viewModel.getExchanges();
            // Keeps the current UTC time updated
            $('#currenttime').text('');
            $('#currenttime').append('<p>' + "Current UTC time: " + view.currentUTCTime() + '</p>');

            $('.exchangeTime').text('')
            $('.exchangeTime').each(function(index) {
                var opening = viewModel.openingUTC(index);
                $('#' + this.id).append('<p><strong>' + "Current local time: " + '</strong>' + view.nonUTCTime(exchanges[index].timezone.summer) + '</p>');
                $('#' + this.id).append('<p><strong>' + "Time until opening: " + '</strong>' + opening + '</p>');
            })

        },
        // Keeps the times updated
        timeLoop: function(){
            setInterval(view.updateTime, 1000);
        },
        // Figures out the current time in the various locations
        nonUTCTime: function(timezone){
            var d = new Date();
            var utc = d.getTime();
            var nd = new Date(utc + (3600000*timezone));
            return nd.toUTCString();
        },
        


    };
    viewModel.init();

});

