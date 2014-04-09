$(document).ready(function(){
$('#getData').click(function(){
    var res = {};
    var episodes_name = [];
    var episodes_ratings = [];
    var jsonString = [];
        $.ajax({
            url:'http://180.179.212.200/tvtrend/search?name=' + $('#tvshowname').val(),
            type:'GET',
            data :'',
            dataType :'json',
            async:false,
            success : function(resData){
                res = resData;
                title = resData.title;
                usertitle = $('#tvshowname').val();
                outline = resData.outline;
                rank = resData.rank;
                cast = resData.cast;
                year = resData.year;
                genre = resData.genre;
                runtime = resData.runtime;
                if(typeof title == "undefined" && typeof rank == "undefined" && typeof year == "undefined")
                {
                    headerstring = "TV Show " + usertitle + " not found!";
                    footerstring = "Please try again with different search query.";
                }
                else
                {
                    headerstring = title + " (" + year + ")";
                    footerstring = "<strong>IMDb Rank:</strong> " + rank + " " + "<strong>Cast:</strong> " + cast + "<strong>Genre:</strong> " + genre + "<strong>Runtime:</strong> " + runtime;
                    episodes_name = res.episodes_name;
                    episodes_ratings = res.episodes_ratings;

                    jsonString = res.episodes;
                    console.log(jsonString);
                    for (var i=0; i<jsonString.length; i++) {
                        jsonEpisode = JSON.stringify(jsonString[i])
                        jsonString[i] = jsonEpisode.replace("\"episode_rating\":", "\"y\":");
                        episodeString = JSON.stringify(jsonString[i])
                        obj = jQuery.parseJSON(episodeString);

                        var rating = obj.substring(obj.length-6,obj.length-2);
                        if (rating[0] === "\""){
                            rating = rating.substring(1);
                        }
                        rating = Number(rating)
                        jsonString[i] = jQuery.parseJSON(jsonString[i]);
                        jsonString[i]["y"] = rating;
                    }
                }

                document.getElementById("headerstring").innerHTML=headerstring;
                document.getElementById("footerstring").innerHTML=footerstring;
            }
        });

        $('#container').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: ' ',
                x: -20 //center
            },
            subtitle: {
                text: ' ',
                x: -20
            },
            xAxis: {
                title: {
                    text: 'Number of Episodes'
                },
                min: 0,
                max: episodes_name.length,
                tickInterval: ~~(episodes_name.length / 10)
            },
            yAxis: {
                title: {
                    text: 'Ratings'
                },
                tickInterval: 1,
                // min: 0,
                max: 10,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {return ' ' +
                'Rating: ' + this.point.y + '<br />' +
                'Episode name: ' + this.point.episode_name + '<br />' +
                'Episode number: ' + "S" + this.point.episode_id.split(".")[0] + "E" + this.point.episode_id.split(".")[1] + '<br />' +
                'Votes: ' + this.point.episode_votes;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: ' ',
                data: jsonString
            }]
        });
    });
});



