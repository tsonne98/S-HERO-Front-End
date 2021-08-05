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
    },
    mounted: function(){

    },
})