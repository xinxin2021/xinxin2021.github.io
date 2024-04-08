const TAN_22_5=Math.tan(Math.PI/8),UTILITIES={isBetween:(t,e,a)=>t>=Math.min(e,a)&&t<Math.max(e,a),runForTime:(t,e,a)=>{const n=Date.now();for(const o in t)if(e(o),Date.now()-n>20)return void setTimeout(()=>UTILITIES.runForTime(t,e,a));null!=a&&setTimeout(a)},connectLine:(t,e,a,n,o,r,s,i,c,l,I,u)=>{const T=(n-(o-1)/2)*I,_=(c-(l-1)/2)*I,p=UTILITIES.rotatePoint(T,0,a),h=UTILITIES.rotatePoint(_,0,i);return t+=p.x,e+=p.y,r+=h.x,s+=h.y,r>t?(UTILITIES.connectLine1(t,e,a,T,o,r,s,i,_,l,I,u),!1):(UTILITIES.connectLine1(r,s,i,_,l,t,e,a,T,o,I,u),!0)},connectLine1:(t,e,a,n,o,r,s,i,c,l,I,u)=>{const{x:T,y:_}=UTILITIES.rotatePoint(r-t,s-e,-a),p=Math.sign(T),h=Math.sign(_),S=Math.abs(T),m=Math.abs(_),f=(i-a+180)%180,L=T>0==_>0,d=[];d.push(UTILITIES.rotatePoint(0,0,a));const E=o*I/2,g=l*I/2;if(0===f)if(S>m){const t=m/2,e=-clamp(n,m/o)*p*h,r=clamp(-p*n*TAN_22_5+E,(t-Math.abs(e))/2),s=clamp(p*c*TAN_22_5+g,(t-Math.abs(e))/2);d.push(UTILITIES.rotatePoint(0,h*r,a)),d.push(UTILITIES.rotatePoint(p*t-p*r+p*h*e,h*t+e,a)),d.push(UTILITIES.rotatePoint(T-p*t+p*s+p*h*e,h*t+e,a)),d.push(UTILITIES.rotatePoint(T,_-h*s,a))}else{const t=c-n,e=(m-S+t)/2,o=clamp((L?-(0===a?n:c):n)*TAN_22_5,e);d.push(UTILITIES.rotatePoint(0,h*e+o,a)),d.push(UTILITIES.rotatePoint(T,_-h*e+o+(0===a?p*h:-1)*t,a))}else{const t=()=>UTILITIES.rotatePoint(0,clamp((0===a||45===a?1:-1)*c*TAN_22_5+g,S/2),f);if(S>m){const e=clamp(-p*n*TAN_22_5+E,m/2);if(d.push(UTILITIES.rotatePoint(0,h*e,a)),90===f)d.push(UTILITIES.rotatePoint(p*m-p*e,_,a));else{const n=t();d.push(UTILITIES.rotatePoint(p*m-p*e+(45===i?-1:1)*h*n.x,_+n.y,a)),d.push(UTILITIES.rotatePoint(T+n.x,_+n.y,a))}}else if(90===f){const t=clamp((0===a||45===a?1:-1)*h*c*TAN_22_5+g,S/2);d.push(UTILITIES.rotatePoint(0,_-h*S+(L?1:-1)*p*t,a)),d.push(UTILITIES.rotatePoint(T-p*t,_,a))}}d.push(UTILITIES.rotatePoint(T,_,a)),d.forEach(a=>u.push({x:a.x+t,y:a.y+e}))},getDrawStationElement:(t,e,a)=>{const n=document.createElement("div");return n.className="route_station_name text",null!=e&&(n.innerHTML=`<span class="route_segment bottom" style="background-color: ${UTILITIES.convertColor(e)}">&nbsp</span>`),null!=a&&(n.innerHTML+=`<span class="route_segment top" style="background-color: ${UTILITIES.convertColor(a)}">&nbsp</span>`),n.innerHTML+='<span class="station_circle"></span>',n.appendChild(t),n},getDrawLineElement:(t,e,a,n)=>{const o=document.createElement("div");return o.className="route_duration",o.innerHTML=`<span class="route_segment ${null==a?"walk":""}" style="background-color: ${null==a?0:UTILITIES.convertColor(a)}">&nbsp</span>`+(n||"")+`<span class="material-icons small">${t}</span>`,o.appendChild(e),o},convertGtfsRouteType:t=>{switch(t){case 0:case 5:case 12:return"train_light_rail";case 2:return"train_high_speed";case 3:case 11:return"bus_normal";case 4:return"boat_light_rail";case 6:return"cable_car_normal";default:return"train_normal"}},directionToAngle:t=>{const e=["N","NE","E","SE","S","SW","W","NW"].indexOf(t);return UTILITIES.angles[(e>=0?e:0)%UTILITIES.angles.length]},formatTime:t=>{const e=Math.floor(t/3600),a=Math.floor(t/60)%60,n=Math.floor(t)%60;return(e>0?e.toString()+":":"")+(e>0?a.toString().padStart(2,"0"):a.toString())+":"+n.toString().padStart(2,"0")},getColorStyle:t=>parseInt(getComputedStyle(document.body).getPropertyValue(t).replace(/#/g,""),16),convertColor:t=>"#"+Number(t).toString(16).padStart(6,"0"),isCJK:t=>t.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/),removeFromArray:(t,e)=>{const a=t.indexOf(e);a>-1&&t.splice(a,1)},rotatePoint:(t,e,a)=>{const n=t=>{switch((t+360)%360){case 90:return 1;case 270:return-1;case 45:case 135:return Math.SQRT1_2;case 225:case 315:return-Math.SQRT1_2;default:return 0}},o=t=>{switch((t+360)%360){case 0:return 1;case 180:return-1;case 45:case 315:return Math.SQRT1_2;case 135:case 225:return-Math.SQRT1_2;default:return 0}};return{x:t*o(a)-e*n(a),y:t*n(a)+e*o(a)}},routeTypes:{train_normal:"directions_train",train_light_rail:"tram",train_high_speed:"train",boat_normal:"sailing",boat_light_rail:"directions_boat",boat_high_speed:"snowmobile",cable_car_normal:"airline_seat_recline_extra",bus_normal:"directions_bus",bus_light_rail:"local_taxi",bus_high_speed:"airport_shuttle",airplane_normal:"flight"},angles:[0,45,90,135],fonts:["Noto Sans","Noto Serif TC","Noto Serif SC","Noto Serif JP","Noto Serif KR","Material Icons"],obaMode:!1,testMode:!1},clamp=(t,e)=>Math.max(Math.min(t,e),-e);export default UTILITIES;