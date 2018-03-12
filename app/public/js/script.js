$(document).ready(function(){
    $("#btnMapGC").click(function(){
        const group=$("#group").val().split(';');
        const calc=$("#calc").val().split(';');
        const mlgid = group[0];
        const gname = group[1];
        const calcId = calc[0];
        const URL = calc[1];
        const calcPid = calc[2];
        $("#btnMapGC").attr('value', 'Please Wait...').attr('disabled', true);

        $.post("http://localhost:3001/link",{calcid: calcId,mlgid: mlgid, groupname: gname, url: URL,calcPid:calcPid}, function (data){
            $("#btnMapGC").attr('value', 'Map').attr('disabled', false);
            console.log('************', data);
        });
    });
});