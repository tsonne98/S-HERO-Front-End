const dashboard = new Vue({
    el: '#dashboard',
    data:{
        airData : {
            temp : "29.3℃",
            hum : "80.2%",
            co2 : {value : "312ppm", step : "좋음", iscolor : [1, 0, 0, 0]},
            voc : {value : "1단계", step : "보통", iscolor : [0, 1, 0, 0]},
            pm10 : {value : "91ppm", step : "나쁨", iscolor : [0, 0, 1, 0]},
            pm2 : {value : "53ppm", step : "매우나쁨", iscolor : [0, 0, 0, 1]},
        },
        fanData : {
            status : [false, 0, 0, 0, 1, 0],
        },
        notificationData : {
            top : {
                title : "CO2 알림",
                time : "3분 전",
                contents : "이산화탄소 농도가 너무 높습니다. 창문을 열어 환기해주세요.",
            },
            mid : {
                title : "CO2 알림",
                time : "1시간 전",
                contents : "미세먼지 농도가 너무 높습니다. 건강에 유의하세요.",
            },
            bottom : {
                title : "CO2 알림",
                time : "2일 전",
                contents : "필터 교체가 필요합니다.",
            },
        },
        active : "active_fan",
        deactive : "deactive_fan",
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

                if (msg.pm10 > 150){
                    dashboard.airData.pm10.step = "매우나쁨";
                    dashboard.airData.pm10.iscolor = [0, 0, 0, 1];
                } else if (msg.pm10 > 80){
                    dashboard.airData.pm10.step = "나쁨";
                    dashboard.airData.pm10.iscolor = [0, 0, 1, 0];
                } else if (msg.pm10 > 30){
                    dashboard.airData.pm10.step = "보통";
                    dashboard.airData.pm10.iscolor = [0, 1, 0, 0];
                } else if (msg.pm10 > 0){
                    dashboard.airData.pm10.step = "좋음";
                    dashboard.airData.pm10.iscolor = [1, 0, 0, 0];
                } else { 

                }

                if (msg.pm2 > 75){
                    dashboard.airData.pm2.step = "매우나쁨";
                    dashboard.airData.pm2.iscolor = [0, 0, 0, 1];
                } else if (msg.pm2 > 35){
                    dashboard.airData.pm2.step = "나쁨";
                    dashboard.airData.pm2.iscolor = [0, 0, 1, 0];
                } else if (msg.pm2 > 15){
                    dashboard.airData.pm2.step = "보통";
                    dashboard.airData.pm2.iscolor = [0, 1, 0, 0];
                } else if (msg.pm2 > 0){
                    dashboard.airData.pm2.step = "좋음";
                    dashboard.airData.pm2.iscolor = [1, 0, 0, 0];
                } else { 

                }
            }
        })
    }, 
})
