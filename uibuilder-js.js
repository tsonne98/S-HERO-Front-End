const dashboard = new Vue({
    el: '#dashboard',
    data:{
        airData : {
            temp : "",
            hum : "",
            co2 : {value : "", step : "", iscolor : [1, 0, 0, 0]},
            voc : {value : "", step : "", iscolor : [1, 0, 0, 0]},
            pm10 : {value : "", step : "", iscolor : [1, 0, 0, 0]},
            pm2 : {value : "", step : "", iscolor : [1, 0, 0, 0]},
        },
        fanData : {
            status : [1, 0, 0, 0, 0, 0],
        },
        notificationData : {
            isData : [1, 0, 0, 0],
            noData : {
                title : "",
                time : "",
                contents : "알림이 없습니다.",
            },
            top : {
                title : "",
                time : "",
                contents : "",
            },
            mid : {
                title : "",
                time : "",
                contents : "",
            },
            bottom : {
                title : "",
                time : "",
                contents : "",
            },
        },
        active : "active_fan",
        deactive : "deactive_fan",
        dis_notification : "dis_notification",
        hide_notification : "hide_notification",
    },
    computed: {

    },
    methods: {

    },
    created: function() {
        uibuilder.start(this)
    },
    mounted: function(){
        var dashboard = this;
        uibuilder.onChange('msg', function(msg){
            if (msg.payload == 'data'){
                if (String(msg.temp).length < 3){
                    dashboard.airData.temp = String(msg.temp) + ".0℃";
                } else {
                    dashboard.airData.temp = String(msg.temp) + "℃";
                }
                if (String(msg.hum).length < 3){
                    dashboard.airData.hum = String(msg.hum) + ".0%";
                } else {
                    dashboard.airData.hum = String(msg.hum) + "%";
                }               
                dashboard.airData.co2.value = String(msg.co2) + "ppm";
                dashboard.airData.voc.value = String(msg.voc) + "단계";
                dashboard.airData.pm10.value = String(msg.mise) + "ppm";
                dashboard.airData.pm2.value = String(msg.chomise) + "ppm";

                if (msg.co2 > 2000){
                    dashboard.airData.co2.step = "매우나쁨";
                    dashboard.airData.co2.iscolor = [0, 0, 0, 1];
                } else if (msg.co2 > 1000){
                    dashboard.airData.co2.step = "나쁨";
                    dashboard.airData.co2.iscolor = [0, 0, 1, 0];
                } else if (msg.co2 > 450){
                    dashboard.airData.co2.step = "보통";
                    dashboard.airData.co2.iscolor = [0, 1, 0, 0];
                } else if (msg.co2 > 0){
                    dashboard.airData.co2.step = "좋음";
                    dashboard.airData.co2.iscolor = [1, 0, 0, 0];
                } else { 

                }

                if (msg.voc == 3){
                    dashboard.airData.voc.step = "매우나쁨";
                    dashboard.airData.voc.iscolor = [0, 0, 0, 1];
                } else if (msg.voc == 2){
                    dashboard.airData.voc.step = "나쁨";
                    dashboard.airData.voc.iscolor = [0, 0, 1, 0];
                } else if (msg.voc == 1){
                    dashboard.airData.voc.step = "보통";
                    dashboard.airData.voc.iscolor = [0, 1, 0, 0];
                } else if (msg.voc == 0){
                    dashboard.airData.voc.step = "좋음";
                    dashboard.airData.voc.iscolor = [1, 0, 0, 0];
                } else { 
                    
                }

                if (msg.mise > 150){
                    dashboard.airData.pm10.step = "매우나쁨";
                    dashboard.airData.pm10.iscolor = [0, 0, 0, 1];
                } else if (msg.mise > 80){
                    dashboard.airData.pm10.step = "나쁨";
                    dashboard.airData.pm10.iscolor = [0, 0, 1, 0];
                } else if (msg.mise > 30){
                    dashboard.airData.pm10.step = "보통";
                    dashboard.airData.pm10.iscolor = [0, 1, 0, 0];
                } else if (msg.mise > 0){
                    dashboard.airData.pm10.step = "좋음";
                    dashboard.airData.pm10.iscolor = [1, 0, 0, 0];
                } else { 
                }

                if (msg.chomise > 75){
                    dashboard.airData.pm2.step = "매우나쁨";
                    dashboard.airData.pm2.iscolor = [0, 0, 0, 1];
                } else if (msg.chomise > 35){
                    dashboard.airData.pm2.step = "나쁨";
                    dashboard.airData.pm2.iscolor = [0, 0, 1, 0];
                } else if (msg.chomise > 15){
                    dashboard.airData.pm2.step = "보통";
                    dashboard.airData.pm2.iscolor = [0, 1, 0, 0];
                } else if (msg.chomise > 0){
                    dashboard.airData.pm2.step = "좋음";
                    dashboard.airData.pm2.iscolor = [1, 0, 0, 0];
                } else { 

                }
            } else if (msg.payload == "fancontrol") {
                switch(msg.fancont) {
                    case 'Auto':
                        dashboard.fanData.status = [1, 0, 0, 0, 0, 0];
                        break;
                    case 'Off':
                        dashboard.fanData.status = [0, 1, 0, 0, 0, 0];
                        break;
                    case 'Low':
                        dashboard.fanData.status = [0, 0, 1, 0, 0, 0];
                        break;
                    case 'Mid':
                        dashboard.fanData.status = [0, 0, 0, 1, 0, 0];
                        break;
                    case 'High':
                        dashboard.fanData.status = [0, 0, 0, 0, 1, 0];
                        break;
                    case 'Full':
                        dashboard.fanData.status = [0, 0, 0, 0, 0, 1];
                        break;
                    default:
                        dashboard.fanData.status = [0, 0, 0, 0, 0, 0];
                        break;
                  }
            } else if (msg.payload == "notification") {
                if (dashboard.notificationData.isData[0] == true){
                    //데이터가 없어서 새로 추가할 때
                    dashboard.notificationData.isData = [0, 1, 0, 0];
                    dashboard.notificationData.top.title = msg.title;
                    dashboard.notificationData.top.time = msg.time;
                    dashboard.notificationData.top.contents = msg.contents;
                } else if (dashboard.notificationData.isData[0] == false){
                    //데이터가 기존에 있음
                    if (dashboard.notificationData.isData[3]){
                        //데이터가 현재 3개있음
                        dashboard.notificationData.isData = [0, 1, 1, 1];
                        // mid -> bottom
                        dashboard.notificationData.bottom.title = dashboard.notificationData.mid.title;
                        dashboard.notificationData.bottom.time = dashboard.notificationData.mid.time;
                        dashboard.notificationData.bottom.contents = dashboard.notificationData.mid.contents;
                        // top -> mid
                        dashboard.notificationData.mid.title = dashboard.notificationData.top.title;
                        dashboard.notificationData.mid.time = dashboard.notificationData.top.time;
                        dashboard.notificationData.mid.contents = dashboard.notificationData.top.contents;
                        // new -> top
                        dashboard.notificationData.top.title = msg.title;
                        dashboard.notificationData.top.time = msg.time;
                        dashboard.notificationData.top.contents = msg.contents;
                    } else if(dashboard.notificationData.isData[2]){
                        //데이터가 현재 2개있음
                        dashboard.notificationData.isData = [0, 1, 1, 1];
                        // mid -> bottom
                        dashboard.notificationData.bottom.title = dashboard.notificationData.mid.title;
                        dashboard.notificationData.bottom.time = dashboard.notificationData.mid.time;
                        dashboard.notificationData.bottom.contents = dashboard.notificationData.mid.contents;
                        // top -> mid
                        dashboard.notificationData.mid.title = dashboard.notificationData.top.title;
                        dashboard.notificationData.mid.time = dashboard.notificationData.top.time;
                        dashboard.notificationData.mid.contents = dashboard.notificationData.top.contents;
                        // new -> top
                        dashboard.notificationData.top.title = msg.title;
                        dashboard.notificationData.top.time = msg.time;
                        dashboard.notificationData.top.contents = msg.contents;
                    }
                    else if(dashboard.notificationData.isData[1]){
                        //데이터가 현재 1개있음
                        dashboard.notificationData.isData = [0, 1, 1, 0];
                        // top -> mid
                        dashboard.notificationData.mid.title = dashboard.notificationData.top.title;
                        dashboard.notificationData.mid.time = dashboard.notificationData.top.time;
                        dashboard.notificationData.mid.contents = dashboard.notificationData.top.contents;
                        // new -> top
                        dashboard.notificationData.top.title = msg.title;
                        dashboard.notificationData.top.time = msg.time;
                        dashboard.notificationData.top.contents = msg.contents;
                    } else{

                    }
                } else{

                }
            }
        })
    }, 
})
