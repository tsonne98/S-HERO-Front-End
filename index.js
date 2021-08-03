const app = new Vue({
    el: '#app',
    data:{
        temp:"",
        hum:"",
        co2:"",
        voc:"",
        mise:"",
        chomise:"",
        mise_bar_value:0,
        mise_bar_color:'#32a1ff',
        chomise_bar_value:0,
        chomise_bar_color:"#32a1ff",
        co2_number:0,
        co2_text:"측정 대기중",
        voc_number:0,
        voc_text:"측정 대기중",
        fan_status : [0,0,0,0,0,0],
        chart_co2 : '',
        chart_voc : '',
    },
    computed: {

    },
    methods: {

    },
    created: function() {
        uibuilder.start(this)
    },
    mounted: function(){
        var vueApp = this; 
        uibuilder.onChange('msg', function(msg){
            if(msg.payload == 'data'){
                if (String(msg.temp).length < 3){
                    vueApp.temp = msg.temp + '.0 ℃';
                } else{
                    vueApp.temp = msg.temp + ' ℃';
                }
                if (String(msg.hum).length < 3){
                    vueApp.hum = msg.hum + '.0 %';
                } else{
                    vueApp.hum = msg.hum + ' %';
                }
                if(msg.mise > 300){
                    vueApp.mise_bar_color = '#ff5959';
                    vueApp.mise_bar_value = 100;
                } else if(msg.mise > 150){
                    vueApp.mise_bar_color = '#ff5959';
                    vueApp.mise_bar_value = 75 + (msg.mise - 150)/6;
                } else if(msg.mise > 80){
                    vueApp.mise_bar_color = '#fd9b5a';
                    vueApp.mise_bar_value = 50 + (msg.mise - 80)/2.8;
                } else if(msg.mise > 30){
                    vueApp.mise_bar_color = '#00c73c';
                    vueApp.mise_bar_value = 25 + (msg.mise - 30)/2;
                } else if(msg.mise > 0){
                    vueApp.mise_bar_color = '#32a1ff';
                    vueApp.mise_bar_value = msg.mise/1.2;
                } else{
                    vueApp.mise_bar_color = '#32a1ff';
                    vueApp.mise_bar_value = 0;
                }
                if(msg.chomise > 150){
                    vueApp.chomise_bar_color = '#ff5959';
                    vueApp.chomise_bar_value = 100;
                } else if(msg.chomise > 75){
                    vueApp.chomise_bar_color = '#ff5959';
                    vueApp.chomise_bar_value = 75 + (msg.chomise - 75)/5;
                } else if(msg.chomise > 35){
                    vueApp.chomise_bar_color = '#fd9b5a';
                    vueApp.chomise_bar_value = 50 + (msg.chomise - 35)/1.6;
                } else if(msg.chomise > 15){
                    vueApp.chomise_bar_color = '#00c73c';
                    vueApp.chomise_bar_value = 25 + (msg.chomise - 15)/0.8;
                } else if(msg.chomise > 0){
                    vueApp.chomise_bar_color = '#32a1ff';
                    vueApp.chomise_bar_value = msg.chomise/0.6;
                } else{
                    vueApp.chomise_bar_color = '#32a1ff';
                    vueApp.chomise_bar_value = 0;
                }
                if(msg.co2 > 2000){
                    vueApp.co2_color = '#ff5959';
                    vueApp.co2_text = "CO2<br/>" + String(msg.co2) + "ppm";
                } else if(msg.co2 > 1000){
                    vueApp.co2_color = '#fd9b5a';
                    vueApp.co2_text = "CO2<br/>" + String(msg.co2) + "ppm";
                } else if(msg.co2 > 450){
                    vueApp.co2_color = '#00c73c';
                    vueApp.co2_text = "CO2<br/>" + String(msg.co2) + "ppm";
                } else{
                    vueApp.co2_color = '#32a1ff';
                    vueApp.co2_text = "CO2<br/>" + String(msg.co2) + "ppm";
                }
                if(msg.voc == 3){
                    vueApp.voc_color = '#ff5959';
                    vueApp.voc_text = "VOC<br/>Level" + String(msg.voc);
                } else if(msg.co2 > 1000){
                    vueApp.voc_color = '#fd9b5a';
                    vueApp.voc_text = "VOC<br/>Level" + String(msg.voc);
                } else if(msg.co2 > 450){
                    vueApp.voc_color = '#00c73c';
                    vueApp.voc_text = "VOC<br/>Level" + String(msg.voc);
                } else{
                    vueApp.voc_color = '#32a1ff';
                    vueApp.voc_text = "VOC<br/>Level" + String(msg.voc);
                }
                
                vueApp.co2_number = msg.co2;
                vueApp.voc_number = msg.voc;
    			vueApp.co2 = msg.co2 + ' ppm';
    			vueApp.voc = msg.voc;
    			vueApp.mise = msg.mise + ' ㎍/㎥';
    			vueApp.chomise = msg.chomise + ' ㎍/㎥';
    			
    			vueApp.chart_co2 = JSC.chart('chartDiv', {
                    debug: false,
                    type: 'gauge ',
                    legend_visible: false,
                    chartArea_boxVisible: false,
                    xAxis: {
                      /*Used to position marker on top of axis line.*/
                      scale: { range: [0, 1], invert: true }
                    },
                    palette: {
                      pointValue: '%yValue',
                      ranges: [
                        { value: 0, color: '#32a1ff' },
                        { value: 450, color: '#00c73c' },
                        { value: 1000, color: '#fd9b5a' },
                        { value: [2000, 3000], color: '#ff5959' }
                      ]
                    },
                    yAxis: {
                      defaultTick: { padding: 13, enabled: false },
                      customTicks: [450,1000,2000],
                      line: {
                        width: 8,
                        breaks_gap: 0.03,
                        color: 'smartPalette'
                      },
                      scale: { range: [0, 3000] }
                    },
                    defaultSeries: {
                      opacity: 1,
                      shape: {
                        label: { align: 'center', verticalAlign: 'middle' }
                      }
                    },
                    series: [
                      {
                        type: 'marker',
                        name: 'Score',
                        shape_label: {
                          text: vueApp.co2_text,
                          style: { fontSize: 20, color: vueApp.co2_color }
                        },
                        defaultPoint: {
                          tooltip: '%yValue',
                          marker: {
                            outline: { width: 5, color: 'currentColor' },
                            fill: 'white',
                            type: 'circle',
                            visible: true,
                            size: 17
                          }
                        },
                        points: [[1,vueApp.co2_number]]
                      }
                    ]
                });
                vueApp.chart_voc = JSC.chart('chartDiv2', {
                    debug: false,
                    type: 'gauge ',
                    legend_visible: false,
                    chartArea_boxVisible: false,
                    xAxis: {
                      /*Used to position marker on top of axis line.*/
                      scale: { range: [0, 1], invert: true }
                    },
                    palette: {
                      pointValue: '%yValue',
                      ranges: [
                        { value: 0.001, color: '#32a1ff' },
                        { value: 0.001, color: '#00c73c' },
                        { value: 1.001, color: '#fd9b5a' },
                        { value: 2.001, color: '#ff5959' },
                        { value: [2.001, 3], color: '#ff5959' }
                      ]
                    },
                    yAxis: {
                      defaultTick: { padding: 13, enabled: false },
                      customTicks: [1,2,3],
                      line: {
                        width: 8,
                        breaks_gap: 0.03,
                        color: 'smartPalette'
                      },
                      scale: { range: [0, 3] }
                    },
                    defaultSeries: {
                      opacity: 1,
                      shape: {
                        label: { align: 'center', verticalAlign: 'middle' }
                      }
                    },
                    series: [
                      {
                        type: 'marker',
                        name: 'Score',
                        shape_label: {
                          text: vueApp.voc_text,
                          style: { fontSize: 20, color: vueApp.voc_color }
                        },
                        defaultPoint: {
                          tooltip: '%yValue',
                          marker: {
                            outline: { width: 5, color: 'currentColor' },
                            fill: 'white',
                            type: 'circle',
                            visible: true,
                            size: 17
                          }
                        },
                        points: [[1,vueApp.voc_number]]
                      }
                    ]
                });
            } else if(msg.payload == 'fancontrol'){
                if(msg.fancont == 'Low'){
                    vueApp.fan_status = [1,0,0,0,0,0];
                } else if(msg.fancont == 'Mid'){
                    vueApp.fan_status = [0,1,0,0,0,0];
                } else if(msg.fancont == 'High'){
                    vueApp.fan_status = [0,0,1,0,0,0];
                } else if(msg.fancont == 'Full'){
                    vueApp.fan_status = [0,0,0,1,0,0];
                } else if(msg.fancont == 'Auto'){
                    vueApp.fan_status = [0,0,0,0,1,0];
                } else if(msg.fancont == 'Off'){
                    vueApp.fan_status = [0,0,0,0,0,1];
                }
            }
        })
    },
})

