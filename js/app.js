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
                openingtime: '09:30',
                closingtime: '16:00'
            },
            {
                name: 'London Stock Exchange',
                short: 'LSE',
                timezone: {
                    summer: 1,
                    winter: 0
                },
                openingtime: '08:00',
                closingtime: '16:30'
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
        }
    };


    //**---The View---**//
    var view = {
        init: function(){
            this.render();
            this.currentUTCTime();

            $('#time').click(function(){
                console.log('test');
                view.updateTime();
            });
        },

        render: function(){
            // Adds the stockexchanges from the model to the DOM
            var exchanges = viewModel.getExchanges();
            for (var i =0; i < exchanges.length; i++){
                $('.stockexchange').append('<div id="'+exchanges[i].short+'">' + '<p>' + exchanges[i].name + '</p>' + '</div>');
                var myId = "#" + exchanges[i].short;
                $(myId).append('<p id=\'time' + i + '\'>' +view.nonUTCTime(exchanges[i].timezone.summer)+ '</p>');
            }
            // Adds the current time to page
            $('.currenttime').append('<p>' +"Current UTC time: " + view.currentUTCTime() + '</p>');
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
            $('.currenttime').text("Current UTC time: " + view.currentUTCTime());
            // Keeps the local times updated
            for (var i = 0; i < exchanges.length; i++){
                var timeId = "#time" +i;
                $(timeId).text(view.nonUTCTime(exchanges[i].timezone.summer));
            }
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
        }


    };
    viewModel.init();

});

