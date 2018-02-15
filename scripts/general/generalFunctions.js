window.apiurl='http://191.234.177.161/vacunar/';
// Parse tamplates
function parseTemplate(props, template)
{
	var result = template;
	for (var key in props) {
  	while(result.indexOf(key) >= 0) {
    	result = result.replace(key,String(props[key]));
    }
  }
  return result;
}
// Local storage
function acceptsLocalStorage(){
	if(typeof(Storage) !== "undefined") {
    return true;
	} else {
    // Sorry! No Web Storage support..
	return false;
	}
}
function setCookie(cname, cvalue, exdays) {
	cname="vv-"+cname;
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
	if(acceptsLocalStorage()){
		localStorage.setItem(cname, cvalue);
	}else{
    	document.cookie = cname + "=" + cvalue + "; " + expires;
	}
}
function getCookie(cname) {
	cname="vv-"+cname;
	if(acceptsLocalStorage()){
		if(localStorage.getItem(cname)!=null){
		return localStorage.getItem(cname);}else{ return "";}
	}else{
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i<ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1);
			if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
		}
		return "";
	}
}
function delete_cookie( cname ) {
	cname="vv-"+cname;
	if(acceptsLocalStorage()){
		localStorage.setItem(cname, " ");
	}else{
 		 document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}
function checkCookie(){ // Check if cookies are enable
	if(navigator.cookieEnabled==true){
		document.cookie="testcookie";
		if(document.cookie.indexOf("testcookie")!=-1){
			return true;
		}else{
			return false;
		}

	}else{
		return false;
	}
}
// Otros general
function generalErrors(xhr){
	// xhr.status
	alert("Error: "+xhr.responseText);
}
function parseDate(date){
	var dia= date.substring(8, 10);// Dia del mes
	var mes= date.substring(5, 7);// que mes
	var ano= date.substring(2, 4);// que ano
	var hora= date.substring(11, 13);// hora
	var minutos=date.substring(14, 16);// minutos
  return dia+'/'+mes+' '+hora+':'+minutos+' Hs ';
}
function getQueryVariableTranslated(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return -1;
}
function addLoader(){
  return '<div class="panel fade in panel-default" data-init-panel="true" style="background: gainsboro;" id="pcloader"><div class="panel-body"><div class="search-result-item"><p class="text-center"><strong><i class="fa fa-spinner fa-spin fa-4x"></i></strong></p>        </div>        <!-- /.search-result-item -->    </div>    <!-- /.panel-body --></div>';
}
function isSync(sync){
	if(sync){return 'border-teal';}
	else{return 'border-orange';}
}
function needsSync(dateCheked){
	return secondsFromNow(dateCheked)>86400;//Pide sync cada 86400 segundos / 24 horas
}
function secondsFromNow(dateCheked){
		var date1 = new Date(dateCheked);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffSecs = Math.ceil(timeDiff / (1000));
	//alert(diffSecs);
    return(diffSecs);
}
function searchPatientInArr(id){
	for(patient in window.memory.patients){
		if(window.memory.patients[patient].id=id){
			return window.memory.patients[patient];
		}
	}
}
function parseDateToServer(d){
	return d.getFullYear()+'-'+parse0LessThan10(d.getMonth()+1)+'-'+parse0LessThan10(d.getDate())+'T'+parse0LessThan10(d.getHours())+':'+parse0LessThan10(d.getMinutes())+':'+parse0LessThan10(d.getSeconds());
}
function parse0LessThan10(int){
	var int=parseInt(int);
	if(int<10){return"0"+int;}else{return int;}
}
function distanciaDeRefernciaEnMts(){
	var pid=getQueryVariableTranslated("id");
	var paciente=searchPatientInArr(pid);
	return getDistanceFromLatLonInMts(paciente.geo.latitud,paciente.geo.longitud,window.location.latitude,window.location.longitude);
}
function getGpsDir(){
	var distancia= "a "+distanciaDeRefernciaEnMts()+" metros de la referencia";
	return {'dir':distancia,'lat':window.location.latitude,'lng':window.location.longitude}
}
