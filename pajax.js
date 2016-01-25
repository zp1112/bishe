jQuery(document).ready(function() {
    $.pjax({
        selector: '.navigation a',
        container: '.timeline', //内容替换的容器
        show: 'custom', //支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
        cache: false, //是否使用缓存
        storage: false, //是否使用本地存储
        titleSuffix: '', //标题后缀
        filter: function(href) {
            return false;
        },
        callback: function(data) {
            var type = data.type;
            switch (type) {
                case 'cache':
                case 'success':

                    break;
                case 'hash':
                    break;
                case 'error':

                    break;
            }
        }
    })

    $('#main').bind('pjax.start', function() {
        $(window).unbind('scroll');
        $('#loading').fadeIn();
    })

    $('#main').bind('pjax.end', function() {
        if (w_lat) create_geolocation(w_lat, w_lng);
        $('#loading').fadeOut();
        daysAgo();
        $(window).bind('scroll', function() {
            func_scoll();
        });
    })
});

$.extend($.pjax.showFx, {
    custom: function(data, callback, isCached) {
        data = data.split(' class="timeline"')[1];
        data = data.substring(data.indexOf('>') + 1);
        var depth = 1;
        var output = '';
        var temp, i, pos;
        while (depth > 0) {
            temp = data.split('</ul>')[0];
            //count occurrences
            i = 0;
            pos = temp.indexOf("<ul");
            while (pos != -1) {
                i++;
                pos = temp.indexOf("<ul", pos + 1);
            }
            //end count
            depth = depth + i - 1;
            output = output + data.split('</ul>')[0] + '</ul>';
            data = data.substring(data.indexOf('</ul>') + 5);
        }
        var $this = this;
        $this.append(output);
        var curpage = $('.current').next('a');
        $('.current').removeClass('current');
        curpage.addClass('current');
        callback && callback.call($this, data, isCached);
    }
});