$(document).ready(function(){
$('#getData').click(function(){
    var res1 = {};
    var res2 = {}
    var episodes_name_1 = [];
    var episodes_name_2 = [];
    var episodes_ratings_1 = [];
    var episodes_ratings_1 = [];
    var maxEpisodeLength = 0;
    var headerstring = "";
    var title1 = "title1";
    var title2 = "title2";
    var jsonString1 = [];
    var jsonString2 = [];

        $.ajax({
            url:'http://180.179.212.200/tvtrend/search?name=' + $('#tvshowname1').val(),
            type:'GET',
            data :'',
            dataType :'json',
            async:false,
            success : function(resData){
                res1 = resData;
                title = resData.title;
                title1 = title;
                usertitle = $('#tvshowname1').val();
                outline = resData.outline;
                rank = resData.rank;
                cast = resData.cast;
                year = resData.year;
                genre = resData.genre;
                runtime = resData.runtime;
                if(typeof title == "undefined" && typeof rank == "undefined" && typeof year == "undefined")
                {
                    headerstring = "TV Show " + usertitle + " not found!";
                    footerstring = "Please try again with different search query.";
                }
                else
                {
                    headerstring = headerstring + title + " (" + year + ")";
                    footerstring = "<strong>" + title + " " + "</strong>" + "<strong>Cast:</strong> " + cast + "<strong>Genre:</strong> " + genre + "<strong>Runtime:</strong> " + runtime;
                    episodes_name_1 = res1.episodes_name;
                    episodes_ratings_1 = res1.episodes_ratings;
                    maxEpisodeLength = episodes_name_1.length;

                    jsonString1 = res1.episodes;
                    for (var i=0; i<jsonString1.length; i++) {
                        jsonEpisode = JSON.stringify(jsonString1[i])
                        jsonString1[i] = jsonEpisode.replace("\"episode_rating\":", "\"y\":");
                        episodeString = JSON.stringify(jsonString1[i])
                        obj = jQuery.parseJSON(episodeString);

                        var rating = obj.substring(obj.length-6,obj.length-2);
                        if (rating[0] === "\""){
                            rating = rating.substring(1);
                        }
                        rating = Number(rating)
                        jsonString1[i] = jQuery.parseJSON(jsonString1[i]);
                        jsonString1[i]["y"] = rating;
                    }
                }

                document.getElementById("headerstring").innerHTML=headerstring;
                document.getElementById("footerstring1").innerHTML=footerstring;
            }
        });

        $.ajax({
            url:'http://180.179.212.200/tvtrend/search?name=' + $('#tvshowname2').val(),
            type:'GET',
            data :'',
            dataType :'json',
            async:false,
            success : function(resData){
                res2 = resData;
                title = resData.title;
                title2 = title;
                usertitle = $('#tvshowname2').val();
                outline = resData.outline;
                rank = resData.rank;
                cast = resData.cast;
                year = resData.year;
                genre = resData.genre;
                runtime = resData.runtime;
                if(typeof title == "undefined" && typeof rank == "undefined" && typeof year == "undefined")
                {
                    headerstring = "TV Show " + usertitle + " not found!";
                    footerstring = "Please try again with different search query.";
                }
                else
                {
                    headerstring = headerstring + " vs. " + title + " (" + year + ")";
                    footerstring = "<strong>" + title + " " + "</strong>" + "<strong>Cast:</strong> " + cast + "<strong>Genre:</strong> " + genre + "<strong>Runtime:</strong> " + runtime;
                    episodes_name_2 = res2.episodes_name;
                    episodes_ratings_2 = res2.episodes_ratings;

                    if(episodes_name_2.length > maxEpisodeLength)
                    {
                        maxEpisodeLength = episodes_name_2.length;
                    }

                    jsonString2 = res2.episodes;
                    for (var i=0; i<jsonString2.length; i++) {
                        jsonEpisode = JSON.stringify(jsonString2[i])
                        jsonString2[i] = jsonEpisode.replace("\"episode_rating\":", "\"y\":");
                        episodeString = JSON.stringify(jsonString2[i])
                        obj = jQuery.parseJSON(episodeString);

                        var rating = obj.substring(obj.length-6,obj.length-2);
                        if (rating[0] === "\""){
                            rating = rating.substring(1);
                        }
                        rating = Number(rating)
                        jsonString2[i] = jQuery.parseJSON(jsonString2[i]);
                        jsonString2[i]["y"] = rating;
                    }
                }

                document.getElementById("headerstring").innerHTML=headerstring;
                document.getElementById("footerstring2").innerHTML=footerstring;
            }
        });

        $('#container').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: ' ',
                x: -20 //center
            },
            subtitle: {
                text: ' ',
                x: -20
            },
            xAxis: {
                title: {
                    text: 'Number of Episodes'
                },
                min: 0,
                max: maxEpisodeLength,
                tickInterval: ~~(maxEpisodeLength / 10)
            },
            yAxis: {
                title: {
                    text: 'Ratings'
                },
                tickInterval: 1,
                // min: 0,
                max: 10,
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function() {return ' ' +
                'Rating: ' + this.point.y + '<br />' +
                'Episode name: ' + this.point.episode_name + '<br />' +
                'Episode number: ' + "S" + this.point.episode_id.split(".")[0] + "E" + this.point.episode_id.split(".")[1] + '<br />' +
                'Votes: ' + this.point.episode_votes;
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: title1,
                data: jsonString1
            },
            {
                name: title2,
                data: jsonString2
            }
            ]
        });
    });
});

