var addressdata,town,village;

addressdata = parent.addressall;

function districtlist() {
    var e = document.search.district;
    for (var i = 0; i < addressdata.length; i++)
        e.options.add(new Option(addressdata[i]["districtName"], addressdata[i]["districtId"]));
}

function townlist(n) {
    var e = document.search.town;
    for (var i = e.options.length; i > 0; i--) e.remove(i);
    setSelectVal("town","请选择");
    setSelectVal("village","请选择");
    if (n == 0) return;
    town = addressdata[n - 1]["towns"];
    for (var i = 0; i < town.length; i++)
        e.options.add(new Option(town[i]["townName"], town[i]["townId"]));
}

function villagelist(n) {
    var e = document.search.village;
    for (var i = e.options.length; i > 0; i--) e.remove(i);
    setSelectVal("village","请选择");
    if (n == 0) return;
    village = town[n - 1]["villages"];
    for (var i = 0; i < village.length; i++)
        e.options.add(new Option(village[i]["villageName"], village[i]["villageId"]));
}

districtlist();

//帮扶措施不同权限查询内容
function getUrl(){
    var url="";
    if(parent.districtId){
        if(parent.townId){
            url="?districtId="+parent.districtId+"&townId="+parent.townId;
            document.search.district.options[1].selected=true;
            document.search.district.disabled=true;
            townlist(1);
            document.search.town.options[1].selected=true;        
            document.search.town.disabled=true;
            villagelist(1)            
        }else{
            url="?districtId="+parent.districtId;
            document.search.district.options[1].selected=true;
            document.search.district.disabled=true;
            townlist(1);
        }
    }else{
            url="";
        }
    return url;
}