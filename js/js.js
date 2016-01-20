window.onload = function () {

//滚动视差
    var s = skrollr.init();

//头像变换
    var top = document.getElementsByClassName('top')[0];
    var img1 = document.getElementsByClassName('img1')[0];
    if(top.id=='top'){
        top.className = 'top scroll';
        img1.className = 'img1 hide';
    }
    else{
        window.onscroll = function () {

            if (top !== undefined) {
                if (window.scrollY > 0) {
                    top.className = 'top scroll';
                    img1.className = 'img1 hide';
                }
                else {
                    top.className = 'top';
                    img1.className = 'img1';
                }
            }
        };
    }



//countdown日期计数
    //返回时间差
    var cd = function (input) {
        //format: y d h m s
        var dvalue = parseInt(new Date(input) - new Date(), 10) / 1000;
        var result = {
            sign: dvalue > 0 ? 1 : -1
        };
        dvalue = dvalue > 0 ? dvalue : -dvalue;

        result.seconds = parseInt(dvalue % 60, 10);
        result.minutes = parseInt(dvalue / 60 % 60, 10);
        result.hours = parseInt(dvalue / 3600 % 24, 10);
        result.totalDays = parseInt(dvalue / 86400, 10);
        result.years = parseInt(result.totalDays / 365, 10);
        result.days = parseInt(result.totalDays % 365, 10);
        result.month = parseInt(result.totalDays / 30, 10);

        return result;
    };
    //年龄计算
    var timer = function () {
        var age = document.getElementsByClassName('info_age')[0];
        if (age !== undefined) {
            var result = cd(age.getAttribute('datetime'));
            age.innerHTML = `age:${result.years}岁${result.days}天${result.hours}小时${result.minutes}分钟`;
            setTimeout(timer, 999);
        }
    };
    timer();
    //发布时间
    var post_date = document.getElementsByClassName('post_date');
    for (var i = 0; i < post_date.length; i++) {
        var result = cd(post_date[i].getAttribute('datetime'));
        post_date[i].innerHTML = (result.years > 0 ? result.years + '年前发布' : (result.month > 0 ? result.month + '个月前发布' : (result.days > 0 ? result.days + '天前发布' : '今天发布')));
    }

//百度地图
    var time_dot_date = document.getElementsByClassName('time_dot_date');
    var time_dot = document.getElementsByClassName('time_dot');
    var geolocation = document.getElementsByClassName('geolocation');
    var html = document.createElement('div');
    html.id = 'map';
    var close = document.createElement('span');//关闭按钮
    close.id = 'close';
    close.innerHTML = "+";


    for (var i = 0; i < time_dot_date.length; i++) {
        (function (ele, ala) {
            var mouseoverfunc = function () {
                ele.appendChild(html);
                ele.appendChild(close);
                ala.style.display = 'inline-block';
                ala.innerHTML = '';
                ele.onmouseover = null;

                var map = new BMap.Map("map");  // 创建Map实例
                var place = ele.getAttribute('date-place');
                map.centerAndZoom(place, 12);
                //计算距离
                var EARTH_RADIUS = 6378137.0;    //单位M
                var PI = Math.PI;

                function getRad(d) {
                    return d * PI / 180.0;
                }

                //计算距离
                function getDistance(lat1, lng1, lat2, lng2) {
                    var f = getRad((lat1 + lat2) / 2);
                    var g = getRad((lat1 - lat2) / 2);
                    var l = getRad((lng1 - lng2) / 2);
                    var sg = Math.sin(g);
                    var sl = Math.sin(l);
                    var sf = Math.sin(f);
                    var s, c, w, r, d, h1, h2;
                    var a = EARTH_RADIUS;
                    var fl = 1 / 298.257;
                    sg = sg * sg;
                    sl = sl * sl;
                    sf = sf * sf;
                    s = sg * (1 - sl) + (1 - sf) * sl;
                    c = (1 - sg) * (1 - sl) + sf * sl;
                    w = Math.atan(Math.sqrt(s / c));
                    r = Math.sqrt(s * c) / w;
                    d = 2 * w * a;
                    h1 = (3 * r - 1) / 2 / c;
                    h2 = (3 * r + 1) / 2 / s;
                    return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
                }

                //错误回调
                function handleLocationError(error) {
                    switch (error.code) {
                        case 0:
                            console.log("尝试获取您的位置信息时发生错误：" + error.message);
                            break;
                        case 1:
                            console.log("用户拒绝了获取位置信息请求。");
                            break;
                        case 2:
                            console.log("浏览器无法获取您的位置信息：" + error.message);
                            break;
                        case 3:
                            console.log("获取您位置信息超时。");
                            break;
                    }
                    //To Do Sth;
                }

                //成功回调
                function getPositionSuccess(position) {
                    var lat_c = parseFloat(position.latitude);
                    var lng_c = parseFloat(position.longitude);
                    var lat = map.getCenter().lat;
                    var lng = map.getCenter().lng;
                    var dist = getDistance(lat_c, lng_c, lat, lng);
                    dist = (dist < 1000) ? (dist.toFixed(2) * +'M') : ((dist / 1000).toFixed(2) + 'KM');
                    ala.innerHTML = '与你相距:' + dist;
                }

//监听地图加载事件
                //回调事件
                var tilesLoad = function () {
                    map.removeEventListener('tilesloaded', tilesLoad);//移除监听
                    var geolocation = new BMap.Geolocation();
                    geolocation.getCurrentPosition(getPositionSuccess, handleLocationError, {
                        enableHighAccuracy: true,
                        maximumAge: 3600000,
                        timeout: 30000
                    });
                };
                //监听
                map.addEventListener("tilesloaded", tilesLoad);
                //关闭地图
                document.getElementById('close').onclick = function () {
                    ala.style.display = 'none';
                    ele.removeChild(html);
                    ele.removeChild(close);
                    ele.onmouseover = mouseoverfunc;
                };
            };
            ele.onmouseover = mouseoverfunc;
        })(time_dot_date[i], geolocation[i]);
    }


};



