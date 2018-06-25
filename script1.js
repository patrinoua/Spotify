(function(){
    var results=$('#results');
    var input=$('input');
    var option=$('option');
    var xhr ;
    var myOffset=20;
    var html='';

    input.on('input',function(){
        if(!input.val()){
            console.log('emptyiiing!');
            results.empty();
        }
    })

    function infiniteScroll() {
        if ( $(document).height() <= $(window).height() + $(document).scrollTop() + 100) {
            spotifyResults(data);
        } else {
            setTimeout(infScroll, 100);
        }
    }

    $('#more').hide()

    $(document).on('click', '#more, #go', function(e){

        // console.log(e.target);
        var url, data;
        if(e.target.id=='go'){
            myOffset=0;
        }

        if (xhr){
            xhr.abort();
        }
        xhr = $.ajax({
            url:"https://elegant-croissant.glitch.me/spotify",
            data:{
                q: input.val(),
                type: $('select').val(),
                offset:myOffset,
                limit: 20
            },
            success: function(data){
                data=data.artists||data.albums;
                myOffset+=data.items.length;

                spotifyResults(data);

                if(e.target.id=='go'){
                    console.log('goo!');
                    html=spotifyResults(data);

                    results.html(html);
                }
                else if(e.target.id=='more'){
                    if(data.next){
                        console.log('there is more..');
                    }

                    console.log('heya! more button');
                    html=spotifyResults(data);

                    if(html==''){results.html(html); }
                    else {results.append(html);}

                }
            }
        });

    });

    function spotifyResults(data){
        html = '';
        var value = $('input').val();
        console.log('value is ...', value);
        var match='';
        var matches=[];
        var matchingImages=[];
        var image='';
        var myData=data;
        var link='';
        var matchingLinks=[];
        var imgHtml='';

        // myData=data.artists||data.albums;
        for(var i=0;i<myData.items.length;i++){
            if (myData.items[i].name.toLowerCase().startsWith(value.toLowerCase())){
                match=myData.items[i].name;
                link=myData.items[i].external_urls.spotify;

                matches.push('<h3>'+match+'</h3>');
                image=myData.items[i].images[0];
                matchingImages.push(image);
                matchingLinks.push(link);
            }
        }
        for(i=0;i<matches.length;i++){
            if(matchingImages[i]){
                imgHtml='<a href=" '+matchingLinks[i]+'  " target="_blank" >' +
                '<img class="spotifyImg" src="'+matchingImages[i].url+'">'+
                '</a>';
                html+= '<div class="result">'+ imgHtml + matches[i] +'</div>';
            }
        }
        if (data.next) {
            $('#more').show();
        }
        if (!data.next) {
            $('#more').hide();
        }
        return html;
    }





}());
